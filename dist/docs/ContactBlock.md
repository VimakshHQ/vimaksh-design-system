# Contact block

> Bordered card blocks made of rows: a red "Start a project" row that drops open the brief form, plain rows with copy pills, and a split block for the studio address and coordinates.

Vimaksh design system 0.1.0. HTML: /components/contact-block/ (local docs site). Source of truth: https://work.vimaksh.in at VimakshHQ/vimakshwebsite-identity-final@8df1553.

## Use it

- On the contact page; the footer uses the same brief as a light card (.fbrief).

Needs: `vimaksh.css` and `vimaksh.js + vimaksh-phone.js`.

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### Contact page (click "Start a project")

```html
<section class="contact-page" aria-labelledby="ct-h">
  <div class="ct-left">
    <p class="t-mono label"><span class="chev">&gt;</span> Contact</p>
    <h1 id="ct-h" class="t-hero">The best work begins with the right introduction.</h1>
  </div>
  <div class="ct-right">
    <div class="block">
      <div class="brief">
        <button class="row row--brief" type="button" aria-expanded="false" aria-controls="brief-panel" data-brief>
          <span>Start a project</span><span class="pill t-mono">Submit brief <span class="tri" aria-hidden="true">▸</span></span>
        </button>
        <div class="brief-panel" id="brief-panel"><div>
          <form class="brief-form" data-brief-form novalidate>
            <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
            <div class="f2"><label><span class="t-mono">Name</span><input name="name" required autocomplete="name"></label>
            <label><span class="t-mono">Email</span><input name="email" type="email" required autocomplete="email" maxlength="254" data-check="email"><span class="ferr" aria-live="polite"></span></label></div>
            <div class="f2"><label><span class="t-mono">Phone</span><input name="phone" type="tel" required autocomplete="tel" data-check="phone"><span class="ferr" aria-live="polite"></span></label>
            <label><span class="t-mono">Company <i>(optional)</i></span><input name="company" autocomplete="organization"></label></div>
            <label><span class="t-mono">Tell us about it</span><textarea name="message" rows="4" required></textarea></label>
            <div class="f-foot"><button class="btn" type="submit"><span>Send brief</span><span class="chev" aria-hidden="true">&gt;</span></button><p class="t-mono note" data-brief-note aria-live="polite"></p></div>
          </form>
        </div></div>
      </div>
      <div class="row"><span>General enquiries</span><button class="pill t-mono" type="button" data-copy="hq@vimaksh.in">hq@vimaksh.in</button></div>
      <div class="row"><span>New projects</span><button class="pill t-mono" type="button" data-copy="hq@vimaksh.in">hq@vimaksh.in</button></div>
    </div>
    <div class="block block--split">
      <div class="cell"><span>Studio</span><address class="addr"><a href="https://maps.app.goo.gl/ktwso9ycC2Ufo8Tt7" target="_blank" rel="noopener">3rd Floor, Eshaaya 1629<br>E End Main Rd, 4th T Block East<br>Jayanagar 9th Block, Tilak Nagar<br>Bengaluru, Karnataka 560041</a></address></div>
      <div class="cell"><span class="t-mono soft">Coordinates</span><button class="pill t-mono" type="button" data-copy="12.9210° N, 77.5960° E">12.92° N 77.60° E</button><span class="t-mono soft">Bengaluru now · <span data-clock>--:--:--</span> IST</span></div>
    </div>
  </div>
</section>
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `.block` | class | --rule2 border on --card. |
| `.row` | class | 20px 22px, 17px text, hairline between rows. A <button> or <div>. |
| `button.row.row--brief[data-brief][aria-expanded]` | element | The red row; toggles .brief.open and focuses the first field. |
| `.brief-panel` | element | Opens by animating grid-template-rows 0fr → 1fr over .6s. |
| `.block--split > .cell` | element | Two cells (1.6fr / 1fr), stacked on phones. |

## Do

- Keep the brief one click away and show the email beside it.

## Don't

- Do not hide the email behind the form.

## Accessibility

- The red row is a real button with aria-expanded and aria-controls.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| color.brand.red | `--red` | `#E42114` |
| color.brand.red-d | `--red-d` | `#B5180E` |
| color.theme.card | `--card` | `#FBFAF7 / #17192E` |
| color.theme.rule2 | `--rule2` | `rgba(44,20,18,.3) / rgba(221,228,255,.3)` |

## Sources

- markup: [tools/v5pages.py:244-267](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/tools/v5pages.py#L244-L267)
- style: [src/v5/v5.css:224-266](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L224-L266)
- red row: [src/v5/v5.css:483-492](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L483-L492)
- toggle: [src/v5/main.js:55-62](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/main.js#L55-L62)
