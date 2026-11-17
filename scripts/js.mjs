// Package the website's behaviour as drop-in modules. The website scripts are used as they are (source/site),
// with a short list of documented patches so they work outside the website (paths, endpoints, the phone
// library split out). Outputs: dist/vimaksh.js, dist/vimaksh-phone.js, dist/pixel-hero.js (+ shared chunks),
// dist/vendor/intl-tel-input.css and its flag images.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, rmSync, readdirSync } from 'node:fs';
import { build } from 'esbuild';
import { root } from './config.mjs';
import { PATCHES } from './js-patches.mjs';

const src = f => readFileSync(root('source/site', f), 'utf8');
const out = root('src/js');
mkdirSync(out, { recursive: true });

// Each patch: [description, from, to]. A patch that does not apply fails the build, so a website change is noticed.
function patch(name, text, patches) {
  for (const [why, from, to] of patches) {
    const next = from instanceof RegExp ? text.replace(from, to) : text.split(from).join(to);
    if (next === text) throw new Error(`${name}: patch did not apply: ${why}`);
    text = next;
  }
  return `// From work.vimaksh.in ${name} (see source/SOURCE_COMMIT). Patched for the design system:\n${patches.map(p => `//  - ${p[0]}`).join('\n')}\n${text}`;
}
writeFileSync(root('src/js/vimaksh.js'), patch('src/v5/main.js', src('main.js'), PATCHES['main.js']));
writeFileSync(root('src/js/pixel-hero.js'), patch('src/v5/pixelhero.js', src('pixelhero.js'), PATCHES['pixelhero.js']));
for (const f of ['pixelart.js', 'pixelsaas.js', 'validate.js']) writeFileSync(root('src/js', f), `// From work.vimaksh.in src/v5/${f}, unchanged.\n` + src(f));

// The phone field, exactly as main.js sets it up (src/v5/main.js:72-82).
writeFileSync(root('src/js/vimaksh-phone.js'), `// The phone field from work.vimaksh.in (src/v5/main.js:72-82): intl-tel-input with every country, flags,
// search, India preselected, strict input. Load after vimaksh.js. Also load vendor/intl-tel-input.css before vimaksh.css.
import intlTelInput from 'intl-tel-input';
export function initPhone(scope = document) {
  scope.querySelectorAll('[data-check=phone]').forEach(input => {
    if (input.iti) return;
    input.iti = intlTelInput(input, {
      initialCountry: 'in',
      countryOrder: ['in', 'ae', 'us', 'gb', 'sg', 'au', 'ca', 'sa'],
      separateDialCode: true,
      strictMode: true,                 // only digits can be typed, and no more than the country allows
      countrySearch: true,
      formatAsYouType: true,
      loadUtils: () => import('intl-tel-input/utils'),
      uiTranslations: { searchPlaceholder: 'Search country or code' },
    });
    // the site re-checks the number when the country changes; its blur handler runs the same check
    input.addEventListener('countrychange', () => { if (input.value.trim()) input.dispatchEvent(new Event('blur')); });
  });
}
initPhone();
`);

for (const f of readdirSync(root('dist')).filter(f => /^(chunk-|vimaksh.*\.js|pixel-hero\.js)/.test(f))) rmSync(root('dist', f));
await build({
  entryPoints: { vimaksh: root('src/js/vimaksh.js'), 'vimaksh-phone': root('src/js/vimaksh-phone.js'), 'pixel-hero': root('src/js/pixel-hero.js') },
  outdir: root('dist'), bundle: true, splitting: false, format: 'esm', minify: true, target: 'es2020',
  legalComments: 'inline', logLevel: 'warning',
  banner: { js: '/* Vimaksh design system: https://github.com/yakosasam797/vimaksh-design-system */' },
});
// The pixel drawing functions as plain modules, for drawing motifs at any size.
mkdirSync(root('dist/pixel'), { recursive: true });
for (const f of ['pixelart.js', 'pixelsaas.js']) copyFileSync(root('src/js', f), root('dist/pixel', f));
mkdirSync(root('dist/vendor/img'), { recursive: true });
const iti = root('node_modules/intl-tel-input/dist');
writeFileSync(root('dist/vendor/intl-tel-input.css'), `/* intl-tel-input 29.5.11 (MIT), https://github.com/jackocnr/intl-tel-input */\n` + readFileSync(`${iti}/css/intlTelInput.min.css`, 'utf8').replaceAll('../img/', 'img/'));
for (const f of readdirSync(`${iti}/img`)) copyFileSync(`${iti}/img/${f}`, root('dist/vendor/img', f));
console.log('js: vimaksh.js, vimaksh-phone.js, pixel-hero.js built');
