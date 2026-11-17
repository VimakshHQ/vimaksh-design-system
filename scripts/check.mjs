// Drift checks. Run after `npm run build`:
//  1. every token still matches the website line it cites;
//  2. every var(--x) used in vimaksh.css is defined;
//  3. every colour literal in the component CSS is a token value (or listed as component-local);
//  4. every source range cited by the docs exists;
//  5. every link to BASE in the agent files points at a file in dist/.
import { readFileSync, existsSync } from 'node:fs';
import { root, BASE, SITE_FILES } from './config.mjs';
import { verify, tokens } from './tokens.mjs';
import { COMPONENTS } from '../content/components.mjs';
import { FOUNDATIONS, BRAND } from '../content/foundations.mjs';

const fail = [];
fail.push(...verify());

const css = readFileSync(root('dist/vimaksh.css'), 'utf8');
const defined = new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map(m => m[1]));
for (const m of new Set([...css.matchAll(/var\((--[\w-]+)/g)].map(m => m[1]))) if (!defined.has(m) && !m.startsWith('--iti') && !['--p', '--c', '--fm', '--edge-h'].includes(m)) fail.push(`vimaksh.css uses undefined ${m}`);

// Colour literals: token values, or one-off values the site uses inside a single component (documented here).
const LOCAL = new Set(['#fff', 'rgba(0,0,0,.05)', 'rgba(0,0,0,.18)', 'rgba(0,0,0,.45)', 'rgba(255,255,255,.92)', 'rgba(244,242,238,.9)', 'rgba(244,242,238,.88)', 'rgba(244,242,238,.85)', 'rgba(251,250,247,.95)', 'rgba(23,25,46,.6)', 'rgba(255,255,255,.55)', 'rgba(255,255,255,.3)', 'rgba(255,255,255,.22)', 'rgba(255,255,255,.8)', 'rgba(255,255,255,.7)', 'rgba(221,228,255,.1)', 'rgba(228,33,20,.14)', 'rgba(13,14,28,.78)', '#1a3fd8', 'rgba(45,54,255,.55)', '#5a0c12', 'rgba(140,20,20,.6)', '#ff7a70', 'rgba(255,94,85,.6)']);
const values = new Set(tokens.ALL.flatMap(t => typeof t.value === 'string' ? [t.value] : t.type === 'shadow' ? [t.value.color] : []).map(v => v.toLowerCase().replace(/\s/g, '')));
const comp = readFileSync(root('src/css/components.css'), 'utf8').replace(/url\("data:[^)]*\)/g, '');
for (const lit of new Set([...comp.matchAll(/#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g)].map(m => m[0].toLowerCase().replace(/\s/g, ''))))
  if (!values.has(lit) && !LOCAL.has(lit) && ![...tokens.ALL].some(t => t.ext.css === lit)) fail.push(`components.css: colour ${lit} is neither a token nor a listed component-local value`);

for (const p of [...COMPONENTS, ...FOUNDATIONS, BRAND]) for (const [file, a, b] of p.sources || []) {
  const path = SITE_FILES[file] || (file === 'DESIGN.md' ? root('source/site/DESIGN.md') : null);
  if (!path) { fail.push(`${p.name}: unknown source file ${file}`); continue; }
  const n = readFileSync(path, 'utf8').split('\n').length;
  if (a < 1 || (b || a) > n) fail.push(`${p.name}: ${file}:${a}-${b} is outside the file (${n} lines)`);
}

for (const f of ['agents.md', 'llms.txt', 'llms-full.txt', 'prompt.txt', 'catalog.json']) {
  const text = readFileSync(root('dist', f), 'utf8');
  for (const m of new Set([...text.matchAll(new RegExp(BASE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([\\w./@-]+[\\w])', 'g'))].map(m => m[1])))
    if (!m.includes('<') && !existsSync(root('dist', m))) fail.push(`${f} links to missing dist/${m}`);
}

if (fail.length) { console.error('check failed:\n  ' + fail.join('\n  ')); process.exit(1); }
console.log('check: tokens match the website, CSS variables resolve, colours are documented, sources exist, agent links resolve');
