import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://www.gimblefoundation.org";

/**
 * Paths that must never appear in the sitemap. Keep in sync with the
 * `Disallow` lines in `public/robots.txt`.
 */
const EXCLUDED_PREFIXES = ["/auth", "/admin"];

/** Per-path priority overrides. Anything not listed gets DEFAULT_PRIORITY. */
const PRIORITY: Record<string, string> = {
  "/": "1.0",
  "/app": "0.9",
  "/about": "0.8",
  "/programs": "0.8",
  "/community": "0.8",
  "/get-involved": "0.8",
  "/faq": "0.7",
  "/terms": "0.5",
  "/contact": "0.6",
};
const DEFAULT_PRIORITY = "0.7";

interface RouteLike {
  id?: string;
  children?: RouteLike[] | Record<string, RouteLike>;
}

/**
 * Convert a TanStack route id (e.g. `/_authenticated/admin`) into its public
 * URL path (`/admin`) by dropping pathless-layout (`_x`) and group (`(x)`)
 * segments. Route ids are set by the generated route tree, so this does not
 * depend on the router having been initialised.
 */
function idToPath(id: string): string {
  const segments = id
    .split("/")
    .filter((s) => s.length > 0 && !s.startsWith("_") && !s.startsWith("("));
  return `/${segments.join("/")}`;
}

function isIndexable(path: string): boolean {
  if (path.includes("$")) return false; // dynamic segment, no concrete URL
  if (/\.[a-z0-9]+$/i.test(path)) return false; // file-style routes (sitemap.xml etc.)
  return !EXCLUDED_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
}

function collectPaths(route: RouteLike, out: Set<string>): void {
  if (route.id && route.id !== "__root__") {
    const path = idToPath(route.id);
    if (isIndexable(path)) out.add(path);
  }
  const children = route.children
    ? Array.isArray(route.children)
      ? route.children
      : Object.values(route.children)
    : [];
  for (const child of children) collectPaths(child, out);
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // Dynamic import: routeTree.gen imports this file, so a static import
        // would form a cycle. Loading it inside the handler avoids that.
        const { routeTree } = await import("../routeTree.gen");

        const paths = new Set<string>();
        collectPaths(routeTree as unknown as RouteLike, paths);

        const urls = [...paths]
          .sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)))
          .map((path) =>
            [
              `  <url>`,
              `    <loc>${BASE_URL}${path}</loc>`,
              `    <priority>${PRIORITY[path] ?? DEFAULT_PRIORITY}</priority>`,
              `  </url>`,
            ].join("\n"),
          );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
