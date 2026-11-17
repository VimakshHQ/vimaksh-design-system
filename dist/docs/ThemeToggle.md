# Theme toggle

> A pill whose knob slides between sun and moon; the icon turns as it travels. The choice is saved in localStorage under "vimaksh-theme" and applied before first paint on every page.

Vimaksh design system 0.1.0. HTML: /components/theme-toggle/ (local docs site). Source of truth: https://work.vimaksh.in at yakosasam797/vimakshwebsite-identity-final@8df1553.

## Use it

- Every page supports both themes; ship the toggle in the header.

Needs: `vimaksh.css` and `vimaksh.js`.

## Markup

The markup below is copied from the live site. Inline SVGs are abbreviated: paste the file contents where a comment says so.

### Toggle (click it: the whole frame switches theme)

```html
    <button class="toggle" type="button" aria-label="Switch to dark theme" data-toggle-theme>
      <span class="ghost g-sun" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M5.3 18.7l1.5-1.5M17.2 6.8l1.5-1.5"/></svg></span>
      <span class="ghost g-moon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg></span>
      <span class="knob" aria-hidden="true">
        <svg class="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M5.3 18.7l1.5-1.5M17.2 6.8l1.5-1.5"/></svg>
        <svg class="i-moon" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>
      </span>
    </button>
```

### Before first paint (in <head>, before the CSS)

```
<script>
  // Set the theme before first paint: saved choice, else the system setting.
  (function () { try { var t = localStorage.getItem('vimaksh-theme'); if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = t; } catch (e) { document.documentElement.dataset.theme = 'light'; } })();
</script>
```

## API

| Name | Kind | What it does |
| --- | --- | --- |
| `button.toggle[data-toggle-theme]` | element | The switch. vimaksh.js binds it. |
| `.ghost.g-sun / .ghost.g-moon` | element | Faint sun and moon in the track. |
| `.knob (.i-sun, .i-moon)` | element | The sliding knob, #0B0A14 in light, #F4F5FF in dark; the icons rotate in and out over .6s. |
| `html[data-theme]` | attribute | "light" or "dark". Set it before first paint with the snippet below. |
| `themechange` | event (window) | Fired after a switch; pixel graphics redraw on it. |
| `localStorage "vimaksh-theme"` | storage | The saved choice. Falls back to prefers-color-scheme. |

## Do

- Run the pre-paint snippet so there is no flash of the wrong theme.
- Update <meta name="theme-color"> with the theme (vimaksh.js does).

## Don't

- Do not offer a third "system" state; the site has two.
- Do not round anything else: the toggle is the only pill on the site.

## Accessibility

- aria-label switches between "Switch to dark theme" and "Switch to light theme".
- Icons are aria-hidden.
- Focus ring: 2px Electric, 3px offset.

## Connected foundations

| Token | CSS variable | Value |
| --- | --- | --- |
| radius.pill | `--radius-pill` | `99px` |
| radius.round | `--radius-round` | `50%` |
| shadow.knob | `--shadow-knob` | `0 2px 8px rgba(0,0,0,.18)` |
| shadow.knob-hover | `--shadow-knob-hover` | `0 2px 14px rgba(0,0,0,.25)` |
| blur.toggle | `--blur-toggle` | `10px` |
| motion.easing.toggle | `--ease-toggle` | `cubic-bezier(.65,0,.25,1)` |
| motion.duration.theme | `--dur-theme` | `600ms` |

## Sources

- markup: [tools/v5pages.py:47-54](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/tools/v5pages.py#L47-L54)
- pre-paint script: [tools/v5pages.py:33-37](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/tools/v5pages.py#L33-L37)
- style: [src/v5/v5.css:69-80](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L69-L80)
- phone size: [src/v5/v5.css:311-312](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/v5.css#L311-L312)
- behaviour: [src/v5/main.js:9-20](https://github.com/yakosasam797/vimakshwebsite-identity-final/blob/8df1553f4fbb42d294d48a95060665928a999482/src/v5/main.js#L9-L20)
