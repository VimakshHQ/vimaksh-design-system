// Docs-site behaviour: copy (prompt, page Markdown, code, icons), tabs, example width, icon search, easing demo,
// and theme sync with the example frames. The page's own behaviour comes from /dist/vimaksh.js.
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const tip = $('.tip');
let tipTimer = 0;

async function copy(text, e, el) {
  let ok = false;
  try { await navigator.clipboard.writeText(text); ok = true; } catch {
    const ta = Object.assign(document.createElement('textarea'), { value: text }); document.body.append(ta); ta.select();
    try { ok = document.execCommand('copy'); } catch {} ta.remove();
  }
  const r = el.getBoundingClientRect();
  if (tip) {
    tip.textContent = ok ? 'Copied ✓' : 'Copy failed';
    tip.style.left = (e.clientX || r.left + r.width / 2) + 'px'; tip.style.top = (e.clientY || r.top) + 'px';
    tip.classList.add('on'); clearTimeout(tipTimer); tipTimer = setTimeout(() => tip.classList.remove('on'), 1300);
  }
  const label = el.querySelector('span') || el, was = label.textContent;
  if (ok && !el.matches('.ds-icon')) { label.textContent = 'Copied ✓'; setTimeout(() => { label.textContent = was; }, 1600); }
}
const prompt = () => $('#ds-prompt')?.textContent || '';
$$('[data-copy-prompt]').forEach(b => b.addEventListener('click', e => copy(prompt(), e, b)));
$$('[data-copy-md]').forEach(b => b.addEventListener('click', e => copy($('#ds-md')?.textContent || '', e, b)));
$$('[data-copy-next]').forEach(b => b.addEventListener('click', e => copy(b.closest('.ds-code').querySelector('pre').textContent, e, b)));
$$('[data-copy-code]').forEach(b => b.addEventListener('click', e => copy(b.dataset.copyCode, e, b)));

// Tabs (Preview / Markdown / Source), with arrow keys; #markdown and #source open those tabs.
const tabs = $$('[role=tab]');
const select = (t, focus) => {
  tabs.forEach(x => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; $('#' + x.getAttribute('aria-controls')).hidden = !on; });
  if (focus) t.focus();
  const h = { 'tab-md': '#markdown', 'tab-src': '#source' }[t.id] || '';
  history.replaceState(null, '', location.pathname + h);
};
tabs.forEach((t, i) => {
  t.addEventListener('click', () => select(t));
  t.addEventListener('keydown', e => {
    const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!d) return;
    e.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length], true);
  });
});
const fromHash = { '#markdown': 'tab-md', '#source': 'tab-src' }[location.hash];
if (fromHash && $('#' + fromHash)) select($('#' + fromHash));

// Example frames: desktop or 390px wide.
$$('.ds-ex').forEach(fig => {
  const frame = $('.ds-frame', fig), iframe = $('iframe', fig);
  $$('[data-w]', fig).forEach(b => b.addEventListener('click', () => {
    iframe.style.width = b.dataset.w; frame.classList.toggle('is-narrow', b.dataset.w !== '100%');
    $$('[data-w]', fig).forEach(x => x.setAttribute('aria-pressed', x === b));
  }));
});

// Icon search.
const search = $('[data-icon-search]');
search?.addEventListener('input', () => { const q = search.value.trim().toLowerCase(); $$('.ds-icon').forEach(i => { i.hidden = q && !i.dataset.name.includes(q); }); });

// Easing demo.
$$('[data-ease]').forEach(b => b.addEventListener('click', () => {
  const fig = b.closest('.ds-curve'), ball = $('.ds-ball', fig);
  ball.style.transition = `transform 900ms ${b.dataset.ease}`;
  fig.classList.toggle('go');
}));

// Theme: example frames share localStorage, so a switch inside a frame updates the page too.
addEventListener('storage', e => {
  if (e.key !== 'vimaksh-theme' || !e.newValue) return;
  document.documentElement.dataset.theme = e.newValue; dispatchEvent(new Event('themechange'));
});

// Contents collapse on narrow screens.
if (matchMedia('(max-width:1100px)').matches) $$('.ds-side details').forEach(d => d.removeAttribute('open'));
