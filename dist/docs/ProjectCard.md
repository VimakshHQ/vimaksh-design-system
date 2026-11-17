# Project card

> A product in the work grid: 4:5 video (4:3 on phones) with a number and the product's own logo on a paper chip, then title and mono kind, a one-line description, and a full-width visit bar.

Vimaksh design system 0.1.0. HTML: /components/project-card/ (local docs site). Source of truth: https://work.vimaksh.in at yakosasam797/vimakshwebsite-identity-final@8df1553.

## Use it

- Real products only, with real recorded video and the product's own logo.
- Three per row on desktop, two below 1100px, one below 760px.

Needs: `vimaksh.css` and `vimaksh.js`.

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### Two cards in the work grid

```html
  <div class="grid3">
      <article class="card">
        <a class="media" href="https://paryatech.in" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">
          <video muted loop playsinline preload="metadata" poster="/examples/media/paryatech.jpg" src="/examples/media/paryatech.mp4"></video>
          <span class="veil"></span><span class="num t-mono" aria-hidden="true">01</span>
          <span class="plogo"><img src="/examples/media/paryatech-wordmark.svg" alt="Paryatech" loading="lazy"></span>
        </a>
        <div class="meta"><h3>Paryatech</h3><span class="t-mono kind">Travel SaaS</span></div>
        <p>Brings a travel agency’s enquiries, itineraries, bookings and finances together in one place.</p>
        <a class="bar t-mono" href="https://paryatech.in" target="_blank" rel="noopener"><span class="bt">Visit paryatech.in</span><span class="sr"> (opens in a new tab)</span><span class="chev" aria-hidden="true">&gt;</span></a>
      </article>
      <article class="card">
        <a class="media" href="https://sachit.vimaksh.in/" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">
          <video muted loop playsinline preload="metadata" poster="/examples/media/sachit.jpg" src="/examples/media/sachit.mp4"></video>
          <span class="veil"></span><span class="num t-mono" aria-hidden="true">02</span>
          <span class="plogo plogo--icon"><img src="/examples/media/sachit.svg" alt="" loading="lazy"><b>Sachit</b></span>
        </a>
        <div class="meta"><h3>Sachit</h3><span class="t-mono kind">Support desk</span></div>
        <p>Turns emails and in-app requests into support tickets your team can organise, track and resolve.</p>
        <a class="bar t-mono" href="https://sachit.vimaksh.in/" target="_blank" rel="noopener"><span class="bt">Visit sachit.vimaksh.in</span><span class="sr"> (opens in a new tab)</span><span class="chev" aria-hidden="true">&gt;</span></a>
      </article></div>
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `article.card` | element | Flex column; the bar is pushed to the bottom so cards in a row align. |
| `a.media` | element | Video link, tabindex -1 and aria-hidden: the visit bar is the one real link. |
| `video` | element | muted loop playsinline preload="metadata" with a poster; plays only while on screen. |
| `.veil` | element | Light top-to-bottom darkening plus grain at .35 overlay. |
| `.num.t-mono` | element | Large white number, 01–06, bottom left. |
| `.plogo` | element | The product logo on a paper chip (see Logo chip). |
| `.meta > h3 + .kind` | element | Title and a lowercase mono kind ("travel saas"). |
| `a.bar.t-mono` | element | "Visit host >", opens in a new tab with a visually hidden "(opens in a new tab)". |

## Do

- Write the description as one plain sentence about what the product does.
- Keep video saturation at .82 until hover.

## Don't

- Do not recolour product logos or tint videos.
- Do not round the media or add shadows.
- Do not invent products, metrics or clients to fill the grid.

## Accessibility

- One link per card (the bar); the media link is hidden from assistive tech to avoid duplicates.
- The logo image carries the product name as alt.
- Videos are muted and decorative; they pause off screen.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| color.theme.card | `--card` | `#FBFAF7 / #17192E` |
| typography.card-title | `` | `{"fontFamily":"'Inter Tight',ui-sans-serif,-apple-system,'Segoe UI',sans-serif","fontWeight":500,"fontSize":"clamp(18px,1.4vw,22px)","letterSpacing":"-.02em"}` |
| typography.card-copy | `` | `{"fontFamily":"'Inter Tight',ui-sans-serif,-apple-system,'Segoe UI',sans-serif","fontSize":"15px","lineHeight":"1.42"}` |
| space.grid-gap | `--grid-gap` | `14px` |
| space.grid-row-gap | `--grid-row-gap` | `clamp(40px,4vw,64px)` |
| motion.duration.media | `--dur-media` | `1400ms` |

## Sources

- markup: [tools/v5pages.py:152-169](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/tools/v5pages.py#L152-L169)
- content: [tools/v5pages.py:131-150](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/tools/v5pages.py#L131-L150)
- style: [src/v5/v5.css:139-155](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L139-L155)
- v8: [src/v5/v5.css:430-435](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L430-L435)
- visit bar: [src/v5/v5.css:597-607](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L597-L607)
- video in view: [src/v5/main.js:138-140](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/main.js#L138-L140)
