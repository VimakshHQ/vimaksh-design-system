// Brand assets: the mark and wordmark (SVG + PNG 1x/2x/4x), pixel motifs rendered by the website's own drawing
// code (PNG + SVG), the 3D logo, fonts with licences, ZIP packs, and SHA-256 for every file.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, rmSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import { zipSync } from 'fflate';
import { root, VERSION, BASE } from './config.mjs';
import { serve } from './serve.mjs';
import { launch } from './browser.mjs';

const B = root('dist/brand');
rmSync(B, { recursive: true, force: true });
for (const d of ['svg', 'png', 'pixel/png', 'pixel/svg', '3d', 'fonts', 'zip']) mkdirSync(join(B, d), { recursive: true });

// ---------- mark + wordmark ----------
const markSvg = readFileSync(root('source/marks/vimaksh-mark.svg'), 'utf8');
const wmSvg = readFileSync(root('source/marks/vimaksh-wordmark.svg'), 'utf8');
// Variants are only the colours the site actually renders them in (see the brand page for where).
export const LOGOS = [
  { file: 'vimaksh-mark', svg: markSvg, w: 580, h: 580, label: 'Mark, full artboard (original file)', on: 'light or dark', source: 'public/marks/vimaksh-mark.svg' },
  { file: 'vimaksh-mark-tight', svg: markSvg.replace('viewBox="0 0 580 580"', 'viewBox="115 131 350 318.7"').replace('width="580" height="580"', 'width="350" height="319"'), w: 350, h: 319, label: 'Mark, cropped to the arrows (the crop the hero uses, src/v5/pixelhero.js)', on: 'light or dark', source: 'src/v5/pixelhero.js' },
  { file: 'vimaksh-wordmark', svg: wmSvg, w: 951, h: 172, label: 'Wordmark, coral (original file)', on: 'light', source: 'public/marks/vimaksh-wordmark.svg' },
  { file: 'vimaksh-wordmark-ink', svg: wmSvg.replaceAll('#FF5F53', '#0B0A14'), w: 951, h: 172, label: 'Wordmark, strong ink: the header in the light theme', on: 'light', source: 'tools/v5pages.py:10 + --strong light' },
  { file: 'vimaksh-wordmark-light', svg: wmSvg.replaceAll('#FF5F53', '#F4F5FF'), w: 951, h: 172, label: 'Wordmark, strong light: the header in the dark theme', on: 'dark', source: 'tools/v5pages.py:10 + --strong dark' },
  { file: 'vimaksh-wordmark-white', svg: wmSvg.replaceAll('#FF5F53', '#FFFFFF'), w: 951, h: 172, label: 'Wordmark, white: the giant wordmark on the footer heat field', on: 'heat / night', source: 'src/v5/v5.css:572' },
];
for (const l of LOGOS) {
  writeFileSync(join(B, 'svg', l.file + '.svg'), l.svg);
  for (const s of [1, 2, 4]) writeFileSync(join(B, 'png', `${l.file}@${s}x.png`), new Resvg(l.svg, { fitTo: { mode: 'width', value: l.w * s }, background: 'rgba(0,0,0,0)' }).render().asPng());
}
copyFileSync(root('source/3d/vimaksh-logo-sculpture.glb'), join(B, '3d/vimaksh-logo-sculpture.glb'));
for (const f of readdirSync(root('source/fonts'))) copyFileSync(root('source/fonts', f), join(B, 'fonts', f));

// ---------- pixel motifs, drawn by the website code in a browser ----------
const KINDS = JSON.parse(readFileSync(root('tokens/tokens.json'), 'utf8')).color.kind;
export const MOTIFS = [];
const server = await serve(0), port = server.address().port;
const browser = await launch();
const page = await browser.newPage();
await page.goto(`http://localhost:${port}/dist/vimaksh.css`);
const render = (fn, theme, args) => page.evaluate(async ({ fn, theme, args }) => {
  document.documentElement.dataset.theme = theme;
  const art = await import('/dist/pixel/pixelart.js'), saas = await import('/dist/pixel/pixelsaas.js');
  const c = document.createElement('canvas'); c.style.cssText = 'display:block;width:1440px;height:98px'; document.body.append(c);
  if (fn === 'saas') saas.saas(c, args.kind, args.color);
  else if (fn === 'desk') art.desk(c);
  else if (fn === 'edge') art.pixelEdge(c, { color: args.color, seed: 3 });
  const g = c.getContext('2d'), { width: W, height: H } = c, d = g.getImageData(0, 0, W, H).data;
  // SVG: one rect per horizontal run of one colour
  const runs = [];
  for (let y = 0; y < H; y++) { let x = 0; while (x < W) { const i = (y * W + x) * 4; if (!d[i + 3]) { x++; continue; } const k = d.slice(i, i + 4).join(); let e = x + 1; while (e < W && d.slice((y * W + e) * 4, (y * W + e) * 4 + 4).join() === k) e++; const [r, gg, b, a] = k.split(',').map(Number); runs.push(`<rect x="${x}" y="${y}" width="${e - x}" height="1" fill="rgb(${r},${gg},${b})"${a < 255 ? ` fill-opacity="${(a / 255).toFixed(3)}"` : ''}/>`); x = e; } }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W * args.scale}" height="${H * args.scale}" shape-rendering="crispEdges">${runs.join('')}</svg>`;
  const big = document.createElement('canvas'); big.width = W * args.scale; big.height = H * args.scale;
  const bg = big.getContext('2d'); bg.imageSmoothingEnabled = false; bg.drawImage(c, 0, 0, big.width, big.height);
  c.remove();
  return { png: big.toDataURL('image/png').split(',')[1], svg, W, H };
}, { fn, theme, args });
const save = (name, r, meta) => {
  writeFileSync(join(B, 'pixel/png', name + '.png'), Buffer.from(r.png, 'base64'));
  writeFileSync(join(B, 'pixel/svg', name + '.svg'), r.svg);
  MOTIFS.push({ name, grid: `${r.W}×${r.H}`, ...meta });
};
for (const [kind, t] of Object.entries(KINDS)) if (!kind.startsWith('$')) for (const theme of ['light', 'dark'])
  save(`build-${kind}-${theme}`, await render('saas', theme, { kind, color: t.$value, scale: 10 }), { group: 'What we build', kind, theme, color: t.$value, source: 'src/v5/pixelsaas.js:34-112' });
save('desk', await render('desk', 'light', { scale: 10 }), { group: 'About', theme: 'both', source: 'src/v5/pixelart.js:154-175' });
for (const [n, color] of [['paper-light', '#F4F2EE'], ['paper-dark', '#0F1020'], ['night', '#0D0E1C']])
  save(`edge-${n}`, await render('edge', 'light', { color, scale: 1 }), { group: 'Pixel edge', theme: n, color, source: 'src/v5/pixelart.js:16-25', note: '1440px wide, 14px cells, 7 rows; draw it live with pixel/pixelart.js for other widths' });
await browser.close(); server.close();

// The chevron glyphs of the hero field: 5×5, two-pixel strokes (src/v5/pixelhero.js:23-28).
for (const right of [true, false]) {
  let rects = '';
  for (let y = 0; y < 5; y++) for (let gx = 0; gx < 5; gx++) { const x = right ? gx : 4 - gx, dd = x - Math.min(y, 4 - y); if (dd >= 0 && dd < 2) rects += `<rect x="${gx}" y="${y}" width="1" height="1"/>`; }
  const name = right ? 'chevron-right' : 'chevron-left';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 5" width="50" height="50" fill="currentColor" shape-rendering="crispEdges">${rects}</svg>`;
  writeFileSync(join(B, 'pixel/svg', name + '.svg'), svg);
  writeFileSync(join(B, 'pixel/png', name + '.png'), new Resvg(svg.replace('currentColor', '#2D36FF'), { fitTo: { mode: 'width', value: 50 } }).render().asPng());
  MOTIFS.push({ name, grid: '5×5', group: 'Hero glyph', theme: 'both', color: 'currentColor (Royal #2D36FF on Mist in the hero)', source: 'src/v5/pixelhero.js:23-28' });
}

// ---------- packs + hashes ----------
const files = dir => readdirSync(dir).flatMap(f => statSync(join(dir, f)).isDirectory() ? files(join(dir, f)) : [join(dir, f)]);
const README = `Vimaksh brand pack ${VERSION}\n\nMark and wordmark: SVG and PNG at 1x, 2x and 4x, only in the colours work.vimaksh.in uses.\nPixel motifs: drawn by the website's own code, PNG (scaled with nearest-neighbour) and SVG.\n3D logo: vimaksh-logo-sculpture.glb (glTF binary).\nFonts: Inter Tight (variable) and JetBrains Mono 500, both SIL Open Font License 1.1 (licence files included).\nRules: ${BASE}docs/Brand.md\nThe Vimaksh name, mark and wordmark belong to Vimaksh. They are not covered by the font licences.\n`;
const fixed = new Date('2026-11-17T00:00:00Z');   // fixed timestamps so the ZIPs (and their hashes) are reproducible
const zip = (name, list) => {
  const entries = { 'README.txt': [new TextEncoder().encode(README), { mtime: fixed }] };
  for (const f of list) entries[relative(B, f).replace(/\\/g, '/')] = [readFileSync(f), { mtime: fixed }];
  writeFileSync(join(B, 'zip', name), zipSync(entries, { level: 9 }));
};
const rel = f => relative(B, f).split('\\').join('/');
const all = files(B).filter(f => !rel(f).startsWith('zip/'));
const under = d => all.filter(f => rel(f).startsWith(d + '/'));
export const PACKS = [
  ['vimaksh-logos-svg.zip', 'Mark and wordmark, SVG', under('svg')],
  ['vimaksh-logos-png.zip', 'Mark and wordmark, PNG 1x/2x/4x', under('png')],
  ['vimaksh-pixel-motifs.zip', 'Pixel motifs, PNG + SVG', under('pixel')],
  ['vimaksh-fonts.zip', 'Inter Tight + JetBrains Mono 500 with OFL licences', under('fonts')],
  ['vimaksh-brand-all.zip', 'Everything above plus the 3D logo', all],
];
for (const [name, , list] of PACKS) zip(name, list);
const sha = f => createHash('sha256').update(readFileSync(f)).digest('hex');
const manifest = { version: VERSION, base: BASE + 'brand/', logos: LOGOS.map(({ svg, ...l }) => l), motifs: MOTIFS, packs: PACKS.map(([n, d]) => ({ file: `zip/${n}`, description: d })), files: files(B).map(f => ({ path: relative(B, f).replace(/\\/g, '/'), bytes: statSync(f).size, sha256: sha(f) })) };
writeFileSync(join(B, 'manifest.json'), JSON.stringify(manifest, null, 2));
writeFileSync(join(B, 'SHA256SUMS.txt'), manifest.files.map(f => `${f.sha256}  ${f.path}`).join('\n') + '\n');
console.log(`assets: ${manifest.files.length} files, ${PACKS.length} packs`);
