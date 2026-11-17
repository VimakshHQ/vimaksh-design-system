# Pixel motifs

> The pixel graphics of the site, drawn by its own code: one tile per kind of software, the studio desk, pixel edges and the hero's chevron glyphs. PNG, SVG, or draw them live.

Vimaksh design system 0.1.0. HTML: /pixel-motifs/ (local docs site). Source of truth: https://work.vimaksh.in at yakosasam797/vimakshwebsite-identity-final@8df1553.

Pixel graphics are drawn square by square on a small grid and scaled up with `image-rendering: pixelated`. Download them, or draw them live with the site's own functions:

```html
<canvas class="px" data-px="saas" data-kind="crm" data-c="#0E8F6E" aria-hidden="true" style="width:100%;aspect-ratio:4/3"></canvas>
<script type="module">
  import { saas } from './pixel/pixelsaas.js';      // kinds: extension saas ai crm erp dashboard integrations mobile
  import { desk, pixelEdge } from './pixel/pixelart.js';
  document.querySelectorAll('canvas[data-px=saas]').forEach(c => saas(c, c.dataset.kind, c.dataset.c));
</script>
```

vimaksh.js already draws every `canvas.px` (`data-px="saas"` and `data-px="desk"`) and every `canvas.edge`. The tiles and edges are redrawn when the theme changes; the desk looks the same in both themes.

| Motif | Group | Grid | PNG | SVG |
| --- | --- | --- | --- | --- |
| build-extension-light | What we build | 48×36 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/build-extension-light.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/build-extension-light.svg) |
| build-extension-dark | What we build | 48×36 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/build-extension-dark.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/build-extension-dark.svg) |
| build-saas-light | What we build | 48×36 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/build-saas-light.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/build-saas-light.svg) |
| build-saas-dark | What we build | 48×36 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/build-saas-dark.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/build-saas-dark.svg) |
| build-ai-light | What we build | 48×36 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/build-ai-light.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/build-ai-light.svg) |
| build-ai-dark | What we build | 48×36 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/build-ai-dark.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/build-ai-dark.svg) |
| build-crm-light | What we build | 48×36 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/build-crm-light.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/build-crm-light.svg) |
| build-crm-dark | What we build | 48×36 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/build-crm-dark.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/build-crm-dark.svg) |
| build-erp-light | What we build | 48×36 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/build-erp-light.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/build-erp-light.svg) |
| build-erp-dark | What we build | 48×36 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/build-erp-dark.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/build-erp-dark.svg) |
| build-dashboard-light | What we build | 48×36 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/build-dashboard-light.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/build-dashboard-light.svg) |
| build-dashboard-dark | What we build | 48×36 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/build-dashboard-dark.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/build-dashboard-dark.svg) |
| build-integrations-light | What we build | 48×36 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/build-integrations-light.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/build-integrations-light.svg) |
| build-integrations-dark | What we build | 48×36 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/build-integrations-dark.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/build-integrations-dark.svg) |
| build-mobile-light | What we build | 48×36 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/build-mobile-light.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/build-mobile-light.svg) |
| build-mobile-dark | What we build | 48×36 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/build-mobile-dark.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/build-mobile-dark.svg) |
| desk | About | 84×64 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/desk.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/desk.svg) |
| edge-paper-light | Pixel edge | 103×7 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/edge-paper-light.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/edge-paper-light.svg) |
| edge-paper-dark | Pixel edge | 103×7 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/edge-paper-dark.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/edge-paper-dark.svg) |
| edge-night | Pixel edge | 103×7 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/edge-night.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/edge-night.svg) |
| chevron-right | Hero glyph | 5×5 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/chevron-right.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/chevron-right.svg) |
| chevron-left | Hero glyph | 5×5 | [png](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/png/chevron-left.png) | [svg](https://raw.githubusercontent.com/yakosasam797/vimaksh-design-system/main/dist/brand/pixel/svg/chevron-left.svg) |
