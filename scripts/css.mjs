// dist/vimaksh.css: the single-file drop-in = tokens + type classes + every live component, in that order.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { root, VERSION } from './config.mjs';
const r = p => readFileSync(root(p), 'utf8');
mkdirSync(root('dist/fonts'), { recursive: true });
for (const f of ['inter-tight.woff2', 'jetbrains-mono-500.woff2', 'InterTight-OFL.txt', 'JetBrainsMono-OFL.txt']) copyFileSync(root('source/fonts', f), root('dist/fonts', f));
const css = `/*! Vimaksh design system ${VERSION}. The design language of work.vimaksh.in in one file.
   Needs: fonts/ next to this file. Theme: <html data-theme="light|dark">. Phone field: load vendor/intl-tel-input.css first.
   Behaviour: <script type="module" src="vimaksh.js">. https://github.com/VimakshHQ/vimaksh-design-system */
${r('dist/tokens.css')}
${r('src/css/typography.css')}
${r('src/css/components.css')}`;
writeFileSync(root('dist/vimaksh.css'), css);
console.log(`css: vimaksh.css ${(css.length / 1024).toFixed(1)} KB`);
