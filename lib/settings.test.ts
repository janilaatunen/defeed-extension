import { beforeEach, describe, expect, it } from 'vitest';
import { fakeBrowser } from 'wxt/testing/fake-browser';
import type { Site } from './features';
import {
  getSettings,
  isFeatureOn,
  resolveSettings,
  setEnabled,
  setFeature,
  watchSettings,
} from './settings';

const testSites: Site[] = [
  {
    id: 'site',
    label: 'Site',
    features: [
      { id: 'a', label: 'A', default: true },
      { id: 'b', label: 'B', default: false },
    ],
  },
];

describe('resolveSettings', () => {
  it('returns defaults when nothing is stored', () => {
    expect(resolveSettings(null, testSites)).toEqual({
      enabled: true,
      sites: { site: { a: true, b: false } },
    });
  });

  it('keeps stored values, fills missing features and drops unknown ones', () => {
    const resolved = resolveSettings(
      { enabled: false, sites: { site: { a: false, gone: true } } },
      testSites,
    );
    expect(resolved).toEqual({ enabled: false, sites: { site: { a: false, b: false } } });
  });
});

describe('isFeatureOn', () => {
  it('is off when the master switch is off', () => {
    const settings = resolveSettings({ enabled: false }, testSites);
    expect(isFeatureOn(settings, 'site', 'a')).toBe(false);
  });

  it('is off for unknown sites and features', () => {
    const settings = resolveSettings(null, testSites);
    expect(isFeatureOn(settings, 'nope', 'a')).toBe(false);
    expect(isFeatureOn(settings, 'site', 'nope')).toBe(false);
  });
});

describe('settings storage', () => {
  beforeEach(() => fakeBrowser.reset());

  it('defaults every YouTube feature to on', async () => {
    const settings = await getSettings();
    expect(settings.enabled).toBe(true);
    expect(Object.values(settings.sites.youtube ?? {})).not.toContain(false);
  });

  it('round-trips a feature toggle', async () => {
    await setFeature('youtube', 'comments', false);
    const settings = await getSettings();
    expect(settings.sites.youtube?.comments).toBe(false);
    expect(settings.sites.youtube?.shorts).toBe(true);
  });

  it('round-trips the master switch without touching features', async () => {
    await setFeature('youtube', 'sidebar', false);
    await setEnabled(false);
    const settings = await getSettings();
    expect(settings.enabled).toBe(false);
    expect(settings.sites.youtube?.sidebar).toBe(false);
  });

  it('notifies watchers with resolved settings', async () => {
    const seen: boolean[] = [];
    const unwatch = watchSettings((s) => seen.push(s.sites.youtube?.autoplay ?? true));
    await setFeature('youtube', 'autoplay', false);
    unwatch();
    expect(seen).toEqual([false]);
  });
});
