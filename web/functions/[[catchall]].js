// This is a catch-all route handler for Cloudflare Pages Functions
// It will handle any route that doesn't match a specific file

export async function onRequest(context) {
  // Extract parameters from context
  const { request } = context;
  
  // Get the URL path
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Extract path segments - strip leading and trailing slashes and split by /
  const pathSegments = pathname.replace(/^\/|\/$/g, '').split('/').filter(Boolean);
  
  // For root path
  if (pathname === '/' || pathname === '' || pathname === '/index.html') {
    // Serve index.html directly without a redirect
    return new Response(await fetch(`${url.origin}/index.html`).then(res => res.text()), {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' }
    });
  }
  
  // For user path segments (e.g., /username)
  if (pathSegments.length === 1) {
    // For the dynamic user path, serve the subpage.html content
    try {
      const response = await fetch(`${url.origin}/subpage.html`);
      const html = await response.text();
      return new Response(html, {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' }
      });
    } catch (error) {
      console.error('Error serving subpage:', error);
    }
  
  // For any other more complex paths, return a 404
  return new Response('Page not found', {
    status: 404,
    headers: { 'Content-Type': 'text/plain' }
  });
  }
}
