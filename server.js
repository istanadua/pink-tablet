import handler from 'serve-handler';
import http from 'http';

const server = http.createServer(async (request, response) => {
  
  if (request.url?.startsWith('/donet')) {
    const { onRequest } = await import('./functions/donet.js')
    const res = await onRequest({ request })

    for (const [name, value] of res.headers) {
      response.setHeader(name, value)
    }

    response.write(await res.bytes())
    response.end()
    return
  }

  return handler(request, response);
});


server.listen(3000, () => {
  console.log('Running at http://localhost:3000');
});
