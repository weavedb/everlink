// This is a catch-all route handler for Cloudflare Pages Functions
// It will handle any route that doesn't match a specific file

export async function onRequest(context) {
  const { request, params, env, waitUntil } = context;
  
  // Get the URL path
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Access the path components from params
  // In Cloudflare Pages, with [[catchall]], the catchall parameter gets array of path segments
  const path = params.catchall || [];
  
  // For root path
  if (pathname === '/' || pathname === '') {
    // Redirect to index.html
    return Response.redirect(new URL('/index.html', request.url), 301);
  }
  
  // For user path segments (e.g., /username)
  if (path.length === 1) {
    // For the dynamic user path, rewrite to subpage.html but maintain the URL
    const subpageRequest = new Request(new URL('/subpage.html', request.url), request);
    return fetch(subpageRequest);
  }
  
  // For any other more complex paths, return a 404
  return new Response('Page not found', {
    status: 404,
    headers: { 'Content-Type': 'text/plain' }
  });
}
