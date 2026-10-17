# AGENTS.md

Defeed: MV3 browser extension (Firefox, Zen, Firefox Android, Chrome) that hides distracting site elements. WXT + TypeScript, no UI framework. MIT licensed.

## Verify

Run after every change:

```bash
npm run compile && npm test && npm run build && npm run build:firefox
```

If youtube.com is unreachable (cloud sandbox network policy), test by loading `.output/chrome-mv3` in Playwright Chromium and serving stub markup via `context.route()`; report live YouTube as unverified.

## Sites and features

- Put each site in `sites/<site>/` (`features.ts` + `<site>.css`) and register it in `sites/index.ts`.
- Put hiding rules in the site's CSS file. Use JS in `entrypoints/<site>.content.ts` only for what CSS cannot do (matching text, clicking).
- Key every rule off `html[data-defeed-<kebab-feature-id>]`; `lib/apply.ts` sets the attributes.
- Never rename a feature `id`; it is the stored settings key (`lib/settings.ts`).
- Prefer custom element tag names (`ytd-*`, `ytm-*`) over class names.
- Cover desktop (`www.youtube.com`) and mobile (`m.youtube.com`) for every YouTube feature.

## Licensing

- Never copy code from MPL/GPL projects (e.g. lawrencehook/remove-youtube-suggestions); use them as reference only.
- Credit selector sources in the header comment of the site CSS file.

## Fixed values

- Keep `browser_specific_settings.gecko.id` = `defeed@laatunen.fi`; changing it breaks signing and updates.
- Edit `assets/icon.svg`, then re-export `public/icon/{16,32,48,96,128}.png`; never edit the PNGs directly.
- AMO API keys live in `.env` (gitignored).
