# Brief form

> The project brief: name, email, phone, company (optional) and a message. Fields are underlines with mono labels; email and phone are checked as you type and explained when you leave the field. It posts JSON to the form's action (the site uses /api/brief) and shows an honest result.

Vimaksh design system 0.1.0. HTML: /components/brief-form/ (local docs site). Source of truth: https://work.vimaksh.in at yakosasam797/vimakshwebsite-identity-final@8df1553.

## Use it

- For starting a conversation. Ask only what you need.

Needs: `vimaksh.css` and `vimaksh.js + vimaksh-phone.js`.

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### Footer brief card (light card on the dark footer)

```html
<div class="foot" style="padding:40px var(--pad)"><div style="max-width:620px">      <div class="block fbrief" id="brief">
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
      </div></div></div><div class="tip t-mono" aria-hidden="true">Copy</div>
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `form.brief-form[data-brief-form][novalidate]` | element | vimaksh.js validates and submits; posts to action (default /api/brief). |
| `label.hp` | element | Honeypot field, off screen and aria-hidden. |
| `.f2` | class | Two fields side by side; one column below 760px. |
| `label > span.t-mono + input` | element | Label above, underline input (16px, 12px 0 padding). |
| `i (inside the label)` | element | "(optional)" at 70% opacity. |
| `[data-check=email|phone]` | attribute | Live checks; the message goes in the label's .ferr. |
| `.f-foot > .btn + p.note[data-brief-note]` | element | Submit and the result line (.is-ok green, .is-err red). |
| `form[action]` | attribute | Where the JSON is posted. Default /api/brief. The endpoint must answer {"ok":true} or {"ok":false,"error":"…"}. |
| `form[data-sent]` | attribute | Success message; {name} and {email} are filled in. Default: "Thanks, {name}. Your brief is with us, and a confirmation is on its way to {email}." |
| `form[data-email]` | attribute | The email offered in the error message. Default hq@vimaksh.in. |
| `.fbrief` | class | The light brief card on the dark footer (resets the light theme tokens locally). |

## Do

- Label every field; mark only the optional ones.
- Say what happened only after the real response.

## Don't

- Do not use placeholders as labels.
- Do not show success before the server confirms.

## Accessibility

- Errors are in aria-live regions inside the label.
- The first invalid field receives focus on submit.
- autocomplete is set on name, email, tel and organization.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| typography.mono | `.t-mono` | `{"fontFamily":"'JetBrains Mono',ui-monospace,Consolas,monospace","fontWeight":500,"fontSize":"11px","lineHeight":"1.45","letterSpacing":".06em","textTransform":"uppercase"}` |
| typography.field-error | `` | `{"fontFamily":"'JetBrains Mono',ui-monospace,Consolas,monospace","fontWeight":500,"fontSize":"10.5px","lineHeight":"1.4","letterSpacing":".03em"}` |
| space.field-gap | `--field-gap` | `16px` |
| color.brand.red | `--red` | `#E42114` |
| color.status.live | `--ok` | `#16a34a` |
| shadow.card | `--shadow-card` | `0 30px 70px -30px rgba(0,0,0,.6)` |

## Sources

- markup: [tools/v5pages.py:71-80](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/tools/v5pages.py#L71-L80)
- fields: [src/v5/v5.css:242-251](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L242-L251)
- footer card: [src/v5/v5.css:700-707](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L700-L707)
- states: [src/v5/v5.css:744-760](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L744-L760)
- checks and submit: [src/v5/main.js:84-136](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/main.js#L84-L136)
- email check: [src/v5/validate.js:1-17](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/validate.js#L1-L17)
