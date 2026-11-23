# Section header

> A top hairline, a "> Label" in mono, a large heading and an optional action on the right. It opens every content section.

Vimaksh design system 0.1.0. HTML: /components/section-header/ (local docs site). Source of truth: https://work.vimaksh.in at VimakshHQ/vimakshwebsite-identity-final@8df1553.

## Use it

- Label: one or two words naming the section ("Selected work"). Heading: the claim, in sentence case.

Needs: `vimaksh.css` (no JavaScript).

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### Work section header

```html
  <div class="sec-head">
    <p class="t-mono label"><span class="chev">&gt;</span> Selected work</p>
    <h2 id="work-h" class="t-section">Things we've built,<br>and are building.</h2>
    <a class="more t-mono" href="/contact/">Start yours <span class="chev" aria-hidden="true">&gt;</span></a>
  </div>
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `.sec-head` | class | Grid: heading left, action right; 16px above, hairline on top, clamp(28px,3.4vw,52px) below. |
| `p.t-mono.label > .chev` | element | The label with a red ">"; spans the full row. |
| `h2.t-section` | element | The heading. A <br> is allowed for a deliberate break. |
| `a.more` | element | Optional action, aligned to the heading's last line. |

## Do

- Start the label with the red chevron.

## Don't

- Do not number sections.
- Do not put an eyebrow and a label together.

## Accessibility

- The heading is a real <h2> with an id referenced by the section's aria-labelledby.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| typography.mono | `.t-mono` | `{"fontFamily":"'JetBrains Mono',ui-monospace,Consolas,monospace","fontWeight":500,"fontSize":"11px","lineHeight":"1.45","letterSpacing":".06em","textTransform":"uppercase"}` |
| typography.section | `.t-section` | `{"fontFamily":"'Inter Tight',ui-sans-serif,-apple-system,'Segoe UI',sans-serif","fontWeight":500,"fontSize":"clamp(34px,4.4vw,72px)","lineHeight":".96","letterSpacing":"-.04em","color":"var(--strong)"}` |
| space.head-gap | `--head-gap` | `clamp(28px,3.4vw,52px)` |
| color.theme.rule | `--rule` | `rgba(44,20,18,.14) / rgba(221,228,255,.12)` |

## Sources

- style: [src/v5/v5.css:131-132](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L131-L132)
- markup: [tools/v5pages.py:210-214](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/tools/v5pages.py#L210-L214)
