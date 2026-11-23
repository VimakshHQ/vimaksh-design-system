# About block

> A short statement section: a compact pixel illustration on the left and one large paragraph (t-big) on the right, centred on one line.

Vimaksh design system 0.1.0. HTML: /components/about-block/ (local docs site). Source of truth: https://work.vimaksh.in at VimakshHQ/vimakshwebsite-identity-final@8df1553.

## Use it

- Once per page, for who we are.

Needs: `vimaksh.css` and `vimaksh.js`.

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### About on the home page

```html
<section class="about-home" id="about" aria-labelledby="about-h">
  <div class="ab-text">
    <p class="t-mono label"><span class="chev">&gt;</span> About us</p>
    <h2 id="about-h" class="t-big">Vimaksh builds digital products with a distinct perspective and a practical approach. The company brings clarity to product decisions, care to design and depth to engineering, shaping each experience around the people who use it.</h2>
  </div>
  <figure class="ab-art"><canvas class="px" data-px="desk" role="img" aria-label="Pixel illustration: a studio desk with a laptop showing the mark's arrows, a red mug and a plant"></canvas></figure>
</section>
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `section.about-home` | element | Grid clamp(220px,24vw,340px) + 1fr; one column below 760px. |
| `.ab-art canvas.px[data-px=desk]` | element | The pixel desk, with role="img" and a written description. |
| `h2.t-big` | element | The statement. |

## Do

- Describe the illustration in aria-label.

## Don't

- Do not replace the illustration with a stock photo.

## Accessibility

- The canvas has role="img" and an aria-label describing the picture.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| typography.big | `.t-big` | `{"fontFamily":"'Inter Tight',ui-sans-serif,-apple-system,'Segoe UI',sans-serif","fontWeight":450,"fontSize":"clamp(26px,2.9vw,48px)","lineHeight":"1.08","letterSpacing":"-.03em","color":"var(--strong)"}` |
| space.section-compact | `--section-compact` | `clamp(56px,6vw,96px)` |

## Sources

- markup: [tools/v5pages.py:220-226](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/tools/v5pages.py#L220-L226)
- style: [src/v5/v5.css:609-613](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L609-L613)
- v10: [src/v5/v5.css:643-648](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L643-L648)
- compact: [src/v5/v5.css:689-691](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L689-L691)
- desk: [src/v5/pixelart.js:154-175](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/pixelart.js#L154-L175)
