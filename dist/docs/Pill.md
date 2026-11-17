# Pill

> A small square mono chip that copies a value (an email, coordinates) or labels an expandable row. Hover fills it with strong. It is the site's chip; there is no separate tag component.

Vimaksh design system 0.1.0. HTML: /components/pill/ (local docs site). Source of truth: https://work.vimaksh.in at yakosasam797/vimakshwebsite-identity-final@8df1553.

## Use it

- For values people copy, and for the toggle inside the red "Start a project" row.

Needs: `vimaksh.css` and `vimaksh.js`.

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### Copy pills in contact rows (hover for the tooltip, click to copy)

```html
<div class="block" style="max-width:640px">      <div class="row"><span>General enquiries</span><button class="pill t-mono" type="button" data-copy="hq@vimaksh.in">hq@vimaksh.in</button></div>
      <div class="row"><span>New projects</span><button class="pill t-mono" type="button" data-copy="hq@vimaksh.in">hq@vimaksh.in</button></div></div><div class="tip t-mono" aria-hidden="true">Copy</div>
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `.pill` | class | 7px 11px, --rule2 border, paper fill, mono. Hover: strong fill. |
| `[data-copy="…"]` | attribute | vimaksh.js copies the value and shows the tooltip. |
| `.row--brief .pill` | context | On the red row: transparent with a white border; white fill when open. |

## Do

- Show the full value as the label.

## Don't

- Do not use pills as filters or tags; the site has none.
- Do not round them.

## Accessibility

- Copy pills are <button>s; the result ("Copied ✓") appears in the tooltip, and the value is visible, so nothing is lost if the tooltip is missed.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| color.theme.rule2 | `--rule2` | `rgba(44,20,18,.3) / rgba(221,228,255,.3)` |
| color.theme.paper | `--paper` | `#F4F2EE / #0F1020` |
| color.theme.strong | `--strong` | `#0B0A14 / #F4F5FF` |
| typography.mono | `.t-mono` | `{"fontFamily":"'JetBrains Mono',ui-monospace,Consolas,monospace","fontWeight":500,"fontSize":"11px","lineHeight":"1.45","letterSpacing":".06em","textTransform":"uppercase"}` |

## Sources

- style: [src/v5/v5.css:232-233](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L232-L233)
- on the red row: [src/v5/v5.css:486-487](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L486-L487)
- copy: [src/v5/main.js:35-53](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/main.js#L35-L53)
