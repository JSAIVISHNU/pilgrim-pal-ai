export const config = { runtime: 'edge' };

// This edge function proxies all incoming requests to the pre-built server
// bundle produced by `npm run build` (output in `dist/server`).
// We dynamically import the bundle at runtime so the Vercel build step can
// produce `dist` first and the function bundler will include the compiled
// server code.
export default async function handler(request: Request) {
  // When deploying on Vercel we run a `vercel-build` step that copies the
  // top-level `dist` into `api/_dist` so the function bundler includes the
  // compiled server bundle. Import from that location in the deployed env.
  const mod = await import('./_dist/server/server.js');
  const server = (mod.default ?? mod) as any;

  // The built server exposes a `fetch(request, env, ctx)` handler that
  // matches Cloudflare/Edge-style runtimes. Forward the incoming Request
  // and return the Response as-is.
  const response: Response = await server.fetch(request, undefined, undefined);
  return response;
}
