import '@/sites/youtube/youtube.css';
import { applyFeatures } from '@/lib/apply';
import { getSettings, isFeatureOn, watchSettings, type Settings } from '@/lib/settings';
import { youtube } from '@/sites/youtube/features';

// Toggles we already switched off; if the user turns autoplay back on we leave it.
const clickedToggles = new WeakSet<Element>();

function markShortsChips() {
  for (const chip of document.querySelectorAll('yt-chip-cloud-chip-renderer:not([data-defeed-short-chip])')) {
    if (chip.textContent?.trim().toLowerCase() === 'shorts') chip.setAttribute('data-defeed-short-chip', '');
  }
}

function turnOffAutoplay() {
  const toggles = document.querySelectorAll(
    '.ytp-autonav-toggle-button[aria-checked="true"], .ytm-autonav-toggle-button-container[aria-pressed="true"]',
  );
  for (const toggle of toggles) {
    if (clickedToggles.has(toggle)) continue;
    clickedToggles.add(toggle);
    (toggle as HTMLElement).click();
  }
}

export default defineContentScript({
  matches: ['*://www.youtube.com/*', '*://m.youtube.com/*'],
  runAt: 'document_start',
  async main() {
    let settings: Settings = await getSettings();

    // Work CSS can't do, run at most once per frame while YouTube re-renders.
    let scheduled = false;
    const sweep = () => {
      scheduled = false;
      if (isFeatureOn(settings, youtube.id, 'shorts')) markShortsChips();
      if (isFeatureOn(settings, youtube.id, 'autoplay')) turnOffAutoplay();
    };
    const scheduleSweep = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(sweep);
      }
    };

    const update = (next: Settings) => {
      settings = next;
      applyFeatures(document.documentElement, youtube, settings);
      scheduleSweep();
    };

    update(settings);
    watchSettings(update);
    new MutationObserver(scheduleSweep).observe(document.documentElement, { childList: true, subtree: true });
  },
});
