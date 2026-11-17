# Text link

> A mono link with an underline in the text colour and a red chevron that nudges 4px on hover. Used for the secondary action of a section header.

Vimaksh design system 0.1.0. HTML: /components/text-link/ (local docs site). Source of truth: https://work.vimaksh.in at yakosasam797/vimakshwebsite-identity-final@8df1553.

## Use it

- At most one per section header, aligned right.

Needs: `vimaksh.css` (no JavaScript).

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### "Start yours" in the work section header

```html
    <a class="more t-mono" href="/contact/">Start yours <span class="chev" aria-hidden="true">&gt;</span></a>
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `a.more.t-mono` | class | inline-flex, 10px gap, 1px currentColor underline 4px below. |
| `.chev` | element | Red ">" that nudges on hover. |

## Do

- Keep it to two or three words.

## Don't

- Do not use it inside paragraphs; body links are plain underlined text.

## Accessibility

- The underline is always visible, so the link does not rely on colour.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| typography.mono | `.t-mono` | `{"fontFamily":"'JetBrains Mono',ui-monospace,Consolas,monospace","fontWeight":500,"fontSize":"11px","lineHeight":"1.45","letterSpacing":".06em","textTransform":"uppercase"}` |
| color.brand.red | `--red` | `#E42114` |
| motion.duration.base | `--dur-base` | `250ms` |

## Sources

- style: [src/v5/v5.css:54-55](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L54-L55)
