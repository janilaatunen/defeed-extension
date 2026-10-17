<p align="center"><img src="assets/icon.svg" width="96" alt="Defeed icon"></p>

# Defeed

My own browser extension that hides the distracting parts of websites: Shorts, home feeds, comments, autoplay, recommended videos. It replaces Unhook. YouTube first, Reddit and other sites later.

## Short version

- **Status:** pre-alpha. YouTube hiding is built but not yet tested on the live site. No popup yet, everything is on by default.
- **Try it:** `npm install && npm run dev:firefox` opens Firefox with the extension loaded.
- **Before committing:** `npm run compile && npm test && npm run build && npm run build:firefox`
- **Fix a broken rule:** edit `sites/youtube/youtube.css`.

## What works

| Feature (YouTube) | State |
|---|---|
| Hide Shorts everywhere: shelves, tiles, nav, channel tab, filter chips | Built, untested live |
| Hide home feed | Built, untested live |
| Hide comments | Built, untested live |
| Autoplay off: switches YouTube's toggle off once, hides end screen and end cards | Built, untested live |
| Hide related videos next to the player (playlist and live chat stay) | Built, untested live |
| Block Shorts links (direct load, link click, in-app navigation, channel Shorts tabs) → "Shorts blocked" page | Built, untested live |
| Popup with a toggle per feature + master switch | Not built (settings exist, no UI) |

Each feature works on desktop (`www.youtube.com`) and mobile (`m.youtube.com`).

## Browsers

| Browser | How |
|---|---|
| Firefox desktop | Main target |
| Zen | Same build as Firefox (Zen is Firefox underneath) |
| Firefox for Android | Same build; needs signing first (see below) |
| Chrome / Chromium | Separate build from the same code |

## Cheat sheet

```bash
npm install            # install; also generates .wxt/ (WXT's TypeScript types)
npm run dev:firefox    # Firefox with the extension, reloads on save
npm run dev            # same in Chrome
npm test               # unit tests (Vitest)
npm run compile        # type check only
npm run build:firefox  # build → .output/firefox-mv3
npm run build          # build → .output/chrome-mv3
npm run zip:firefox    # zip to upload to AMO for signing
```

**Load a build by hand.**
- **Firefox:** `about:debugging` → This Firefox → Load Temporary Add-on → `.output/firefox-mv3/manifest.json`. It's removed when Firefox restarts.
- **Chrome:** `chrome://extensions` → Developer mode → Load unpacked → `.output/chrome-mv3`.

**Signing:** Firefox only keeps an extension installed for good if Mozilla has signed it. Signing happens through **AMO** (addons.mozilla.org, Mozilla's add-on site). An "unlisted" upload is signed without getting a public page. Not set up yet.

## How it works

- **Hiding:** for each feature that's on, the extension puts an attribute on the page's `<html>` element (for example `data-defeed-comments`). The site's CSS file hides elements only while that attribute is there. CSS applies instantly and keeps working as YouTube redraws the page.
- **What CSS can't do:** a small script handles three things. It finds the desktop "Shorts" filter chip by its text, clicks the autoplay toggle off, and sends any Shorts URL to the extension's "Shorts blocked" page (`entrypoints/blocked/`). This is the **content script**, code the extension runs inside the YouTube page: `entrypoints/youtube.content.ts`.
- **Settings:** one object holds a master on/off switch plus on/off per feature. It's saved to `storage.sync`, the browser's synced extension storage. A feature added in a later version starts at its default.
- **Stack:** [WXT](https://wxt.dev), a framework that builds one codebase for Firefox and Chrome, with TypeScript. **MV3** (Manifest V3) is the current extension format both browsers use.

## Where things are

```
sites/youtube/features.ts   feature list: id, label, default
sites/youtube/youtube.css   the hiding rules (selectors)
sites/youtube/shorts.ts     which URLs count as Shorts
sites/index.ts              list of all sites
entrypoints/                content script, Shorts blocked page, background script, popup (stub)
lib/                        settings storage and attribute logic
assets/icon.svg             icon source; PNGs in public/icon/ are exported from it
```

**Add a site:** create `sites/<site>/` with `features.ts` and `<site>.css`, add it to `sites/index.ts`, then add an `entrypoints/<site>.content.ts` that matches the site's URLs.

## Icon

A #DEFEED (pale mint) rounded square with three feed lines that fade away.

## Credits and license

MIT, see [LICENSE](LICENSE). The selectors were written with these as reference, to keep up with YouTube's markup:
- [ublock-hide-yt-shorts](https://github.com/gijsdev/ublock-hide-yt-shorts), MIT.
- [Remove YouTube Suggestions](https://github.com/lawrencehook/remove-youtube-suggestions), MPL-2.0. Used as a reference only, no code copied.
