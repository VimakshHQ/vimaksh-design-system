# Vimaksh design system

The design language of [work.vimaksh.in](https://work.vimaksh.in), extracted from its code, for people and AI agents: tokens, one CSS file, the site's behaviour, brand assets, and docs that agents can read.

Docs site: **https://vimaksh-design-system.vimaksh.workers.dev** (Cloudflare Workers, static assets; Storybook at `/storybook/`).

Agents read the files from this repository's raw files (the prompt points here):

```
https://raw.githubusercontent.com/VimakshHQ/vimaksh-design-system/main/dist/
```

## Copy brand identity

Paste [`dist/prompt.txt`](dist/prompt.txt) into an agent working on another project. It sends the agent to [`agents.md`](dist/agents.md) and [`llms-full.txt`](dist/llms-full.txt), tells it which files to download, gives it a checklist and asks it to compare its result with work.vimaksh.in. The docs site's home page has a button that copies it.

## What is in `dist/`

| File | What it is |
| --- | --- |
| `vimaksh.css` | Tokens, type classes and every component the live site uses, in one file (fonts in `fonts/`) |
| `tokens.json` | W3C design tokens: the only source of every value |
| `tokens.css`, `tailwind-preset.cjs`, `tailwind.css` | Generated from `tokens.json` (CSS variables, Tailwind 3, Tailwind 4) |
| `vimaksh.js`, `vimaksh-phone.js`, `pixel-hero.js`, `pixel/` | The site's own scripts, with documented patches (`scripts/js-patches.mjs`) |
| `brand/` | Mark and wordmark (SVG, PNG 1x/2x/4x), pixel motifs, the 3D logo, fonts, ZIP packs, `SHA256SUMS.txt` |
| `agents.md`, `llms.txt`, `llms-full.txt`, `docs/*.md`, `prompt.txt` | Docs for agents |
| `catalog.json`, `api/*.json` | Machine-readable components, foundations, tokens, icons and examples |

Install it as a package with `npm i github:VimakshHQ/vimaksh-design-system`, then use `@vimaksh/design-system/vimaksh.css`.

## Working on it

```sh
npm install
npm run build        # tokens → css → js → brand assets → docs (+ agent files)
npm run check        # drift checks: tokens vs website lines, CSS variables, colours, sources, links
npm run serve        # docs site at http://localhost:4321
npm run shots        # every page and example, light and dark, 1440 and 390: console errors, overflow
npm run storybook    # Storybook on :6006 (run `npm run build` first)
npm run deploy       # build, build Storybook, bundle into _deploy/ and publish with wrangler
```

Everything comes from the website, at the commit in `source/SOURCE_COMMIT`:

- `source/site/` is a snapshot of the website files that the extraction reads.
- When the website changes, copy its files again and run `npm run extract` (component CSS) and `npm run build`.
- `npm run check` fails if a token no longer matches the line it cites.
- Content (guidance, API tables, do and don't) lives in `content/*.mjs`.
- Examples are slices of the website's generated HTML, so their markup is exactly what the site serves.

## Rules this system keeps

- **Extract, don't invent.** Every value cites a file and line in the website repository (see `AUDIT.md`).
- Where the site has no rule (clear space, minimum logo size, an icon set, the dark-theme focus colour), the docs say so with `[PLACEHOLDER: …]`.
- Light and dark are both first-class.
- Voice rules, banned metaphors and the placeholder convention come from the website's `DESIGN.md`. Its visual spec describes an earlier direction, so the live code wins on visuals.
