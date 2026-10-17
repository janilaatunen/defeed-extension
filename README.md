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

## Project layout (planned)

```
entrypoints/   content scripts, background script, popup
sites/<site>/  per-site feature list + CSS selectors
lib/           settings storage and shared feature logic
assets/        icon source (icon.svg)
public/icon/   exported icon PNGs (16–128 px)
```

## Icon

`assets/icon.svg` is the source: a #DEFEED (pale mint) rounded square with three feed lines that fade away. The PNGs in `public/icon/` are exported from it.
