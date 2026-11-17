# Footer

> Always dark (night) in both themes. A pixel edge breaks its top, the mark flies in, a large statement sits beside the brief card, four columns of facts follow, and a heat-gradient base carries the giant white wordmark.

Vimaksh design system 0.1.0. HTML: /components/footer/ (local docs site). Source of truth: https://work.vimaksh.in at yakosasam797/vimakshwebsite-identity-final@8df1553.

## Use it

- On every page.

Needs: `vimaksh.css` and `vimaksh.js`.

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### Footer

```html
<footer class="foot" id="footer" data-tone="dark">
  <canvas class="edge edge--top" data-edge="night" aria-hidden="true"></canvas>
  <div class="foot-in">
    <div class="foot-top">
      <div class="foot-say">
        <div class="fmark" role="img" aria-label="Vimaksh mark"><!-- the mark: inline brand/svg/vimaksh-mark.svg here with aria-hidden="true" focusable="false" --></div>
        <div class="foot-copy">
        <p class="t-mono label"><span class="chev">&gt;</span> Let's talk</p>
        <h2 class="t-statement">Come build what<br>should exist.</h2>
        <p class="foot-sub">Tell us what you want to build. We read every brief and reply within two working days with honest next steps.</p>
        </div>
      </div>
      <div class="block fbrief" id="brief">
        <div class="row row--brief"><span>Start a project</span><button class="pill t-mono" type="button" data-copy="hq@vimaksh.in">hq@vimaksh.in</button></div>
          <form class="brief-form" data-brief-form novalidate>
            <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
            <div class="f2"><label><span class="t-mono">Name</span><input name="name" required autocomplete="name"></label>
            <label><span class="t-mono">Email</span><input name="email" type="email" required autocomplete="email" maxlength="254" data-check="email"><span class="ferr" aria-live="polite"></span></label></div>
            <div class="f2"><label><span class="t-mono">Phone</span><input name="phone" type="tel" required autocomplete="tel" data-check="phone"><span class="ferr" aria-live="polite"></span></label>
            <label><span class="t-mono">Company <i>(optional)</i></span><input name="company" autocomplete="organization"></label></div>
            <label><span class="t-mono">Tell us about it</span><textarea name="message" rows="3" required></textarea></label>
            <div class="f-foot"><button class="btn" type="submit"><span>Send brief</span><span class="chev" aria-hidden="true">&gt;</span></button><p class="t-mono note" data-brief-note aria-live="polite"></p></div>
          </form>
      </div>
    </div>
    <div class="cols">
      <div><p class="t-mono k">Navigate</p><ul><li><a href="/#work">Work</a></li><li><a href="/#services">What we build</a></li><li><a href="/#about">About us</a></li><li><a href="/contact/">Contact</a></li></ul></div>
      <div class="col-addr"><p class="t-mono k">Studio</p><address><a href="https://maps.app.goo.gl/ktwso9ycC2Ufo8Tt7" target="_blank" rel="noopener">3rd Floor, Eshaaya 1629<br>E End Main Rd, 4th T Block East<br>Jayanagar 9th Block, Tilak Nagar<br>Bengaluru, Karnataka 560041</a></address></div>
      <div><p class="t-mono k">Coordinates</p><p class="t-mono v">12.9210° N<br>77.5960° E</p></div>
      <div><p class="t-mono k">Bengaluru now</p><p class="t-mono v"><span data-clock>--:--:--</span> IST</p></div>
    </div>
  </div>
  <div class="foot-base heat" data-pixel-mask>
    <div class="giant" aria-hidden="true"><!-- the wordmark: inline brand/svg/vimaksh-wordmark.svg here with class="wm" aria-hidden="true" focusable="false" and every fill="currentColor" --></div>
    <div class="fine t-mono"><span>© <span data-year>2026</span> Vimaksh</span><span>Bengaluru, India</span></div>
  </div>
</footer>
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `footer.foot` | element | var(--pattern-dark) on night; text #ECEEFF. |
| `canvas.edge.edge--top[data-edge=night]` | element | Pixel edge in night colour above the footer. |
| `.fmark` | element | The mark; its six arrows fly in when 60% visible (and on hover), the red one last. |
| `.foot-say` | element | Label, t-statement headline, supporting line. |
| `.cols` | element | Four columns (two below 1100px): mono keys, 16px links with a coral "> " on hover. |
| `.foot-base.heat[data-pixel-mask]` | element | Heat gradient whose top edge is cut into squares by a mask; giant wordmark; fine print. |

## Do

- Keep it dark in both themes.
- Keep facts factual: real email, real address, real coordinates.

## Don't

- Do not use the heat gradient anywhere else.
- Do not add social icons that do not exist.

## Accessibility

- The mark has role="img" and a label; the giant wordmark is aria-hidden (the name is elsewhere in text).
- Columns are real lists.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| color.brand.night | `--night` | `#0D0E1C` |
| pattern.heat | `--heat` | `radial-gradient(120% 90% at 0% 100%,#1A3FD8 0%,rgba(45,54,255,.55) 28%,transparent 55%),radial-gradient(80% 70% at 85% 80%,#5A0C12 0%,rgba(140,20,20,.6) 35%,transparent 70%),radial-gradient(90% 80% at 60% 20%,#FF7A70 0%,rgba(255,94,85,.6) 30%,transparent 65%),linear-gradient(160deg,#E42114 0%,#FF5E55 40%,#9C2B5A 70%,#2D36FF 100%)` |
| pattern.paper-dark | `--pattern-dark` | `var(--cross-l) 0 0/192px 192px,radial-gradient(circle at 1px 1px,rgba(221,228,255,.06) .9px,transparent 1.3px) 0 0/24px 24px` |
| color.footer.text | `--foot-text` | `#ECEEFF` |
| color.footer.label | `--foot-label` | `#9aa0c8` |
| color.footer.key | `--foot-key` | `#7b81aa` |
| typography.statement | `.t-statement` | `{"fontFamily":"'Inter Tight',ui-sans-serif,-apple-system,'Segoe UI',sans-serif","fontWeight":500,"fontSize":"clamp(44px,7vw,112px)","lineHeight":".92","letterSpacing":"-.045em"}` |

## Sources

- markup: [tools/v5pages.py:82-115](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/tools/v5pages.py#L82-L115)
- base: [src/v5/v5.css:268-296](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L268-L296)
- v8: [src/v5/v5.css:494-509](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L494-L509)
- layout: [src/v5/v5.css:693-742](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L693-L742)
- mark animation: [src/v5/main.js:203-221](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/main.js#L203-L221)
- pixel mask: [src/v5/main.js:142-162](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/main.js#L142-L162)
