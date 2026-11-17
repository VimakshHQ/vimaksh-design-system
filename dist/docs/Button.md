# Button

> Square buttons with a mono uppercase label and a ">" chevron that nudges 5px right on hover. Primary is red; ghost has a hairline border. Both turn solid strong on hover.

Vimaksh design system 0.1.0. HTML: /components/button/ (local docs site). Source of truth: https://work.vimaksh.in at yakosasam797/vimakshwebsite-identity-final@8df1553.

## Use it

- One primary per view. Pair it with one ghost at most.
- Labels are verbs in sentence case in the source ("Explore our work"); CSS sets them uppercase.

Needs: `vimaksh.css` (no JavaScript).

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### Primary and ghost (hero CTAs)

```html
<div class="hero-cta"><a class="btn" href="#work"><span>Explore our work</span><span class="chev" aria-hidden="true">&gt;</span></a><a class="btn btn--ghost" href="/contact/"><span>Start a project</span></a></div>
```

### Submit button and its states

```html
<div class="brief-form" style="display:flex;gap:12px;flex-wrap:wrap;padding:0;border:0"><button class="btn" type="button"><span>Send brief</span><span class="chev" aria-hidden="true">&gt;</span></button><button class="btn" type="button" disabled><span>Sending…</span><span class="chev" aria-hidden="true">&gt;</span></button><span class="brief-form sent" style="padding:0;border:0"><button class="btn" type="submit"><span>Sent</span><span class="chev" aria-hidden="true">&gt;</span></button></span></div>
```

### Track arrows (square icon buttons)

```html
<div class="track-foot" style="margin:0">    <div class="track-btns"><button type="button" class="tbtn" data-track-prev aria-label="Previous"><span class="chev" aria-hidden="true">&lt;</span></button><button type="button" class="tbtn" data-track-next aria-label="Next"><span class="chev" aria-hidden="true">&gt;</span></button></div></div>
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `.btn` | class | Primary: red, white label, 16px 20px padding, 28px gap to the chevron. |
| `.btn--ghost` | modifier | Transparent with a --rule2 border; red chevron. |
| `.btn > .chev` | element | The ">" chevron, aria-hidden. On primary it is #FFD9D6. |
| `[disabled] in .brief-form` | state | opacity .7, cursor: progress (while sending). |
| `.brief-form.sent .btn` | state | Green #16a34a while the "Sent" confirmation shows. |
| `.tbtn` | class | Square 52×48 icon button for the track arrows (46×44 on phones). |

## Do

- Always end primary buttons with the chevron.
- Use <a> for navigation and <button> for actions.

## Don't

- Do not round the corners or add a shadow.
- Do not use red for anything but the primary action and the chevron.
- Do not write the label in capitals in the source: text-transform does it.

## Accessibility

- White on red is 4.64:1 (passes AA for the 11.5px label only because it is bold-weight mono; keep the size).
- Chevrons are aria-hidden.
- Icon-only .tbtn needs aria-label.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| color.brand.red | `--red` | `#E42114` |
| color.on.accent | `--on-accent` | `#fff` |
| color.on.accent-chevron | `--on-accent-chev` | `#FFD9D6` |
| typography.control | `` | `{"fontFamily":"'JetBrains Mono',ui-monospace,Consolas,monospace","fontWeight":500,"fontSize":"11.5px","lineHeight":"1","letterSpacing":".08em","textTransform":"uppercase"}` |
| space.control-y | `--control-y` | `16px` |
| space.control-x | `--control-x` | `20px` |
| motion.distance.nudge | `--nudge` | `5px` |

## Sources

- btn, ghost: [src/v5/v5.css:47-53](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L47-L53)
- disabled, sent: [src/v5/v5.css:744-748](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L744-L748)
- tbtn: [src/v5/v5.css:479-481](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L479-L481)
- tbtn chevron: [src/v5/v5.css:711-713](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L711-L713)
