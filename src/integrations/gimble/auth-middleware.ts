import { createMiddleware } from '@tanstack/react-start';

import { AdminUnauthorizedError, hasAdminSession } from './client.server';

/**
 * Gate a server function on an admin session.
 *
 * Deliberately the same shape as the `requireSupabaseAuth` middleware it
 * replaces, so `.middleware([requireAdminSession])` reads identically at every
 * call site.
 *
 * This only checks that a session cookie EXISTS. It is not the authorization
 * decision — that belongs to the backend, which validates the session against
 * Redis and checks user_type and roles on every request. Treating the presence
 * of a cookie as proof of anything would put the security boundary in the
 * browser's reach.
 */
export const requireAdminSession = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    if (!hasAdminSession()) {
      throw new AdminUnauthorizedError('Not signed in');
    }

    return next();
  }
);
