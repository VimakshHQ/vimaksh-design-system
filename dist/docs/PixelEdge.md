# Pixel edge

> A band of squares, 7 rows of 14px cells (10px on phones), that thins toward the far edge. It joins one area to the next instead of a straight line: the hero to the work section, the page to the footer.

Vimaksh design system 0.1.0. HTML: /components/pixel-edge/ (local docs site). Source of truth: https://work.vimaksh.in at VimakshHQ/vimakshwebsite-identity-final@8df1553.

## Use it

- Only where a section rises over a different surface.

Needs: `vimaksh.css` and `vimaksh.js`.

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### Paper edge rising over a dark area, and the night edge above the footer

```html
<div style="background:var(--night);height:140px"></div><section class="rise" style="padding:40px var(--pad) 60px"><canvas class="edge edge--top" data-edge="paper" aria-hidden="true"></canvas><p class="t-mono label"><span class="chev">&gt;</span> A section</p><p class="t-big">The paper edge sits on top of a section that rises over the area above.</p></section><footer class="foot" style="height:160px"><canvas class="edge edge--top" data-edge="night" aria-hidden="true"></canvas></footer>
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `canvas.edge.edge--top[data-edge=paper|night]` | element | Absolutely positioned above its section; redrawn on resize and theme change. |
| `[data-pixel-mask]` | attribute | Cuts the top of an element (the heat base) into squares with a CSS mask. |
| `pixel/pixelart.js pixelEdge(canvas, {color, cell, seed, rows})` | function | Draw one yourself. |

## Do

- Use the colour of the section it belongs to.

## Don't

- Do not stack edges or use them as decoration inside a section.

## Accessibility

- Decorative: aria-hidden.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| pattern.pixel-edge | `` | `{"cell":"14px","cellPhone":"10px","rows":7,"seed":3}` |
| space.edge-h | `--edge-h` | `98px` |

## Sources

- style: [src/v5/v5.css:360-361](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L360-L361)
- drawing: [src/v5/pixelart.js:16-25](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/pixelart.js#L16-L25)
- mask: [src/v5/pixelsaas.js:20-31](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/pixelsaas.js#L20-L31)
- set-up: [src/v5/main.js:142-162](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/main.js#L142-L162)
