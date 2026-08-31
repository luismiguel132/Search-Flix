import 'dotenv/config';
import http from 'node:http';

const routes = {
  '/api/login': () => import('../api/login.js'),
  '/api/register': () => import('../api/register.js'),
  '/api/favorites': () => import('../api/favorites.js'),
  '/api/profile': () => import('../api/profile.js'),
  '/api/upload': () => import('../api/upload.js'),
  '/api/comments': () => import('../api/comments.js'),
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) return resolve(undefined);
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve(raw);
      }
    });
    req.on('error', reject);
  });
}

function enhanceResponse(res) {
  if (typeof res.status === 'function') return res;

  res.status = (code) => {
    res.statusCode = code;
    return res;
  };

  res.json = (payload) => {
    if (!res.getHeader('Content-Type')) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
    }
    res.end(JSON.stringify(payload));
    return res;
  };

  const originalEnd = res.end.bind(res);
  res.end = (...args) => originalEnd(...args);

  return res;
}

const port = Number(process.env.API_PORT || 3001);

const server = http.createServer(async (req, res) => {
  enhanceResponse(res);

  try {
    const url = new URL(req.url || '/', `http://127.0.0.1:${port}`);
    const loadRoute = routes[url.pathname];

    if (!loadRoute) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ error: 'Rota não encontrada' }));
      return;
    }

    req.body = await readBody(req);
    const { default: handler } = await loadRoute();
    await handler(req, res);
  } catch (error) {
    console.error('Erro no servidor da API:', error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ error: 'Erro interno do servidor' }));
    }
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`API local pronta em http://127.0.0.1:${port}`);
});
