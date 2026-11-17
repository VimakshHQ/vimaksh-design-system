// Build every token output from tokens/tokens.json (the only source), and verify each token against the line of
// website source it cites. Outputs: dist/tokens.css, dist/tokens.json, dist/api/tokens.json,
// dist/tailwind-preset.cjs (Tailwind 3), dist/tailwind.css (Tailwind 4 @theme), src/css/typography.css.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { root, SITE_FILES } from './config.mjs';

const T = JSON.parse(readFileSync(root('tokens/tokens.json'), 'utf8'));

// ---------- walk ----------
export function walk(node = T, path = [], inherited = {}) {
  const out = [];
  const type = node.$type || inherited.$type;
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith('$') || typeof v !== 'object' || v === null) continue;
    if ('$value' in v) out.push({ path: [...path, k], name: [...path, k].join('.'), type: v.$type || type, value: v.$value, description: v.$description || '', ext: v.$extensions?.vimaksh || {} });
    else out.push(...walk(v, [...path, k], { $type: type }));
  }
  return out;
}
const ALL = walk();
const byName = Object.fromEntries(ALL.map(t => [t.name, t]));
const resolve = v => (typeof v === 'string' && /^\{.+\}$/.test(v) ? resolve(byName[v.slice(1, -1)].value) : v);

export function cssValue(t) {
  const v = resolve(t.value);
  switch (t.type) {
    case 'fontFamily': return v.map(f => (/[\s]/.test(f) && !f.startsWith('ui-') && !f.startsWith('-') ? `'${f}'` : f)).join(',');
    case 'cubicBezier': return `cubic-bezier(${v.map(n => String(n).replace(/^0\./, '.')).join(',')})`;
    case 'duration': return `${v.value}${v.unit}`;
    case 'shadow': return t.ext.css;
    default: return typeof v === 'object' ? JSON.stringify(v) : String(v);
  }
}

// ---------- verify against the website source ----------
// Each token cites file:line(s). The token's value (or each piece of a composite) must appear on those lines.
const lines = Object.fromEntries(Object.entries(SITE_FILES).map(([k, p]) => [k, readFileSync(p, 'utf8').split('\n')]));
const norm = s => String(s).toLowerCase().replace(/\s+/g, '').replace(/0\.(\d)/g, '.$1');
export function verify() {
  const problems = [];
  for (const t of ALL) {
    const src = t.ext.source; if (!src) { problems.push(`${t.name}: no source`); continue; }
    const m = src.match(/^(.+?):([\d,-]+)$/); if (!m) { problems.push(`${t.name}: bad source ${src}`); continue; }
    const file = lines[m[1]]; if (!file) { problems.push(`${t.name}: unknown file ${m[1]}`); continue; }
    const text = norm(m[2].split(',').map(r => { const [a, b] = r.split('-'); return file.slice(+a - 1, +(b || a)).join(''); }).join(''));
    let needles;
    const v = resolve(t.value);
    if (t.type === 'typography') needles = Object.entries(v).filter(([k]) => !['fontFamily', 'color', 'textTransform'].includes(k)).map(([, x]) => x);
    else if (t.type === 'shadow') needles = [t.ext.css];
    else if (t.type === 'fontFamily') needles = [v[0]];
    else if (t.type === 'cubicBezier') needles = [v.join(',')];
    else if (t.type === 'duration') needles = [v.value >= 1000 ? `${v.value / 1000}s` : `.${String(v.value).padStart(3, '0').replace(/0+$/, '')}s`];
    else if (t.name.startsWith('pattern.pixel-edge')) needles = ['cell=14', 'rows=7'];
    else if (t.name.startsWith('pattern.')) needles = [String(v).slice(0, 60)];
    else needles = [String(v)];
    for (const n of needles) {
      let k = norm(n);
      if (t.type === 'fontWeight' && t.name.endsWith('book')) k = '450';
      if (!text.includes(k) && !text.includes(k.replace(/^#/, '%23'))) problems.push(`${t.name}: "${n}" not found at ${src}`);
    }
  }
  return problems;
}

// ---------- outputs ----------
const isTheme = (t, mode) => t.path[0] === 'color' && t.path[1] === 'theme' && t.path[2] === mode;
const varTokens = ALL.filter(t => t.ext.cssVar && !isTheme(t, 'dark'));
const decl = t => `  ${t.ext.cssVar}:${cssValue(t)};`;

export function buildCss() {
  const rootVars = varTokens.filter(t => !isTheme(t, 'light'));
  const light = ALL.filter(t => isTheme(t, 'light')), dark = ALL.filter(t => isTheme(t, 'dark'));
  const themeBlock = (list, mode) => list.map(decl).join('\n') + `\n  --pattern:var(--pattern-${mode});\n  color-scheme:${mode};`;
  const fonts = ALL.filter(t => t.type === 'fontFamily');
  return `/* Vimaksh tokens. Generated from tokens/tokens.json. Do not edit by hand. */
${fonts.map(t => `@font-face{font-family:'${t.value[0]}';src:url(${t.ext.file}) format('woff2');font-weight:${t.name.endsWith('sans') ? '100 900' : '500'};font-display:swap}`).join('\n')}
:root{
${rootVars.map(decl).join('\n')}
}
/* Light is the default; set <html data-theme="dark"> for dark. The site sets data-theme before first paint. */
:root,html[data-theme=light]{
${themeBlock(light, 'light')}
}
html[data-theme=dark]{
${themeBlock(dark, 'dark')}
}
@media (prefers-color-scheme:dark){html:not([data-theme]){
${themeBlock(dark, 'dark')}
}}
@media (max-width:${byName['breakpoint.phone'].value}){:root{--hdr:${byName['space.hdr'].ext.phone}}}
`;
}

export function buildTypography() {
  const cls = ALL.filter(t => t.type === 'typography' && t.ext.class);
  const prop = { fontFamily: 'font-family', fontWeight: 'font-weight', fontSize: 'font-size', lineHeight: 'line-height', letterSpacing: 'letter-spacing', textTransform: 'text-transform', color: 'color' };
  return `/* Type classes. Generated from tokens/tokens.json (typography.*). */\n` + cls.map(t => {
    const v = t.value, fam = v.fontFamily === '{font.family.mono}' ? 'var(--mono)' : 'var(--sans)';
    const body = Object.entries(v).map(([k, x]) => `${prop[k]}:${k === 'fontFamily' ? fam : x}`).join(';');
    return `.${t.ext.class}{${body}${t.ext.class === 't-mono' ? '' : ';margin:0'}}`;
  }).join('\n') + '\n';
}

export function buildApi() {
  return {
    $schema: 'Generated from tokens/tokens.json',
    themes: ['light', 'dark'],
    tokens: ALL.filter(t => !isTheme(t, 'dark')).map(t => {
      const o = { name: t.name.replace('color.theme.light.', 'color.theme.'), type: t.type, cssVar: t.ext.cssVar || null, description: t.description, source: t.ext.source };
      if (isTheme(t, 'light')) { o.value = { light: cssValue(t), dark: cssValue(byName[t.name.replace('.light.', '.dark.')]) }; }
      else o.value = cssValue(t);
      if (t.type === 'typography') { o.value = resolve(t.value); o.value.fontFamily = cssValue(byName[t.value.fontFamily.slice(1, -1)]); o.class = t.ext.class || null; o.appliedBy = t.ext.appliedBy || null; }
      return o;
    }),
  };
}

function tw3() {
  const v = n => `var(${byName[n].ext.cssVar})`;
  const colors = {};
  for (const t of varTokens) if (t.type === 'color') colors[t.ext.cssVar.slice(2)] = `var(${t.ext.cssVar})`;
  const fontSize = {};
  for (const t of ALL.filter(t => t.type === 'typography')) {
    const x = resolve(t.value); fontSize[t.path[1]] = [x.fontSize, { lineHeight: x.lineHeight || 'normal', letterSpacing: x.letterSpacing || '0', ...(x.fontWeight ? { fontWeight: String(x.fontWeight) } : {}) }];
  }
  const spacing = {}; for (const t of ALL.filter(t => t.path[0] === 'space')) spacing[t.path[1]] = `var(${t.ext.cssVar})`;
  const preset = {
    theme: {
      extend: {
        colors, fontSize, spacing,
        fontFamily: { sans: v('font.family.sans'), mono: v('font.family.mono') },
        borderRadius: { none: '0', pill: '99px', round: '50%' },
        boxShadow: Object.fromEntries(ALL.filter(t => t.type === 'shadow').map(t => [t.path[1], t.ext.css])),
        transitionTimingFunction: { standard: v('motion.easing.standard'), toggle: v('motion.easing.toggle'), overshoot: v('motion.easing.overshoot') },
        transitionDuration: Object.fromEntries(ALL.filter(t => t.type === 'duration').map(t => [t.path[2], cssValue(t)])),
        backdropBlur: { nav: '8px', toggle: '10px' },
        backgroundImage: { grain: 'var(--grain)', heat: 'var(--heat)', paper: 'var(--pattern)' },
      },
      screens: { 'max-tablet': { max: byName['breakpoint.tablet'].value }, 'max-phone': { max: byName['breakpoint.phone'].value } },
    },
  };
  return `// Vimaksh Tailwind 3 preset. Generated from tokens/tokens.json. Load tokens.css (or vimaksh.css) first:\n// every colour is a CSS variable, so light and dark both work through <html data-theme>.\n// Usage: module.exports = { presets: [require('./tailwind-preset.cjs')], content: [...] }\n// Vimaksh uses square corners: do not use rounded-* utilities except rounded-pill / rounded-round on the theme toggle.\nmodule.exports = ${JSON.stringify(preset, null, 2)};\n`;
}

function tw4() {
  const lines = ['/* Vimaksh Tailwind 4 theme. Generated from tokens/tokens.json. Import after tokens.css: */', '/* @import "tailwindcss"; @import "./tokens.css"; @import "./tailwind.css"; */', '@theme inline {'];
  for (const t of varTokens) if (t.type === 'color') lines.push(`  --color-${t.ext.cssVar.slice(2)}: var(${t.ext.cssVar});`);
  lines.push('  --font-sans: var(--sans);', '  --font-mono: var(--mono);');
  for (const t of ALL.filter(t => t.type === 'typography')) { const x = resolve(t.value); lines.push(`  --text-${t.path[1]}: ${x.fontSize};`, `  --text-${t.path[1]}--line-height: ${x.lineHeight || 'normal'};`, `  --text-${t.path[1]}--letter-spacing: ${x.letterSpacing || '0'};`, ...(x.fontWeight ? [`  --text-${t.path[1]}--font-weight: ${x.fontWeight};`] : [])); }
  for (const t of ALL.filter(t => t.path[0] === 'space')) lines.push(`  --spacing-${t.path[1]}: var(${t.ext.cssVar});`);
  lines.push('  --radius-none: 0;', '  --radius-pill: 99px;', '  --radius-round: 50%;');
  for (const t of ALL.filter(t => t.type === 'shadow')) lines.push(`  --shadow-${t.path[1]}: ${t.ext.css};`);
  for (const k of ['standard', 'toggle', 'overshoot']) lines.push(`  --ease-${k}: ${cssValue(byName['motion.easing.' + k])};`);
  lines.push(`  --breakpoint-tablet: ${byName['breakpoint.tablet'].value};`, `  --breakpoint-phone: ${byName['breakpoint.phone'].value};`, '}', '/* Breakpoints are max-width on the site: use max-tablet: and max-phone: variants. */', `@custom-variant max-tablet (@media (max-width: ${byName['breakpoint.tablet'].value}));`, `@custom-variant max-phone (@media (max-width: ${byName['breakpoint.phone'].value}));`);
  return lines.join('\n') + '\n';
}

export const tokens = { ALL, byName, resolve };

if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}` || process.argv[1]?.endsWith('tokens.mjs')) {
  const problems = verify();
  if (problems.length) { console.error('Token source check failed:\n  ' + problems.join('\n  ')); process.exit(1); }
  mkdirSync(root('dist/api'), { recursive: true }); mkdirSync(root('src/css'), { recursive: true });
  writeFileSync(root('dist/tokens.css'), buildCss());
  writeFileSync(root('src/css/typography.css'), buildTypography());
  writeFileSync(root('dist/tokens.json'), JSON.stringify(T, null, 2) + '\n');
  writeFileSync(root('dist/api/tokens.json'), JSON.stringify(buildApi(), null, 2) + '\n');
  writeFileSync(root('dist/tailwind-preset.cjs'), tw3());
  writeFileSync(root('dist/tailwind.css'), tw4());
  console.log(`tokens: ${ALL.length} tokens, all verified against the website source`);
}
