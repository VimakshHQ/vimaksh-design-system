# Navigation stack

> The site's only navigation: a stack of boxed mono links fixed at the bottom right, ending in a solid Menu box. On the home hero all links show; once you scroll (and on every other page, and on phones) it folds to the Menu box, which unfolds the links again.

Vimaksh design system 0.1.0. HTML: /components/navigation-stack/ (local docs site). Source of truth: https://work.vimaksh.in at VimakshHQ/vimakshwebsite-identity-final@8df1553.

## Use it

- Four destinations at most, plus Menu.
- Labels are short nouns or a short invitation ("Let's talk").

Needs: `vimaksh.css` and `vimaksh.js`.

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### Navigation stack (click Menu)

```html
<nav class="navbox" aria-label="Main" data-navbox>
    <a href="/#work"><span class="c" aria-hidden="true">&gt;</span><span class="t">Work</span><span class="c" aria-hidden="true">&lt;</span></a>
    <a href="/#services"><span class="c" aria-hidden="true">&gt;</span><span class="t">What we build</span><span class="c" aria-hidden="true">&lt;</span></a>
    <a href="/#about"><span class="c" aria-hidden="true">&gt;</span><span class="t">About</span><span class="c" aria-hidden="true">&lt;</span></a>
    <a href="/contact/"><span class="c" aria-hidden="true">&gt;</span><span class="t">Let's talk</span><span class="c" aria-hidden="true">&lt;</span></a>
    <button class="menubox" type="button" aria-label="Show navigation" aria-expanded="false" data-menu-btn><span class="t">Menu</span><span class="dots" aria-hidden="true"><i></i><i></i><i></i><i></i></span></button>
  </nav>
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `nav.navbox[data-navbox]` | element | Fixed bottom-right, 210px wide (min(220px, 100vw − 24px) on phones). |
| `a > .c, .t, .c` | element | Each link: "> label <" in mono; the chevrons sit at 30% and turn red on hover. |
| `button.menubox[data-menu-btn]` | element | Solid box; its four dots morph into an X when open. |
| `body.nav-compact` | state (JS) | Links folded away. |
| `body.nav-open` | state (JS) | Links unfolded, staggered 45ms from the bottom; Menu box turns red. |
| `body.nav-dark` | state (JS) | Over the dark footer: light text and borders. |
| `html[data-page=home]` | attribute | Only the home page shows the full stack on load. |

## Do

- Keep the stack in the same place on every page.
- Close it with Escape or a click outside (vimaksh.js does).

## Don't

- Do not add a top navigation bar or a hamburger overlay.
- Do not drop the chevrons: "> label <" is the brand's own bracket.

## Accessibility

- nav has aria-label "Main"; chevrons are aria-hidden.
- Menu button has aria-expanded and an aria-label that says what it will do.
- Escape closes and returns focus to Menu.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| typography.control | `` | `{"fontFamily":"'JetBrains Mono',ui-monospace,Consolas,monospace","fontWeight":500,"fontSize":"11.5px","lineHeight":"1","letterSpacing":".08em","textTransform":"uppercase"}` |
| color.theme.chip | `--chip` | `rgba(251,250,247,.7) / rgba(23,25,46,.7)` |
| color.theme.rule2 | `--rule2` | `rgba(44,20,18,.3) / rgba(221,228,255,.3)` |
| blur.nav | `--blur-nav` | `8px` |
| color.brand.red | `--red` | `#E42114` |

## Sources

- markup: [tools/v5pages.py:63-69](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/tools/v5pages.py#L63-L69)
- style: [src/v5/v5.css:335-357](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L335-L357)
- open state: [src/v5/v5.css:583-584](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L583-L584)
- behaviour: [src/v5/main.js:22-33](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/main.js#L22-L33)
- compact / dark: [src/v5/main.js:186-191](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/main.js#L186-L191)
