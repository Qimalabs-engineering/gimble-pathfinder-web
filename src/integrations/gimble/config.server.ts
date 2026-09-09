/**
 * Server-only configuration for talking to the Gimble backend.
 *
 * The `.server.ts` suffix keeps this out of the client bundle — the proxy
 * secret must never ship to a browser.
 *
 * Env is read INSIDE the function, not at module scope: on edge runtimes the
 * bindings only exist per-request, so a module-level read resolves to
 * undefined. See src/lib/config.server.ts for the same convention.
 */

/** The cookie this site sets on its OWN domain to carry the backend session. */
export const ADMIN_SESSION_COOKIE = 'gf_admin';

/** The cookie name the backend itself issues (express-session). */
export const BACKEND_SESSION_COOKIE = 'gimble.sid';

export function getGimbleConfig() {
  const apiUrl = process.env.GIMBLE_API_URL || 'https://api.usegimble.com';

  return {
    apiUrl: apiUrl.replace(/\/+$/, ''),
    // Proves to the backend that a forwarded client IP came from us, so it can
    // rate-limit and audit the real visitor rather than this server's egress
    // address. Optional: without it the backend falls back to seeing us as the
    // client, which is safe but coarse.
    proxySecret: process.env.GIMBLE_PROXY_SECRET || '',
    isProduction: process.env.NODE_ENV === 'production',
  };
}
