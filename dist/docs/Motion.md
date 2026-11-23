# Motion

> One easing for almost everything, short colour changes, small nudges. The hero is the only thing that always moves.

Vimaksh design system 0.1.0. HTML: /foundations/motion/ (local docs site). Source of truth: https://work.vimaksh.in at VimakshHQ/vimakshwebsite-identity-final@8df1553.

## Tokens

| Token | CSS variable | Value |
| --- | --- | --- |
| motion.easing.standard | `--ease` | `cubic-bezier(.2,.8,.2,1)` |
| motion.easing.toggle | `--ease-toggle` | `cubic-bezier(.65,0,.25,1)` |
| motion.easing.overshoot | `--ease-overshoot` | `cubic-bezier(.34,1.56,.64,1)` |
| motion.duration.fast | `--dur-fast` | `200ms` |
| motion.duration.base | `--dur-base` | `250ms` |
| motion.duration.slow | `--dur-slow` | `350ms` |
| motion.duration.theme | `--dur-theme` | `600ms` |
| motion.duration.reveal | `--dur-reveal` | `900ms` |
| motion.duration.media | `--dur-media` | `1400ms` |
| motion.distance.nudge | `--nudge` | `5px` |
| motion.distance.reveal | `--reveal-y` | `22px` |

### Easing
- **Standard** `cubic-bezier(.2,.8,.2,1)`: every transform and reveal.
- **Toggle** `cubic-bezier(.65,0,.25,1)`: the theme knob's travel.
- **Overshoot** `cubic-bezier(.34,1.56,.64,1)`: only the red arrow landing in the footer mark.

### Durations
Hover colours .2–.25s; header and nav .35s; theme crossfade .6s; reveal .9s (opacity) / 1s (rise); media zoom 1.4s.

### The vocabulary
- **Chevron nudge**: the ">" moves 5px right on button hover (4px on text links).
- **Reveal**: blocks rise 22px and fade in once, staggered 80ms in threes.
- **Media**: card video scales 1.02 → 1.07 and saturates .82 → 1 on hover.
- **Nav unfold**: links appear from the bottom, 45ms apart.
- **Mark assembly**: the six arrows fly in to the footer mark; the red one last, with overshoot.
- **Track drift**: 34px/s, slower on hover.

### Reduced motion
With `prefers-reduced-motion: reduce`: the grain stops, smooth scrolling is off, the track drifts at 18px/s, the hero runs at half speed and settles sooner.

## Do

- Animate opacity and transform only.
- Pause anything that loops when it is off screen.

## Don't

- Do not add bounce except the red arrow.
- Do not animate text letter by letter or scramble it.
- Do not add a second always-moving scene.

## Sources

- ease: [src/v5/v5.css:9](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L9)
- reveal: [src/v5/v5.css:298-300](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L298-L300)
- mark and reveal: [src/v5/main.js:203-226](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/main.js#L203-L226)
- reduced motion: [src/v5/v5.css:327-330](https://github.com/VimakshHQ/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L327-L330)
