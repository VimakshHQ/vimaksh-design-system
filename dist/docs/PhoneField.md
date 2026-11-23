# Phone field

> intl-tel-input 29.5.11, themed to the site: a flag and +code in mono with a small red chevron, a square searchable country list on --card, India preselected and a short list of common countries first. Only valid digits can be typed.

Vimaksh design system 0.1.0. HTML: /components/phone-field/ (local docs site). Source of truth: https://work.vimaksh.in at VimakshHQ/vimakshwebsite-identity-final@8df1553.

## Use it

- Wherever a phone number is asked for.
- The grey example number inside the field comes from intl-tel-input (as on the site); it is a format hint, not a label: keep the mono label above.

Needs: `vimaksh.css` and `vimaksh-phone.js`.

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### Phone field (open the country list)

```html
<form class="brief-form" data-brief-form novalidate style="max-width:420px;padding:0;border:0"><label><span class="t-mono">Phone</span><input name="phone" type="tel" required autocomplete="tel" data-check="phone"><span class="ferr" aria-live="polite"></span></label></form>
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `input[type=tel][data-check=phone]` | element | vimaksh-phone.js attaches intl-tel-input to it. |
| `countryOrder` | option | in, ae, us, gb, sg, au, ca, sa. |
| `strictMode, formatAsYouType, countrySearch, separateDialCode` | option | All on. |
| `vendor/intl-tel-input.css` | file | Load before vimaksh.css; vimaksh.css themes it. |

## Do

- Validate on the server too (the site uses libphonenumber-js in its worker).

## Don't

- Do not use a plain <select> for the country.

## Accessibility

- The country button is keyboard reachable with a visible focus ring; the list is searchable.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| color.theme.card | `--card` | `#FBFAF7 / #17192E` |
| shadow.popover | `--shadow-popover` | `0 18px 40px -18px rgba(11,10,20,.35)` |
| color.brand.red | `--red` | `#E42114` |
| typography.mono | `.t-mono` | `{"fontFamily":"'JetBrains Mono',ui-monospace,Consolas,monospace","fontWeight":500,"fontSize":"11px","lineHeight":"1.45","letterSpacing":".06em","textTransform":"uppercase"}` |

## Sources

- set-up: [src/v5/main.js:63-83](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/main.js#L63-L83)
- theme: [src/v5/v5.css:769-807](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L769-L807)
