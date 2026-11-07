// server.js - Entry point for cPanel / Phusion Passenger and production runtime
try {
  require('dotenv').config({ path: '.env.local' });
  require('dotenv').config({ path: '.env' });
} catch (e) {
  // dotenv optional if environment is injected by host
}

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = false;
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Servidor PLES listo en puerto ${port} (modo producción)`);
  });
}).catch((err) => {
  console.error('Error al iniciar Next.js:', err);
  process.exit(1);
});
