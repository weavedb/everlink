// This is a catch-all route handler for Cloudflare Pages Functions
// It will handle any route that doesn't match a specific file

export async function onRequest({ request, env, params }) {
  // Get the URL path
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Access the path components from params
  // In Cloudflare Pages, with [[path]], the path parameter gets array of path segments
  const path = params.path || [];
  
  // For root path
  if (pathname === '/' || pathname === '') {
    // Serve the index page
    return new Response(await fetch(new URL('/index.html', request.url)).then(res => res.text()), {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' }
    });
  }
  
  // For user path segments (e.g., /username)
  if (path.length === 1) {
    // This handles routes like /username by serving subpage.html
    return new Response(await fetch(new URL('/subpage.html', request.url)).then(res => res.text()), {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' }
    });
  }
  
  // For any other more complex paths, return a 404
  return new Response('Page not found', {
    status: 404,
    headers: { 'Content-Type': 'text/plain' }
  });
}
