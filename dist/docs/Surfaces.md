# Surfaces

> Three paper levels and one night. Surfaces are flat and square: separated by hairlines and by the paper pattern, not by shadows.

Vimaksh design system 0.1.0. HTML: /foundations/surfaces/ (local docs site). Source of truth: https://work.vimaksh.in at VimakshHQ/vimakshwebsite-identity-final@8df1553.

## Tokens

| Token | CSS variable | Value |
| --- | --- | --- |
| color.theme.paper | `--paper` | `#F4F2EE / #0F1020` |
| color.theme.paper2 | `--paper2` | `#ECEAE4 / #15172B` |
| color.theme.card | `--card` | `#FBFAF7 / #17192E` |
| color.theme.rule | `--rule` | `rgba(44,20,18,.14) / rgba(221,228,255,.12)` |
| color.theme.rule2 | `--rule2` | `rgba(44,20,18,.3) / rgba(221,228,255,.3)` |
| color.theme.chip | `--chip` | `rgba(251,250,247,.7) / rgba(23,25,46,.7)` |
| radius.none | `--radius` | `0` |
| radius.pill | `--radius-pill` | `99px` |
| radius.round | `--radius-round` | `50%` |
| border.hairline | `--hairline` | `1px` |
| border.stripe | `--stripe` | `3px` |

### Levels
- **Paper** (`--paper` + pattern): the page and every section.
- **Paper 2** (`--paper2`): sunken rows, hover fills.
- **Card** (`--card`): blocks with a `--rule2` border, media backing.
- **Night** (`--night` + dark pattern): the footer, in both themes.

### Sections rise
Sections after the hero have `position: relative` and paper backgrounds, so they slide over the sticky hero. A paper pixel edge sits on top of the first one.

### A light card on night
In the footer the brief is a light card (`.fbrief`) that resets the light-theme roles locally and floats with the only large shadow on the site.

## Do

- Separate with 1px hairlines.
- Keep every corner square.

## Don't

- Do not use glass panels or gradients behind copy.
- Do not nest cards inside cards.

## Sources

- rise: [src/v5/v5.css:126-128](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L126-L128)
- block: [src/v5/v5.css:228](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L228)
- light card on night: [src/v5/v5.css:703](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L703)
