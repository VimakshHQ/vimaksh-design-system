// Foundation pages. `visual` names a renderer in scripts/docs.mjs that draws the page's specimens from
// tokens.json, so the pictures can never disagree with the values. Body text is Markdown.
export const FOUNDATIONS = [
  {
    slug: 'color', name: 'Color', group: 'Foundations', visual: 'color',
    summary: 'Paper and ink, one red for action, and a dark night for the footer. Every role has a light and a dark value; the brand colours do not change with the theme.',
    body: `
### Roles, not paint
Pick a colour by its job. Every surface and text colour is a role with a light and a dark value, switched by \`<html data-theme>\`:

| Role | Job |
| --- | --- |
| \`--paper\` | The page. Always carries the cross-and-dot pattern. |
| \`--paper2\` | Sunken areas and hover fills. |
| \`--card\` | Raised surfaces: blocks, media backing, dropdowns. |
| \`--ink\` | Body text. |
| \`--strong\` | Headings, solid UI (hover fills, the Menu box). |
| \`--soft\` | Secondary text and labels. |
| \`--rule\` / \`--rule2\` | Hairlines / control borders and input underlines. |
| \`--chip\` | The translucent fill under a backdrop blur. |

### Red is for action
\`--red #E42114\` marks the primary action, the ">" chevron, the focused input underline and errors. Nothing else is red. Coral \`#FF5E55\` is the mark's colour and the accent on the dark footer.

### The footer is always night
The footer stays dark in both themes (\`--night #0D0E1C\` with the dark pattern). Its text colours are fixed footer tokens.

### Blues belong to pixels
Electric, Royal, Glow and Mist appear in the pixel graphics and the hero field. In the interface, Electric is only the focus ring.

### Kind colours are only for "What we build"
Each kind of software has a colour for its pixel tile, its 3px stripe and its square bullet. Never use them for interface states.

### The mark's own colours
The SVG files use \`#FF5F53\` and \`#E32112\`; CSS uses \`#FF5E55\` and \`#E42114\`. The difference is one step and is recorded, not corrected: use the files unchanged.
`,
    do: ['Use role variables, never raw hex, in components.', 'Check both themes for every screen.'],
    dont: ['Do not add new accent colours.', 'Do not set small text in red on paper (4.15:1).', 'Do not put red text on the coral or heat surfaces.'],
    sources: [['src/v5/v5.css', 4, 18, 'tokens'], ['src/v5/pixelart.js', 3, 3, 'pixel blues'], ['tools/v5pages.py', 172, 181, 'kind colours']],
  },
  {
    slug: 'typography', name: 'Typography', group: 'Foundations', visual: 'type',
    summary: 'Inter Tight for everything that is read, set large, at weight 500 with tight negative tracking. JetBrains Mono 500, small and uppercase, for labels, navigation and buttons.',
    body: `
### Two families, two jobs
- **Inter Tight** (variable, 100–900): display, headings, body. Weights used: 400 body, 450 statements, 500 headings, 600 only in logo chips.
- **JetBrains Mono 500**: labels ("> Selected work"), navigation, buttons, kinds, dates, coordinates, field errors. Always uppercase with wide tracking, except the dial code and field errors.

### Sizes are fluid
Large styles use \`clamp(min, vw, max)\` and scale continuously; there is no fixed scale. Line-heights under 1 are deliberate for display sizes.

### Labels carry a red chevron
A section label is \`<p class="t-mono label"><span class="chev">&gt;</span> Label</p>\`. The chevron is the brand's ">" from the mark.

### Write in sentence case
Source text is sentence case. Mono labels and buttons become uppercase through CSS, so copy stays readable and searchable.

### Files
\`fonts/inter-tight.woff2\` (45 KB) and \`fonts/jetbrains-mono-500.woff2\` (22 KB), both SIL OFL 1.1, \`font-display: swap\`. Preload Inter Tight.
`,
    do: ['Use the t-* classes for the five base styles.', 'Keep paragraphs under about 56ch (cards) to 46ch (lead copy).'],
    dont: ['Do not use mono for paragraphs.', 'Do not use bold (700) anywhere.', 'Do not justify text.'],
    sources: [['src/v5/v5.css', 2, 8, 'fonts'], ['src/v5/v5.css', 36, 43, 'type classes']],
  },
  {
    slug: 'spacing-layout', name: 'SpacingLayout', title: 'Spacing and layout', group: 'Foundations', visual: 'space',
    summary: 'Full-width pages with one fluid gutter, generous fluid section padding, a 14px gap between cards, and two max-width breakpoints. The values below are the ones the site uses, named.',
    body: `
### The gutter
Everything sits inside \`--pad: clamp(16px, 2.6vw, 40px)\` on the left and right. There is no centred max-width container: the site is full width.

### Breakpoints
Desktop first, two \`max-width\` breakpoints: **1100px** (three columns become two) and **760px** (one column, phone header 68px, nav stack narrower).

### Grids
- Work: \`repeat(3,1fr)\`, gap \`clamp(40px,4vw,64px) 14px\`; 2 columns ≤1100px; 1 column ≤760px.
- Contact and footer top: two columns, one on phones.
- Footer columns: \`1fr 1.4fr 1fr 1fr\`; 2 columns ≤1100px.
- About: \`clamp(220px,24vw,340px) 1fr\`.

### Vertical rhythm
Sections: \`clamp(70px,8vw,130px)\` top and \`clamp(80px,9vw,140px)\` bottom; compact sections \`clamp(56px,6vw,96px)\`; footer \`clamp(90px,10vw,160px)\`. Label to heading 18px; section header to content \`clamp(28px,3.4vw,52px)\`.

### No spacing scale
The site has no 4/8 scale and this system does not invent one. Reuse the named values; for anything else, match the nearest existing element.
`,
    do: ['Use --pad for every horizontal edge.', 'Let sections breathe: the large padding is part of the hierarchy.'],
    dont: ['Do not centre content in a narrow container.', 'Do not add rounded section containers.'],
    sources: [['src/v5/v5.css', 9, 9, 'pad, hdr'], ['src/v5/v5.css', 137, 138, 'work grid'], ['src/v5/v5.css', 303, 326, 'breakpoints']],
  },
  {
    slug: 'surfaces', name: 'Surfaces', group: 'Foundations', visual: 'surfaces',
    summary: 'Three paper levels and one night. Surfaces are flat and square: separated by hairlines and by the paper pattern, not by shadows.',
    body: `
### Levels
- **Paper** (\`--paper\` + pattern): the page and every section.
- **Paper 2** (\`--paper2\`): sunken rows, hover fills.
- **Card** (\`--card\`): blocks with a \`--rule2\` border, media backing.
- **Night** (\`--night\` + dark pattern): the footer, in both themes.

### Sections rise
Sections after the hero have \`position: relative\` and paper backgrounds, so they slide over the sticky hero. A paper pixel edge sits on top of the first one.

### A light card on night
In the footer the brief is a light card (\`.fbrief\`) that resets the light-theme roles locally and floats with the only large shadow on the site.
`,
    do: ['Separate with 1px hairlines.', 'Keep every corner square.'],
    dont: ['Do not use glass panels or gradients behind copy.', 'Do not nest cards inside cards.'],
    sources: [['src/v5/v5.css', 126, 128, 'rise'], ['src/v5/v5.css', 228, 228, 'block'], ['src/v5/v5.css', 703, 703, 'light card on night']],
  },
  {
    slug: 'patterns', name: 'Patterns', title: 'Patterns and grain', group: 'Foundations', visual: 'patterns',
    summary: 'Five textures make the brand: the paper pattern, the grain, the pixel edge, the hero\'s chevron field and the heat gradient. Each has one job.',
    body: `
### Paper pattern (everywhere)
A 12px cross every 192px plus a 0.9px dot every 24px, ink at low opacity in light, mist in dark. Apply as \`background: var(--pattern), var(--paper)\`.

### Grain (light theme only)
A 220px fractal-noise tile in a fixed overlay at opacity .08, shifting in six steps every 1.2s. It is not drawn in the dark theme (black grain is invisible on dark paper). It stops with reduced motion.

### Pixel edge (between areas)
Squares thinning toward the far edge: 7 rows of 14px cells. See the Pixel edge component.

### Chevron field (hero only)
Rows of 5×5 ">" and "<" glyphs in Royal on Mist, flowing on a noise field; the mark is built from the same cells.

### Heat gradient (footer base only)
Red → coral → plum → royal, three radial highlights and grain at .55 overlay. It carries the giant wordmark and nothing else.
`,
    do: ['Use each texture only in its place.'],
    dont: ['Do not use the heat gradient as a section or button background.', 'Do not tile the chevrons as a generic background.', 'Do not add blur or noise filters of your own.'],
    sources: [['src/v5/v5.css', 10, 14, 'pattern and grain'], ['src/v5/v5.css', 23, 28, 'grain overlay'], ['src/v5/v5.css', 169, 175, 'heat'], ['src/v5/pixelhero.js', 1, 80, 'chevron field']],
  },
  {
    slug: 'elevation', name: 'Elevation', group: 'Foundations', visual: 'elevation',
    summary: 'The site is flat. There are exactly four shadows, each for one object, and two backdrop blurs. There is no elevation scale.',
    body: `
| Token | Value | Only on |
| --- | --- | --- |
| \`shadow.knob\` | \`0 2px 8px rgba(0,0,0,.18)\` | Theme toggle knob (hover: \`0 2px 14px rgba(0,0,0,.25)\`) |
| \`shadow.chip\` | \`0 1px 0 rgba(0,0,0,.08)\` | Logo chip on project media |
| \`shadow.card\` | \`0 30px 70px -30px rgba(0,0,0,.6)\` | The light brief card on the dark footer |
| \`shadow.popover\` | \`0 18px 40px -18px rgba(11,10,20,.35)\` | Country list of the phone field |

Backdrop blur: 8px under navigation items, 10px under the theme toggle, always on the translucent \`--chip\` fill.
`,
    do: ['Show depth with surface colour and hairlines.'],
    dont: ['Do not add shadows to cards, buttons or images.', 'Do not invent a level 1–5 scale.'],
    sources: [['src/v5/v5.css', 73, 79, 'knob'], ['src/v5/v5.css', 591, 591, 'chip'], ['src/v5/v5.css', 703, 703, 'card'], ['src/v5/v5.css', 792, 792, 'popover']],
  },
  {
    slug: 'motion', name: 'Motion', group: 'Foundations', visual: 'motion',
    summary: 'One easing for almost everything, short colour changes, small nudges. The hero is the only thing that always moves.',
    body: `
### Easing
- **Standard** \`cubic-bezier(.2,.8,.2,1)\`: every transform and reveal.
- **Toggle** \`cubic-bezier(.65,0,.25,1)\`: the theme knob's travel.
- **Overshoot** \`cubic-bezier(.34,1.56,.64,1)\`: only the red arrow landing in the footer mark.

### Durations
Hover colours .2–.25s; header and nav .35s; theme crossfade .6s; reveal .9s (opacity) / 1s (rise); media zoom 1.4s.

### The vocabulary
- **Chevron nudge**: the ">" moves 5px right on button hover (4px on text links).
- **Reveal**: blocks rise 22px and fade in once, staggered 80ms in threes.
- **Media**: card video scales 1.02 → 1.07 and saturates .82 → 1 on hover.
- **Nav unfold**: links appear from the bottom, 45ms apart.
- **Mark assembly**: the six arrows fly in to the footer mark; the red one last, with overshoot.
- **Track drift**: 34px/s, slower on hover.

### Reduced motion
With \`prefers-reduced-motion: reduce\`: the grain stops, smooth scrolling is off, the track drifts at 18px/s, the hero runs at half speed and settles sooner.
`,
    do: ['Animate opacity and transform only.', 'Pause anything that loops when it is off screen.'],
    dont: ['Do not add bounce except the red arrow.', 'Do not animate text letter by letter or scramble it.', 'Do not add a second always-moving scene.'],
    sources: [['src/v5/v5.css', 9, 9, 'ease'], ['src/v5/v5.css', 298, 300, 'reveal'], ['src/v5/main.js', 203, 226, 'mark and reveal'], ['src/v5/v5.css', 327, 330, 'reduced motion']],
  },
  {
    slug: 'iconography', name: 'Iconography', group: 'Foundations',
    summary: 'The site has almost no icons. Its arrow is the mono ">" chevron; the only drawn icons are the sun and moon of the theme toggle. A full icon set has not been chosen yet.',
    body: `
### What exists
- **Chevrons**: \`>\` and \`<\` set in JetBrains Mono, red on paper and coral on night. They point, bracket labels ("> Work <") and nudge on hover.
- **Pixel chevrons**: the 5×5 glyphs of the hero field (\`brand/pixel/svg/chevron-right.svg\`, \`chevron-left.svg\`).
- **Sun and moon**: 24×24 viewBox, 1.6 stroke, round caps, \`currentColor\`. Only in the theme toggle.
- **Menu dots**: four 4px dots that morph into an X.
- **Disclosure triangle**: ▸ in the "Submit brief" pill, rotating 90° when open.
- **Flags**: from intl-tel-input, in the phone field only.

See the [icon gallery](doc:Icons) to copy them.

### Gap
\`[PLACEHOLDER: icon set to be supplied by Vimaksh]\`. Until it arrives, use a chevron or a word instead of an icon. Do not import a general icon library.
`,
    do: ['Prefer a word to an icon.', 'Use the mono chevron for direction.'],
    dont: ['Do not mix in an outside icon set.', 'Do not use emoji as icons.'],
    sources: [['tools/v5pages.py', 47, 54, 'sun and moon'], ['src/v5/v5.css', 344, 349, 'menu dots'], ['src/v5/pixelhero.js', 23, 28, 'pixel chevrons']],
  },
  {
    slug: 'imagery', name: 'Imagery', group: 'Foundations', visual: 'imagery',
    summary: 'Real product footage in square frames, the products\' own logos on paper chips, and pixel illustrations drawn on a grid. No stock photography.',
    body: `
### Product media
Short muted loops recorded from the real product, with a poster frame, at 4:5 (4:3 on phones). Saturation .82 at rest, 1 on hover; a light darkening veil and grain on top. Play only while on screen.

### Product logos
The product's own logo, unchanged, on an off-white chip at the top left of its media.

### Pixel illustrations
Drawn square by square on a small grid (48×36 for tiles, 84×64 for the desk) and scaled up with \`image-rendering: pixelated\`. Each What we build tile uses its kind colour. Grab them from Pixel motifs or draw new ones with \`pixel/pixelsaas.js\`.

### Honesty
\`[PLACEHOLDER: …]\` marks missing media. Do not fill a gap with stock photos, AI images of real software or people, mock laptops or fake dashboards.
`,
    do: ['Use real captures with enough framing to understand them.', 'Keep pixel art crisp (nearest-neighbour scaling).'],
    dont: ['Do not round images or add shadows.', 'Do not tint product footage to brand colours.', 'Do not use stock photos or generated "team" pictures.'],
    sources: [['src/v5/v5.css', 140, 144, 'media'], ['src/v5/pixelsaas.js', 1, 40, 'pixel tiles'], ['DESIGN.md', 469, 501, 'imagery rules (DESIGN.md)']],
  },
  {
    slug: 'voice', name: 'Voice', title: 'Voice and content', group: 'Foundations',
    summary: 'Short declarative sentences, concrete nouns, active verbs. Curious and exacting without sounding severe. Never invent a fact: mark the gap.',
    body: `
### How Vimaksh writes
- Short declarative sentences. Concrete nouns and active verbs.
- "We" for the studio; the real product name for the work.
- Sentence case for headings, labels, buttons and navigation (CSS uppercases the mono ones).
- One idea per sentence. Plain words: "use", not "leverage".
- "Boil the Ocean." is the one expansive idiom. Do not surround it with puns.

### Examples from the site
- Hero: "We turn <what if?> into products, platforms and experiments you can actually use."
- Section: "Things we've built, and are building."
- Footer: "Come build what should exist."
- Buttons: "Explore our work", "Start a project", "Send brief", "Visit paryatech.in".
- Errors: "This number is too short for the country you chose."

### Banned
- **Metaphors**: anchors, ships, nautical badges, thermometers, bubbles behind body copy, invented depth readings, wave puns, generic transformation claims.
- **Adjectives** unless evidenced: award-winning, leading, global, multidisciplinary, full-service.
- **Invented facts**: results, metrics, years of experience, client counts, client names, team names or photos, availability promises.

### The placeholder convention
\`[PLACEHOLDER: …]\` always means missing editorial content or an asset, never a fact. Keep it visible in review builds. An unresolved placeholder blocks publication of its component: replace it with confirmed content or remove the component. Never silently replace it with something plausible.

### Open conflicts (live site vs DESIGN.md)
The live site is the source of truth for the look. Four pieces of live copy conflict with DESIGN.md's content rules and are waiting for a decision:
1. "We read every brief and reply within two working days" (a response-time promise).
2. Project cards are numbered 01–06.
3. The footer shows a live clock and a full street address.
4. "Custom software, and nothing else" next to the earlier "independent experiments" framing.

\`[PLACEHOLDER: Vimaksh to decide which rule wins for each]\`. Until then, do not copy these four into new work.
`,
    do: ['Say what something does in one sentence.', 'Use the product\'s real status and real links.'],
    dont: ['Do not pad pages with testimonials, logo walls, statistics or FAQs made from nothing.', 'Do not write in capitals.'],
    sources: [['DESIGN.md', 24, 26, 'placeholder rule'], ['DESIGN.md', 88, 92, 'copy voice'], ['DESIGN.md', 11, 11, 'banned metaphors'], ['tools/v5pages.py', 193, 242, 'live copy']],
  },
  {
    slug: 'accessibility', name: 'Accessibility', group: 'Foundations', visual: 'contrast',
    summary: 'Target WCAG 2.2 AA. Real DOM before scripts, a skip link, visible focus, labelled controls, live regions for errors, and motion that respects reduced motion. Two known contrast issues are listed below.',
    body: `
### What every page has
- A skip link to \`<main id="main">\`, one H1, H2 per section with \`aria-labelledby\`.
- Focus: \`:focus-visible { outline: 2px solid var(--electric); outline-offset: 3px }\`.
- Decorative graphics (chevrons, pixel edges, giant wordmark) are \`aria-hidden\`; the hero canvas and pixel illustrations have \`role="img"\` and a description.
- Buttons for actions, links for navigation; external links say "(opens in a new tab)" in hidden text.
- Form errors in \`aria-live\` regions inside the label; the first invalid field is focused on submit.
- Everything readable without JavaScript, canvas or animation.

### Contrast, measured
The table above is computed from the tokens. Two pairs fail:
- **Focus ring on dark paper** (Electric on \`#0F1020\`) is about 2.35:1, under the 3:1 needed for focus indicators. \`[PLACEHOLDER: fix approved by Vimaksh, for example the coral or glow focus colour in the dark theme]\`.
- **Red text on paper** (4.15:1 light, 4.06:1 dark) is under 4.5:1 for small text. On the site it is used for decorative chevrons and short error lines; do not use it for body text.

### Motion
Honour \`prefers-reduced-motion\` (see Motion). Nothing requires an animation to finish before it can be read.

### Touch
Controls are at least 40px high on phones (nav items, pills, the toggle 36px). Keep new targets at 44px.
`,
    do: ['Test in both themes, with the keyboard, and at 200% zoom.'],
    dont: ['Do not convey state by colour alone.', 'Do not remove the focus outline.'],
    sources: [['src/v5/v5.css', 32, 35, 'focus, skip, sr'], ['DESIGN.md', 447, 456, 'accessibility rules (DESIGN.md)']],
  },
];

export const BRAND = {
  slug: 'brand', name: 'Brand', title: 'Brand', group: 'Brand', visual: 'brand',
  summary: 'The six-arrow mark (five coral, one red), the Vimaksh wordmark, and the 3D logo sculpture. Use the files as they are, in the colours the site uses them in.',
  body: `
### The mark
Six arrows meeting at a centre: five coral, one red. The arrows form the "> <" chevrons that run through the whole system. Files: \`vimaksh-mark.svg\` (580×580 artboard, the original) and \`vimaksh-mark-tight.svg\` (cropped to the arrows, the crop the hero uses).

### The wordmark
"vimaksh" in coral, 951×172. On the site it is inlined with \`fill="currentColor"\`, so it takes the colour of where it sits:

| Where on the site | Colour | File |
| --- | --- | --- |
| Header, light theme | \`#0B0A14\` (strong) | \`vimaksh-wordmark-ink.svg\` |
| Header, dark theme | \`#F4F5FF\` (strong) | \`vimaksh-wordmark-light.svg\` |
| Giant wordmark on the footer heat field | \`#FFFFFF\` | \`vimaksh-wordmark-white.svg\` |
| Original file | \`#FF5F53\` (coral) | \`vimaksh-wordmark.svg\` |

### Sizes the site uses
Wordmark: 24px high in the header (20px on phones), full width in the footer base. Mark: 96–160px wide in the footer, about 56 pixel cells across in the hero. These are observed uses, not minimums.

### Clear space and minimum size
\`[PLACEHOLDER: clear space and minimum size rules, to be set by Vimaksh]\`. The site has no written rule. Until there is one, give the mark at least the clearance the header gives the wordmark (the page gutter, \`--pad\`).

### Misuse (proposed, pending approval)
These follow from how the files are built and used; Vimaksh has not yet approved them as rules.
- Do not recolour single arrows or swap which arrow is red.
- Do not stretch or squash (the wordmark keeps \`aspect-ratio: 951/172\`).
- Do not outline, add shadows or put the mark on a busy photograph.
- Do not redraw the letters or set "vimaksh" in a font as a logo.
- Do not use the wordmark in a colour other than the four above.

### The 3D logo
\`vimaksh-logo-sculpture.glb\` (glTF binary, 1.7 MB): the mark as a sculpture, used to render the service stills. Open it in any glTF viewer or three.js.
`,
  sources: [['public/marks/vimaksh-mark.svg', 1, 8, 'mark'], ['public/marks/vimaksh-wordmark.svg', 1, 3, 'wordmark'], ['tools/v5pages.py', 6, 10, 'inline currentColor'], ['src/v5/v5.css', 571, 574, 'sizes'], ['src/v5/v5.css', 734, 742, 'footer mark size']],
};
