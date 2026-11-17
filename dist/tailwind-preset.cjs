// Vimaksh Tailwind 3 preset. Generated from tokens/tokens.json. Load tokens.css (or vimaksh.css) first:
// every colour is a CSS variable, so light and dark both work through <html data-theme>.
// Usage: module.exports = { presets: [require('./tailwind-preset.cjs')], content: [...] }
// Vimaksh uses square corners: do not use rounded-* utilities except rounded-pill / rounded-round on the theme toggle.
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "red": "var(--red)",
        "red-d": "var(--red-d)",
        "coral": "var(--coral)",
        "electric": "var(--electric)",
        "royal": "var(--royal)",
        "glow": "var(--glow)",
        "mist": "var(--mist)",
        "night": "var(--night)",
        "night2": "var(--night2)",
        "mark-coral": "var(--mark-coral)",
        "mark-red": "var(--mark-red)",
        "paper": "var(--paper)",
        "paper2": "var(--paper2)",
        "card": "var(--card)",
        "ink": "var(--ink)",
        "strong": "var(--strong)",
        "soft": "var(--soft)",
        "rule": "var(--rule)",
        "rule2": "var(--rule2)",
        "chip": "var(--chip)",
        "theme-color": "var(--theme-color)",
        "foot-text": "var(--foot-text)",
        "foot-headline": "var(--foot-headline)",
        "foot-label": "var(--foot-label)",
        "foot-key": "var(--foot-key)",
        "foot-rule": "var(--foot-rule)",
        "ok": "var(--ok)",
        "ok-text": "var(--ok-text)",
        "on-accent": "var(--on-accent)",
        "on-accent-chev": "var(--on-accent-chev)",
        "px-blue-1": "var(--px-blue-1)",
        "px-blue-2": "var(--px-blue-2)",
        "px-blue-3": "var(--px-blue-3)",
        "px-blue-4": "var(--px-blue-4)",
        "px-blue-5": "var(--px-blue-5)",
        "px-hero-mist-l": "var(--px-hero-mist-l)",
        "px-hero-glyph-l": "var(--px-hero-glyph-l)",
        "px-hero-mist-d": "var(--px-hero-mist-d)",
        "px-hero-glyph-d": "var(--px-hero-glyph-d)",
        "px-coral-d": "var(--px-coral-d)",
        "px-red-d": "var(--px-red-d)",
        "kind-extension": "var(--kind-extension)",
        "kind-saas": "var(--kind-saas)",
        "kind-ai": "var(--kind-ai)",
        "kind-crm": "var(--kind-crm)",
        "kind-erp": "var(--kind-erp)",
        "kind-dashboard": "var(--kind-dashboard)",
        "kind-integrations": "var(--kind-integrations)",
        "kind-mobile": "var(--kind-mobile)"
      },
      "fontSize": {
        "mono": [
          "11px",
          {
            "lineHeight": "1.45",
            "letterSpacing": ".06em",
            "fontWeight": "500"
          }
        ],
        "hero": [
          "clamp(44px,6.4vw,112px)",
          {
            "lineHeight": ".94",
            "letterSpacing": "-.045em",
            "fontWeight": "500"
          }
        ],
        "statement": [
          "clamp(44px,7vw,112px)",
          {
            "lineHeight": ".92",
            "letterSpacing": "-.045em",
            "fontWeight": "500"
          }
        ],
        "section": [
          "clamp(34px,4.4vw,72px)",
          {
            "lineHeight": ".96",
            "letterSpacing": "-.04em",
            "fontWeight": "500"
          }
        ],
        "big": [
          "clamp(26px,2.9vw,48px)",
          {
            "lineHeight": "1.08",
            "letterSpacing": "-.03em",
            "fontWeight": "450"
          }
        ],
        "hero-lead": [
          "clamp(28px,2.7vw,48px)",
          {
            "lineHeight": "1.04",
            "letterSpacing": "-.035em",
            "fontWeight": "500"
          }
        ],
        "email": [
          "clamp(28px,3.4vw,58px)",
          {
            "lineHeight": "normal",
            "letterSpacing": "-.04em",
            "fontWeight": "400"
          }
        ],
        "card-title": [
          "clamp(18px,1.4vw,22px)",
          {
            "lineHeight": "normal",
            "letterSpacing": "-.02em",
            "fontWeight": "500"
          }
        ],
        "build-title": [
          "clamp(19px,1.5vw,24px)",
          {
            "lineHeight": "normal",
            "letterSpacing": "-.02em",
            "fontWeight": "500"
          }
        ],
        "body": [
          "16px",
          {
            "lineHeight": "1.6",
            "letterSpacing": "0"
          }
        ],
        "card-copy": [
          "15px",
          {
            "lineHeight": "1.42",
            "letterSpacing": "0"
          }
        ],
        "control": [
          "11.5px",
          {
            "lineHeight": "1",
            "letterSpacing": ".08em",
            "fontWeight": "500"
          }
        ],
        "field-error": [
          "10.5px",
          {
            "lineHeight": "1.4",
            "letterSpacing": ".03em",
            "fontWeight": "500"
          }
        ]
      },
      "spacing": {
        "pad": "var(--pad)",
        "hdr": "var(--hdr)",
        "section-top": "var(--section-top)",
        "section-bottom": "var(--section-bottom)",
        "section-compact": "var(--section-compact)",
        "footer-top": "var(--footer-top)",
        "head-gap": "var(--head-gap)",
        "grid-gap": "var(--grid-gap)",
        "grid-row-gap": "var(--grid-row-gap)",
        "label-gap": "var(--label-gap)",
        "field-gap": "var(--field-gap)",
        "control-y": "var(--control-y)",
        "control-x": "var(--control-x)",
        "edge-h": "var(--edge-h)"
      },
      "fontFamily": {
        "sans": "var(--sans)",
        "mono": "var(--mono)"
      },
      "borderRadius": {
        "none": "0",
        "pill": "99px",
        "round": "50%"
      },
      "boxShadow": {
        "knob": "0 2px 8px rgba(0,0,0,.18)",
        "knob-hover": "0 2px 14px rgba(0,0,0,.25)",
        "chip": "0 1px 0 rgba(0,0,0,.08)",
        "card": "0 30px 70px -30px rgba(0,0,0,.6)",
        "popover": "0 18px 40px -18px rgba(11,10,20,.35)"
      },
      "transitionTimingFunction": {
        "standard": "var(--ease)",
        "toggle": "var(--ease-toggle)",
        "overshoot": "var(--ease-overshoot)"
      },
      "transitionDuration": {
        "fast": "200ms",
        "base": "250ms",
        "slow": "350ms",
        "theme": "600ms",
        "reveal": "900ms",
        "media": "1400ms"
      },
      "backdropBlur": {
        "nav": "8px",
        "toggle": "10px"
      },
      "backgroundImage": {
        "grain": "var(--grain)",
        "heat": "var(--heat)",
        "paper": "var(--pattern)"
      }
    },
    "screens": {
      "max-tablet": {
        "max": "1100px"
      },
      "max-phone": {
        "max": "760px"
      }
    }
  }
};
