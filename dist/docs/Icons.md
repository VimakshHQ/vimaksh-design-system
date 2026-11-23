# Icons

> Every icon the site uses, ready to copy. The full icon set is still to come.

Vimaksh design system 0.1.0. HTML: /icons/ (local docs site). Source of truth: https://work.vimaksh.in at VimakshHQ/vimakshwebsite-identity-final@8df1553.

### Chevron right (mono)

The brand arrow. Red on paper, coral on night.

```html
<span class="chev" aria-hidden="true">&gt;</span>
```

### Chevron left (mono)

Closes the "> label <" bracket; "< Back".

```html
<span class="chev" aria-hidden="true">&lt;</span>
```

### Pixel chevron right

5×5 hero glyph, currentColor.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 5" width="20" height="20" aria-hidden="true" fill="currentColor" shape-rendering="crispEdges"><rect x="0" y="0" width="1" height="1"/><rect x="1" y="0" width="1" height="1"/><rect x="1" y="1" width="1" height="1"/><rect x="2" y="1" width="1" height="1"/><rect x="2" y="2" width="1" height="1"/><rect x="3" y="2" width="1" height="1"/><rect x="1" y="3" width="1" height="1"/><rect x="2" y="3" width="1" height="1"/><rect x="0" y="4" width="1" height="1"/><rect x="1" y="4" width="1" height="1"/></svg>
```

### Pixel chevron left

5×5 hero glyph, currentColor.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 5" width="20" height="20" aria-hidden="true" fill="currentColor" shape-rendering="crispEdges"><rect x="3" y="0" width="1" height="1"/><rect x="4" y="0" width="1" height="1"/><rect x="2" y="1" width="1" height="1"/><rect x="3" y="1" width="1" height="1"/><rect x="1" y="2" width="1" height="1"/><rect x="2" y="2" width="1" height="1"/><rect x="2" y="3" width="1" height="1"/><rect x="3" y="3" width="1" height="1"/><rect x="3" y="4" width="1" height="1"/><rect x="4" y="4" width="1" height="1"/></svg>
```

### Sun

Theme toggle only. 24 grid, 1.6 stroke, round caps.

```html
<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M5.3 18.7l1.5-1.5M17.2 6.8l1.5-1.5"/></svg>
```

### Moon

Theme toggle only.

```html
<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>
```

### Menu dots

Inside .menubox; morphs into an X when [aria-expanded=true].

```html
<span class="dots" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
```

### Disclosure triangle

Rotates 90° when its .row--brief is expanded.

```html
<span class="tri" aria-hidden="true">▸</span>
```

`[PLACEHOLDER: icon set to be supplied by Vimaksh]`. Until it arrives, use a chevron or a word instead of an icon.
