# Skip link

> The first element on every page: "Skip to content", off screen until it receives focus, then a strong box at top left.

Vimaksh design system 0.1.0. HTML: /components/skip-link/ (local docs site). Source of truth: https://work.vimaksh.in at VimakshHQ/vimakshwebsite-identity-final@8df1553.

## Use it

- On every page, pointing at <main id="main">.

Needs: `vimaksh.css` (no JavaScript).

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### Press Tab inside the frame

```html
<a class="skip" href="#main">Skip to content</a><main id="main" style="padding:80px var(--pad)"><p class="t-big">Press Tab: the skip link appears at the top left.</p></main>
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `a.skip[href="#main"]` | element | Off screen until :focus. |
| `.sr` | class | Visually hidden text (e.g. "(opens in a new tab)"). |

## Accessibility

- Required: it is the first focusable element.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| color.theme.strong | `--strong` | `#0B0A14 / #F4F5FF` |
| color.theme.paper | `--paper` | `#F4F2EE / #0F1020` |

## Sources

- markup: [tools/v5pages.py:41](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/tools/v5pages.py#L41)
- style: [src/v5/v5.css:33-35](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L33-L35)
