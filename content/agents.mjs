// The two texts written for other agents: the short "Copy brand identity" prompt and agents.md.
// Both point at stable URLs (BASE) instead of pasting the system.
export const prompt = BASE => `Give this project the Vimaksh design language: the exact look of https://work.vimaksh.in. Take every value from the Vimaksh design system; do not invent colours, sizes, radii, shadows or copy.

1. Read ${BASE}agents.md first, then ${BASE}llms-full.txt (every page as Markdown).
2. Download these into the project and serve them locally. They are raw GitHub files, so do not hotlink them from <link> or <script> tags:
   ${BASE}vimaksh.css (tokens + every component; keep fonts/ next to it)
   ${BASE}fonts/inter-tight.woff2 and ${BASE}fonts/jetbrains-mono-500.woff2
   ${BASE}vimaksh.js (theme, header, navigation, copy, pixel edges, reveal)
   ${BASE}tokens.json and, if the project uses Tailwind, ${BASE}tailwind-preset.cjs (v3) or ${BASE}tailwind.css (v4)
   ${BASE}brand/svg/vimaksh-wordmark.svg and ${BASE}brand/svg/vimaksh-mark.svg
3. Build with the documented markup (${BASE}docs/<Component>.md) and check every item:
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
4. Self-check before you finish: compare your page with the checklist in agents.md and with https://work.vimaksh.in, in both themes and at 390px wide. Fix every mismatch, then check again.`;

export const agentsMd = ({ BASE, VERSION, components, foundations, tokens }) => `# Building with the Vimaksh design system

Version ${VERSION}. The design language of https://work.vimaksh.in, extracted from its code. Every value below comes from the site; nothing is invented. Where the site has no rule, this file says so and marks it \`[PLACEHOLDER: …]\`.

All files: ${BASE} (raw GitHub). Download them into your project; raw GitHub serves text/plain, so a \`<link>\` to it will not apply.

## 1. Set up a page

\`\`\`html
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
\`\`\`

Files to copy next to the page: \`vimaksh.css\`, \`fonts/inter-tight.woff2\`, \`fonts/jetbrains-mono-500.woff2\`, \`vimaksh.js\` (and its \`chunk-*.js\` siblings listed in ${BASE}catalog.json), \`brand/svg/*\`. With a phone field also \`vimaksh-phone.js\`, \`vendor/intl-tel-input.css\` and \`vendor/img/*\`. \`data-page="home"\` shows the full navigation stack on load; use any other value on inner pages.

Tailwind: load \`tokens.css\` (or \`vimaksh.css\`) first, then use \`tailwind-preset.cjs\` (v3, \`presets: [require('./tailwind-preset.cjs')]\`) or \`@import "./tailwind.css"\` (v4). Colours are CSS variables, so both themes keep working. Still use the component markup: the preset gives you values, not components.

## 2. Hard rules

MUST
- Use Inter Tight for all reading text and JetBrains Mono 500 (uppercase, letter-spacing .06–.08em) for labels, navigation, buttons and metadata.
- Support light and dark through \`<html data-theme>\`, set before first paint. The footer stays dark in both.
- Put \`background: var(--pattern), var(--paper)\` on the page and on every section.
- Keep every corner square (radius 0). The theme toggle is the only rounded element.
- Use red (\`--red #E42114\`) only for the primary button, the ">" chevron, the focused input underline and errors.
- Start section labels with a red chevron: \`<p class="t-mono label"><span class="chev">&gt;</span> Label</p>\`.
- Use the real wordmark SVG inline with \`fill="currentColor"\`; never type the name as a logo.
- Keep the full-width layout with the \`--pad\` gutter and the 1100px / 760px max-width breakpoints.
- Mark missing content \`[PLACEHOLDER: …]\` and keep it visible.

MUST NOT
- No new colours, gradients, shadows, radii, fonts or icon libraries.
- No card shadows, glass panels or gradients behind copy. The heat gradient is for the footer base only.
- No top navigation bar or hamburger overlay; navigation is the bottom-right stack.
- No stock photos, mock devices, fake dashboards or generated people.
- No invented facts: metrics, clients, team, awards, years, response times.
- No banned words: award-winning, leading, global, multidisciplinary, full-service; no ocean, ship, anchor or wave puns.

## 3. Components

${components.map(c => `- [${c.title || c.name}](${BASE}docs/${c.name}.md): ${c.summary.split('. ')[0]}.`).join('\n')}

## 4. Foundations

${foundations.map(f => `- [${f.title || f.name}](${BASE}docs/${f.name}.md): ${f.summary.split('. ')[0]}.`).join('\n')}
- [Brand](${BASE}docs/Brand.md), [Pixel motifs](${BASE}docs/PixelMotifs.md), [Icons](${BASE}docs/Icons.md), [Downloads](${BASE}docs/Downloads.md)

## 5. Token quick reference

| Token | CSS variable | Light | Dark |
| --- | --- | --- | --- |
${tokens.filter(t => t.name.startsWith('color.theme.')).map(t => `| ${t.name} | \`${t.cssVar}\` | \`${t.value.light}\` | \`${t.value.dark}\` |`).join('\n')}

| Token | CSS variable | Value |
| --- | --- | --- |
${tokens.filter(t => /^(color\.brand|space|motion\.easing|radius|border)\./.test(t.name)).map(t => `| ${t.name} | \`${t.cssVar || ''}\` | \`${t.value}\` |`).join('\n')}

Type classes: ${tokens.filter(t => t.class).map(t => `\`.${t.class}\` ${t.value.fontSize}/${t.value.lineHeight || 'normal'} ${t.value.fontWeight} ${t.value.letterSpacing || ''}`).join('; ')}. Everything else: ${BASE}api/tokens.json.

## 6. Self-check (run it before you finish)

Open your page next to https://work.vimaksh.in at 1440px and at 390px, in light and in dark, and confirm each line:

1. Background is paper with the cross every 192px and dots every 24px; light theme shows grain; dark theme has no grain.
2. Headings are Inter Tight 500 with negative tracking; nothing is bold 700; mono text is uppercase and small.
3. Every section label starts with a red ">"; the only other red things are primary buttons, focused inputs and errors.
4. No rounded corners except the theme toggle; no shadows except the four listed in Elevation.
5. Header: wordmark left, theme toggle right, no links. Navigation: the bottom-right stack.
6. Footer: dark in both themes, pixel edge on top, statement, columns, heat base with the giant white wordmark.
7. Buttons have the chevron and it nudges on hover; inputs are underlines; errors are short mono lines.
8. Spacing: content touches the --pad gutter, cards are 14px apart, sections have large fluid padding.
9. Images are real media or pixel motifs; nothing is stock; nothing is tinted.
10. Copy is short, factual, sentence case; every gap is a visible [PLACEHOLDER: …].
11. Keyboard: skip link first, focus ring visible on every control; reduced motion stops the grain and slows the drifts.

Fix every mismatch and check again.
`;
