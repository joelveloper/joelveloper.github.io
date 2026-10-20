import { createReadStream, existsSync, readFileSync, realpathSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';

const root = resolve(process.cwd(), 'dist');
const notFoundPath = resolve(root, '404.html');
let realRoot;

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
};

function usage() {
  console.log('Uso: node scripts/preview.mjs [--port 4321] [--host 127.0.0.1]');
}

function parseArgs(argv) {
  let port = 4321;
  let host = '127.0.0.1';

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === '--') {
      continue;
    }

    if (argument === '--help' || argument === '-h') {
      usage();
      process.exit(0);
    }

    if (argument === '--port' || argument === '-p') {
      port = Number(argv[index + 1]);
      index += 1;
      continue;
    }

    if (argument.startsWith('--port=')) {
      port = Number(argument.slice('--port='.length));
      continue;
    }

    if (argument === '--host') {
      host = argv[index + 1];
      index += 1;
      continue;
    }

    if (argument.startsWith('--host=')) {
      host = argument.slice('--host='.length);
      continue;
    }

    throw new Error(`Argumento no reconocido: ${argument}`);
  }

  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error(`Puerto no válido: ${port}`);
  }

  if (!host) {
    throw new Error('Host no válido.');
  }

  return { host, port };
}

function safePath(pathname) {
  let decoded;

  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  if (decoded.includes('\0')) return null;

  const candidate = resolve(root, `.${decoded}`);
  if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) return null;

  return candidate;
}

function resolveFile(path) {
  try {
    const real = realpathSync(path);
    if (real !== realRoot && !real.startsWith(`${realRoot}${sep}`)) return null;
    return statSync(real).isFile() ? real : null;
  } catch {
    return null;
  }
}

function sendFile(req, res, path) {
  const stats = statSync(path);
  const type = mimeTypes[extname(path).toLowerCase()] ?? 'application/octet-stream';

  res.statusCode = 200;
  res.setHeader('Content-Type', type);
  res.setHeader('Content-Length', stats.size);
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'HEAD') {
    res.end();
    return;
  }

  const stream = createReadStream(path);
  stream.on('error', () => {
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end('No se pudo leer el recurso.');
    } else {
      res.destroy();
    }
  });
  stream.pipe(res);
}

function sendNotFound(req, res, body) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Content-Length', Buffer.byteLength(body));
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'HEAD') {
    res.end();
    return;
  }

  res.end(body);
}

function sendRedirect(res, location) {
  res.statusCode = 308;
  res.setHeader('Location', location);
  res.setHeader('Cache-Control', 'no-store');
  res.end();
}

function main() {
  if (!existsSync(notFoundPath)) {
    console.error(`No existe ${notFoundPath}. Ejecuta "corepack pnpm run build" antes de previsualizar.`);
    process.exit(1);
  }

  const notFoundBody = readFileSync(notFoundPath);
  realRoot = realpathSync(root);
  const { host, port } = parseArgs(process.argv.slice(2));

  const server = createServer((req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.statusCode = 405;
      res.setHeader('Allow', 'GET, HEAD');
      res.end('Método no permitido.');
      return;
    }

    let url;

    try {
      url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
    } catch {
      res.statusCode = 400;
      res.end('Solicitud no válida.');
      return;
    }

    const pathname = url.pathname;
    const filePath = safePath(pathname);

    if (!filePath) {
      sendNotFound(req, res, notFoundBody);
      return;
    }

    if (pathname.endsWith('/')) {
      const indexPath = safePath(`${pathname}index.html`);
      const resolvedIndex = indexPath ? resolveFile(indexPath) : null;
      if (resolvedIndex) {
        sendFile(req, res, resolvedIndex);
        return;
      }

      sendNotFound(req, res, notFoundBody);
      return;
    }

    const resolvedFile = resolveFile(filePath);
    if (resolvedFile) {
      sendFile(req, res, resolvedFile);
      return;
    }

    const directoryIndex = safePath(`${pathname}/index.html`);
    if (directoryIndex && resolveFile(directoryIndex)) {
      sendRedirect(res, `${pathname}/${url.search}`);
      return;
    }

    sendNotFound(req, res, notFoundBody);
  });

  server.on('error', (error) => {
    console.error(`No se pudo iniciar el preview: ${error.message}`);
    process.exitCode = 1;
  });

  server.listen(port, host, () => {
    console.log(`Preview estático en http://${host}:${port}/ (404: ${notFoundPath})`);
  });

  const shutdown = () => {
    server.close(() => process.exit(0));
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

main();
