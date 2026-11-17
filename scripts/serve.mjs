// Local server for the docs site: /dist/* is the published bundle, everything else is the generated site (_site).
// POST /api/brief answers like the website's worker does on success, so the brief form can be tried locally.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { root } from './config.mjs';

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.zip': 'application/zip', '.glb': 'model/gltf-binary', '.cjs': 'text/javascript; charset=utf-8', '.mp4': 'video/mp4' };

export function serve(port = Number(process.env.PORT) || 4321) {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, 'http://x');
    if (url.pathname === '/api/brief' && req.method === 'POST') { res.writeHead(200, { 'content-type': 'application/json' }); return res.end('{"ok":true}'); }
    let p = decodeURIComponent(url.pathname);
    const base = p.startsWith('/dist/') ? root() : root('_site');
    let file = normalize(join(base, p));
    if (!file.startsWith(base)) { res.writeHead(403); return res.end(); }
    try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html'); } catch { if (!extname(file)) file += '.html'; }
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream', 'cache-control': 'no-cache' });
      res.end(body);
    } catch { res.writeHead(404, { 'content-type': 'text/plain' }); res.end('Not found'); }
  });
  return new Promise(r => server.listen(port, () => r(server)));
}

if (process.argv[1]?.endsWith('serve.mjs')) serve().then(s => console.log(`Vimaksh design system: http://localhost:${s.address().port}/`));
