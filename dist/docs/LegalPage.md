# Legal page

> A single readable column (max 760px) for terms, privacy and cookies: a mono label, a t-hero title at a smaller size, the update date in mono, and 16px/1.6 body with 22px section headings.

Vimaksh design system 0.1.0. HTML: /components/legal-page/ (local docs site). Source of truth: https://work.vimaksh.in at VimakshHQ/vimakshwebsite-identity-final@8df1553.

## Use it

- For long-form reading.

Needs: `vimaksh.css` (no JavaScript).

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### Cookie policy

```html
<article class="legal" aria-labelledby="lg-h">
  <p class="t-mono label"><span class="chev">&gt;</span> Legal</p>
  <h1 id="lg-h" class="t-hero">Cookie policy</h1>
  <p class="t-mono upd">Last updated 14 November 2026</p>
  <p>This site uses as little as possible on your device.</p>
  <h2>What we store</h2><p>We remember your light or dark theme choice in your browser’s local storage, so the site looks the way you left it. It stays on your device and is never sent to us.</p><h2>What we do not use</h2><p>We do not use advertising or tracking cookies, and we do not run third-party analytics that follow you across sites.</p><h2>Hosting</h2><p>Our hosting and security provider may set strictly necessary cookies to protect the site from abuse. These are needed for the site to work and do not track you.</p><h2>Your choices</h2><p>You can clear local storage and cookies at any time in your browser settings. The site will still work; it will just forget your theme.</p>
</article>
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `article.legal` | element | max-width 760px; padding below the header. |
| `.upd.t-mono` | element | "Last updated <date>". |
| `h2` | element | 22px, 500, -.02em, 44px above. |

## Do

- Date every version.

## Don't

- Do not publish legal text that has not been reviewed.

## Accessibility

- One H1; sections are H2.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| typography.hero | `.t-hero` | `{"fontFamily":"'Inter Tight',ui-sans-serif,-apple-system,'Segoe UI',sans-serif","fontWeight":500,"fontSize":"clamp(44px,6.4vw,112px)","lineHeight":".94","letterSpacing":"-.045em","color":"var(--strong)"}` |
| typography.body | `` | `{"fontFamily":"'Inter Tight',ui-sans-serif,-apple-system,'Segoe UI',sans-serif","fontSize":"16px","lineHeight":"1.6"}` |

## Sources

- markup and copy: [tools/v5pages.py:270-311](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/tools/v5pages.py#L270-L311)
- style: [src/v5/v5.css:723-730](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L723-L730)
