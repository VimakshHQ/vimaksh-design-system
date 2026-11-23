# Brand

> The six-arrow mark (five coral, one red), the Vimaksh wordmark, and the 3D logo sculpture. Use the files as they are, in the colours the site uses them in.

Vimaksh design system 0.1.0. HTML: /brand/ (local docs site). Source of truth: https://work.vimaksh.in at VimakshHQ/vimakshwebsite-identity-final@8df1553.

### The mark
Six arrows meeting at a centre: five coral, one red. The arrows form the "> <" chevrons that run through the whole system. Files: `vimaksh-mark.svg` (580×580 artboard, the original) and `vimaksh-mark-tight.svg` (cropped to the arrows, the crop the hero uses).

### The wordmark
"vimaksh" in coral, 951×172. On the site it is inlined with `fill="currentColor"`, so it takes the colour of where it sits:

| Where on the site | Colour | File |
| --- | --- | --- |
| Header, light theme | `#0B0A14` (strong) | `vimaksh-wordmark-ink.svg` |
| Header, dark theme | `#F4F5FF` (strong) | `vimaksh-wordmark-light.svg` |
| Giant wordmark on the footer heat field | `#FFFFFF` | `vimaksh-wordmark-white.svg` |
| Original file | `#FF5F53` (coral) | `vimaksh-wordmark.svg` |

### Sizes the site uses
Wordmark: 24px high in the header (20px on phones), full width in the footer base. Mark: 96–160px wide in the footer, about 56 pixel cells across in the hero. These are observed uses, not minimums.

### Clear space and minimum size
`[PLACEHOLDER: clear space and minimum size rules, to be set by Vimaksh]`. The site has no written rule. Until there is one, give the mark at least the clearance the header gives the wordmark (the page gutter, `--pad`).

### Misuse (proposed, pending approval)
These follow from how the files are built and used; Vimaksh has not yet approved them as rules.
- Do not recolour single arrows or swap which arrow is red.
- Do not stretch or squash (the wordmark keeps `aspect-ratio: 951/172`).
- Do not outline, add shadows or put the mark on a busy photograph.
- Do not redraw the letters or set "vimaksh" in a font as a logo.
- Do not use the wordmark in a colour other than the four above.

### The 3D logo
`vimaksh-logo-sculpture.glb` (glTF binary, 1.7 MB): the mark as a sculpture, used to render the service stills. Open it in any glTF viewer or three.js.

## Sources

- mark: [public/marks/vimaksh-mark.svg:1-8](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/public/marks/vimaksh-mark.svg#L1-L8)
- wordmark: [public/marks/vimaksh-wordmark.svg:1-3](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/public/marks/vimaksh-wordmark.svg#L1-L3)
- inline currentColor: [tools/v5pages.py:6-10](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/tools/v5pages.py#L6-L10)
- sizes: [src/v5/v5.css:571-574](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L571-L574)
- footer mark size: [src/v5/v5.css:734-742](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L734-L742)
