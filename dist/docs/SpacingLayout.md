# Spacing and layout

> Full-width pages with one fluid gutter, generous fluid section padding, a 14px gap between cards, and two max-width breakpoints. The values below are the ones the site uses, named.

Vimaksh design system 0.1.0. HTML: /foundations/spacing-layout/ (local docs site). Source of truth: https://work.vimaksh.in at yakosasam797/vimakshwebsite-identity-final@8df1553.

## Tokens

| Token | CSS variable | Value |
| --- | --- | --- |
| space.pad | `--pad` | `clamp(16px,2.6vw,40px)` |
| space.hdr | `--hdr` | `78px` |
| space.section-top | `--section-top` | `clamp(70px,8vw,130px)` |
| space.section-bottom | `--section-bottom` | `clamp(80px,9vw,140px)` |
| space.section-compact | `--section-compact` | `clamp(56px,6vw,96px)` |
| space.footer-top | `--footer-top` | `clamp(90px,10vw,160px)` |
| space.head-gap | `--head-gap` | `clamp(28px,3.4vw,52px)` |
| space.grid-gap | `--grid-gap` | `14px` |
| space.grid-row-gap | `--grid-row-gap` | `clamp(40px,4vw,64px)` |
| space.label-gap | `--label-gap` | `18px` |
| space.field-gap | `--field-gap` | `16px` |
| space.control-y | `--control-y` | `16px` |
| space.control-x | `--control-x` | `20px` |
| space.edge-h | `--edge-h` | `98px` |
| breakpoint.tablet | `` | `1100px` |
| breakpoint.phone | `` | `760px` |

### The gutter
Everything sits inside `--pad: clamp(16px, 2.6vw, 40px)` on the left and right. There is no centred max-width container: the site is full width.

### Breakpoints
Desktop first, two `max-width` breakpoints: **1100px** (three columns become two) and **760px** (one column, phone header 68px, nav stack narrower).

### Grids
- Work: `repeat(3,1fr)`, gap `clamp(40px,4vw,64px) 14px`; 2 columns ≤1100px; 1 column ≤760px.
- Contact and footer top: two columns, one on phones.
- Footer columns: `1fr 1.4fr 1fr 1fr`; 2 columns ≤1100px.
- About: `clamp(220px,24vw,340px) 1fr`.

### Vertical rhythm
Sections: `clamp(70px,8vw,130px)` top and `clamp(80px,9vw,140px)` bottom; compact sections `clamp(56px,6vw,96px)`; footer `clamp(90px,10vw,160px)`. Label to heading 18px; section header to content `clamp(28px,3.4vw,52px)`.

### No spacing scale
The site has no 4/8 scale and this system does not invent one. Reuse the named values; for anything else, match the nearest existing element.

## Do

- Use --pad for every horizontal edge.
- Let sections breathe: the large padding is part of the hierarchy.

## Don't

- Do not centre content in a narrow container.
- Do not add rounded section containers.

## Sources

- pad, hdr: [src/v5/v5.css:9](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L9)
- work grid: [src/v5/v5.css:137-138](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L137-L138)
- breakpoints: [src/v5/v5.css:303-326](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L303-L326)
