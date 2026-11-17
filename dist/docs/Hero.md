# Hero

> The home opening: a living pixel surface (WebGL) where a field of tiny ">" and "<" glyphs flows across paper and the Vimaksh mark assembles from the same pixels. Copy sits top left, a mono meta line bottom left. The page rises over it as you scroll.

Vimaksh design system 0.1.0. HTML: /components/hero/ (local docs site). Source of truth: https://work.vimaksh.in at yakosasam797/vimakshwebsite-identity-final@8df1553.

## Use it

- Home page only (a site's landing page; a one-page product site counts as one). It is the one always-moving visual.
- The .hl highlight (red, wrapped in "<" ">") marks at most one phrase in the hero headline.

Needs: `vimaksh.css` and `vimaksh.js + pixel-hero.js`.

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### Pixel hero (WebGL; falls back to the static mark)

```html
<section class="hero" id="top" aria-label="Vimaksh — Boil the Ocean.">
  <div class="hero-in">
    <canvas id="stage" aria-label="The Vimaksh six-arrow mark, built from moving pixels" role="img"></canvas>
    <img class="stage-fallback" src="/dist/brand/svg/vimaksh-mark.svg" alt="" aria-hidden="true">
    <div class="hero-grain" aria-hidden="true"></div>
    <div class="hero-copy">
      <p class="t-mono label"><span class="chev">&gt;</span> Boil the Ocean.</p>
      <h1>We turn <span class="hl"><i aria-hidden="true">&lt;</i>what if?<i aria-hidden="true">&gt;</i></span> into products, platforms and experiments you can actually use.</h1>
      <div class="hero-cta"><a class="btn" href="#work"><span>Explore our work</span><span class="chev" aria-hidden="true">&gt;</span></a><a class="btn btn--ghost" href="/contact/"><span>Start a project</span></a></div>
    </div>
    <p class="hero-meta t-mono"><span>Studio / Bengaluru</span><span>12.92° N 77.60° E</span><span data-clock>--:--:--</span></p>
  </div>
  <div class="hero-dim" aria-hidden="true"></div>
</section>
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `section.hero` | element | Sticky, one viewport high (min 620px, 560px phones). |
| `canvas#stage` | element | The pixel surface; vimaksh.js loads pixel-hero.js only when it exists. |
| `img.stage-fallback` | element | The mark, shown when WebGL is unavailable (.no-gl). |
| `.hero-copy` | element | Label, H1 (with an optional .hl "<what if?>" highlight) and up to two buttons. The field thins out under it. |
| `.hero-meta.t-mono` | element | Small facts, bottom left; hidden on phones. |
| `.hero-dim / --p` | state (JS) | The hero dims and scales to .95 as the next section rises. |

## Do

- Keep the headline short enough to stay inside the copy box.
- Follow it with a section that has a paper pixel edge on top (.rise).

## Don't

- Do not add a second animated scene anywhere else.
- Do not place text over the mark.

## Accessibility

- The canvas has role="img" and a description; all copy is real DOM.
- With reduced motion the field runs at half speed; it pauses off screen and in hidden tabs.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| color.pixel.hero-mist-light | `--px-hero-mist-l` | `#DDE4FF` |
| color.pixel.hero-glyph-light | `--px-hero-glyph-l` | `#2D36FF` |
| color.brand.coral | `--coral` | `#FF5E55` |
| color.brand.red | `--red` | `#E42114` |
| typography.hero-lead | `` | `{"fontFamily":"'Inter Tight',ui-sans-serif,-apple-system,'Segoe UI',sans-serif","fontWeight":500,"fontSize":"clamp(28px,2.7vw,48px)","lineHeight":"1.04","letterSpacing":"-.035em"}` |

## Sources

- markup: [tools/v5pages.py:193-206](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/tools/v5pages.py#L193-L206)
- style: [src/v5/v5.css:111-124](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L111-L124)
- .hl: [src/v5/v5.css:586-588](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L586-L588)
- renderer: [src/v5/pixelhero.js:1-184](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/pixelhero.js#L1-L184)
