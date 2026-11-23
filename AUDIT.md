# Vimaksh Design System: source audit

Audited 17 November 2026. The source is `D:\vimaksh-brand-identity\vimaksh-website-pixel-identity` at `8df1553` ("Work: Godspeed to 05, Vaat to 06").
The live site was checked against that code: https://work.vimaksh.in serves `/assets/main-CfvOayW5.css`, and its rendered HTML uses exactly the same set of class names as the local `index.html`. **The local `main` is the live site.**

Path shorthand: `css` = `src/v5/v5.css`, `pages` = `tools/v5pages.py`, `main` = `src/v5/main.js`, `hero` = `src/v5/pixelhero.js`, `art` = `src/v5/pixelart.js`, `saas` = `src/v5/pixelsaas.js`.

---

## 0. Two findings that change the plan

### 0.1 `DESIGN.md` does not describe the live site

`DESIGN.md` (11 Nov) specifies an earlier "Boil the Ocean" direction: a three.js ocean hero, six crimson line-wave contours, Sea Foam `#CDF5F0`, Marine `#103746`, Tide Cyan `#42CDD7`, Light ground `#FBF8F6`, a right-edge vertical rail, buttons with a 5px radius, "no gradients, no shadows, no numbers, no clock, no address".

The live site (v5 to v11 in the CSS) is a different language: **paper with a cross-and-dot pattern, animated grain, pixel art, pixel edges, the "> <" chevron, square corners everywhere, mono uppercase UI, light and dark themes, a navigation stack at the bottom right, and a dark footer with a "heat" gradient.**

| Topic | DESIGN.md says | Live code does |
|---|---|---|
| Hero | three.js ocean, `src/hero/*` | WebGL pixel field with a chevron texture and the mark built from pixels (`hero`). `src/hero/*` is not loaded by any page. |
| Identity device | 6-line crimson waves | Pixel edges, the chevron field, pixel illustrations |
| Light ground | `#FBF8F6` | `--paper #F4F2EE` |
| Accent palette | Sea Foam, Marine, Tide Cyan | Electric `#1A18FF`, Royal `#2D36FF`, Glow `#7C8DFF`, Mist `#DDE4FF`, Night `#0D0E1C` |
| Button radius | 5px | 0 (square) |
| Shadows / gradients | none | Heat gradient (`css:170`), shadows on the footer brief card and dropdown (`css:703`, `css:792`) |
| Navigation | Right rail: Work, Approach, Let's talk | Bottom-right stack: Work, What we build, About, Let's talk, Menu |
| Numbers / clock / address | Banned | Card numbers 01–06, a live Bengaluru clock, a full street address |
| Response-time promise | "Do not promise a response time" | Footer: "We read every brief and reply within two working days" (`pages:98`) |
| Themes | Not mentioned | Light and dark, both complete |

Because you set the live site as the source of truth, I propose: **visual tokens and components come only from the code. From `DESIGN.md` I keep only the voice, honesty and `[PLACEHOLDER: …]` rules, plus the parts of the accessibility and performance rules that the site does not contradict.** The conflicts are listed as gaps (G1, G2).

### 0.2 About 40% of `v5.css` is dead code

Of the 214 class selectors in `v5.css`, 84 do not appear on any live page or in any script. They come from older about, careers and menu pages that the generator no longer produces. Examples: `.chips`, `.chip`, `.phone-row`, `.btn--dark`, `.menu*`, `.mcard`, `.pgrid`, `.tgrid`, `.person`, `.portrait`, `.values`, `.rlist`, `.steps`, `.how*`, `.rail`, `.qform*`, `.nums`, `.split`, `.page-hero`, `.band`, `.tag`, `.dot`, `.trail`.
The design system documents only what renders on work.vimaksh.in. Dead classes are listed as gaps where you asked for them (chips, see G6).

Also unused by the live pages: `src/hero/*` (ocean), `src/site.css`, `src/site.js`, `src/waves.js`, and `art.portrait`, `art.bot`, `art.skyline` and `art.field`. `three` is still a dependency, but only for `render-marks.html` and the GLB.

---

## 1. Tokens

### 1.1 Color: brand primitives (`css:5-6`)

| Token | Value | Used for |
|---|---|---|
| `--red` | `#E42114` | Primary button, chevrons, focus underline on inputs, errors, active dial code |
| `--red-d` | `#B5180E` | Hover on the "Start a project" row (`css:485`) |
| `--coral` | `#FF5E55` | Chevrons and focus on dark, footer accents |
| `--electric` | `#1A18FF` | `:focus-visible` outline (`css:32`) |
| `--royal` | `#2D36FF` | Hero glyphs, the end stop of the gradient |
| `--glow` | `#7C8DFF` | Pixel-art blue ramp |
| `--mist` | `#DDE4FF` | Hero field ground, the dark-pattern stroke |
| `--night` | `#0D0E1C` | Footer ground |
| `--night2` | `#15172B` | Dark raised surface |

The pixel blue ramp in `art:3` is `#DDE4FF #B9C3FF #7C8DFF #2D36FF #1A18FF`.
Status green `#16a34a` and `#15803d` are used for the sent and ok states (`css:747-748`).

### 1.2 Color: theme roles (`css:17-18`)

| Role | Light | Dark |
|---|---|---|
| `--paper` (page) | `#F4F2EE` | `#0F1020` |
| `--paper2` (sunken / hover) | `#ECEAE4` | `#15172B` |
| `--card` (raised) | `#FBFAF7` | `#17192E` |
| `--ink` (body text) | `#2C1412` | `#E6E8FA` |
| `--strong` (headings, solid UI) | `#0B0A14` | `#F4F5FF` |
| `--soft` (secondary text) | `#6B5B5E` | `#9AA0C8` |
| `--rule` (hairline) | `rgba(44,20,18,.14)` | `rgba(221,228,255,.12)` |
| `--rule2` (control border) | `rgba(44,20,18,.3)` | `rgba(221,228,255,.3)` |
| `--chip` (translucent fill) | `rgba(251,250,247,.7)` | `rgba(23,25,46,.7)` |
| `theme-color` meta | `#F4F2EE` | `#0F1020` (`main:17`) |

Footer-only fixed colors (the footer is always dark): `#ECEEFF` text, `#F4F5FF` headline, `#9aa0c8` labels, `#7b81aa` keys, `rgba(221,228,255,.14)` rules (`css:269-296`).
The theme switch transitions background, color, border and fill over `.6s ease` (`css:19`).

### 1.3 Typography

Fonts (`css:2-3`, `public/fonts`):

- `Inter Tight`, variable 100–900, `inter-tight.woff2` (44.9 KB).
- `JetBrains Mono` 500 only, `jetbrains-mono-500.woff2` (21.8 KB).
- `font-display: swap`. Inter Tight is preloaded (`pages:32`).

Stacks (`css:7-8`): `--sans: 'Inter Tight', ui-sans-serif, -apple-system, 'Segoe UI', sans-serif` and `--mono: 'JetBrains Mono', ui-monospace, Consolas, monospace`.

| Style | Size | LH | Weight | Tracking | Source |
|---|---|---|---|---|---|
| `t-statement` (footer headline) | `clamp(44px,5vw,88px)`; mobile `clamp(42px,12.5vw,60px)` | .92 | 500 | -.045em | `css:38`, final override `css:740`, `css:688` |
| `t-hero` (page H1) | `clamp(44px,6.4vw,112px)`; contact `clamp(40px,4.6vw,80px)`; legal `clamp(40px,5vw,76px)` | .94 | 500 | -.045em | `css:37`, `css:226`, `css:725` |
| `t-section` | `clamp(34px,4.4vw,72px)` | .96 | 500 | -.04em | `css:39` |
| `t-big` (statement paragraph) | base `clamp(26px,2.9vw,48px)`; as used `clamp(24px,2.5vw,42px)`; mobile `clamp(23px,6.4vw,28px)` | 1.08 | 450 | -.03em | `css:40`, `css:463`, `css:647` |
| Hero H1 | `clamp(28px,2.7vw,48px)`; mobile `clamp(25px,7vw,30px)` | 1.04 | 500 | -.035em | `css:120`, `css:519` |
| Email (footer / contact) | `clamp(28px,3.4vw,58px)`; mobile `clamp(26px,8.4vw,36px)` | — | 400 | -.04em | `css:498`, `css:553` |
| Card title | `clamp(18px,1.4vw,22px)` | — | 500 | -.02em | `css:151` |
| Build-card title | `clamp(19px,1.5vw,24px)` | — | 500 | -.02em | `css:472` |
| Legal H2 | 22px | — | 500 | -.02em | `css:727` |
| Body / row | 16–17px; legal 16px / 1.6 | — | 400 | -.01em | `css:229`, `css:728` |
| Card copy | 15px / 1.42; line 16.5px | — | 400 | — | `css:153`, `css:435` |
| `t-mono` (labels, UI) | 11px / 1.45 | — | 500 | .06em, uppercase | `css:36` |
| Button / nav mono | 11.5px / 1 | — | 500 | .08em, uppercase | `css:47`, `css:336` |
| Field error | 10.5px / 1.4 mono | — | 500 | .03em | `css:757` |
| Card number | `clamp(64px,7vw,120px)` | .9 | — | -.04em | `css:146` |

### 1.4 Spacing, layout and breakpoints

- Page gutter: `--pad: clamp(16px,2.6vw,40px)` (`css:9`). Header height `--hdr: 78px`, 68px at ≤760 (`css:9`, `css:309`).
- Breakpoints: **1100px** and **760px**, both as `max-width` (`css:303`, `css:308`, `css:512`, `css:516`).
- Grids: work is 3 columns, then 2 at ≤1100, then 1 at ≤760, with gap `clamp(40px,4vw,64px) 14px` (`css:138`). The footer uses 4 columns, then 2 (`css:753-754`). The contact page and the footer top each use 2 columns, then 1.
- Recurring values:
  - Section padding `clamp(70px,8vw,130px)` top (`css:137`).
  - Footer `clamp(90px,10vw,160px)` (`css:270`).
  - Section-head bottom `clamp(28px,3.4vw,52px)` (`css:131`).
  - Card gap 14px.
  - Control padding `16px 20px` for buttons and `11px 13px` for the nav.
- **There is no spacing scale in the code.** `DESIGN.md`'s 4–192px scale is not used. See G3.

### 1.5 Radius, borders and elevation

- Radius: **0** everywhere. The only exceptions are the theme toggle pill (`99px`), its knob (`50%`), the menu dots (`50%`) and the third-party Vaat logo (`rx=8`).
- Borders are always 1px, `--rule` or `--rule2`. A 3px bottom stripe in the item color sits on build tiles (`css:468`), and the track scrubber is 3px (`css:477`).
- Shadows, the complete list:
  - Toggle knob `0 2px 8px rgba(0,0,0,.18)`, hover `0 2px 14px rgba(0,0,0,.25)` (`css:73`, `css:79`)
  - Logo chip `0 1px 0 rgba(0,0,0,.08)` (`css:591`)
  - Footer brief card `0 30px 70px -30px rgba(0,0,0,.6)` (`css:703`)
  - Phone dropdown `0 18px 40px -18px rgba(11,10,20,.35)` (`css:792`)
- Blur: `backdrop-filter: blur(8px)` on nav items and the back button, `blur(10px)` on the toggle (`css:69`, `css:336`).

### 1.6 Motion

| Token | Value | Source |
|---|---|---|
| `--ease` (standard) | `cubic-bezier(.2,.8,.2,1)` | `css:9` |
| Toggle travel | `cubic-bezier(.65,0,.25,1)` .6s | `css:73` |
| Menu clip | `cubic-bezier(.7,0,.2,1)` .7s (dead) | `css:84` |
| Red-arrow overshoot | `cubic-bezier(.34,1.56,.64,1)` 820ms | `main:216` |
| Durations in use | .15, .2, .25, .35, .45, .6, .9, 1, 1.2, 1.4s | across `css` |
| Chevron nudge on hover | `translateX(4–5px)` .25s | `css:50`, `css:716` |
| Card video hover | scale 1.02 → 1.07 over 1.4s, saturate .82 → 1 | `css:141-142` |
| Reveal | opacity 0, `translateY(22px)`; .9s / 1s; stagger `(i%3)*80ms` | `css:299`, `main:223-226` |
| Grain | `steps(6)` over 1.2s, infinite | `css:24`, `css:28` |
| Nav unfold | 45ms stagger per item | `main:28` |
| Reduced motion | grain stops, smooth scroll off, the track drifts at 18px/s instead of 34px/s, the hero runs at half speed | `css:327-330`, `main` |

### 1.7 Surfaces, patterns and grain (`css:10-14`, `css:23-28`, `css:170-175`)

- **Paper pattern:** a 12px cross every 192px plus a 0.9px dot every 24px.
  - Light: cross `#2C1412` at 20%, dots `rgba(44,20,18,.1)`.
  - Dark: cross `#DDE4FF` at 14%, dots `rgba(221,228,255,.06)`.
  - It is applied as `background: var(--pattern), var(--paper)` on the body and on every section.
- **Grain:** an SVG fractal-noise tile (`baseFrequency .85`, 3 octaves, 220px) in a fixed overlay at opacity .08 that animates. It is **not drawn in dark mode** (`css:27`).
- **Heat gradient:** four layers, three radial gradients over a linear one (`#E42114 → #FF5E55 → #9C2B5A → #2D36FF`, 160°), with a grain overlay at .55 using `overlay` blend. Used only on the footer base behind the giant wordmark.
- **Pixel edge:** squares that thin toward the far edge.
  - Cell 14px (10px at <760), 7 rows, deterministic hash seed.
  - Drawn on canvas (`art:16-25`) or as a CSS mask (`saas:20-31`).
  - Joins the hero to the work section and the page to the footer.
- **Pixel hero field:** domain-warped fbm noise, about 56 cells across the mark, a 5×5 glyph alternating ">" and "<" in Royal on Mist, ticking at 30fps (`hero:1-80`).
  - Theme colors: light Mist `#DDE4FF` / glyph `#2D36FF`; dark `#1A1D45` / `#5D6BFF`.
  - The mark is coral `#FF5E55` and red `#E42114` with darker hairlines (`hero:90-91`).

---

## 2. Components on the live site

| # | Component | Markup | Style | Behaviour | Notes |
|---|---|---|---|---|---|
| 1 | Header (wordmark + toggle) | `pages:44-57` | `css:58-66`, `css:563-574` | `main:171-196`: solid after 24px of scroll, hides on scroll down, `on-dark` over the footer | Wordmark is an inline SVG in `currentColor`, 24px high (20px mobile) |
| 2 | Theme toggle | `pages:47-54` | `css:69-80`, `css:311-312` | `main:9-20`, pre-paint script `pages:33-37` | localStorage key `vimaksh-theme`; dispatches a `themechange` event |
| 3 | Navigation stack (navbox) | `pages:63-69` | `css:335-357`, `css:381`, `css:418`, `css:583-584` | `main:22-33`, compact mode `main:189` | "> label <" items; the Menu box's 4 dots morph into an X |
| 4 | Button: primary | `pages:201` | `css:47-50` | — | Red, white mono label, chevron nudges, hover turns solid `--strong` |
| 5 | Button: ghost | `pages:201` | `css:51-53` | — | `--rule2` border |
| 6 | Text link "more" | `pages:213` | `css:54-55` | — | Underline plus a chevron |
| 7 | Pill (copy chip) | `pages:86`, `pages:259-264` | `css:232-234`, `css:486-487` | Copy: `main:35-53` | Mono, square |
| 8 | Copy tooltip | `pages:60` | `css:108-109` | `main:35-53` | Follows the pointer; "Copy" becomes "Copied ✓" |
| 9 | Section header | `pages:210-214` | `css:131-134` | — | Top hairline, "> Label", H2, an action on the right |
| 10 | Project card | `pages:152-169`, data `pages:131-150` | `css:139-155`, `css:430-435`, `css:591-607`, `css:715-717` | Video plays in view: `main:138-140` | 4:5 media (4:3 on mobile), number, logo chip, title + kind, visit bar |
| 11 | Logo chip | `pages:154-159` | `css:591-595`, `css:640-641` | — | Three variants: logo, icon + name, text |
| 12 | Build card + drifting track | `pages:183-188`, `pages:235-241` | `css:460-481`, `css:576-579`, `css:711-713` | `main:228-277` | Per-item color `--c`, pixel tile, scrubber, arrow buttons |
| 13 | About block | `pages:220-226` | `css:609-613`, `css:643-648`, `css:689-691` | — | Pixel desk illustration + `t-big` |
| 14 | Hero | `pages:193-206` | `css:111-124`, `css:412-414`, `css:586-588` | `hero`, `main:278-280`; recede `css:113`, `main:175` | `.hl` "&lt;what if?&gt;" highlight, meta line with clock |
| 15 | Contact block (rows) | `pages:244-267` | `css:224-266`, `css:483-492` | Brief toggle `main:55-62` | `.block`, `.row`, `.row--brief` (red), `.block--split` |
| 16 | Brief form | `pages:71-80` | `css:242-251`, `css:744-760` | `main:63-136`, `validate.js` | Underline inputs, honeypot, sending / sent / error states, inline errors |
| 17 | Phone field (intl-tel-input 29.5.11) | `pages:76` | `css:769-807` | `main:63-80` | India preselected; country order; strict mode; search; libphonenumber |
| 18 | Footer | `pages:82-115` | `css:268-296`, `css:363-365`, `css:494-509`, `css:650-742` | Mark animation `main:203-221`, clock `main:197-201` | Dark, brief card or email, 4 columns, heat base, giant wordmark, fine print |
| 19 | Footer mark animation | `pages:94` | `css:273-276` | `main:203-221` | Six arrows fly in; the red one lands last with overshoot |
| 20 | Pixel edge | `pages:209`, `pages:90` | `css:360-361` | `main:142-162` | Redrawn on resize and on theme change |
| 21 | Legal page | `pages:270-311` | `css:723-730` | — | |
| 22 | Skip link, `.sr` | `pages:41` | `css:33-35` | — | |
| 23 | Live clock | `pages:107`, `pages:203` | `css:123` | `main:197-201` | IST, tabular numerals |
| 24 | Reveal on scroll | — | `css:298-300` | `main:223-226` | |

Validation messages (exact copy) are in `validate.js:9-17` (email, with a typo map for common domains) and `main:66-71`, `main:86-91` (phone).
The form posts to `/api/brief` (`worker/index.js`, Resend).

## 3. Assets

| Asset | Path | Notes |
|---|---|---|
| Vimaksh mark (six arrows) | `public/marks/vimaksh-mark.svg` | 580×580 artboard. The arrows' tight box is `115 131 350 318.7` (`hero:73`). Fills `#FF5F53` and `#E32112`. |
| Vimaksh wordmark | `public/marks/vimaksh-wordmark.svg` | 951×172, `#FF5F53`, recolored to `currentColor` on the site (`pages:10`) |
| Flat logo raster | `public/logo_flat.png` | 61.7 KB; not referenced by live pages |
| 3D logo | `public/logo_sculpture.glb` | 1.73 MB; used by `render-marks.html` and `tools/render_marks.mjs` |
| Fonts | `public/fonts/*.woff2` | No licence files in the repo |
| Project logos | `public/logos/` paryatech.svg, sachit.svg, vaat.svg, hqly.png, sarak.png; `public/marks/` paryatech-wordmark.svg, wingman-mark.svg | Product marks belong to their products; Wingman is not on the live site |
| Project videos + posters | `public/video/*.mp4`, `*.jpg` (6 each) | 337 KB – 1.6 MB |
| Pixel motifs on the live site | `saas.saas()` × 8 kinds (`extension saas ai crm erp dashboard integrations mobile`); `art.desk()`; `art.pixelEdge()`; `saas.pixelMask()`; hero chevron field | Deterministic, so they can be exported as PNG/SVG |
| Pixel motifs in code only | `art.portrait`, `art.bot`, `art.skyline`, `art.field` | Not on live pages |

Build-card colors (`pages:172-181`):

| Kind | Color |
|---|---|
| extension | `#2D36FF` |
| saas | `#E42114` |
| ai | `#7A3CD6` |
| crm | `#0E8F6E` |
| erp | `#E8730C` |
| dashboard | `#0A8FB0` |
| integrations | `#C99400` |
| mobile | `#D23C7E` |

## 4. Icons actually used

There is no icon set. The complete list:

- Sun and moon: 24×24 viewBox, stroke 1.6, round caps (`pages:48-53`).
- The "> <" chevrons, set as mono text, are the site's real arrow icon.
- Menu dots that morph into an X (`css:344-349`).
- ▸ triangle (`pages:253`).
- Select chevron SVG: 10×6, stroke 1.5, red (`css:764`, dead).
- intl-tel-input flags and search icon.

## 5. Accessibility measurements (WCAG contrast)

| Pair | Ratio | Result |
|---|---|---|
| `--soft` on paper, light | 5.72 | pass |
| `--soft` on paper, dark | 7.38 | pass |
| Ink on paper | 15.4 (light) / 15.5 (dark) | pass |
| White on red button | 4.64 | pass, AA normal text |
| Red `#E42114` text on light paper | 4.15 | fails AA for small text; used only for decorative `aria-hidden` chevrons and for error text |
| Red on dark paper | 4.06 | as above |
| **Focus ring `--electric` on dark paper** | **2.35** | **fails the 3:1 minimum for UI** |
| Footer `#7b81aa` on night | 5.07 | pass |

---

## 6. Gaps: decisions I need from you

- **G1. The status of `DESIGN.md`.** Proposal: mark its visual spec as superseded and carry over only its voice, honesty, placeholder, accessibility and performance rules.
- **G2. Voice conflicts between the live copy and `DESIGN.md`:**
  - The "reply within two working days" promise.
  - Card numbers 01–06.
  - The clock and the street address.
  - The tagline "custom software, and nothing else" next to the "independent experiments" framing.

  Which one wins in the voice guide?
- **G3. Spacing scale.** The code has none, only fluid clamps. Proposal: document the observed values as named tokens (`--pad`, `--section-y`, `--gap-card: 14px`, and so on) with no new values.
- **G4. Mark colors drift.** The SVG uses `#FF5F53` / `#E32112`; the CSS and hero use `#FF5E55` / `#E42114`. Which is canonical? I'd keep the SVG files byte-identical and record the drift.
- **G5. Logo rules that don't exist yet:** clear space, minimum size, approved color variants (mono ink, white, mark on dark) and misuse examples. I can derive clear space from the arrow box, but that is a new rule and needs your approval.
- **G6. Chips.** `.chips` and `.chip` exist only in dead CSS (an old "needs" selector). The live chip-like elements are the pill and the logo chip. Should the chips be revived as a component, or left out?
- **G7. Icons.** There is no set. See the proposal in the reply.
- **G8. Focus ring in dark mode fails contrast (2.35:1).** Fixing it would be a website change (for example `--coral` or `--glow` as the dark focus color). Approve it or leave it?
- **G9. Font licence files are missing.** Both families are SIL OFL 1.1. I'd add the upstream `OFL.txt` files to the downloads.
- **G10. Elevation scale.** There are four unrelated shadows. Document them as-is (`shadow-knob`, `shadow-chip`, `shadow-card`, `shadow-popover`), or not?
- **G11. Product logos (Paryatech, Sachit and others).** Do they belong in the brand download pack? Default: no, they are products, not the Vimaksh brand.

---

## 7. Decisions taken (17 Nov 2026)

- **Hosting:** none. The files are published as raw GitHub files from `VimakshHQ/vimaksh-design-system` (`main/dist/`), and the base URL lives in `scripts/config.mjs`.
- **Icons:** only the icons the site already uses. The full set is `[PLACEHOLDER]` until Vimaksh supplies it.
- **Scope:** the design system only. No second site.
- **Defaults for unanswered gaps.** None of these invents a value:
  - G1: the live code wins on visuals; `DESIGN.md` supplies voice, placeholder, accessibility and performance rules.
  - G2: the four live-copy conflicts are listed in Voice as open and are not to be copied into new work.
  - G3: observed spacing values are named as tokens; no scale is added.
  - G4: the mark files stay byte-identical and the drift is recorded as tokens `color.mark.*`.
  - G5: clear space and minimum size are `[PLACEHOLDER]`. Misuse examples are shown as "proposed, pending approval".
  - G6: no chips component. The pill and logo chip cover what the site uses.
  - G8: the website is unchanged; the focus-ring failure is documented in Accessibility.
  - G9: the OFL licence texts are added to the downloads.
  - G10: the four shadows are documented as-is.
  - G11: product logos are left out of the brand pack.
- **Live-site quirk found while verifying:** at 1440×900 the paper pixel edge of the work section covers the bottom of the hero, so the hero meta line ("Studio / Bengaluru …") is partly hidden. The system reproduces it faithfully.
