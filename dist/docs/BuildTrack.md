# Build card and track

> The "What we build" row: cards with a pixel tile in the item's own colour, a numbered tag, a square bullet and a short description, on a track that drifts sideways on its own and pauses on hover, touch or focus.

Vimaksh design system 0.1.0. HTML: /components/build-track/ (local docs site). Source of truth: https://work.vimaksh.in at VimakshHQ/vimakshwebsite-identity-final@8df1553.

## Use it

- For a set of parallel categories, each with its own colour.

Needs: `vimaksh.css` and `vimaksh.js`.

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### What we build (it drifts; hover to slow, use the arrows)

```html
<section class="build" id="services" aria-labelledby="build-h">
  <div class="build-head">
    <p class="t-mono label"><span class="chev">&gt;</span> What we build</p>
    <div class="build-copy">
      <h2 id="build-h" class="t-big">Custom software, and nothing else. From a Chrome extension to an industry-specific SaaS, AI automation, CRM or ERP: if your business runs on it, we build it.</h2>
    </div>
  </div>
  <ul class="track" data-track aria-label="Types of software we build">
      <li class="bcard" style="--c:#2D36FF">
        <div class="btile"><canvas class="px" data-px="saas" data-kind="extension" data-c="#2D36FF" aria-hidden="true"></canvas><span class="t-mono bn">01</span></div>
        <h3>Chrome extensions</h3>
        <p>Tools that live in the browser, right where your team already works.</p>
      </li>
      <li class="bcard" style="--c:#E42114">
        <div class="btile"><canvas class="px" data-px="saas" data-kind="saas" data-c="#E42114" aria-hidden="true"></canvas><span class="t-mono bn">02</span></div>
        <h3>Industry SaaS</h3>
        <p>Platforms shaped around one industry’s real workflows, not a generic template.</p>
      </li>
      <li class="bcard" style="--c:#7A3CD6">
        <div class="btile"><canvas class="px" data-px="saas" data-kind="ai" data-c="#7A3CD6" aria-hidden="true"></canvas><span class="t-mono bn">03</span></div>
        <h3>AI automation</h3>
        <p>Agents and pipelines that read, sort, draft and decide, so people don’t have to.</p>
      </li>
      <li class="bcard" style="--c:#0E8F6E">
        <div class="btile"><canvas class="px" data-px="saas" data-kind="crm" data-c="#0E8F6E" aria-hidden="true"></canvas><span class="t-mono bn">04</span></div>
        <h3>CRM</h3>
        <p>Leads, conversations and follow-ups in one place, built around how you sell.</p>
      </li>
      <li class="bcard" style="--c:#E8730C">
        <div class="btile"><canvas class="px" data-px="saas" data-kind="erp" data-c="#E8730C" aria-hidden="true"></canvas><span class="t-mono bn">05</span></div>
        <h3>ERP</h3>
        <p>Inventory, orders, finance and people, connected end to end.</p>
      </li>
      <li class="bcard" style="--c:#0A8FB0">
        <div class="btile"><canvas class="px" data-px="saas" data-kind="dashboard" data-c="#0A8FB0" aria-hidden="true"></canvas><span class="t-mono bn">06</span></div>
        <h3>Internal tools</h3>
        <p>Admin panels and dashboards that turn scattered data into clear decisions.</p>
      </li>
      <li class="bcard" style="--c:#C99400">
        <div class="btile"><canvas class="px" data-px="saas" data-kind="integrations" data-c="#C99400" aria-hidden="true"></canvas><span class="t-mono bn">07</span></div>
        <h3>Integrations & APIs</h3>
        <p>The glue between your systems: syncs, webhooks and APIs that just work.</p>
      </li>
      <li class="bcard" style="--c:#D23C7E">
        <div class="btile"><canvas class="px" data-px="saas" data-kind="mobile" data-c="#D23C7E" aria-hidden="true"></canvas><span class="t-mono bn">08</span></div>
        <h3>Mobile & field apps</h3>
        <p>Apps for the people on the move, online or off.</p>
      </li>
  </ul>
  <div class="track-foot">
    <span class="track-bar" aria-hidden="true"><i data-track-bar></i></span>
    <div class="track-btns"><button type="button" class="tbtn" data-track-prev aria-label="Previous"><span class="chev" aria-hidden="true">&lt;</span></button><button type="button" class="tbtn" data-track-next aria-label="Next"><span class="chev" aria-hidden="true">&gt;</span></button></div>
  </div>
</section>
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `ul.track[data-track]` | element | Horizontal scroller. vimaksh.js clones the cards once so the drift loops. |
| `li.bcard[style="--c:…"]` | element | One kind of software; --c is its colour (color.kind.*). |
| `canvas.px[data-px=saas][data-kind][data-c]` | element | The pixel tile, drawn by pixel/pixelsaas.js and redrawn on theme change. |
| `.bn.t-mono` | element | The number on the colour. |
| `.track-foot` | element | Scrubber ([data-track-bar]) and arrow buttons ([data-track-prev], [data-track-next]). |

## Do

- Use only the eight kind colours, one per card.

## Don't

- Do not use kind colours anywhere else in the interface.
- Do not let it drift with reduced motion faster than 18px/s (vimaksh.js handles this).

## Accessibility

- Clones are aria-hidden.
- Drift stops while a card inside has keyboard focus.
- Arrow buttons have aria-labels.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| color.kind.extension | `--kind-extension` | `#2D36FF` |
| border.stripe | `--stripe` | `3px` |
| typography.build-title | `` | `{"fontFamily":"'Inter Tight',ui-sans-serif,-apple-system,'Segoe UI',sans-serif","fontWeight":500,"fontSize":"clamp(19px,1.5vw,24px)","letterSpacing":"-.02em"}` |
| space.grid-gap | `--grid-gap` | `14px` |

## Sources

- content and card: [tools/v5pages.py:172-188](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/tools/v5pages.py#L172-L188)
- section: [tools/v5pages.py:228-242](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/tools/v5pages.py#L228-L242)
- style: [src/v5/v5.css:460-481](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L460-L481)
- drift: [src/v5/main.js:228-277](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/main.js#L228-L277)
- pixel tiles: [src/v5/pixelsaas.js:34-112](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/pixelsaas.js#L34-L112)
