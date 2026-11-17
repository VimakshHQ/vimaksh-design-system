# Inputs and validation

> Text fields are a single underline: --rule2 at rest, red on focus and when invalid. Errors are short mono lines under the field. The send button shows "Sending…", then "Sent" in green, or the error note in red with the email as a fallback.

Vimaksh design system 0.1.0. HTML: /components/inputs/ (local docs site). Source of truth: https://work.vimaksh.in at yakosasam797/vimakshwebsite-identity-final@8df1553.

## Use it

- Check quietly while typing; show the message when the field is left or on send.

Needs: `vimaksh.css` and `vimaksh.js`.

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### Invalid email, sending, and the error note

```html
<form class="brief-form" data-brief-form novalidate style="max-width:560px">
  <div class="f2"><label><span class="t-mono">Name</span><input name="name" required autocomplete="name" value="Asha Rao"></label>
  <label><span class="t-mono">Email</span><input name="email" type="email" class="bad" value="asha@gmial.com" data-check="email"><span class="ferr" aria-live="polite">Did you mean asha@gmail.com?</span></label></div>
  <label><span class="t-mono">Tell us about it</span><textarea name="message" rows="3" required></textarea></label>
  <div class="f-foot"><button class="btn" type="submit" disabled><span>Sending…</span><span class="chev" aria-hidden="true">&gt;</span></button><p class="t-mono note is-err" aria-live="polite">Something went wrong. Please try again, or write to <a href="mailto:hq@vimaksh.in">hq@vimaksh.in</a>.</p></div>
</form>
```

### Error messages (exact copy, from the site)

```
Please enter your email.
Please enter a valid email, like name@company.com.
Did you mean <local>@gmail.com?        (gmial.com, gmai.com, gmail.co, gamil.com, yahooo.com, hotmial.com, outlok.com)
Please enter your phone number.
That country code doesn’t look right.
This number is too short for the country you chose.
This number is too long for the country you chose.
This number has the wrong number of digits for the country you chose.
Please enter a valid phone number for the country you chose.
Thanks, <first name>. Your brief is with us, and a confirmation is on its way to <email>.
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `input, textarea` | element | border:0; border-bottom:1px solid var(--rule2); transparent; 16px. |
| `:focus` | state | Underline turns red. |
| `input.bad` | state | Underline red (set by vimaksh.js once you leave the field). |
| `.ferr` | element | 10.5px mono, red; hidden when empty. |
| `p.note.is-ok / .is-err` | state | Result line, green #15803d or red. |

## Do

- Write errors as one sentence that says how to fix it.

## Don't

- Do not put boxes around fields on light surfaces.
- Do not show an error while someone is still typing their first attempt.

## Accessibility

- setCustomValidity keeps native validity in step with the visible message.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| color.theme.rule2 | `--rule2` | `rgba(44,20,18,.3) / rgba(221,228,255,.3)` |
| color.brand.red | `--red` | `#E42114` |
| typography.field-error | `` | `{"fontFamily":"'JetBrains Mono',ui-monospace,Consolas,monospace","fontWeight":500,"fontSize":"10.5px","lineHeight":"1.4","letterSpacing":".03em"}` |
| color.status.live-text | `--ok-text` | `#15803d` |

## Sources

- fields: [src/v5/v5.css:247-249](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L247-L249)
- errors: [src/v5/v5.css:755-760](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L755-L760)
- states: [src/v5/v5.css:744-750](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L744-L750)
- phone messages: [src/v5/main.js:63-70](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/main.js#L63-L70)
- email messages: [src/v5/validate.js:9-17](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/validate.js#L9-L17)
