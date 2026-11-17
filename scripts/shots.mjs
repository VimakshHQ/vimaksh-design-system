// Verify the docs site in a real browser: every page and every example, light and dark, 1440px and 390px.
// Fails on console errors, failed requests or horizontal overflow; saves screenshots to _shots/.
import { mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { root } from './config.mjs';
import { serve } from './serve.mjs';
import { launch } from './browser.mjs';

const only = process.argv.slice(2);
const pages = [];
const walk = (d, url) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) { if (f !== 'media') walk(p, url + f + '/'); } else if (f.endsWith('.html')) pages.push(f === 'index.html' ? url : url + f); } };
walk(root('_site'), '/');
const list = only.length ? pages.filter(p => only.some(o => p.includes(o))) : pages;
mkdirSync(root('_shots'), { recursive: true });
const server = await serve(0), port = server.address().port;
const browser = await launch();
const problems = [];
for (const [w, h] of [[1440, 900], [390, 844]]) for (const theme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await ctx.addInitScript(t => localStorage.setItem('vimaksh-theme', t), theme);
  for (const url of list) {
    const page = await ctx.newPage();
    const errs = [];
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    page.on('pageerror', e => errs.push(String(e)));
    page.on('requestfailed', r => { if (!/\.mp4|clipboard/.test(r.url())) errs.push('failed: ' + r.url()); });
    page.on('response', r => { if (r.status() >= 400) errs.push(`${r.status()} ${r.url()}`); });
    await page.goto(`http://localhost:${port}${url}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (over > 1) errs.push(`horizontal overflow ${over}px`);
    if (errs.length) problems.push(`${url} @${w} ${theme}: ${[...new Set(errs)].join(' | ')}`);
    const name = (url.replace(/\//g, '_').replace(/^_|_$/g, '') || 'home') + `-${w}-${theme}.png`;
    if (!url.includes('/examples/') || only.length) await page.screenshot({ path: root('_shots', name), fullPage: !url.includes('/examples/') && w === 390 ? false : false });
    await page.close();
  }
  await ctx.close();
}
await browser.close(); server.close();
console.log(`checked ${list.length} pages × 4`);
if (problems.length) { console.log(problems.join('\n')); process.exit(1); }
console.log('no console errors, failed requests or overflow');
