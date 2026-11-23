# Patterns and grain

> Five textures make the brand: the paper pattern, the grain, the pixel edge, the hero's chevron field and the heat gradient. Each has one job.

Vimaksh design system 0.1.0. HTML: /foundations/patterns/ (local docs site). Source of truth: https://work.vimaksh.in at VimakshHQ/vimakshwebsite-identity-final@8df1553.

## Tokens

| Token | CSS variable | Value |
| --- | --- | --- |
| pattern.grain | `--grain` | `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1.2 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` |
| pattern.cross-d | `--cross-d` | `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='192'%3E%3Cpath d='M96 90v12M90 96h12' stroke='%232C1412' stroke-opacity='.2' stroke-width='1'/%3E%3C/svg%3E")` |
| pattern.cross-l | `--cross-l` | `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='192'%3E%3Cpath d='M96 90v12M90 96h12' stroke='%23DDE4FF' stroke-opacity='.14' stroke-width='1'/%3E%3C/svg%3E")` |
| pattern.paper-light | `--pattern-light` | `var(--cross-d) 0 0/192px 192px,radial-gradient(circle at 1px 1px,rgba(44,20,18,.1) .9px,transparent 1.3px) 0 0/24px 24px` |
| pattern.paper-dark | `--pattern-dark` | `var(--cross-l) 0 0/192px 192px,radial-gradient(circle at 1px 1px,rgba(221,228,255,.06) .9px,transparent 1.3px) 0 0/24px 24px` |
| pattern.heat | `--heat` | `radial-gradient(120% 90% at 0% 100%,#1A3FD8 0%,rgba(45,54,255,.55) 28%,transparent 55%),radial-gradient(80% 70% at 85% 80%,#5A0C12 0%,rgba(140,20,20,.6) 35%,transparent 70%),radial-gradient(90% 80% at 60% 20%,#FF7A70 0%,rgba(255,94,85,.6) 30%,transparent 65%),linear-gradient(160deg,#E42114 0%,#FF5E55 40%,#9C2B5A 70%,#2D36FF 100%)` |
| pattern.pixel-edge | `` | `{"cell":"14px","cellPhone":"10px","rows":7,"seed":3}` |

### Paper pattern (everywhere)
A 12px cross every 192px plus a 0.9px dot every 24px, ink at low opacity in light, mist in dark. Apply as `background: var(--pattern), var(--paper)`.

### Grain (light theme only)
A 220px fractal-noise tile in a fixed overlay at opacity .08, shifting in six steps every 1.2s. It is not drawn in the dark theme (black grain is invisible on dark paper). It stops with reduced motion.

### Pixel edge (between areas)
Squares thinning toward the far edge: 7 rows of 14px cells. See the Pixel edge component.

### Chevron field (hero only)
Rows of 5×5 ">" and "<" glyphs in Royal on Mist, flowing on a noise field; the mark is built from the same cells.

### Heat gradient (footer base only)
Red → coral → plum → royal, three radial highlights and grain at .55 overlay. It carries the giant wordmark and nothing else.

## Do

- Use each texture only in its place.

## Don't

- Do not use the heat gradient as a section or button background.
- Do not tile the chevrons as a generic background.
- Do not add blur or noise filters of your own.

## Sources

- pattern and grain: [src/v5/v5.css:10-14](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L10-L14)
- grain overlay: [src/v5/v5.css:23-28](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L23-L28)
- heat: [src/v5/v5.css:169-175](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L169-L175)
- chevron field: [src/v5/pixelhero.js:1-80](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/pixelhero.js#L1-L80)
