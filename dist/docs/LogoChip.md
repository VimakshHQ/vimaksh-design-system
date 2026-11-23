# Logo chip

> A product's own logo on an off-white chip in the top-left corner of a project card. Three forms: a full logo, an icon with the name, or the name alone.

Vimaksh design system 0.1.0. HTML: /components/logo-chip/ (local docs site). Source of truth: https://work.vimaksh.in at VimakshHQ/vimakshwebsite-identity-final@8df1553.

## Use it

- Only on project media.

Needs: `vimaksh.css` (no JavaScript).

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### Logo, icon + name, text

```html
<div style="display:flex;gap:14px;flex-wrap:wrap"><div class="card" style="width:240px"><span class="media" style="aspect-ratio:3/1;background:var(--night)"><span class="plogo"><img src="/examples/media/paryatech-wordmark.svg" alt="Paryatech"></span></span></div><div class="card" style="width:240px"><span class="media" style="aspect-ratio:3/1;background:var(--night)"><span class="plogo plogo--icon"><img src="/examples/media/vaat.svg" alt=""><b>Vaat</b></span></span></div><div class="card" style="width:240px"><span class="media" style="aspect-ratio:3/1;background:var(--night)"><span class="plogo plogo--text"><b>Godspeed</b></span></span></div></div>
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `.plogo` | class | 48px high (40px phones), rgba(251,250,247,.95) fill, 1px bottom shadow. |
| `.plogo--icon` | modifier | Square icon (22px) followed by the name in 16px semibold. |
| `.plogo--text` | modifier | Name only, for products without a logo file. |

## Do

- Use the product's own logo file unchanged, even when it breaks a Vimaksh rule (Vaat's icon has rounded corners and its own indigo: keep them).

## Don't

- Do not recolour a product logo to Vimaksh colours.

## Accessibility

- Full logos: alt = product name. Icon + name: empty alt, the name is text.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| shadow.chip | `--shadow-chip` | `0 1px 0 rgba(0,0,0,.08)` |
| font.weight.semibold | `--w-semibold` | `600` |

## Sources

- markup: [tools/v5pages.py:154-159](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/tools/v5pages.py#L154-L159)
- style: [src/v5/v5.css:591-595](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L591-L595)
- size: [src/v5/v5.css:640-641](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L640-L641)
