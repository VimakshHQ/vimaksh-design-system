# Accessibility

> Target WCAG 2.2 AA. Real DOM before scripts, a skip link, visible focus, labelled controls, live regions for errors, and motion that respects reduced motion. Two known contrast issues are listed below.

Vimaksh design system 0.1.0. HTML: /foundations/accessibility/ (local docs site). Source of truth: https://work.vimaksh.in at yakosasam797/vimakshwebsite-identity-final@8df1553.

### What every page has
- A skip link to `<main id="main">`, one H1, H2 per section with `aria-labelledby`.
- Focus: `:focus-visible { outline: 2px solid var(--electric); outline-offset: 3px }`.
- Decorative graphics (chevrons, pixel edges, giant wordmark) are `aria-hidden`; the hero canvas and pixel illustrations have `role="img"` and a description.
- Buttons for actions, links for navigation; external links say "(opens in a new tab)" in hidden text.
- Form errors in `aria-live` regions inside the label; the first invalid field is focused on submit.
- Everything readable without JavaScript, canvas or animation.

### Contrast, measured
The table above is computed from the tokens. Two pairs fail:
- **Focus ring on dark paper** (Electric on `#0F1020`) is about 2.35:1, under the 3:1 needed for focus indicators. `[PLACEHOLDER: fix approved by Vimaksh, for example the coral or glow focus colour in the dark theme]`.
- **Red text on paper** (4.15:1 light, 4.06:1 dark) is under 4.5:1 for small text. On the site it is used for decorative chevrons and short error lines; do not use it for body text.

### Motion
Honour `prefers-reduced-motion` (see Motion). Nothing requires an animation to finish before it can be read.

### Touch
Controls are at least 40px high on phones (nav items, pills, the toggle 36px). Keep new targets at 44px.

## Contrast (computed from the tokens)

| Pair | Theme | Colours | Ratio | Needs | Result |
| --- | --- | --- | --- | --- | --- |
| Ink on paper | light | `#2C1412` on `#F4F2EE` | 15.45:1 | 4.5:1 | pass |
| Ink on paper | dark | `#E6E8FA` on `#0F1020` | 15.50:1 | 4.5:1 | pass |
| Strong on paper | light | `#0B0A14` on `#F4F2EE` | 17.59:1 | 4.5:1 | pass |
| Strong on paper | dark | `#F4F5FF` on `#0F1020` | 17.35:1 | 4.5:1 | pass |
| Soft on paper | light | `#6B5B5E` on `#F4F2EE` | 5.72:1 | 4.5:1 | pass |
| Soft on paper | dark | `#9AA0C8` on `#0F1020` | 7.38:1 | 4.5:1 | pass |
| Soft on card | light | `#6B5B5E` on `#FBFAF7` | 6.13:1 | 4.5:1 | pass |
| Soft on card | dark | `#9AA0C8` on `#17192E` | 6.78:1 | 4.5:1 | pass |
| White label on red button | both | `#FFFFFF` on `#E42114` | 4.64:1 | 4.5:1 | pass |
| Red text on paper | light | `#E42114` on `#F4F2EE` | 4.15:1 | 4.5:1 | **fail** |
| Red text on paper | dark | `#E42114` on `#0F1020` | 4.06:1 | 4.5:1 | **fail** |
| Focus ring (Electric) on paper | light | `#1A18FF` on `#F4F2EE` | 7.17:1 | 3:1 | pass |
| Focus ring (Electric) on paper | dark | `#1A18FF` on `#0F1020` | 2.35:1 | 3:1 | **fail** |
| Footer text on night | both | `#ECEEFF` on `#0D0E1C` | 16.63:1 | 4.5:1 | pass |
| Footer label on night | both | `#9aa0c8` on `#0D0E1C` | 7.51:1 | 4.5:1 | pass |
| Footer key on night | both | `#7b81aa` on `#0D0E1C` | 5.07:1 | 4.5:1 | pass |
| Coral on night | both | `#FF5E55` on `#0D0E1C` | 6.37:1 | 3:1 | pass |

## Do

- Test in both themes, with the keyboard, and at 200% zoom.

## Don't

- Do not convey state by colour alone.
- Do not remove the focus outline.

## Sources

- focus, skip, sr: [src/v5/v5.css:32-35](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L32-L35)
- accessibility rules (DESIGN.md): [DESIGN.md:447-456](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/DESIGN.md#L447-L456)
