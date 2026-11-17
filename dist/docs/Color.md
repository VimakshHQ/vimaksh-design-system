# Color

> Paper and ink, one red for action, and a dark night for the footer. Every role has a light and a dark value; the brand colours do not change with the theme.

Vimaksh design system 0.1.0. HTML: /foundations/color/ (local docs site). Source of truth: https://work.vimaksh.in at yakosasam797/vimakshwebsite-identity-final@8df1553.

## Tokens

| Token | CSS variable | Value |
| --- | --- | --- |
| color.brand.red | `--red` | `#E42114` |
| color.brand.red-d | `--red-d` | `#B5180E` |
| color.brand.coral | `--coral` | `#FF5E55` |
| color.brand.electric | `--electric` | `#1A18FF` |
| color.brand.royal | `--royal` | `#2D36FF` |
| color.brand.glow | `--glow` | `#7C8DFF` |
| color.brand.mist | `--mist` | `#DDE4FF` |
| color.brand.night | `--night` | `#0D0E1C` |
| color.brand.night2 | `--night2` | `#15172B` |
| color.mark.coral | `--mark-coral` | `#FF5F53` |
| color.mark.red | `--mark-red` | `#E32112` |
| color.theme.paper | `--paper` | `#F4F2EE / #0F1020` |
| color.theme.paper2 | `--paper2` | `#ECEAE4 / #15172B` |
| color.theme.card | `--card` | `#FBFAF7 / #17192E` |
| color.theme.ink | `--ink` | `#2C1412 / #E6E8FA` |
| color.theme.strong | `--strong` | `#0B0A14 / #F4F5FF` |
| color.theme.soft | `--soft` | `#6B5B5E / #9AA0C8` |
| color.theme.rule | `--rule` | `rgba(44,20,18,.14) / rgba(221,228,255,.12)` |
| color.theme.rule2 | `--rule2` | `rgba(44,20,18,.3) / rgba(221,228,255,.3)` |
| color.theme.chip | `--chip` | `rgba(251,250,247,.7) / rgba(23,25,46,.7)` |
| color.theme.theme-color | `--theme-color` | `#F4F2EE / #0F1020` |
| color.footer.text | `--foot-text` | `#ECEEFF` |
| color.footer.headline | `--foot-headline` | `#F4F5FF` |
| color.footer.label | `--foot-label` | `#9aa0c8` |
| color.footer.key | `--foot-key` | `#7b81aa` |
| color.footer.rule | `--foot-rule` | `rgba(221,228,255,.14)` |
| color.status.live | `--ok` | `#16a34a` |
| color.status.live-text | `--ok-text` | `#15803d` |
| color.on.accent | `--on-accent` | `#fff` |
| color.on.accent-chevron | `--on-accent-chev` | `#FFD9D6` |
| color.pixel.blue-1 | `--px-blue-1` | `#DDE4FF` |
| color.pixel.blue-2 | `--px-blue-2` | `#B9C3FF` |
| color.pixel.blue-3 | `--px-blue-3` | `#7C8DFF` |
| color.pixel.blue-4 | `--px-blue-4` | `#2D36FF` |
| color.pixel.blue-5 | `--px-blue-5` | `#1A18FF` |
| color.pixel.hero-mist-light | `--px-hero-mist-l` | `#DDE4FF` |
| color.pixel.hero-glyph-light | `--px-hero-glyph-l` | `#2D36FF` |
| color.pixel.hero-mist-dark | `--px-hero-mist-d` | `#1A1D45` |
| color.pixel.hero-glyph-dark | `--px-hero-glyph-d` | `#5D6BFF` |
| color.pixel.mark-hairline-coral | `--px-coral-d` | `#E14A42` |
| color.pixel.mark-hairline-red | `--px-red-d` | `#B5180E` |
| color.kind.extension | `--kind-extension` | `#2D36FF` |
| color.kind.saas | `--kind-saas` | `#E42114` |
| color.kind.ai | `--kind-ai` | `#7A3CD6` |
| color.kind.crm | `--kind-crm` | `#0E8F6E` |
| color.kind.erp | `--kind-erp` | `#E8730C` |
| color.kind.dashboard | `--kind-dashboard` | `#0A8FB0` |
| color.kind.integrations | `--kind-integrations` | `#C99400` |
| color.kind.mobile | `--kind-mobile` | `#D23C7E` |
| color.heat.1 | `` | `#E42114` |
| color.heat.2 | `` | `#FF5E55` |
| color.heat.3 | `` | `#9C2B5A` |
| color.heat.4 | `` | `#2D36FF` |

### Roles, not paint
Pick a colour by its job. Every surface and text colour is a role with a light and a dark value, switched by `<html data-theme>`:

| Role | Job |
| --- | --- |
| `--paper` | The page. Always carries the cross-and-dot pattern. |
| `--paper2` | Sunken areas and hover fills. |
| `--card` | Raised surfaces: blocks, media backing, dropdowns. |
| `--ink` | Body text. |
| `--strong` | Headings, solid UI (hover fills, the Menu box). |
| `--soft` | Secondary text and labels. |
| `--rule` / `--rule2` | Hairlines / control borders and input underlines. |
| `--chip` | The translucent fill under a backdrop blur. |

### Red is for action
`--red #E42114` marks the primary action, the ">" chevron, the one hero highlight (.hl), the focused input underline and errors. Nothing else is red. Coral `#FF5E55` is the mark's colour and the accent on the dark footer.

### The footer is always night
The footer stays dark in both themes (`--night #0D0E1C` with the dark pattern). Its text colours are fixed footer tokens.

### Blues belong to pixels
Electric, Royal, Glow and Mist appear in the pixel graphics and the hero field. In the interface, Electric is only the focus ring.

### Kind colours are only for "What we build"
Each kind of software has a colour for its pixel tile, its 3px stripe and its square bullet. Never use them for interface states.

### The mark's own colours
The SVG files use `#FF5F53` and `#E32112`; CSS uses `#FF5E55` and `#E42114`. The difference is one step and is recorded, not corrected: use the files unchanged.

## Do

- Use role variables, never raw hex, in components.
- Check both themes for every screen.

## Don't

- Do not add new accent colours.
- Do not set small text in red on paper (4.15:1).
- Do not put red text on the coral or heat surfaces.

## Sources

- tokens: [src/v5/v5.css:4-18](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L4-L18)
- pixel blues: [src/v5/pixelart.js:3](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/pixelart.js#L3)
- kind colours: [tools/v5pages.py:172-181](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/tools/v5pages.py#L172-L181)
