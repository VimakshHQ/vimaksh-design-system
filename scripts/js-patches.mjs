// The documented changes made to the website scripts so they work outside the website (used by js.mjs and docs).
export const PATCHES = {
  'main.js': [
    ['$$ returns an empty list when its scope is missing, so pages without a navigation stack do not throw', "$$ = (s, r = document) => [...r.querySelectorAll(s)];", "$$ = (s, r = document) => r ? [...r.querySelectorAll(s)] : [];"],
    ['intl-tel-input moved to vimaksh-phone.js, so pages without a phone field do not load it', /import intlTelInput from 'intl-tel-input';\nimport 'intl-tel-input\/styles';\n/, ''],
    ['phone field set-up moved to vimaksh-phone.js (same options)', /\$\$\('\[data-check=phone\]'\)\.forEach\(input => \{\n  input\.iti = intlTelInput\([\s\S]*?countrychange[^\n]*\n\}\);\n/, ''],
    ['the brief posts to the form\'s action attribute (default /api/brief, as on the site)', "fetch('/api/brief',", "fetch(f.getAttribute('action') || '/api/brief',"],
    ['the success message can be set with data-sent on the form ({name} and {email} are filled in); the default is the site wording', "note.textContent = `Thanks${d.name ? ', ' + d.name.trim().split(/\\s+/)[0] : ''}. Your brief is with us, and a confirmation is on its way to ${d.email}.`;", "note.textContent = f.dataset.sent ? f.dataset.sent.replace('{name}', d.name ? d.name.trim().split(/\\s+/)[0] : '').replace('{email}', d.email) : `Thanks${d.name ? ', ' + d.name.trim().split(/\\s+/)[0] : ''}. Your brief is with us, and a confirmation is on its way to ${d.email}.`;"],
    ['the fallback email in the error message can be set with data-email on the form (default hq@vimaksh.in)', "{ href: 'mailto:hq@vimaksh.in', textContent: 'hq@vimaksh.in' }", "{ href: 'mailto:' + (f.dataset.email || 'hq@vimaksh.in'), textContent: f.dataset.email || 'hq@vimaksh.in' }"],
    ['the hero module is loaded next to this file', "import('./pixelhero.js')", "import(new URL('./pixel-hero.js', import.meta.url).href)"],
  ],
  'pixelhero.js': [
    ['the mark is read from the brand folder next to this file', "fetch('/marks/vimaksh-mark.svg')", "fetch(new URL('./brand/svg/vimaksh-mark.svg', import.meta.url))"],
  ],
};
