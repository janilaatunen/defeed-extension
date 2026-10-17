<p align="center"><img src="assets/icon.svg" width="96" alt="Defeed icon"></p>

# Defeed

A browser extension that hides the distracting parts of websites (feeds, Shorts, recommendations, comments) while leaving the parts you came for.

**Status: pre-alpha.** Nothing to install yet. This README describes what the project will be.

## Why

Feed-blocking extensions like Unhook work, but they break whenever a site changes its markup and the fixes arrive slowly. Defeed is a small, self-maintained alternative: one codebase, every site's rules in one place, so a fix takes minutes.

## What it will do

One toggle per distraction, per site, plus a master on/off switch.

### YouTube (first target, desktop and mobile)

- **Shorts, everywhere:** the Shorts tab, Shorts shelves in home, search, subscriptions and channel pages, and Shorts filters.
- **Shorts links blocked:** opening a `/shorts/` link shows a "blocked" page instead of playing it.
- **Home feed hidden:** the home page stays empty, search still works.
- **Comments hidden.**
- **Autoplay off:** no autoplay and no end-screen video grid.
- **Watch-page sidebar hidden:** no related videos next to the player.

### Later

Reddit, then other sites as they become a problem. Each site is its own folder of rules, so adding one doesn't touch the others.

## Browsers

| Browser | Plan |
|---|---|
| Firefox (desktop) | Primary target |
| Zen | Same build as Firefox |
| Firefox for Android | Supported, includes `m.youtube.com` |
| Chrome / Chromium | Same codebase, built separately |

Settings sync between desktops through Firefox Sync (`storage.sync`).

## How it works (short version)

- **Hiding:** each toggle sets an attribute on the page's `<html>` element, and a stylesheet hides the matching elements. Pure CSS, so nothing flickers and it keeps working as the site re-renders.
- **Blocking Shorts links:** a network rule catches full page loads, and a content script catches navigation inside YouTube's single-page app.
- **Stack:** [WXT](https://wxt.dev) (a framework that builds one codebase for Firefox and Chrome) + TypeScript, Manifest V3.

## Develop

```bash
npm install            # also runs `wxt prepare` (generates .wxt/ types)
npm run dev            # Chrome with the extension loaded, hot reload
npm run dev:firefox    # same in Firefox
npm run compile        # type check
npm test               # unit tests (Vitest)
npm run build          # production build → .output/chrome-mv3
npm run build:firefox  # → .output/firefox-mv3
npm run zip:firefox    # zip for AMO signing
```

Load a build by hand: Firefox `about:debugging` → This Firefox → Load Temporary Add-on → pick `.output/firefox-mv3/manifest.json`. Chrome `chrome://extensions` → Developer mode → Load unpacked → `.output/chrome-mv3`.

## Project layout

```
entrypoints/   content scripts, background script, popup (stubs for now)
sites/<site>/  per-site feature list (ids, labels, defaults) + CSS selectors
sites/index.ts the list of all sites
lib/           settings storage (synced) and shared feature types
assets/        icon source (icon.svg)
public/icon/   exported icon PNGs (16–128 px)
```

## Status of the YouTube rules

The hiding rules live in `sites/youtube/youtube.css`, and the two jobs CSS can't do (desktop Shorts filter chips, switching autoplay off) are in `entrypoints/youtube.content.ts`. **They haven't been checked against live YouTube yet.** They're written from two maintained sources: [Remove YouTube Suggestions](https://github.com/lawrencehook/remove-youtube-suggestions) (MPL-2.0, used as a reference, not copied) and [ublock-hide-yt-shorts](https://github.com/gijsdev/ublock-hide-yt-shorts). Blocking direct Shorts links isn't built yet.

## Settings

One synced object: a master on/off switch, plus on/off per feature per site. Every feature defaults to on. A feature added in a later version starts at its default, and a removed one is dropped. Feature ids are the storage keys, so never rename one.

## Icon

`assets/icon.svg` is the source: a #DEFEED (pale mint) rounded square with three feed lines that fade away. The PNGs in `public/icon/` are exported from it.
