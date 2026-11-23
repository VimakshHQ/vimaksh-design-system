# Overview

> The design language of work.vimaksh.in, extracted from its code: tokens, one CSS file, the site’s behaviour, brand assets, and docs that people and agents can use. Every value cites the website line it comes from.

Vimaksh design system 0.1.0. HTML: / (local docs site). Source of truth: https://work.vimaksh.in at VimakshHQ/vimakshwebsite-identity-final@8df1553.

### Copy brand identity
Paste this into an agent working on another project:

```
Give this project the Vimaksh design language: the exact look of https://work.vimaksh.in. Take every value from the Vimaksh design system; do not invent colours, sizes, radii, shadows, components or facts.

1. Read https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/agents.md first, then https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/llms-full.txt (every page as Markdown).
2. Download these into the project and serve them locally. They are raw GitHub files, so do not hotlink them from <link> or <script> tags:
   https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/vimaksh.css with https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/fonts/inter-tight.woff2 and https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/fonts/jetbrains-mono-500.woff2 in fonts/ next to it
   https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/vimaksh.js (theme, header, navigation, copy, forms, pixel art, reveal; one file)
   https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/brand/svg/vimaksh-wordmark.svg and https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/brand/svg/vimaksh-mark.svg
   Hero: https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/pixel-hero.js next to vimaksh.js (it reads brand/svg/vimaksh-mark.svg relative to itself)
   Phone field: https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/vimaksh-phone.js, https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/vendor/intl-tel-input.css and https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/vendor/img/flags.webp, flags@2x.webp, flags.png, flags@2x.png (same folder)
   Tailwind: https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/tokens.css plus https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/tailwind-preset.cjs (v3) or https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/tailwind.css (v4)
3. Build with the documented markup (https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/<Component>.md) and check every item:
   - Colour: paper #F4F2EE (dark #0F1020) with the cross-and-dot pattern, ink/strong text; red #E42114 only for the primary action, the ">" chevron and the hero's one <highlight>; footer always dark night #0D0E1C.
   - Themes: light and dark through <html data-theme>, set before first paint; test both.
   - Type: Inter Tight for everything read, weight 500 headings with tight negative tracking and the clamp() sizes; JetBrains Mono 500, 11–11.5px, uppercase, wide tracking for labels, nav and buttons. Labels start with a red ">".
   - Spacing and grid: full-width pages, gutter --pad clamp(16px,2.6vw,40px), 14px card gaps, big fluid section padding; breakpoints max-width 1100px and 760px.
   - Surfaces and patterns: square corners everywhere; 1px hairlines; grain in light only; pixel edges where a section meets a different surface; heat gradient only on the footer base.
   - Brand: the page is Vimaksh's, so header and footer use the Vimaksh wordmark. A product appears with its own logo, unchanged, only in a logo chip on its media; never restyle a product logo.
   - Buttons: .btn red with a mono label and a ">" that nudges 5px on hover; .btn--ghost hairline.
   - Cards: .card with 4:5 media, the product's own logo on a paper chip, title + mono kind, one sentence, visit bar.
   - Forms: underline fields, mono labels above, short mono error lines, the phone field with a country picker.
   - Navigation: wordmark header + theme toggle; the bottom-right navigation stack; no top nav bar.
   - Motion: cubic-bezier(.2,.8,.2,1), .2–.35s colour changes, honour prefers-reduced-motion.
   - Imagery: real product media or the pixel motifs; no stock photos, no rounded images, no shadows on content.
   - Voice: short declarative sentences in sentence case. Functional UI copy (labels, buttons) follows the voice rules; facts (features, numbers, people, promises) are never invented: mark them [PLACEHOLDER: …].
4. Self-check before you finish: compare your page with the checklist in agents.md and with https://work.vimaksh.in, in both themes and at 390px wide. Fix every mismatch, then check again.
```

### Start here
- [Getting started](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/GettingStarted.md): put the look into a project.
- [For agents](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/Agents.md): the prompt, agents.md and every machine-readable file.
- [Color](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/Color.md) and the other foundations: the values, named.
- [Brand](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/Brand.md): mark, wordmark, downloads.

### Foundations
- [Color](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/Color.md): Paper and ink, one red for action, and a dark night for the footer.
- [Typography](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/Typography.md): Inter Tight for everything that is read, set large, at weight 500 with tight negative tracking.
- [Spacing and layout](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/SpacingLayout.md): Full-width pages with one fluid gutter, generous fluid section padding, a 14px gap between cards, and two max-width breakpoints.
- [Surfaces](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/Surfaces.md): Three paper levels and one night.
- [Patterns and grain](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/Patterns.md): Five textures make the brand: the paper pattern, the grain, the pixel edge, the hero's chevron field and the heat gradient.
- [Elevation](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/Elevation.md): The site is flat.
- [Motion](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/Motion.md): One easing for almost everything, short colour changes, small nudges.
- [Iconography](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/Iconography.md): The site has almost no icons.
- [Imagery](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/Imagery.md): Real product footage in square frames, the products' own logos on paper chips, and pixel illustrations drawn on a grid.
- [Voice and content](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/Voice.md): Short declarative sentences, concrete nouns, active verbs.
- [Accessibility](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/Accessibility.md): Target WCAG 2.2 AA.

### Components
- [Header](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/Header.md): The wordmark at top left and the theme toggle at top right.
- [Theme toggle](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/ThemeToggle.md): A pill whose knob slides between sun and moon; the icon turns as it travels.
- [Navigation stack](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/NavigationStack.md): The site's only navigation: a stack of boxed mono links fixed at the bottom right, ending in a solid Menu box.
- [Button](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/Button.md): Square buttons with a mono uppercase label and a ">" chevron that nudges 5px right on hover.
- [Text link](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/TextLink.md): A mono link with an underline in the text colour and a red chevron that nudges 4px on hover.
- [Pill](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/Pill.md): A small square mono chip that copies a value (an email, coordinates) or labels an expandable row.
- [Copy tooltip](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/CopyTooltip.md): A tiny strong label that follows the pointer over anything with data-copy: "Copy", then "Copied ✓" (or "Copy failed") for 1.3s after a click.
- [Section header](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/SectionHeader.md): A top hairline, a "> Label" in mono, a large heading and an optional action on the right.
- [Project card](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/ProjectCard.md): A product in the work grid: 4:5 video (4:3 on phones) with a number and the product's own logo on a paper chip, then title and mono kind, a one-line description, and a full-width visit bar.
- [Logo chip](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/LogoChip.md): A product's own logo on an off-white chip in the top-left corner of a project card.
- [Build card and track](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/BuildTrack.md): The "What we build" row: cards with a pixel tile in the item's own colour, a numbered tag, a square bullet and a short description, on a track that drifts sideways on its own and pauses on hover, touch or focus.
- [About block](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/AboutBlock.md): A short statement section: a compact pixel illustration on the left and one large paragraph (t-big) on the right, centred on one line.
- [Hero](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/Hero.md): The home opening: a living pixel surface (WebGL) where a field of tiny ">" and "<" glyphs flows across paper and the Vimaksh mark assembles from the same pixels.
- [Contact block](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/ContactBlock.md): Bordered card blocks made of rows: a red "Start a project" row that drops open the brief form, plain rows with copy pills, and a split block for the studio address and coordinates.
- [Brief form](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/BriefForm.md): The project brief: name, email, phone, company (optional) and a message.
- [Inputs and validation](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/Inputs.md): Text fields are a single underline: --rule2 at rest, red on focus and when invalid.
- [Phone field](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/PhoneField.md): intl-tel-input 29.5.11, themed to the site: a flag and +code in mono with a small red chevron, a square searchable country list on --card, India preselected and a short list of common countries first.
- [Footer](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/Footer.md): Always dark (night) in both themes.
- [Pixel edge](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/PixelEdge.md): A band of squares, 7 rows of 14px cells (10px on phones), that thins toward the far edge.
- [Legal page](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/LegalPage.md): A single readable column (max 760px) for terms, privacy and cookies: a mono label, a t-hero title at a smaller size, the update date in mono, and 16px/1.6 body with 22px section headings.
- [Skip link](https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/docs/SkipLink.md): The first element on every page: "Skip to content", off screen until it receives focus, then a strong box at top left.
