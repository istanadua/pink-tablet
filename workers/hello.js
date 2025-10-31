// Simple Cloudflare Worker for testing and smoke checks
// - GET  /hello  -> returns JSON { hello: 'world', time: ISO }
// - POST /hello  -> echoes received JSON
// Deploy this with Wrangler (wrangler publish) and register as a Pages service binding if needed.

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (pathname === '/hello' && request.method === 'GET') {
      return new Response(JSON.stringify({ hello: 'world', time: new Date().toISOString() }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    }

    if (pathname === '/hello' && request.method === 'POST') {
      try {
        const json = await request.json();
        return new Response(JSON.stringify({ ok: true, echo: json }), {
          status: 200,
          headers: { 'content-type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }), { status: 400, headers: { 'content-type': 'application/json' } });
      }
    }

    return new Response('Not found', { status: 404 });
  }
};
