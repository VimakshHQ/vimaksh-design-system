# Building with the Vimaksh design system

Version 0.1.0. The design language of https://work.vimaksh.in, extracted from its code. Every value below comes from the site; nothing is invented. Where the site has no rule, this file says so and marks it `[PLACEHOLDER: …]`.

All files: https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/ (raw GitHub). Download them into your project; raw GitHub serves text/plain, so a `<link>` to it will not apply.

## 1. Set up a page

```html
<!DOCTYPE html>
<html lang="en" data-page="home">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#F4F2EE">
<link rel="preload" href="fonts/inter-tight.woff2" as="font" type="font/woff2" crossorigin>
<script>
  (function () { try { var t = localStorage.getItem('vimaksh-theme'); if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = t; } catch (e) { document.documentElement.dataset.theme = 'light'; } })();
</script>
<link rel="stylesheet" href="vendor/intl-tel-input.css"> <!-- only if the page has a phone field -->
<link rel="stylesheet" href="vimaksh.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<!-- Header (docs/Header.md), Navigation stack (docs/NavigationStack.md), <div class="tip t-mono" aria-hidden="true">Copy</div> -->
<main id="main">
  <!-- sections: each opens with a Section header (docs/SectionHeader.md) -->
</main>
<!-- Footer (docs/Footer.md) -->
<script type="module" src="vimaksh.js"></script>
<script type="module" src="vimaksh-phone.js"></script> <!-- only with a phone field -->
</body>
</html>
```

Files to copy next to the page: `vimaksh.css`, `fonts/inter-tight.woff2`, `fonts/jetbrains-mono-500.woff2`, `vimaksh.js`, `brand/svg/*`. With the hero also `pixel-hero.js` (it reads `brand/svg/vimaksh-mark.svg` relative to itself). With a phone field also `vimaksh-phone.js`, `vendor/intl-tel-input.css` and `vendor/img/*`. Each script is one self-contained file. `data-page="home"` shows the full navigation stack on load; use any other value on inner pages.

Tailwind: load `tokens.css` (or `vimaksh.css`) first, then use `tailwind-preset.cjs` (v3, `presets: [require('./tailwind-preset.cjs')]`) or `@import "./tailwind.css"` (v4). Colours are CSS variables, so both themes keep working. Still use the component markup: the preset gives you values, not components.

### Pages for Vimaksh products

- The page belongs to Vimaksh: the header and the footer's giant wordmark are the Vimaksh wordmark.
- A product (Paryatech, Vaat, …) shows its own logo, unchanged, only inside a [Logo chip](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/LogoChip.md) on its media. Its name is text in the headings. Product colours stay inside product imagery; never recolour the interface to match.
- The brief form posts JSON to its `action` (default `/api/brief`). For another product set `data-sent` (success message; `{name}` and `{email}` are filled in) and `data-email` (fallback address). Show success only after the server answers `{"ok":true}`.

### When the site has no component for it

The site has no feature grid, pricing table, FAQ, testimonial or generic card. Do not invent one. Compose from what exists: a [Section header](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/SectionHeader.md); sections padded `var(--section-top) var(--pad) var(--section-bottom)` on `var(--pattern), var(--paper)`; `.t-big` statements; 1px `--rule` hairlines; `--card` blocks with a `--rule2` border; the 14px grid gap; mono labels. Mark each such composition with a code comment `[PLACEHOLDER: component not on work.vimaksh.in]` so it can be reviewed.

## 2. Hard rules

MUST
- Use Inter Tight for all reading text and JetBrains Mono 500 (uppercase, letter-spacing .06–.08em) for labels, navigation, buttons and metadata.
- Support light and dark through `<html data-theme>`, set before first paint. The footer stays dark in both.
- Put `background: var(--pattern), var(--paper)` on the page and on every section.
- Keep every corner square (radius 0). The theme toggle is the only rounded element.
- Use red (`--red #E42114`) only for the primary button, the ">" chevron, the focused input underline and errors.
- Start section labels with a red chevron: `<p class="t-mono label"><span class="chev">&gt;</span> Label</p>`.
- Use the real wordmark SVG inline with `fill="currentColor"`; never type the name as a logo.
- Keep the full-width layout with the `--pad` gutter and the 1100px / 760px max-width breakpoints.
- Mark missing content `[PLACEHOLDER: …]` and keep it visible.

MUST NOT
- No new colours, gradients, shadows, radii, fonts or icon libraries.
- No card shadows, glass panels or gradients behind copy. The heat gradient is for the footer base only.
- No top navigation bar or hamburger overlay; navigation is the bottom-right stack.
- No stock photos, mock devices, fake dashboards or generated people.
- No invented facts: metrics, clients, team, awards, years, response times.
- No banned words: award-winning, leading, global, multidisciplinary, full-service; no ocean, ship, anchor or wave puns.

## 3. Components

- [Header](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/Header.md): The wordmark at top left and the theme toggle at top right.
- [Theme toggle](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/ThemeToggle.md): A pill whose knob slides between sun and moon; the icon turns as it travels.
- [Navigation stack](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/NavigationStack.md): The site's only navigation: a stack of boxed mono links fixed at the bottom right, ending in a solid Menu box.
- [Button](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/Button.md): Square buttons with a mono uppercase label and a ">" chevron that nudges 5px right on hover.
- [Text link](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/TextLink.md): A mono link with an underline in the text colour and a red chevron that nudges 4px on hover.
- [Pill](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/Pill.md): A small square mono chip that copies a value (an email, coordinates) or labels an expandable row.
- [Copy tooltip](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/CopyTooltip.md): A tiny strong label that follows the pointer over anything with data-copy: "Copy", then "Copied ✓" (or "Copy failed") for 1.3s after a click.
- [Section header](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/SectionHeader.md): A top hairline, a "> Label" in mono, a large heading and an optional action on the right.
- [Project card](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/ProjectCard.md): A product in the work grid: 4:5 video (4:3 on phones) with a number and the product's own logo on a paper chip, then title and mono kind, a one-line description, and a full-width visit bar.
- [Logo chip](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/LogoChip.md): A product's own logo on an off-white chip in the top-left corner of a project card.
- [Build card and track](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/BuildTrack.md): The "What we build" row: cards with a pixel tile in the item's own colour, a numbered tag, a square bullet and a short description, on a track that drifts sideways on its own and pauses on hover, touch or focus.
- [About block](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/AboutBlock.md): A short statement section: a compact pixel illustration on the left and one large paragraph (t-big) on the right, centred on one line.
- [Hero](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/Hero.md): The home opening: a living pixel surface (WebGL) where a field of tiny ">" and "<" glyphs flows across paper and the Vimaksh mark assembles from the same pixels.
- [Contact block](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/ContactBlock.md): Bordered card blocks made of rows: a red "Start a project" row that drops open the brief form, plain rows with copy pills, and a split block for the studio address and coordinates.
- [Brief form](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/BriefForm.md): The project brief: name, email, phone, company (optional) and a message.
- [Inputs and validation](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/Inputs.md): Text fields are a single underline: --rule2 at rest, red on focus and when invalid.
- [Phone field](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/PhoneField.md): intl-tel-input 29.5.11, themed to the site: a flag and +code in mono with a small red chevron, a square searchable country list on --card, India preselected and a short list of common countries first.
- [Footer](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/Footer.md): Always dark (night) in both themes.
- [Pixel edge](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/PixelEdge.md): A band of squares, 7 rows of 14px cells (10px on phones), that thins toward the far edge.
- [Legal page](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/LegalPage.md): A single readable column (max 760px) for terms, privacy and cookies: a mono label, a t-hero title at a smaller size, the update date in mono, and 16px/1.6 body with 22px section headings.
- [Skip link](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/SkipLink.md): The first element on every page: "Skip to content", off screen until it receives focus, then a strong box at top left.

## 4. Foundations

- [Color](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/Color.md): Paper and ink, one red for action, and a dark night for the footer.
- [Typography](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/Typography.md): Inter Tight for everything that is read, set large, at weight 500 with tight negative tracking.
- [Spacing and layout](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/SpacingLayout.md): Full-width pages with one fluid gutter, generous fluid section padding, a 14px gap between cards, and two max-width breakpoints.
- [Surfaces](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/Surfaces.md): Three paper levels and one night.
- [Patterns and grain](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/Patterns.md): Five textures make the brand: the paper pattern, the grain, the pixel edge, the hero's chevron field and the heat gradient.
- [Elevation](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/Elevation.md): The site is flat.
- [Motion](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/Motion.md): One easing for almost everything, short colour changes, small nudges.
- [Iconography](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/Iconography.md): The site has almost no icons.
- [Imagery](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/Imagery.md): Real product footage in square frames, the products' own logos on paper chips, and pixel illustrations drawn on a grid.
- [Voice and content](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/Voice.md): Short declarative sentences, concrete nouns, active verbs.
- [Accessibility](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/Accessibility.md): Target WCAG 2.2 AA.
- [Brand](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/Brand.md), [Pixel motifs](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/PixelMotifs.md), [Icons](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/Icons.md), [Downloads](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/Downloads.md)

## 5. Token quick reference

| Token | CSS variable | Light | Dark |
| --- | --- | --- | --- |
| color.theme.paper | `--paper` | `#F4F2EE` | `#0F1020` |
| color.theme.paper2 | `--paper2` | `#ECEAE4` | `#15172B` |
| color.theme.card | `--card` | `#FBFAF7` | `#17192E` |
| color.theme.ink | `--ink` | `#2C1412` | `#E6E8FA` |
| color.theme.strong | `--strong` | `#0B0A14` | `#F4F5FF` |
| color.theme.soft | `--soft` | `#6B5B5E` | `#9AA0C8` |
| color.theme.rule | `--rule` | `rgba(44,20,18,.14)` | `rgba(221,228,255,.12)` |
| color.theme.rule2 | `--rule2` | `rgba(44,20,18,.3)` | `rgba(221,228,255,.3)` |
| color.theme.chip | `--chip` | `rgba(251,250,247,.7)` | `rgba(23,25,46,.7)` |
| color.theme.theme-color | `--theme-color` | `#F4F2EE` | `#0F1020` |

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
| radius.none | `--radius` | `0` |
| radius.pill | `--radius-pill` | `99px` |
| radius.round | `--radius-round` | `50%` |
| border.hairline | `--hairline` | `1px` |
| border.stripe | `--stripe` | `3px` |
| motion.easing.standard | `--ease` | `cubic-bezier(.2,.8,.2,1)` |
| motion.easing.toggle | `--ease-toggle` | `cubic-bezier(.65,0,.25,1)` |
| motion.easing.overshoot | `--ease-overshoot` | `cubic-bezier(.34,1.56,.64,1)` |

Type classes: `.t-mono` 11px/1.45 500 .06em; `.t-hero` clamp(44px,6.4vw,112px)/.94 500 -.045em; `.t-statement` clamp(44px,7vw,112px)/.92 500 -.045em; `.t-section` clamp(34px,4.4vw,72px)/.96 500 -.04em; `.t-big` clamp(26px,2.9vw,48px)/1.08 450 -.03em. Every token: https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/api/tokens.json (flat, with light/dark values) or https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/tokens.json (the W3C source; same values).

## 6. Self-check (run it before you finish)

Open your page next to https://work.vimaksh.in at 1440px and at 390px, in light and in dark, and confirm each line:

1. Background is paper with the cross every 192px and dots every 24px; light theme shows grain; dark theme has no grain.
2. Headings are Inter Tight 500 with negative tracking; nothing is bold 700; mono text is uppercase and small.
3. Every section label starts with a red ">"; the only other red things are primary buttons, focused inputs and errors.
4. No rounded corners except the theme toggle; no shadows except the four listed in Elevation.
5. Header: wordmark left, theme toggle right, no links. Navigation: the bottom-right stack.
6. Footer: dark in both themes, pixel edge on top, statement, columns, heat base with the giant white wordmark.
7. Primary buttons end with the chevron and it nudges on hover (a ghost may go without); inputs are underlines; errors are short mono lines.
8. Spacing: content touches the --pad gutter, cards are 14px apart, sections have large fluid padding.
9. Images are real media or pixel motifs; nothing is stock; nothing is tinted.
10. Copy is short, factual, sentence case; every gap is a visible [PLACEHOLDER: …].
11. Keyboard: skip link first, focus ring visible on every control; reduced motion stops the grain and slows the drifts.

Fix every mismatch and check again.
