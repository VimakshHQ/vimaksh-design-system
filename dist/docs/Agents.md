# For agents

> The Copy brand identity prompt, agents.md and every machine-readable file, with their stable URLs.

Vimaksh design system 0.1.0. HTML: /agents/ (local docs site). Source of truth: https://work.vimaksh.in at yakosasam797/vimakshwebsite-identity-final@8df1553.

### Copy brand identity
Paste this into an agent working on another project. It points at stable URLs instead of pasting the system:

```
Give this project the Vimaksh design language: the exact look of https://work.vimaksh.in. Take every value from the Vimaksh design system; do not invent colours, sizes, radii, shadows or copy.

1. Read https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/agents.md first, then https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/llms-full.txt (every page as Markdown).
2. Download these into the project and serve them locally. They are raw GitHub files, so do not hotlink them from <link> or <script> tags:
   https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/vimaksh.css (tokens + every component; keep fonts/ next to it)
   https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/fonts/inter-tight.woff2 and https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/fonts/jetbrains-mono-500.woff2
   https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/vimaksh.js (theme, header, navigation, copy, pixel edges, reveal)
   https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/tokens.json and, if the project uses Tailwind, https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/tailwind-preset.cjs (v3) or https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/tailwind.css (v4)
   https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/svg/vimaksh-wordmark.svg and https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/svg/vimaksh-mark.svg
3. Build with the documented markup (https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/<Component>.md) and check every item:
   - Colour: paper #F4F2EE (dark #0F1020) with the cross-and-dot pattern, ink/strong text; red #E42114 only for the primary action and the ">" chevron; footer always dark night #0D0E1C.
   - Themes: light and dark through <html data-theme>, set before first paint; test both.
   - Type: Inter Tight for everything read, weight 500 headings with tight negative tracking and the clamp() sizes; JetBrains Mono 500, 11–11.5px, uppercase, wide tracking for labels, nav and buttons. Labels start with a red ">".
   - Spacing and grid: full-width pages, gutter --pad clamp(16px,2.6vw,40px), 14px card gaps, big fluid section padding; breakpoints max-width 1100px and 760px.
   - Surfaces and patterns: square corners everywhere; 1px hairlines; grain in light only; pixel edges where a section meets a different surface; heat gradient only on the footer base.
   - Buttons: .btn red with a mono label and a ">" that nudges 5px on hover; .btn--ghost hairline.
   - Cards: .card with 4:5 media, the product's own logo on a paper chip, title + mono kind, one sentence, visit bar.
   - Forms: underline fields, mono labels above, short mono error lines, the phone field with a country picker.
   - Navigation: wordmark header + theme toggle; the bottom-right navigation stack; no top nav bar.
   - Motion: cubic-bezier(.2,.8,.2,1), .2–.35s colour changes, honour prefers-reduced-motion.
   - Imagery: real product media or the pixel motifs; no stock photos, no rounded images, no shadows on content.
   - Voice: short declarative sentences in sentence case; no invented facts; mark gaps [PLACEHOLDER: …].
4. Self-check before you finish: compare your page with the checklist in agents.md and with https://work.vimaksh.in, in both themes and at 390px wide. Fix every mismatch, then check again.
```

### Machine-readable files

| File | What it is |
| --- | --- |
| [agents.md](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/agents.md) | Rules for agents: set-up, hard rules, components, tokens, self-check |
| [llms.txt](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/llms.txt) | Index of every page as Markdown |
| [llms-full.txt](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/llms-full.txt) | Every page in one file |
| [prompt.txt](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/prompt.txt) | The Copy brand identity prompt |
| [catalog.json](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/catalog.json) | Every page, component, file and example |
| [api/components.json](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/api/components.json) | Components: markup, API, tokens, sources |
| [api/foundations.json](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/api/foundations.json) | Foundations with their tokens and contrast |
| [api/tokens.json](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/api/tokens.json) | Flat token list with light/dark values |
| [tokens.json](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/tokens.json) | The W3C design tokens source |
| [docs/<Name>.md](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/Button.md) | One page as Markdown |
