# Elevation

> The site is flat. There are exactly four shadows, each for one object, and two backdrop blurs. There is no elevation scale.

Vimaksh design system 0.1.0. HTML: /foundations/elevation/ (local docs site). Source of truth: https://work.vimaksh.in at VimakshHQ/vimakshwebsite-identity-final@8df1553.

## Tokens

| Token | CSS variable | Value |
| --- | --- | --- |
| shadow.knob | `--shadow-knob` | `0 2px 8px rgba(0,0,0,.18)` |
| shadow.knob-hover | `--shadow-knob-hover` | `0 2px 14px rgba(0,0,0,.25)` |
| shadow.chip | `--shadow-chip` | `0 1px 0 rgba(0,0,0,.08)` |
| shadow.card | `--shadow-card` | `0 30px 70px -30px rgba(0,0,0,.6)` |
| shadow.popover | `--shadow-popover` | `0 18px 40px -18px rgba(11,10,20,.35)` |
| blur.nav | `--blur-nav` | `8px` |
| blur.toggle | `--blur-toggle` | `10px` |

| Token | Value | Only on |
| --- | --- | --- |
| `shadow.knob` | `0 2px 8px rgba(0,0,0,.18)` | Theme toggle knob (hover: `0 2px 14px rgba(0,0,0,.25)`) |
| `shadow.chip` | `0 1px 0 rgba(0,0,0,.08)` | Logo chip on project media |
| `shadow.card` | `0 30px 70px -30px rgba(0,0,0,.6)` | The light brief card on the dark footer |
| `shadow.popover` | `0 18px 40px -18px rgba(11,10,20,.35)` | Country list of the phone field |

Backdrop blur: 8px under navigation items, 10px under the theme toggle, always on the translucent `--chip` fill.

## Do

- Show depth with surface colour and hairlines.

## Don't

- Do not add shadows to cards, buttons or images.
- Do not invent a level 1–5 scale.

## Sources

- knob: [src/v5/v5.css:73-79](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L73-L79)
- chip: [src/v5/v5.css:591](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L591)
- card: [src/v5/v5.css:703](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L703)
- popover: [src/v5/v5.css:792](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L792)
