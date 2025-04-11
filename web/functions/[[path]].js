// This is a catch-all route handler for Cloudflare Pages Functions
// It will handle any route that doesn't match a specific file

export async function onRequest(context) {
  const { request, params } = context;
  const { path } = params;
  
  // Get the URL path
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // If this is a root path or specific user path
  if (!path || path.length === 0) {
    // Serve the index page for root
    return await fetch(new Request(new URL('/index.html', request.url), request));
  }
  
  // Handle user paths - redirect to the subpage.html
  if (path.length === 1) {
    // This is likely a username route like /username
    // Serve the subpage.html which has the client-side logic to handle the user
    return await fetch(new Request(new URL('/subpage.html', request.url), request));
  }
  
  // For any other more complex paths, you can add custom logic here
  // Or return a 404 response
  return new Response('Not found', { status: 404 });
}
