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

// Sidebar as a drawer on narrow screens.
const menu = $('[data-ds-menu]'), scrim = $('[data-ds-scrim]');
const setNav = open => { document.body.classList.toggle('ds-nav-open', open); menu?.setAttribute('aria-expanded', open); if (scrim) scrim.hidden = !open; };
menu?.addEventListener('click', () => setNav(!document.body.classList.contains('ds-nav-open')));
scrim?.addEventListener('click', () => setNav(false));
addEventListener('keydown', e => { if (e.key === 'Escape' && document.body.classList.contains('ds-nav-open')) { setNav(false); menu?.focus(); } });
const curLink = $('.ds-side [aria-current]');
if (curLink) { const side = $('.ds-side'); side.scrollTop = curLink.offsetTop - side.clientHeight / 2; }

// Find a page: filters the sidebar; Enter opens the first match. "/" focuses it.
const find = $('[data-ds-find]');
const matches = () => $$('.ds-side li').filter(li => !li.hidden);
find?.addEventListener('input', () => {
  const q = find.value.trim().toLowerCase();
  $$('.ds-side li').forEach(li => { li.hidden = !!q && !li.firstElementChild.dataset.find.includes(q); });
  $$('.ds-side-k').forEach(k => { k.hidden = !!q && !$$('li', k.nextElementSibling).some(li => !li.hidden); });
  $('.ds-side-none').hidden = !q || matches().length > 0;
});
find?.addEventListener('keydown', e => { if (e.key === 'Enter') { const a = matches()[0]?.firstElementChild; if (a) location.href = a.href; } });
addEventListener('keydown', e => { if (e.key === '/' && document.activeElement === document.body && find && find.offsetParent) { e.preventDefault(); find.focus(); } });

// On this page: the h2s of the visible panel (or of the overview).
const toc = $('.ds-toc');
const spy = () => {
  if (!toc || toc.hidden) return;
  const links = $$('a', toc); let cur = links[0];
  for (const a of links) { const h = document.getElementById(a.hash.slice(1)); if (h && h.getBoundingClientRect().top < 140) cur = a; }
  links.forEach(a => a.toggleAttribute('aria-current', a === cur));
};
const buildToc = () => {
  if (!toc) return;
  const scope = $('.ds-panel:not([hidden])') || $('.ds-doc');
  const hs = $$('h2.ds-h2', scope);
  toc.hidden = hs.length < 2;
  $('ul', toc).replaceChildren(...hs.map((h, i) => {
    if (!h.id) h.id = h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 's' + i;
    const li = document.createElement('li');
    li.append(Object.assign(document.createElement('a'), { href: '#' + h.id, textContent: h.textContent }));
    return li;
  }));
  spy();
};
addEventListener('scroll', () => requestAnimationFrame(spy), { passive: true });
tabs.forEach(t => t.addEventListener('click', () => setTimeout(buildToc)));
buildToc();
