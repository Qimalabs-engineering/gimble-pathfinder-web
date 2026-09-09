import { createStart, createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

const ALLOWED_ORIGINS = [
  "https://www.gimblefoundation.org",
  "https://gimblefoundation.org",
];

/**
 * Reject cross-site mutations.
 *
 * The admin session is a same-origin httpOnly cookie, which the browser attaches
 * to any request to this domain — including one triggered by another site. In
 * practice server-function calls are JSON POSTs, which are preflighted and so
 * already blocked, but that is a side effect of the content type rather than a
 * decision. This makes it a decision.
 *
 * GET is exempt because server functions declared `method: "GET"` must never
 * mutate; that is enforced by convention in src/lib/api.
 */
const csrfMiddleware = createMiddleware().server(async ({ next }) => {
  const request = getRequest();
  const method = request.method.toUpperCase();

  if (method !== "GET" && method !== "HEAD" && method !== "OPTIONS") {
    // Set by every modern browser on cross-site requests and not forgeable by
    // page JavaScript.
    if (request.headers.get("sec-fetch-site") === "cross-site") {
      return new Response("Cross-site request blocked", { status: 403 });
    }

    // Origin is absent on some same-origin navigations, so only a PRESENT and
    // foreign origin is rejected. Localhost is allowed for development.
    const origin = request.headers.get("origin");
    if (
      origin &&
      !ALLOWED_ORIGINS.includes(origin) &&
      !/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
    ) {
      return new Response("Cross-site request blocked", { status: 403 });
    }
  }

  return next();
});

export const startInstance = createStart(() => ({
  // No client-side function middleware: the admin session rides along
  // automatically as a same-origin httpOnly cookie. The Supabase attacher this
  // replaced called supabase.auth.getSession() before EVERY server function,
  // including the public contact form.
  requestMiddleware: [errorMiddleware, csrfMiddleware],
}));
