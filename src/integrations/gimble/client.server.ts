import {
  getCookie,
  getRequestHeader,
  getRequestIP,
  setCookie,
  deleteCookie,
} from '@tanstack/react-start/server';

import {
  ADMIN_SESSION_COOKIE,
  BACKEND_SESSION_COOKIE,
  getGimbleConfig,
} from './config.server';

/**
 * Server-to-server client for the Gimble backend.
 *
 * WHY A PROXY AND NOT DIRECT BROWSER CALLS. The backend authenticates with an
 * express-session cookie scoped to its own domain and marked SameSite=Lax, and
 * its CORS allowlist does not include this site — a preflight from
 * www.gimblefoundation.org comes back with no Access-Control-Allow-Origin at
 * all. So the browser cannot hold that session. Instead the browser talks only
 * to this origin, and these functions carry the session across on its behalf.
 *
 * The backend session cookie is stored inside our own httpOnly cookie on
 * gimblefoundation.org. It is never readable by client JavaScript, and it never
 * appears in a response body.
 */

/** Thrown when the backend rejects the session. Routes turn this into a redirect. */
export class AdminUnauthorizedError extends Error {
  constructor(message = 'Admin session expired') {
    super(message);
    this.name = 'AdminUnauthorizedError';
  }
}

/** Thrown for any other non-2xx, carrying the backend's own message. */
export class GimbleApiError extends Error {
  readonly status: number;
  readonly code?: string;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.name = 'GimbleApiError';
    this.status = status;
    this.code = code;
  }
}

export interface GimbleFetchOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
  /** Send the stored admin session. Off for public endpoints. */
  authenticated?: boolean;
  /** Query string parameters; undefined and '' values are dropped. */
  query?: Record<string, string | number | boolean | undefined | null>;
  /** Return the raw Response instead of parsed JSON (used for CSV export). */
  raw?: boolean;
}

// A slow backend query plus this hop can outlast the platform's function
// timeout, which surfaces as an opaque 504 with no clue where it came from.
// Failing here instead produces an error that names the endpoint.
const REQUEST_TIMEOUT_MS = 15_000;

export async function gimbleFetch<T = unknown>(
  path: string,
  options: GimbleFetchOptions = {}
): Promise<T> {
  const { apiUrl, proxySecret } = getGimbleConfig();
  const { method = 'GET', body, authenticated = true, query, raw = false } = options;

  const url = new URL(`${apiUrl}${path}`);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }

  const headers: Record<string, string> = { Accept: 'application/json' };

  if (body !== undefined) headers['Content-Type'] = 'application/json';

  if (authenticated) {
    const session = getCookie(ADMIN_SESSION_COOKIE);
    if (!session) throw new AdminUnauthorizedError('Not signed in');
    headers.Cookie = `${BACKEND_SESSION_COOKIE}=${session}`;
  }

  // Without this every request would arrive from this server's egress address,
  // which would collapse the backend's per-IP rate limits into one shared
  // bucket and make its audit trail name us instead of the visitor.
  if (proxySecret) {
    const clientIP = getRequestIP({ xForwardedFor: true });
    if (clientIP) {
      headers['X-Gimble-Client-IP'] = clientIP;
      headers['X-Gimble-Proxy-Secret'] = proxySecret;
    }
  }

  const forwardedUserAgent = getRequestHeader('user-agent');
  if (forwardedUserAgent) headers['User-Agent'] = forwardedUserAgent;

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'TimeoutError') {
      throw new GimbleApiError(504, `Backend timed out after ${REQUEST_TIMEOUT_MS}ms: ${path}`);
    }
    throw new GimbleApiError(502, `Could not reach the Gimble backend: ${path}`);
  }

  // express-session uses rolling sessions, so it re-issues the cookie as the
  // expiry slides forward. Mirroring it keeps a working session from expiring
  // on our side while the backend still considers it live.
  mirrorSessionCookie(response);

  if (response.status === 401) {
    clearAdminSession();
    throw new AdminUnauthorizedError();
  }

  if (!response.ok) {
    const payload = await safeJson(response);
    throw new GimbleApiError(
      response.status,
      payload?.message || `Request failed (${response.status})`,
      payload?.error
    );
  }

  if (raw) return response as unknown as T;
  if (response.status === 204) return undefined as T;

  return (await response.json()) as T;
}

/**
 * Exchange backend credentials for a session cookie on this domain.
 *
 * Called only by the console login server function.
 */
export async function gimbleLogin(
  email: string,
  password: string
): Promise<{ user: { hash_id: string; email: string }; roles: string[] }> {
  const { apiUrl, proxySecret, isProduction } = getGimbleConfig();

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (proxySecret) {
    const clientIP = getRequestIP({ xForwardedFor: true });
    if (clientIP) {
      headers['X-Gimble-Client-IP'] = clientIP;
      headers['X-Gimble-Proxy-Secret'] = proxySecret;
    }
  }

  let response: Response;
  try {
    response = await fetch(`${apiUrl}/api/console/login`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, password }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch {
    throw new GimbleApiError(502, 'Could not reach the Gimble backend.');
  }

  if (!response.ok) {
    const payload = await safeJson(response);
    // Deliberately generic for 401/403: distinguishing "wrong password" from
    // "not an admin" tells an attacker which accounts are worth attacking.
    if (response.status === 401 || response.status === 403) {
      throw new GimbleApiError(response.status, 'Incorrect email or password.');
    }
    throw new GimbleApiError(response.status, payload?.message || 'Sign in failed.');
  }

  const sessionValue = readBackendSessionCookie(response);
  if (!sessionValue) {
    // The backend refuses to set its cookie over plain HTTP when
    // COOKIE_SECURE is on, which looks exactly like this.
    throw new GimbleApiError(502, 'Backend did not issue a session cookie.');
  }

  setCookie(ADMIN_SESSION_COOKIE, sessionValue, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    // Matches the backend's 8-hour admin idle timeout. Its own rolling expiry
    // is authoritative; this only avoids keeping an obviously dead cookie.
    maxAge: 8 * 60 * 60,
  });

  const payload = await response.json();
  return payload.data;
}

export function clearAdminSession(): void {
  deleteCookie(ADMIN_SESSION_COOKIE, { path: '/' });
}

export function hasAdminSession(): boolean {
  return Boolean(getCookie(ADMIN_SESSION_COOKIE));
}

/** Pull `gimble.sid` out of a response's Set-Cookie header, if present. */
function readBackendSessionCookie(response: Response): string | null {
  // getSetCookie() keeps multiple Set-Cookie headers separate; joining them
  // first would corrupt values containing commas (dates do).
  const cookies =
    typeof response.headers.getSetCookie === 'function'
      ? response.headers.getSetCookie()
      : [response.headers.get('set-cookie') ?? ''].filter(Boolean);

  for (const cookie of cookies) {
    const match = cookie.match(new RegExp(`^${BACKEND_SESSION_COOKIE}=([^;]+)`));
    if (match) return decodeURIComponent(match[1]);
  }

  return null;
}

function mirrorSessionCookie(response: Response): void {
  const refreshed = readBackendSessionCookie(response);
  if (!refreshed) return;

  const { isProduction } = getGimbleConfig();
  setCookie(ADMIN_SESSION_COOKIE, refreshed, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 8 * 60 * 60,
  });
}

async function safeJson(response: Response): Promise<any> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}
