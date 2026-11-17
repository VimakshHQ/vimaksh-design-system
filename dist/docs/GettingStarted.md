# Getting started

> Put the Vimaksh look into a project: one CSS file, two fonts, one script, the wordmark. Or the tokens with Tailwind.

Vimaksh design system 0.1.0. HTML: /getting-started/ (local docs site). Source of truth: https://work.vimaksh.in at yakosasam797/vimakshwebsite-identity-final@8df1553.

### 1. Copy the files
From https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/ (or `npm i github:yakosasam797/vimaksh-design-system`): `vimaksh.css`, `fonts/`, `vimaksh.js`, `brand/svg/`; with a phone field `vimaksh-phone.js` and `vendor/`; with the hero `pixel-hero.js` (it reads `brand/svg/vimaksh-mark.svg` relative to itself). Keep `fonts/` next to `vimaksh.css`.

### 2. The page shell
Copy the head from [agents.md](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/agents.md), section 1: the pre-paint theme script, the stylesheet, the skip link, the header, the navigation stack, `<main id="main">`, the footer and the module script. Set `data-page="home"` on the home page.

### 3. Build sections
Open each section with a [Section header](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/docs/SectionHeader.md), then use the components. The CSS is the site's own; the class names are the API.

### 4. With Tailwind
Load `tokens.css` first. Tailwind 3: `presets: [require('./tailwind-preset.cjs')]`. Tailwind 4: `@import "tailwindcss"; @import "./tokens.css"; @import "./tailwind.css";`. You get `bg-paper`, `text-strong`, `font-mono`, `text-section`, `p-pad`, `shadow-card`, `ease-standard`, `max-phone:`… Square corners: do not use `rounded-*`.

### 5. Check
Run the self-check in [agents.md](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/agents.md) section 6 against https://work.vimaksh.in, in both themes and at 390px.

### What is patched
vimaksh.js is the site's own script with these changes:
- main.js: $$ returns an empty list when its scope is missing, so pages without a navigation stack do not throw
- main.js: intl-tel-input moved to vimaksh-phone.js, so pages without a phone field do not load it
- main.js: phone field set-up moved to vimaksh-phone.js (same options)
- main.js: the brief posts to the form's action attribute (default /api/brief, as on the site)
- main.js: the success message can be set with data-sent on the form ({name} and {email} are filled in); the default is the site wording
- main.js: the fallback email in the error message can be set with data-email on the form (default hq@vimaksh.in)
- main.js: the hero module is loaded next to this file
- pixelhero.js: the mark is read from the brand folder next to this file

### Not included
React wrappers (the site has no React; the HTML is the component). Storybook runs locally: `npm run storybook`.
