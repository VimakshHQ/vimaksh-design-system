// Generate the docs site (_site), the per-page Markdown (dist/docs) and the agent files (llms.txt, llms-full.txt,
// agents.md, catalog.json, api/*.json, prompt.txt) from one content model, so they cannot disagree.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { root, BASE, REPO_URL, blob, siteLink, SITE_SHA, SITE_LIVE, VERSION } from './config.mjs';
import { buildApi, tokens as T } from './tokens.mjs';
import { COMPONENTS } from '../content/components.mjs';
import { FOUNDATIONS, BRAND } from '../content/foundations.mjs';
import { prompt as promptText, agentsMd } from '../content/agents.mjs';
import { PATCHES } from './js-patches.mjs';

const SITE = root('_site');
rmSync(SITE, { recursive: true, force: true });
mkdirSync(SITE, { recursive: true });
rmSync(root('dist/docs'), { recursive: true, force: true });
mkdirSync(root('dist/docs'), { recursive: true });
const write = (p, s) => { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, s); };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const API = buildApi();
const TOK = Object.fromEntries(API.tokens.map(t => [t.name, t]));
const tokFor = name => TOK[name.replace('color.theme.light.', 'color.theme.').replace('color.theme.dark.', 'color.theme.')];
const PROMPT = promptText(BASE);
const manifest = JSON.parse(readFileSync(root('dist/brand/manifest.json'), 'utf8'));
const pageSrc = f => readFileSync(root('source/site/pages', f), 'utf8').split('\n');
const WM = readFileSync(root('source/marks/vimaksh-wordmark.svg'), 'utf8').trim().replace(/\n/g, '').replace('<svg width="951" height="172" ', '<svg class="wm" aria-hidden="true" focusable="false" ').replace('fill="#FF5F53"', 'fill="currentColor"').replaceAll('fill="#FF5F53"', 'fill="currentColor"');
const MARK = readFileSync(root('source/marks/vimaksh-mark.svg'), 'utf8').trim().replace(/\n/g, '').replace('<svg width="580" height="580" ', '<svg aria-hidden="true" focusable="false" ');

// ---------------------------------------------------------------- pages registry
const P = [];
const add = (p, kind, url) => { const o = { ...p, kind, url, md: `${p.name}.md`, title: p.title || p.name.replace(/([a-z])([A-Z])/g, '$1 $2') }; P.push(o); return o; };
add({ slug: 'getting-started', name: 'GettingStarted', title: 'Getting started', group: 'Start', summary: 'Put the Vimaksh look into a project: one CSS file, two fonts, one script, the wordmark. Or the tokens with Tailwind.' }, 'guide', '/getting-started/');
add({ slug: 'agents', name: 'Agents', title: 'For agents', group: 'Start', summary: 'The Copy brand identity prompt, agents.md and every machine-readable file, with their stable URLs.' }, 'guide', '/agents/');
for (const f of FOUNDATIONS) add(f, 'foundation', `/foundations/${f.slug}/`);
for (const c of COMPONENTS) add(c, 'component', `/components/${c.slug}/`);
add(BRAND, 'brand', '/brand/');
add({ slug: 'pixel-motifs', name: 'PixelMotifs', title: 'Pixel motifs', group: 'Brand', summary: 'The pixel graphics of the site, drawn by its own code: one tile per kind of software, the studio desk, pixel edges and the hero\'s chevron glyphs. PNG, SVG, or draw them live.' }, 'brand', '/pixel-motifs/');
add({ slug: 'icons', name: 'Icons', group: 'Brand', summary: 'Every icon the site uses, ready to copy. The full icon set is still to come.' }, 'brand', '/icons/');
add({ slug: 'downloads', name: 'Downloads', group: 'Brand', summary: 'Logos, pixel motifs, fonts and the 3D logo, as single files or ZIP packs, each with a SHA-256 hash.' }, 'brand', '/downloads/');
const byName = Object.fromEntries(P.map(p => [p.name, p]));

// ---------------------------------------------------------------- markdown (tiny renderer: enough for our content)
const docLink = (target, mode) => { const p = byName[target]; if (!p) throw new Error('unknown doc link ' + target); return mode === 'md' ? `${BASE}docs/${p.md}` : p.url; };
function inline(s) {
  return s.split(/(`[^`]+`)/).map(part => part.startsWith('`') && part.endsWith('`') && part.length > 1 ? `<code>${esc(part.slice(1, -1))}</code>`
    : esc(part).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => `<a href="${u.startsWith('doc:') ? docLink(u.slice(4)) : u}">${t}</a>`)).join('');
}
function md2html(md) {
  const L = md.trim().split('\n'), out = [];
  for (let i = 0; i < L.length;) {
    const l = L[i];
    if (!l.trim()) { i++; continue; }
    if (l.startsWith('```')) { const buf = []; i++; while (i < L.length && !L[i].startsWith('```')) buf.push(L[i++]); i++; out.push(codeBlock(buf.join('\n'))); continue; }
    const h = l.match(/^(#{2,4}) (.+)/); if (h) { out.push(`<h${h[1].length} class="ds-h">${inline(h[2])}</h${h[1].length}>`); i++; continue; }
    if (l.startsWith('|')) { const rows = []; while (i < L.length && L[i].startsWith('|')) rows.push(L[i++]); const cells = r => r.slice(1, -1).split(/(?<!\\)\|/).map(c => c.trim());
      out.push(`<div class="ds-table"><table><thead><tr>${cells(rows[0]).map(c => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${rows.slice(2).map(r => `<tr>${cells(r).map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`); continue; }
    if (/^- /.test(l)) { const it = []; while (i < L.length && /^- /.test(L[i])) it.push(L[i++].slice(2)); out.push(`<ul class="ds-list">${it.map(x => `<li>${inline(x)}</li>`).join('')}</ul>`); continue; }
    if (/^\d+\. /.test(l)) { const it = []; while (i < L.length && /^\d+\. /.test(L[i])) it.push(L[i++].replace(/^\d+\. /, '')); out.push(`<ol class="ds-list">${it.map(x => `<li>${inline(x)}</li>`).join('')}</ol>`); continue; }
    const buf = []; while (i < L.length && L[i].trim() && !/^(#|\||- |\d+\. |```)/.test(L[i])) buf.push(L[i++]); out.push(`<p>${inline(buf.join(' '))}</p>`);
  }
  return out.join('\n');
}
const mdLinks = md => md.replace(/\]\(doc:(\w+)\)/g, (_, n) => `](${docLink(n, 'md')})`);
const codeBlock = (code, label = '') => `<div class="ds-code">${label ? `<div class="ds-code-bar t-mono"><span>${esc(label)}</span><button class="pill t-mono" type="button" data-copy-next>Copy</button></div>` : '<div class="ds-code-bar t-mono"><span></span><button class="pill t-mono" type="button" data-copy-next>Copy</button></div>'}<pre><code>${esc(code)}</code></pre></div>`;

// ---------------------------------------------------------------- examples
const EX = [];
const ASSET_FIX = { media: s => s.replace(/\/video\//g, '/examples/media/').replace(/\/marks\/paryatech-wordmark\.svg/g, '/examples/media/paryatech-wordmark.svg').replace(/\/logos\//g, '/examples/media/'), hero: s => s.replace('/marks/vimaksh-mark.svg', '/dist/brand/svg/vimaksh-mark.svg') };
function exampleHtml(c, ex) {
  let html = ex.html ?? pageSrc(ex.from).slice(ex.lines[0] - 1, ex.lines[1]).join('\n');
  if (ex.wrap) html = ex.wrap.replace('{}', html);
  if (ex.fix) html = ASSET_FIX[ex.fix](html);
  return html;
}
const shortSvg = s => s.replace(/<svg class="wm"[\s\S]*?<\/svg>/g, '<!-- the wordmark: inline brand/svg/vimaksh-wordmark.svg here with class="wm" aria-hidden="true" focusable="false" and every fill="currentColor" -->').replace(/<svg aria-hidden="true" focusable="false" viewBox="0 0 580 580"[\s\S]*?<\/svg>/g, '<!-- the mark: inline brand/svg/vimaksh-mark.svg here with aria-hidden="true" focusable="false" -->');
function examplePage(c, ex, i) {
  const file = `/examples/${c.slug}-${i + 1}.html`;
  const body = (ex.before || '') + exampleHtml(c, ex) + (ex.after || '');
  write(join(SITE, file), `<!DOCTYPE html>
<html lang="en" data-page="${ex.page || 'example'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.title)} — example ${i + 1}</title>
<link rel="icon" href="/dist/brand/svg/vimaksh-mark.svg">
<script>(function(){try{var t=localStorage.getItem('vimaksh-theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})();
addEventListener('storage',function(e){if(e.key==='vimaksh-theme'&&e.newValue){document.documentElement.dataset.theme=e.newValue;dispatchEvent(new Event('themechange'))}});</script>
${ex.withPhone ? '<link rel="stylesheet" href="/dist/vendor/intl-tel-input.css">\n' : ''}<link rel="stylesheet" href="/dist/vimaksh.css">
<style>${ex.bleed ? '' : 'body{padding:28px var(--pad)}'}${ex.page === 'example' || !ex.page ? ' .navbox{display:none}' : ''}</style>
</head>
<body>
${body}
<script type="module" src="/dist/vimaksh.js"></script>
${ex.withPhone ? '<script type="module" src="/dist/vimaksh-phone.js"></script>\n' : ''}</body>
</html>
`);
  EX.push({ component: c.name, title: ex.title, file, html: exampleHtml(c, ex), withPhone: !!ex.withPhone, height: ex.height || 260 });
  return file;
}

// ---------------------------------------------------------------- visuals (specimens drawn from tokens)
const hexToRgb = h => { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(x => x + x).join(''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255); };
const lum = h => hexToRgb(h).map(c => c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4).reduce((a, c, i) => a + c * [.2126, .7152, .0722][i], 0);
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
const val = n => tokFor(n).value;
const CONTRAST = [
  ['Ink on paper', 'light', val('color.theme.ink').light, val('color.theme.paper').light, 4.5], ['Ink on paper', 'dark', val('color.theme.ink').dark, val('color.theme.paper').dark, 4.5],
  ['Strong on paper', 'light', val('color.theme.strong').light, val('color.theme.paper').light, 4.5], ['Strong on paper', 'dark', val('color.theme.strong').dark, val('color.theme.paper').dark, 4.5],
  ['Soft on paper', 'light', val('color.theme.soft').light, val('color.theme.paper').light, 4.5], ['Soft on paper', 'dark', val('color.theme.soft').dark, val('color.theme.paper').dark, 4.5],
  ['Soft on card', 'light', val('color.theme.soft').light, val('color.theme.card').light, 4.5], ['Soft on card', 'dark', val('color.theme.soft').dark, val('color.theme.card').dark, 4.5],
  ['White label on red button', 'both', '#FFFFFF', val('color.brand.red'), 4.5],
  ['Red text on paper', 'light', val('color.brand.red'), val('color.theme.paper').light, 4.5], ['Red text on paper', 'dark', val('color.brand.red'), val('color.theme.paper').dark, 4.5],
  ['Focus ring (Electric) on paper', 'light', val('color.brand.electric'), val('color.theme.paper').light, 3], ['Focus ring (Electric) on paper', 'dark', val('color.brand.electric'), val('color.theme.paper').dark, 3],
  ['Footer text on night', 'both', val('color.footer.text'), val('color.brand.night'), 4.5], ['Footer label on night', 'both', val('color.footer.label'), val('color.brand.night'), 4.5],
  ['Footer key on night', 'both', val('color.footer.key'), val('color.brand.night'), 4.5], ['Coral on night', 'both', val('color.brand.coral'), val('color.brand.night'), 3],
].map(([pair, theme, fg, bg, need]) => ({ pair, theme, fg, bg, need, ratio: Math.round(ratio(fg, bg) * 100) / 100 }));
const contrastMd = () => `| Pair | Theme | Colours | Ratio | Needs | Result |\n| --- | --- | --- | --- | --- | --- |\n` + CONTRAST.map(c => `| ${c.pair} | ${c.theme} | \`${c.fg}\` on \`${c.bg}\` | ${c.ratio.toFixed(2)}:1 | ${c.need}:1 | ${c.ratio >= c.need ? 'pass' : '**fail**'} |`).join('\n');

const swatch = (name, value, sub = '') => `<div class="ds-sw"><span class="ds-sw-c" style="background:${value}"></span><span class="ds-sw-n">${esc(name)}</span><span class="t-mono soft">${esc(value)}${sub ? ' · ' + esc(sub) : ''}</span></div>`;
const VISUALS = {
  color: () => {
    const g = (title, list) => `<h3 class="ds-h">${title}</h3><div class="ds-sws">${list}</div>`;
    const roles = API.tokens.filter(t => t.name.startsWith('color.theme.') && t.name !== 'color.theme.theme-color').map(t => `<div class="ds-sw"><span class="ds-sw-c ds-sw-split"><i style="background:${t.value.light}"></i><i style="background:${t.value.dark}"></i></span><span class="ds-sw-n">${t.cssVar}</span><span class="t-mono soft">${t.value.light} / ${t.value.dark}</span></div>`).join('');
    const list = pre => API.tokens.filter(t => t.name.startsWith(pre) && t.cssVar).map(t => swatch(t.cssVar, t.value)).join('');
    return g('Theme roles (light / dark)', roles) + g('Brand', list('color.brand.')) + g('Footer (dark in both themes)', list('color.footer.')) + g('Mark files', list('color.mark.')) + g('Kinds of software (What we build only)', list('color.kind.')) + g('Pixel art', list('color.pixel.')) + g('Status and on-accent', list('color.status.') + list('color.on.'));
  },
  type: () => API.tokens.filter(t => t.type === 'typography').map(t => {
    const v = t.value, sample = t.class === 't-mono' || /control|error/.test(t.name) ? '> Selected work' : /hero|statement/.test(t.name) ? 'Come build what should exist.' : /section/.test(t.name) ? 'Things we\'ve built, and are building.' : /email/.test(t.name) ? 'hq@vimaksh.in' : 'We turn what if? into products you can actually use.';
    const style = `font-family:${v.fontFamily};font-size:${v.fontSize};${v.lineHeight ? `line-height:${v.lineHeight};` : ''}${v.fontWeight ? `font-weight:${v.fontWeight};` : ''}${v.letterSpacing ? `letter-spacing:${v.letterSpacing};` : ''}${v.textTransform ? `text-transform:${v.textTransform};` : ''}color:var(--strong)`;
    return `<div class="ds-type"><div class="ds-type-meta t-mono"><b>${t.name.replace('typography.', '')}</b><span>${t.class ? '.' + t.class : esc(t.appliedBy || '')}</span><span>${esc(v.fontSize)}${v.lineHeight ? ' / ' + v.lineHeight : ''} · ${v.fontWeight || 400} · ${v.letterSpacing || '0'}</span></div><p style="${style};margin:0">${esc(sample)}</p></div>`;
  }).join(''),
  space: () => `<div class="ds-space">${API.tokens.filter(t => t.name.startsWith('space.')).map(t => `<div class="ds-space-row"><span class="t-mono">${t.cssVar}</span><span class="ds-space-bar" style="width:${t.value}"></span><span class="t-mono soft">${esc(t.value)}</span></div>`).join('')}</div>
    <h3 class="ds-h">Breakpoints</h3><div class="ds-bps"><div style="flex:1100"><span class="t-mono">≤ 760px phone</span></div></div><p class="soft">Desktop above 1100px · tablet 761–1100px · phone ≤ 760px (all max-width).</p>`,
  surfaces: () => `<div class="ds-surf"><div style="background:var(--pattern),var(--paper)"><span class="t-mono">--paper + pattern</span></div><div style="background:var(--paper2)"><span class="t-mono">--paper2</span></div><div style="background:var(--card);border:1px solid var(--rule2)"><span class="t-mono">--card · border --rule2</span></div><div style="background:var(--pattern-dark),var(--night);color:var(--foot-text)"><span class="t-mono">--night + dark pattern</span></div></div>`,
  patterns: () => `<div class="ds-pat"><figure><div style="background:var(--pattern),var(--paper)"></div><figcaption class="t-mono">Paper pattern (current theme)</figcaption></figure><figure><div style="background:var(--grain) 0 0/220px,var(--paper)"></div><figcaption class="t-mono">Grain tile (shown at full strength)</figcaption></figure><figure><div class="heat" style="position:relative"></div><figcaption class="t-mono">Heat gradient + grain</figcaption></figure><figure><div style="background:var(--night)"><img src="/dist/brand/pixel/png/edge-paper-light.png" alt="" style="width:100%;height:auto;image-rendering:pixelated;display:block;margin-top:40px"></div><figcaption class="t-mono">Pixel edge (paper over night)</figcaption></figure><figure><div style="background:var(--mist);display:grid;grid-template-columns:repeat(8,1fr);padding:16px;gap:6px;align-content:center">${'<img src="/dist/brand/pixel/svg/chevron-right.svg" alt="" style="width:100%;color:var(--royal);filter:none">'.repeat(4)}${'<img src="/dist/brand/pixel/svg/chevron-left.svg" alt="" style="width:100%">'.repeat(4)}</div><figcaption class="t-mono">Hero glyphs, 5×5</figcaption></figure></div><p class="soft">See the live chevron field on the <a href="/components/hero/">Hero</a> page.</p>`,
  elevation: () => `<div class="ds-elev">${API.tokens.filter(t => t.type === 'shadow').map(t => `<div><div class="ds-elev-box" style="box-shadow:${t.value}"></div><span class="t-mono">${t.name}</span><span class="t-mono soft">${esc(t.value)}</span></div>`).join('')}</div>`,
  motion: () => {
    const curve = (name, [a, b, c, d]) => `<figure class="ds-curve"><svg viewBox="-10 -40 120 160" aria-hidden="true"><path d="M0 100 L100 100 M0 0 L0 100" stroke="var(--rule2)" fill="none"/><path d="M0 100 C${a * 100} ${100 - b * 100} ${c * 100} ${100 - d * 100} 100 0" stroke="var(--red)" stroke-width="2" fill="none"/></svg><figcaption class="t-mono">${name}<br><span class="soft">cubic-bezier(${[a, b, c, d].join(',')})</span></figcaption><button class="pill t-mono" type="button" data-ease="cubic-bezier(${[a, b, c, d].join(',')})">Play</button><div class="ds-ball"></div></figure>`;
    const e = n => T.byName['motion.easing.' + n].value;
    return `<div class="ds-curves">${curve('standard', e('standard'))}${curve('toggle', e('toggle'))}${curve('overshoot', e('overshoot'))}</div><p class="soft">Hover the buttons to see the chevron nudge: <a class="btn" href="#"><span>Explore our work</span><span class="chev" aria-hidden="true">&gt;</span></a></p>`;
  },
  imagery: () => `<div class="ds-img">${manifest.motifs.filter(m => m.group === 'What we build' && m.theme === 'light').map(m => `<figure><img src="/dist/brand/pixel/png/${m.name}.png" alt="Pixel tile: ${m.kind}" loading="lazy"><figcaption class="t-mono">${m.kind}</figcaption></figure>`).join('')}<figure class="ds-img-wide"><img src="/dist/brand/pixel/png/desk.png" alt="Pixel illustration of a studio desk" loading="lazy"><figcaption class="t-mono">desk (About)</figcaption></figure><figure class="ds-img-wide"><div class="card"><span class="media" style="aspect-ratio:4/5"><img src="/examples/media/paryatech.jpg" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.82)"><span class="veil"></span><span class="plogo"><img src="/examples/media/paryatech-wordmark.svg" alt="Paryatech"></span></span></div><figcaption class="t-mono">Product frame (poster of a real recording)</figcaption></figure></div>`,
  contrast: () => md2html(contrastMd()),
  brand: () => {
    const tile = (file, bg, label) => `<figure class="ds-logo"><div style="background:${bg}"><img src="/dist/brand/svg/${file}.svg" alt="${esc(label)}"></div><figcaption class="t-mono">${esc(label)}<span><a href="/dist/brand/svg/${file}.svg" download>SVG</a> <a href="/dist/brand/png/${file}@1x.png" download>1x</a> <a href="/dist/brand/png/${file}@2x.png" download>2x</a> <a href="/dist/brand/png/${file}@4x.png" download>4x</a></span></figcaption></figure>`;
    return `<div class="ds-logos">${tile('vimaksh-mark', '#F4F2EE', 'Mark on light paper')}${tile('vimaksh-mark', '#0D0E1C', 'Mark on night (footer)')}${tile('vimaksh-mark-tight', '#F4F2EE', 'Mark, tight crop')}${tile('vimaksh-wordmark', '#F4F2EE', 'Wordmark, coral (original)')}${tile('vimaksh-wordmark-ink', '#F4F2EE', 'Wordmark, ink: header, light')}${tile('vimaksh-wordmark-light', '#0F1020', 'Wordmark, light: header, dark')}${tile('vimaksh-wordmark-white', 'var(--heat)', 'Wordmark, white: footer heat field')}</div>
    <h3 class="ds-h">Misuse (proposed, pending approval)</h3><div class="ds-misuse">${[['Stretched', 'transform:scaleX(1.5)'], ['Arrows recoloured', 'filter:hue-rotate(160deg)'], ['Rotated', 'transform:rotate(-25deg)'], ['Outlined / shadowed', 'filter:drop-shadow(4px 4px 0 #2D36FF)']].map(([l, s]) => `<figure><div><img src="/dist/brand/svg/vimaksh-mark-tight.svg" alt="" style="${s}"></div><figcaption class="t-mono"><span class="chev">×</span> ${l}</figcaption></figure>`).join('')}</div>
    <p class="soft">Note: the site itself shows the mark rotated −25° as the no-WebGL hero fallback (src/v5/v5.css:116). "Rotated" stays a proposed misuse until Vimaksh decides.</p>
    <h3 class="ds-h">3D logo</h3><p><a class="btn btn--ghost" href="/dist/brand/3d/vimaksh-logo-sculpture.glb" download><span>Download vimaksh-logo-sculpture.glb</span><span class="chev" aria-hidden="true">&gt;</span></a></p>`;
  },
};

// ---------------------------------------------------------------- per-page Markdown
const srcLinks = p => (p.sources || []).map(([file, a, b, what]) => ({ file, a, b, what, url: siteLink(file, a, b) }));
const tokenTable = names => `| Token | CSS variable | Value |\n| --- | --- | --- |\n` + names.map(n => tokFor(n)).filter(Boolean).map(t => `| ${t.name} | \`${t.cssVar || (t.class ? '.' + t.class : '')}\` | \`${typeof t.value === 'object' ? (t.value.light ? `${t.value.light} / ${t.value.dark}` : JSON.stringify(t.value)) : t.value}\` |`).join('\n');
const FOUNDATION_TOKENS = { color: /^color\./, typography: /^(font|typography)\./, 'spacing-layout': /^(space|breakpoint)\./, surfaces: /^(color\.theme\.(paper|paper2|card|rule|rule2|chip)|border|radius)\b/, patterns: /^pattern\./, elevation: /^(shadow|blur)\./, motion: /^motion\./ };
function pageMd(p) {
  const head = `# ${p.title}\n\n> ${p.summary}\n\nVimaksh design system ${VERSION}. HTML: ${p.url} (local docs site). Source of truth: ${SITE_LIVE} at ${SITE_REPO_SHORT()}.\n`;
  const sources = srcLinks(p).length ? `\n## Sources\n\n${srcLinks(p).map(s => `- ${s.what}: [${s.file}:${s.a}${s.b && s.b !== s.a ? '-' + s.b : ''}](${s.url})`).join('\n')}\n` : '';
  const dd = (p.do?.length || p.dont?.length) ? `\n## Do\n\n${(p.do || []).map(x => `- ${x}`).join('\n')}\n\n## Don't\n\n${(p.dont || []).map(x => `- ${x}`).join('\n')}\n` : '';
  if (p.kind === 'component') {
    const ex = EX.filter(e => e.component === p.name).map(e => `### ${e.title}\n\n\`\`\`html\n${shortSvg(e.html)}\n\`\`\``).join('\n\n');
    return `${head}
## Use it

${p.use.map(x => `- ${x}`).join('\n')}

Needs: \`vimaksh.css\`${p.js ? ` and \`${p.js}\`` : ' (no JavaScript)'}.

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

${ex}
${(p.code || []).map(([t, c]) => `\n### ${t}\n\n\`\`\`\n${c}\n\`\`\`\n`).join('')}
## API

| Name | Kind | What it does |
| --- | --- | --- |
${p.api.map(([n, k, d]) => `| \`${n}\` | ${k} | ${d.replace(/\|/g, '\\|')} |`).join('\n')}
${dd}
## Accessibility

${p.a11y.map(x => `- ${x}`).join('\n')}

## Connected foundations

${tokenTable(p.tokens)}
${sources}`;
  }
  if (p.kind === 'foundation') {
    const re = FOUNDATION_TOKENS[p.slug];
    const tokens = re ? `\n## Tokens\n\n${tokenTable(API.tokens.filter(t => re.test(t.name)).map(t => t.name))}\n` : '';
    return `${head}${tokens}\n${mdLinks(p.body.trim())}\n${p.slug === 'accessibility' ? '\n## Contrast (computed from the tokens)\n\n' + contrastMd() + '\n' : ''}${dd}${sources}`;
  }
  return `${head}\n${mdLinks((p.mdBody || p.body || '').trim())}\n${sources}`;
}
const SITE_REPO_SHORT = () => `yakosasam797/vimakshwebsite-identity-final@${SITE_SHA.slice(0, 7)}`;

// ---------------------------------------------------------------- special pages' bodies
const ICONS = [
  { name: 'chevron-right', label: 'Chevron right (mono)', html: '<span class="chev" aria-hidden="true">&gt;</span>', note: 'The brand arrow. Red on paper, coral on night.' },
  { name: 'chevron-left', label: 'Chevron left (mono)', html: '<span class="chev" aria-hidden="true">&lt;</span>', note: 'Closes the "> label <" bracket; "< Back".' },
  { name: 'pixel-chevron-right', label: 'Pixel chevron right', html: readFileSync(root('dist/brand/pixel/svg/chevron-right.svg'), 'utf8').replace('width="50" height="50"', 'width="20" height="20" aria-hidden="true"'), note: '5×5 hero glyph, currentColor.' },
  { name: 'pixel-chevron-left', label: 'Pixel chevron left', html: readFileSync(root('dist/brand/pixel/svg/chevron-left.svg'), 'utf8').replace('width="50" height="50"', 'width="20" height="20" aria-hidden="true"'), note: '5×5 hero glyph, currentColor.' },
  { name: 'sun', label: 'Sun', html: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M5.3 18.7l1.5-1.5M17.2 6.8l1.5-1.5"/></svg>', note: 'Theme toggle only. 24 grid, 1.6 stroke, round caps.' },
  { name: 'moon', label: 'Moon', html: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>', note: 'Theme toggle only.' },
  { name: 'menu', label: 'Menu dots', html: '<span class="dots" aria-hidden="true"><i></i><i></i><i></i><i></i></span>', note: 'Inside .menubox; morphs into an X when [aria-expanded=true].', wrap: 'menubox' },
  { name: 'disclosure', label: 'Disclosure triangle', html: '<span class="tri" aria-hidden="true">▸</span>', note: 'Rotates 90° when its .row--brief is expanded.' },
];
const iconsGallery = () => `<label class="ds-search"><span class="t-mono">Search icons</span><input type="search" placeholder="chevron, sun, menu…" data-icon-search></label>
<div class="ds-icons">${ICONS.map(i => `<button class="ds-icon" type="button" data-name="${i.name} ${i.label.toLowerCase()}" data-copy-code="${esc(i.html)}"><span class="ds-icon-g">${i.wrap === 'menubox' ? `<span class="menubox" style="pointer-events:none;padding:8px 10px">${i.html}</span>` : i.html}</span><span class="t-mono">${esc(i.label)}</span><span class="soft">${esc(i.note)}</span></button>`).join('')}</div>
<p class="soft">Click an icon to copy its markup. <code>[PLACEHOLDER: icon set to be supplied by Vimaksh]</code></p>`;
const iconsMd = () => ICONS.map(i => `### ${i.label}\n\n${i.note}\n\n\`\`\`html\n${i.html}\n\`\`\``).join('\n\n') + '\n\n`[PLACEHOLDER: icon set to be supplied by Vimaksh]`. Until it arrives, use a chevron or a word instead of an icon.';

const motifsGrid = () => `<div class="ds-motifs">${manifest.motifs.map(m => `<figure><div class="ds-motif-img${m.theme === 'dark' ? ' is-dark' : ''}"><img src="/dist/brand/pixel/png/${m.name}.png" alt="" loading="lazy"></div><figcaption class="t-mono">${m.name}<span class="soft">${m.group} · ${m.grid}</span><span><a href="/dist/brand/pixel/png/${m.name}.png" download>PNG</a> <a href="/dist/brand/pixel/svg/${m.name}.svg" download>SVG</a></span></figcaption></figure>`).join('')}</div>`;
const MOTIFS_MD = `Pixel graphics are drawn square by square on a small grid and scaled up with \`image-rendering: pixelated\`. Download them, or draw them live with the site's own functions:

\`\`\`html
<canvas class="px" data-px="saas" data-kind="crm" data-c="#0E8F6E" aria-hidden="true" style="width:100%;aspect-ratio:4/3"></canvas>
<script type="module">
  import { saas } from './pixel/pixelsaas.js';      // kinds: extension saas ai crm erp dashboard integrations mobile
  import { desk, pixelEdge } from './pixel/pixelart.js';
  document.querySelectorAll('canvas[data-px=saas]').forEach(c => saas(c, c.dataset.kind, c.dataset.c));
</script>
\`\`\`

vimaksh.js already draws every \`canvas.px\` (\`data-px="saas"\` and \`data-px="desk"\`) and every \`canvas.edge\`, and redraws them when the theme changes.

| Motif | Group | Grid | PNG | SVG |
| --- | --- | --- | --- | --- |
${manifest.motifs.map(m => `| ${m.name} | ${m.group} | ${m.grid} | [png](${BASE}brand/pixel/png/${m.name}.png) | [svg](${BASE}brand/pixel/svg/${m.name}.svg) |`).join('\n')}`;

const fileRow = path => manifest.files.find(f => f.path === path);
const DOWNLOADS_MD = () => `### Packs

| Pack | Size | SHA-256 |
| --- | --- | --- |
${manifest.packs.map(p => { const f = fileRow(p.file); return `| [${p.file.replace('zip/', '')}](${BASE}brand/${p.file}): ${p.description} | ${(f.bytes / 1024).toFixed(0)} KB | \`${f.sha256}\` |`; }).join('\n')}

All hashes: [SHA256SUMS.txt](${BASE}brand/SHA256SUMS.txt), [manifest.json](${BASE}brand/manifest.json). The ZIPs are reproducible: the same source gives the same hash.

### Fonts and licences
Inter Tight (variable, 100–900) and JetBrains Mono 500, both licensed under the SIL Open Font License 1.1: free to use, embed and redistribute, not to sell on their own; keep the licence with the files. Licence texts: [InterTight-OFL.txt](${BASE}fonts/InterTight-OFL.txt), [JetBrainsMono-OFL.txt](${BASE}fonts/JetBrainsMono-OFL.txt). The Vimaksh name, mark and wordmark are not covered by these licences. The same font files are in \`fonts/\` (next to vimaksh.css, which loads them from there) and in \`brand/fonts/\` (the brand pack).

### Code
- [vimaksh.css](${BASE}vimaksh.css): tokens + type + every component, one file.
- [tokens.css](${BASE}tokens.css), [tokens.json](${BASE}tokens.json) (W3C design tokens), [tailwind-preset.cjs](${BASE}tailwind-preset.cjs), [tailwind.css](${BASE}tailwind.css).
- [vimaksh.js](${BASE}vimaksh.js), [vimaksh-phone.js](${BASE}vimaksh-phone.js), [pixel-hero.js](${BASE}pixel-hero.js), [pixel/](${BASE}pixel/pixelsaas.js).
- As a package: \`npm i github:yakosasam797/vimaksh-design-system\`, then import \`@vimaksh/design-system/vimaksh.css\`.

### Every file

| File | Bytes | SHA-256 |
| --- | --- | --- |
${manifest.files.map(f => `| [${f.path}](${BASE}brand/${f.path}) | ${f.bytes} | \`${f.sha256.slice(0, 16)}…\` |`).join('\n')}`;

const GETTING_STARTED_MD = () => `### 1. Copy the files
From ${BASE} (or \`npm i github:yakosasam797/vimaksh-design-system\`): \`vimaksh.css\`, \`fonts/\`, \`vimaksh.js\`, \`brand/svg/\`; with a phone field \`vimaksh-phone.js\` and \`vendor/\`; with the hero \`pixel-hero.js\` (it reads \`brand/svg/vimaksh-mark.svg\` relative to itself). Keep \`fonts/\` next to \`vimaksh.css\`.

### 2. The page shell
Copy the head from [agents.md](${BASE}agents.md), section 1: the pre-paint theme script, the stylesheet, the skip link, the header, the navigation stack, \`<main id="main">\`, the footer and the module script. Set \`data-page="home"\` on the home page.

### 3. Build sections
Open each section with a [Section header](doc:SectionHeader), then use the components. The CSS is the site's own; the class names are the API.

### 4. With Tailwind
Load \`tokens.css\` first. Tailwind 3: \`presets: [require('./tailwind-preset.cjs')]\`. Tailwind 4: \`@import "tailwindcss"; @import "./tokens.css"; @import "./tailwind.css";\`. You get \`bg-paper\`, \`text-strong\`, \`font-mono\`, \`text-section\`, \`p-pad\`, \`shadow-card\`, \`ease-standard\`, \`max-phone:\`… Square corners: do not use \`rounded-*\`.

### 5. Check
Run the self-check in [agents.md](${BASE}agents.md) section 6 against ${SITE_LIVE}, in both themes and at 390px.

### What is patched
vimaksh.js is the site's own script with these changes:
${Object.entries(PATCHES).flatMap(([f, ps]) => ps.map(p => `- ${f}: ${p[0]}`)).join('\n')}

### Not included
React wrappers (the site has no React; the HTML is the component). Storybook runs locally: \`npm run storybook\`.`;

const AGENTS_PAGE_MD = () => `### Copy brand identity
Paste this into an agent working on another project. It points at stable URLs instead of pasting the system:

\`\`\`
${PROMPT}
\`\`\`

### Machine-readable files

| File | What it is |
| --- | --- |
| [agents.md](${BASE}agents.md) | Rules for agents: set-up, hard rules, components, tokens, self-check |
| [llms.txt](${BASE}llms.txt) | Index of every page as Markdown |
| [llms-full.txt](${BASE}llms-full.txt) | Every page in one file |
| [prompt.txt](${BASE}prompt.txt) | The Copy brand identity prompt |
| [catalog.json](${BASE}catalog.json) | Every page, component, file and example |
| [api/components.json](${BASE}api/components.json) | Components: markup, API, tokens, sources |
| [api/foundations.json](${BASE}api/foundations.json) | Foundations with their tokens and contrast |
| [api/tokens.json](${BASE}api/tokens.json) | Flat token list with light/dark values |
| [tokens.json](${BASE}tokens.json) | The W3C design tokens source |
| [docs/<Name>.md](${BASE}docs/Button.md) | One page as Markdown |`;

// ---------------------------------------------------------------- HTML shell
const NAV = [['Start', P.filter(p => p.group === 'Start')], ['Foundations', P.filter(p => p.kind === 'foundation')], ...['Navigation', 'Actions', 'Feedback', 'Layout', 'Content', 'Forms'].map(g => [g, P.filter(p => p.kind === 'component' && p.group === g)]), ['Brand', P.filter(p => p.kind === 'brand')]];
const sidebar = cur => `<nav class="ds-side" aria-label="Docs"><details class="ds-side-in" open><summary class="t-mono">Contents</summary>${NAV.map(([g, list]) => `<p class="t-mono ds-side-k">${g}</p><ul>${list.map(p => `<li><a href="${p.url}"${p === cur ? ' aria-current="page"' : ''}>${esc(p.title)}</a></li>`).join('')}</ul>`).join('')}</details></nav>`;
const HEADER = `<header class="hdr">
  <a class="brandlink" href="/" aria-label="Vimaksh design system, home">${WM}<span class="ds-brand-sub t-mono">Design system</span></a>
  <div class="hdr-r">
    ${pageSrc('index.html').slice(22, 30).join('\n')}
  </div>
</header>`;
const navLink = (href, t) => `<a href="${href}"><span class="c" aria-hidden="true">&gt;</span><span class="t">${t}</span><span class="c" aria-hidden="true">&lt;</span></a>`;
const NAVBOX = `<nav class="navbox" aria-label="Main" data-navbox>
    ${navLink('/foundations/color/', 'Foundations')}
    ${navLink('/components/button/', 'Components')}
    ${navLink('/brand/', 'Brand')}
    ${navLink('/agents/', 'For agents')}
    <button class="menubox" type="button" aria-label="Show navigation" aria-expanded="false" data-menu-btn><span class="t">Menu</span><span class="dots" aria-hidden="true"><i></i><i></i><i></i><i></i></span></button>
  </nav>`;
const FOOTER = `<footer class="foot" id="footer" data-tone="dark">
  <canvas class="edge edge--top" data-edge="night" aria-hidden="true"></canvas>
  <div class="foot-in">
    <div class="foot-top">
      <div class="foot-say">
        <div class="fmark" role="img" aria-label="Vimaksh mark">${MARK}</div>
        <div class="foot-copy">
        <p class="t-mono label"><span class="chev">&gt;</span> Vimaksh design system</p>
        <h2 class="t-statement">The look of<br>work.vimaksh.in.</h2>
        <p class="foot-sub">Every value comes from the website's code. Where the site has no rule, the gap is marked, not filled.</p>
        </div>
      </div>
      <div class="block fbrief">
        <div class="row row--brief"><span>Copy brand identity</span><button class="pill t-mono" type="button" data-copy-prompt>Copy prompt</button></div>
        <div class="row"><span>agents.md</span><button class="pill t-mono" type="button" data-copy="${BASE}agents.md">Copy URL</button></div>
        <div class="row"><span>llms-full.txt</span><button class="pill t-mono" type="button" data-copy="${BASE}llms-full.txt">Copy URL</button></div>
        <div class="row"><span>vimaksh.css</span><button class="pill t-mono" type="button" data-copy="${BASE}vimaksh.css">Copy URL</button></div>
      </div>
    </div>
    <div class="cols">
      <div><p class="t-mono k">Foundations</p><ul>${P.filter(p => p.kind === 'foundation').slice(0, 6).map(p => `<li><a href="${p.url}">${esc(p.title)}</a></li>`).join('')}</ul></div>
      <div><p class="t-mono k">Components</p><ul>${['Header', 'Button', 'ProjectCard', 'BriefForm', 'Footer'].map(n => `<li><a href="${byName[n].url}">${esc(byName[n].title)}</a></li>`).join('')}</ul></div>
      <div><p class="t-mono k">Brand</p><ul>${P.filter(p => p.kind === 'brand').map(p => `<li><a href="${p.url}">${esc(p.title)}</a></li>`).join('')}</ul></div>
      <div><p class="t-mono k">Source</p><ul><li><a href="${REPO_URL}">Design system repo</a></li><li><a href="${SITE_LIVE}">work.vimaksh.in</a></li><li><a href="/agents/">For agents</a></li></ul></div>
    </div>
  </div>
  <div class="foot-base heat" data-pixel-mask>
    <div class="giant" aria-hidden="true">${WM}</div>
    <div class="fine t-mono"><span>© <span data-year>2026</span> Vimaksh</span><span>Design system ${VERSION} · source ${SITE_SHA.slice(0, 7)}</span></div>
  </div>
</footer>`;
const shell = ({ title, desc, page = 'inner', body, md = '' }) => `<!DOCTYPE html>
<html lang="en" data-page="${page}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#F4F2EE">
<link rel="icon" href="/dist/brand/svg/vimaksh-mark.svg">
<link rel="preload" href="/dist/fonts/inter-tight.woff2" as="font" type="font/woff2" crossorigin>
<script>
  // Set the theme before first paint: saved choice, else the system setting.
  (function () { try { var t = localStorage.getItem('vimaksh-theme'); if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = t; } catch (e) { document.documentElement.dataset.theme = 'light'; } })();
</script>
<link rel="stylesheet" href="/dist/vimaksh.css">
<link rel="stylesheet" href="/site.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${HEADER}
${NAVBOX}
<div class="tip t-mono" aria-hidden="true">Copy</div>
<script type="text/plain" id="ds-prompt">${esc(PROMPT)}</script>
${md ? `<script type="text/plain" id="ds-md">${esc(md)}</script>` : ''}
${body}
${FOOTER}
<script type="module" src="/dist/vimaksh.js"></script>
<script type="module" src="/site.js"></script>
</body>
</html>
`;

function docPage(p, md) {
  const exs = p.kind === 'component' ? (p.examples || []).map((ex, i) => {
    const file = examplePage(p, ex, i), code = exampleHtml(p, ex);
    return `<figure class="ds-ex"><figcaption class="ds-ex-bar t-mono"><span>${esc(ex.title)}</span><span class="ds-ex-act"><button type="button" class="pill t-mono" data-w="100%" aria-pressed="true">Desktop</button><button type="button" class="pill t-mono" data-w="390px" aria-pressed="false">390</button><a class="pill t-mono" href="${file}" target="_blank" rel="noopener">Open<span class="sr"> (opens in a new tab)</span></a></span></figcaption><div class="ds-frame"><iframe src="${file}" title="${esc(p.title)}: ${esc(ex.title)}" loading="lazy" style="height:${ex.height || 260}px"></iframe></div>${codeBlock(code, 'HTML')}</figure>`;
  }).join('') : '';
  const preview = p.kind === 'component' ? `${exs}
    ${(p.code || []).map(([t, c]) => codeBlock(c, t)).join('')}
    <h2 class="ds-h2">Use it</h2><ul class="ds-list">${p.use.map(x => `<li>${inline(x)}</li>`).join('')}</ul><p class="soft">Needs <code>vimaksh.css</code>${p.js ? ` and <code>${esc(p.js)}</code>` : ' only (no JavaScript)'}.</p>
    <h2 class="ds-h2">API</h2><div class="ds-table"><table><thead><tr><th>Name</th><th>Kind</th><th>What it does</th></tr></thead><tbody>${p.api.map(([n, k, d]) => `<tr><td><code>${esc(n)}</code></td><td class="t-mono soft">${esc(k)}</td><td>${inline(d)}</td></tr>`).join('')}</tbody></table></div>`
    : p.kind === 'foundation' || p.kind === 'brand' && p.visual ? `${p.visual ? `<div class="ds-visual">${VISUALS[p.visual]()}</div>` : ''}<div class="ds-prose">${md2html(p.body)}</div>`
    : `<div class="ds-prose">${p.html || md2html(p.mdBody)}</div>`;
  const dodont = (p.do?.length || p.dont?.length) ? `<div class="ds-dd"><div><h2 class="ds-h2"><span class="ds-yes">Do</span></h2><ul class="ds-list">${(p.do || []).map(x => `<li>${inline(x)}</li>`).join('')}</ul></div><div><h2 class="ds-h2"><span class="ds-no">Don't</span></h2><ul class="ds-list">${(p.dont || []).map(x => `<li>${inline(x)}</li>`).join('')}</ul></div></div>` : '';
  const a11y = p.a11y?.length ? `<h2 class="ds-h2">Accessibility</h2><ul class="ds-list">${p.a11y.map(x => `<li>${inline(x)}</li>`).join('')}</ul>` : '';
  const tokens = p.tokens?.length ? `<h2 class="ds-h2">Connected foundations</h2>${md2html(tokenTable(p.tokens))}` : '';
  const src = srcLinks(p);
  const sourceTab = `<p>Extracted from <a href="${SITE_LIVE}">${SITE_LIVE}</a>, repository <a href="${siteLink('', 0)}">${SITE_REPO_SHORT()}</a>.</p>${src.length ? `<ul class="ds-src">${src.map(s => `<li><a href="${s.url}"><span class="t-mono">${esc(s.file)}:${s.a}${s.b && s.b !== s.a ? '–' + s.b : ''}</span><span>${esc(s.what)}</span></a></li>`).join('')}</ul>` : ''}<p class="soft">In this repository: <a href="${blob('dist/vimaksh.css')}">dist/vimaksh.css</a> (each rule is tagged with its <code>v5.css</code> line), <a href="${blob('content/' + (p.kind === 'component' ? 'components' : 'foundations') + '.mjs')}">content</a>, <a href="${blob('dist/docs/' + p.md)}">dist/docs/${p.md}</a>.</p>`;
  const groupLabel = p.kind === 'component' ? `Components / ${p.group}` : p.group;
  const body = `<main id="main" class="ds">
  ${sidebar(p)}
  <article class="ds-doc">
    <div class="sec-head ds-head">
      <p class="t-mono label"><span class="chev">&gt;</span> ${esc(groupLabel)}</p>
      <h1 class="t-section">${esc(p.title)}</h1>
      <button class="btn btn--ghost" type="button" data-copy-md><span>Copy for LLM</span><span class="chev" aria-hidden="true">&gt;</span></button>
    </div>
    <p class="ds-lead">${inline(p.summary)}</p>
    <div class="ds-tabs" role="tablist" aria-label="View">
      <button role="tab" type="button" class="t-mono" id="tab-preview" aria-controls="panel-preview" aria-selected="true">Preview</button>
      <button role="tab" type="button" class="t-mono" id="tab-md" aria-controls="panel-md" aria-selected="false" tabindex="-1">Markdown</button>
      <button role="tab" type="button" class="t-mono" id="tab-src" aria-controls="panel-src" aria-selected="false" tabindex="-1">Source</button>
    </div>
    <section class="ds-panel" role="tabpanel" id="panel-preview" aria-labelledby="tab-preview">${preview}${dodont}${a11y}${tokens}</section>
    <section class="ds-panel" role="tabpanel" id="panel-md" aria-labelledby="tab-md" hidden><p class="soft">This page as Markdown: <a href="/dist/docs/${p.md}">/dist/docs/${p.md}</a> · raw: <a href="${BASE}docs/${p.md}">${BASE}docs/${p.md}</a></p>${codeBlock(md, p.md)}</section>
    <section class="ds-panel" role="tabpanel" id="panel-src" aria-labelledby="tab-src" hidden>${sourceTab}</section>
  </article>
</main>`;
  write(join(SITE, p.url, 'index.html'), shell({ title: `${p.title} — Vimaksh design system`, desc: p.summary, body, md }));
}

// ---------------------------------------------------------------- build all pages
byName.Icons.html = iconsGallery(); byName.Icons.mdBody = iconsMd();
byName.PixelMotifs.html = motifsGrid() + md2html(MOTIFS_MD.split('\n| Motif')[0]); byName.PixelMotifs.mdBody = MOTIFS_MD;
byName.Downloads.mdBody = DOWNLOADS_MD();
byName.Downloads.html = md2html(DOWNLOADS_MD().split('### Every file')[0]) + `<p><a href="/dist/brand/SHA256SUMS.txt">All ${manifest.files.length} files with SHA-256</a></p>`;
byName.GettingStarted.mdBody = GETTING_STARTED_MD();
byName.Agents.mdBody = AGENTS_PAGE_MD();
byName.Agents.html = `<div class="block ds-prompt-block"><div class="row row--brief"><span>Copy brand identity</span><button class="pill t-mono" type="button" data-copy-prompt>Copy prompt</button></div></div>` + md2html(AGENTS_PAGE_MD());
// components first: their examples feed their Markdown
const MD = {};
// examples must exist before Markdown, so render component example pages first
for (const p of P.filter(p => p.kind === 'component')) p.examples.forEach((ex, i) => examplePage(p, ex, i));
for (const p of P) MD[p.name] = pageMd(p);
EX.length = 0;   // docPage registers examples again (same files) while rendering
for (const p of P) { docPage(p, MD[p.name]); write(root('dist/docs', p.md), MD[p.name]); }

// ---------------------------------------------------------------- home
const home = `<main id="main">
<section class="hero" id="top" aria-label="Vimaksh design system">
  <div class="hero-in">
    <canvas id="stage" aria-label="The Vimaksh six-arrow mark, built from moving pixels" role="img"></canvas>
    <img class="stage-fallback" src="/dist/brand/svg/vimaksh-mark.svg" alt="" aria-hidden="true">
    <div class="hero-copy">
      <p class="t-mono label"><span class="chev">&gt;</span> Vimaksh design system</p>
      <h1>Everything that makes work.vimaksh.in look like <span class="hl"><i aria-hidden="true">&lt;</i>Vimaksh<i aria-hidden="true">&gt;</i></span>, ready for people and agents.</h1>
      <div class="hero-cta"><button class="btn" type="button" data-copy-prompt><span>Copy brand identity</span><span class="chev" aria-hidden="true">&gt;</span></button><a class="btn btn--ghost" href="/getting-started/"><span>Get started</span></a></div>
    </div>
    <p class="hero-meta t-mono"><span>Design system / ${VERSION}</span><span>${T.ALL.length} tokens · ${COMPONENTS.length} components</span><span>Source ${SITE_SHA.slice(0, 7)}</span></p>
  </div>
  <div class="hero-dim" aria-hidden="true"></div>
</section>

<section class="work rise" id="identity" aria-labelledby="id-h">
  <canvas class="edge edge--top" data-edge="paper" aria-hidden="true"></canvas>
  <div class="sec-head">
    <p class="t-mono label"><span class="chev">&gt;</span> Copy brand identity</p>
    <h2 id="id-h" class="t-section">One prompt.<br>The same studio, anywhere.</h2>
    <a class="more t-mono" href="/agents/">For agents <span class="chev" aria-hidden="true">&gt;</span></a>
  </div>
  <div class="ds-home-prompt">
    <p class="ds-lead">Paste it into an agent working on another project. It tells the agent where to fetch the rules, tokens, fonts and logos, gives it a strict checklist and asks it to check its work against work.vimaksh.in.</p>
    <div class="block"><div class="row row--brief"><span>Copy brand identity</span><button class="pill t-mono" type="button" data-copy-prompt>Copy prompt</button></div><pre class="ds-prompt-pre"><code>${esc(PROMPT)}</code></pre></div>
  </div>
</section>

<section class="ds-home-sec" aria-labelledby="f-h">
  <div class="sec-head"><p class="t-mono label"><span class="chev">&gt;</span> Foundations</p><h2 id="f-h" class="t-section">The values, named.</h2><a class="more t-mono" href="/foundations/color/">Start with colour <span class="chev" aria-hidden="true">&gt;</span></a></div>
  <ul class="ds-index">${P.filter(p => p.kind === 'foundation').map(p => `<li><a href="${p.url}"><span class="ds-index-t">${esc(p.title)}</span><span class="ds-index-d">${esc(p.summary.split('. ')[0].replace(/\.$/, ''))}.</span><span class="chev" aria-hidden="true">&gt;</span></a></li>`).join('')}</ul>
</section>

<section class="ds-home-sec" aria-labelledby="c-h">
  <div class="sec-head"><p class="t-mono label"><span class="chev">&gt;</span> Components</p><h2 id="c-h" class="t-section">Everything the site uses,<br>as it uses it.</h2><a class="more t-mono" href="/components/button/">All components <span class="chev" aria-hidden="true">&gt;</span></a></div>
  <ul class="ds-index">${P.filter(p => p.kind === 'component').map(p => `<li><a href="${p.url}"><span class="ds-index-t">${esc(p.title)}</span><span class="ds-index-d">${esc(p.summary.split('. ')[0].replace(/\.$/, ''))}.</span><span class="chev" aria-hidden="true">&gt;</span></a></li>`).join('')}</ul>
</section>

<section class="ds-home-sec" aria-labelledby="b-h">
  <div class="sec-head"><p class="t-mono label"><span class="chev">&gt;</span> Brand</p><h2 id="b-h" class="t-section">Mark, wordmark, pixels.</h2><a class="more t-mono" href="/downloads/">Downloads <span class="chev" aria-hidden="true">&gt;</span></a></div>
  <div class="ds-home-brand">
    <a href="/brand/" class="ds-home-tile"><img src="/dist/brand/svg/vimaksh-mark-tight.svg" alt=""><span class="t-mono">Brand</span></a>
    <a href="/pixel-motifs/" class="ds-home-tile"><img src="/dist/brand/pixel/png/build-ai-light.png" alt="" style="image-rendering:pixelated"><span class="t-mono">Pixel motifs</span></a>
    <a href="/icons/" class="ds-home-tile"><span class="ds-home-chev">&gt; &lt;</span><span class="t-mono">Icons</span></a>
    <a href="/downloads/" class="ds-home-tile"><img src="/dist/brand/svg/vimaksh-wordmark.svg" alt=""><span class="t-mono">Downloads</span></a>
  </div>
</section>
</main>`;
write(join(SITE, 'index.html'), shell({ title: 'Vimaksh design system', desc: 'The design language of work.vimaksh.in: tokens, components, brand assets and agent-readable docs.', page: 'home', body: home }));

// ---------------------------------------------------------------- machine files
const llms = `# Vimaksh design system

> The design language of ${SITE_LIVE} (Vimaksh, a software studio in Bengaluru), extracted from its code: tokens, one CSS file, behaviours, brand assets. Version ${VERSION}. Light and dark themes.

## Start here

- [agents.md](${BASE}agents.md): rules for agents, page set-up, hard rules, self-check
- [Copy brand identity prompt](${BASE}prompt.txt)
- [Everything in one file](${BASE}llms-full.txt)
- [vimaksh.css](${BASE}vimaksh.css): the single-file drop-in
- [tokens.json](${BASE}tokens.json) (W3C) · [api/tokens.json](${BASE}api/tokens.json) · [catalog.json](${BASE}catalog.json)

${['guide', 'foundation', 'component', 'brand'].map(k => `## ${{ guide: 'Guides', foundation: 'Foundations', component: 'Components', brand: 'Brand' }[k]}\n\n${P.filter(p => p.kind === k).map(p => `- [${p.title}](${BASE}docs/${p.md}): ${p.summary.split('. ')[0]}`).join('\n')}`).join('\n\n')}
`;
const agents = agentsMd({ BASE, VERSION, components: COMPONENTS, foundations: FOUNDATIONS, tokens: API.tokens });
write(root('dist/llms.txt'), llms);
write(root('dist/agents.md'), agents);
write(root('dist/prompt.txt'), PROMPT + '\n');
write(root('dist/llms-full.txt'), `# Vimaksh design system: everything\n\nVersion ${VERSION}. Generated from the same source as ${BASE}docs/. Start with agents.md (first section below).\n\n---\n\n${agents}\n\n---\n\n${P.map(p => MD[p.name]).join('\n\n---\n\n')}`);
const distFiles = (d, base = '') => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? distFiles(p, base + f + '/') : [base + f]; });
const catalog = {
  name: 'Vimaksh design system', version: VERSION, base: BASE, source: { live: SITE_LIVE, repo: SITE_REPO_SHORT() }, themes: ['light', 'dark'],
  entry: { css: 'vimaksh.css', js: 'vimaksh.js', phone: 'vimaksh-phone.js', hero: 'pixel-hero.js', tokens: 'tokens.json', tailwind3: 'tailwind-preset.cjs', tailwind4: 'tailwind.css', agents: 'agents.md', prompt: 'prompt.txt', llms: 'llms.txt', llmsFull: 'llms-full.txt' },
  pages: P.map(p => ({ name: p.name, title: p.title, kind: p.kind, group: p.group, summary: p.summary, markdown: `docs/${p.md}` })),
  files: distFiles(root('dist')).filter(f => !f.startsWith('brand/')).sort(),
  brand: 'brand/manifest.json',
};
write(root('dist/catalog.json'), JSON.stringify(catalog, null, 2));
write(root('dist/api/components.json'), JSON.stringify({ version: VERSION, components: COMPONENTS.map(c => ({ name: c.name, title: byName[c.name].title, group: c.group, summary: c.summary, markdown: `${BASE}docs/${c.name}.md`, requires: ['vimaksh.css', ...(c.js ? c.js.split(' + ') : [])], examples: EX.filter(e => e.component === c.name).map(e => ({ title: e.title, html: e.html })), code: (c.code || []).map(([title, code]) => ({ title, code })), api: c.api.map(([name, kind, description]) => ({ name, kind, description })), use: c.use, do: c.do, dont: c.dont, accessibility: c.a11y, tokens: c.tokens.map(n => tokFor(n)).filter(Boolean).map(t => ({ name: t.name, cssVar: t.cssVar, value: t.value })), sources: srcLinks(c) })) }, null, 2));
write(root('dist/api/foundations.json'), JSON.stringify({ version: VERSION, foundations: FOUNDATIONS.map(f => ({ name: f.name, title: byName[f.name].title, summary: f.summary, markdown: `${BASE}docs/${f.name}.md`, guidance: f.body.trim(), do: f.do, dont: f.dont, tokens: FOUNDATION_TOKENS[f.slug] ? API.tokens.filter(t => FOUNDATION_TOKENS[f.slug].test(t.name)) : [], sources: srcLinks(f) })), contrast: CONTRAST }, null, 2));
write(root('dist/api/icons.json'), JSON.stringify({ version: VERSION, note: '[PLACEHOLDER: icon set to be supplied by Vimaksh]', icons: ICONS.map(({ wrap, ...i }) => i) }, null, 2));
write(root('dist/api/examples.json'), JSON.stringify(EX.map(e => ({ component: e.component, title: e.title, file: e.file, height: e.height, html: e.html, withPhone: e.withPhone })), null, 2));

// ---------------------------------------------------------------- static files for the docs site
cpSync(root('src/site'), SITE, { recursive: true });
cpSync(root('source/examples-media'), join(SITE, 'examples/media'), { recursive: true });
console.log(`docs: ${P.length} pages, ${EX.length} examples, ${Object.keys(MD).length} Markdown files`);
