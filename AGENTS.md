# AGENTS.md

Defeed: cross-browser (Firefox, Zen, Firefox Android, Chrome) MV3 extension that hides distracting site elements. WXT + TypeScript, no UI framework.

## Verify

Run after every change:

```bash
npm run compile && npm run build && npm run build:firefox
```

## Rules

- Keep one folder per site under `sites/<site>/`; never put site-specific selectors elsewhere.
- Hide elements with CSS keyed off `html[data-defeed-<feature>]`; use JS (MutationObserver) only where CSS cannot match.
- Prefer custom element tag names (`ytd-*`, `ytm-*`) over class names in selectors.
- Cover desktop (`www.youtube.com`) and mobile (`m.youtube.com`) selectors for every YouTube feature.
- Keep `browser_specific_settings.gecko.id` (`defeed@laatunen.fi`) stable; changing it breaks signing and updates.
- Edit `assets/icon.svg`, then re-export `public/icon/{16,32,48,96,128}.png`; never edit the PNGs by hand.
- Never commit `.env` (AMO API keys).
- Update `README.md` when commands, features or layout change.
