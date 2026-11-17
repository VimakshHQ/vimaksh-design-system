# Typography

> Inter Tight for everything that is read, set large, at weight 500 with tight negative tracking. JetBrains Mono 500, small and uppercase, for labels, navigation and buttons.

Vimaksh design system 0.1.0. HTML: /foundations/typography/ (local docs site). Source of truth: https://work.vimaksh.in at yakosasam797/vimakshwebsite-identity-final@8df1553.

## Tokens

| Token | CSS variable | Value |
| --- | --- | --- |
| font.family.sans | `--sans` | `'Inter Tight',ui-sans-serif,-apple-system,'Segoe UI',sans-serif` |
| font.family.mono | `--mono` | `'JetBrains Mono',ui-monospace,Consolas,monospace` |
| font.weight.regular | `--w-regular` | `400` |
| font.weight.book | `--w-book` | `450` |
| font.weight.medium | `--w-medium` | `500` |
| font.weight.semibold | `--w-semibold` | `600` |
| typography.mono | `.t-mono` | `{"fontFamily":"'JetBrains Mono',ui-monospace,Consolas,monospace","fontWeight":500,"fontSize":"11px","lineHeight":"1.45","letterSpacing":".06em","textTransform":"uppercase"}` |
| typography.hero | `.t-hero` | `{"fontFamily":"'Inter Tight',ui-sans-serif,-apple-system,'Segoe UI',sans-serif","fontWeight":500,"fontSize":"clamp(44px,6.4vw,112px)","lineHeight":".94","letterSpacing":"-.045em","color":"var(--strong)"}` |
| typography.statement | `.t-statement` | `{"fontFamily":"'Inter Tight',ui-sans-serif,-apple-system,'Segoe UI',sans-serif","fontWeight":500,"fontSize":"clamp(44px,7vw,112px)","lineHeight":".92","letterSpacing":"-.045em"}` |
| typography.section | `.t-section` | `{"fontFamily":"'Inter Tight',ui-sans-serif,-apple-system,'Segoe UI',sans-serif","fontWeight":500,"fontSize":"clamp(34px,4.4vw,72px)","lineHeight":".96","letterSpacing":"-.04em","color":"var(--strong)"}` |
| typography.big | `.t-big` | `{"fontFamily":"'Inter Tight',ui-sans-serif,-apple-system,'Segoe UI',sans-serif","fontWeight":450,"fontSize":"clamp(26px,2.9vw,48px)","lineHeight":"1.08","letterSpacing":"-.03em","color":"var(--strong)"}` |
| typography.hero-lead | `` | `{"fontFamily":"'Inter Tight',ui-sans-serif,-apple-system,'Segoe UI',sans-serif","fontWeight":500,"fontSize":"clamp(28px,2.7vw,48px)","lineHeight":"1.04","letterSpacing":"-.035em"}` |
| typography.email | `` | `{"fontFamily":"'Inter Tight',ui-sans-serif,-apple-system,'Segoe UI',sans-serif","fontWeight":400,"fontSize":"clamp(28px,3.4vw,58px)","letterSpacing":"-.04em"}` |
| typography.card-title | `` | `{"fontFamily":"'Inter Tight',ui-sans-serif,-apple-system,'Segoe UI',sans-serif","fontWeight":500,"fontSize":"clamp(18px,1.4vw,22px)","letterSpacing":"-.02em"}` |
| typography.build-title | `` | `{"fontFamily":"'Inter Tight',ui-sans-serif,-apple-system,'Segoe UI',sans-serif","fontWeight":500,"fontSize":"clamp(19px,1.5vw,24px)","letterSpacing":"-.02em"}` |
| typography.body | `` | `{"fontFamily":"'Inter Tight',ui-sans-serif,-apple-system,'Segoe UI',sans-serif","fontSize":"16px","lineHeight":"1.6"}` |
| typography.card-copy | `` | `{"fontFamily":"'Inter Tight',ui-sans-serif,-apple-system,'Segoe UI',sans-serif","fontSize":"15px","lineHeight":"1.42"}` |
| typography.control | `` | `{"fontFamily":"'JetBrains Mono',ui-monospace,Consolas,monospace","fontWeight":500,"fontSize":"11.5px","lineHeight":"1","letterSpacing":".08em","textTransform":"uppercase"}` |
| typography.field-error | `` | `{"fontFamily":"'JetBrains Mono',ui-monospace,Consolas,monospace","fontWeight":500,"fontSize":"10.5px","lineHeight":"1.4","letterSpacing":".03em"}` |

### Two families, two jobs
- **Inter Tight** (variable, 100–900): display, headings, body. Weights used: 400 body, 450 statements, 500 headings, 600 only in logo chips.
- **JetBrains Mono 500**: labels ("> Selected work"), navigation, buttons, kinds, dates, coordinates, field errors. Always uppercase with wide tracking, except the dial code and field errors.

### Sizes are fluid
Large styles use `clamp(min, vw, max)` and scale continuously; there is no fixed scale. Line-heights under 1 are deliberate for display sizes.

### Labels carry a red chevron
A section label is `<p class="t-mono label"><span class="chev">&gt;</span> Label</p>`. The chevron is the brand's ">" from the mark.

### Write in sentence case
Source text is sentence case. Mono labels and buttons become uppercase through CSS, so copy stays readable and searchable.

### Files
`fonts/inter-tight.woff2` (45 KB) and `fonts/jetbrains-mono-500.woff2` (22 KB), both SIL OFL 1.1, `font-display: swap`. Preload Inter Tight.

## Do

- Use the t-* classes for the five base styles.
- Keep paragraphs under about 56ch (cards) to 46ch (lead copy).

## Don't

- Do not use mono for paragraphs.
- Do not use bold (700) anywhere.
- Do not justify text.

## Sources

- fonts: [src/v5/v5.css:2-8](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L2-L8)
- type classes: [src/v5/v5.css:36-43](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L36-L43)
