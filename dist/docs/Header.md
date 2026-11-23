# Header

> The wordmark at top left and the theme toggle at top right. Transparent at the top of the page; once you scroll it gets its own paper backing, hides while you read down and returns when you scroll up.

Vimaksh design system 0.1.0. HTML: /components/header/ (local docs site). Source of truth: https://work.vimaksh.in at VimakshHQ/vimakshwebsite-identity-final@8df1553.

## Use it

- Put it first in <body>, after the skip link, on every page.
- Keep the wordmark inline (not <img>) so it takes the header colour in both themes.

Needs: `vimaksh.css` and `vimaksh.js`.

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### Header (scroll the frame to see it solidify and hide)

```html
<header class="hdr">
  <a class="brandlink" href="/" aria-label="Vimaksh, home"><!-- the wordmark: inline brand/svg/vimaksh-wordmark.svg here with class="wm" aria-hidden="true" focusable="false" and every fill="currentColor" --></a>
  <div class="hdr-r">
    <button class="toggle" type="button" aria-label="Switch to dark theme" data-toggle-theme>
      <span class="ghost g-sun" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M5.3 18.7l1.5-1.5M17.2 6.8l1.5-1.5"/></svg></span>
      <span class="ghost g-moon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg></span>
      <span class="knob" aria-hidden="true">
        <svg class="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M5.3 18.7l1.5-1.5M17.2 6.8l1.5-1.5"/></svg>
        <svg class="i-moon" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>
      </span>
    </button>
  </div>
</header>
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `.hdr` | class | Fixed header bar. Pointer events pass through except on its children. |
| `.hdr.solid` | state (JS) | Added after 24px of scroll: paper background and a bottom hairline. |
| `.hdr.hide` | state (JS) | Added while scrolling down past 140px; removed on any upward scroll. |
| `.hdr.on-dark` | state (JS) | Added while the dark footer is under the header: text turns #F4F5FF. |
| `.brandlink > svg.wm` | element | The wordmark inlined with fill="currentColor", 24px high (20px on phones). aria-label on the link: "Vimaksh, home". |
| `.hdr-r` | element | Right-hand slot; holds the theme toggle. |

## Do

- Use the real wordmark SVG from brand/svg.
- Let the script manage solid/hide/on-dark.

## Don't

- Do not add navigation links to the header: navigation lives in the navigation stack.
- Do not give the header a shadow or blur; its backing is flat paper with one hairline.

## Accessibility

- The brand link has aria-label "Vimaksh, home"; the SVG is aria-hidden.
- Hiding on scroll never moves focus; the header returns on any upward scroll.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| space.hdr | `--hdr` | `78px` |
| color.theme.paper | `--paper` | `#F4F2EE / #0F1020` |
| color.theme.rule | `--rule` | `rgba(44,20,18,.14) / rgba(221,228,255,.12)` |
| color.theme.strong | `--strong` | `#0B0A14 / #F4F5FF` |
| motion.easing.standard | `--ease` | `cubic-bezier(.2,.8,.2,1)` |

## Sources

- markup: [tools/v5pages.py:44-57](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/tools/v5pages.py#L44-L57)
- base: [src/v5/v5.css:58-66](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L58-L66)
- solid / hide / wordmark: [src/v5/v5.css:563-574](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L563-L574)
- scroll behaviour: [src/v5/main.js:171-196](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/main.js#L171-L196)
