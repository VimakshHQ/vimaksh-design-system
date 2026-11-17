# Copy tooltip

> A tiny strong label that follows the pointer over anything with data-copy: "Copy", then "Copied ✓" (or "Copy failed") for 1.3s after a click.

Vimaksh design system 0.1.0. HTML: /components/copy-tooltip/ (local docs site). Source of truth: https://work.vimaksh.in at yakosasam797/vimakshwebsite-identity-final@8df1553.

## Use it

- For copyable contact details only.

Needs: `vimaksh.css` and `vimaksh.js`.

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### Hover the email, then click it

```html
<div class="foot" style="padding:40px var(--pad)"><div class="foot-cta"><button class="email" type="button" data-copy="hq@vimaksh.in"><span class="chev l" aria-hidden="true">&gt;</span>hq@vimaksh.in<span class="chev r" aria-hidden="true">&lt;</span></button></div></div><div class="tip t-mono" aria-hidden="true">Copy</div>
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `.tip.t-mono` | element | One per page, anywhere in <body>, aria-hidden. |
| `.tip.on` | state (JS) | Visible. |
| `[data-copy]` | attribute | Any element; its value is copied on click. |

## Do

- Keep the copied value visible on the trigger.

## Don't

- Do not use it as a general tooltip for hints.

## Accessibility

- The tooltip is decorative (aria-hidden). Make the trigger a <button> with the value as its text.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| color.theme.strong | `--strong` | `#0B0A14 / #F4F5FF` |
| color.theme.paper | `--paper` | `#F4F2EE / #0F1020` |
| typography.mono | `.t-mono` | `{"fontFamily":"'JetBrains Mono',ui-monospace,Consolas,monospace","fontWeight":500,"fontSize":"11px","lineHeight":"1.45","letterSpacing":".06em","textTransform":"uppercase"}` |

## Sources

- markup: [tools/v5pages.py:59-61](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/tools/v5pages.py#L59-L61)
- style: [src/v5/v5.css:108-109](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L108-L109)
- behaviour: [src/v5/main.js:35-53](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/main.js#L35-L53)
