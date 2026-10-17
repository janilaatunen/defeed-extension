import { describe, expect, it } from 'vitest';
import { applyFeatures, featureAttribute } from './apply';
import type { Site } from './features';
import { resolveSettings } from './settings';

const site: Site = {
  id: 'site',
  label: 'Site',
  features: [
    { id: 'homeFeed', label: 'Home', default: true },
    { id: 'comments', label: 'Comments', default: false },
  ],
};

function fakeRoot() {
  const attrs = new Set<string>();
  const root = {
    toggleAttribute: (name: string, force: boolean) => (force ? attrs.add(name) : attrs.delete(name), force),
  } as unknown as Element;
  return { root, attrs };
}

describe('featureAttribute', () => {
  it('turns camelCase ids into kebab-case data attributes', () => {
    expect(featureAttribute('homeFeed')).toBe('data-defeed-home-feed');
    expect(featureAttribute('shorts')).toBe('data-defeed-shorts');
  });
});

describe('applyFeatures', () => {
  it('sets attributes for features that are on and removes the rest', () => {
    const { root, attrs } = fakeRoot();
    attrs.add('data-defeed-comments');
    applyFeatures(root, site, resolveSettings(null, [site]));
    expect([...attrs]).toEqual(['data-defeed-home-feed']);
  });

  it('removes every attribute when the master switch is off', () => {
    const { root, attrs } = fakeRoot();
    applyFeatures(root, site, resolveSettings(null, [site]));
    applyFeatures(root, site, resolveSettings({ enabled: false }, [site]));
    expect(attrs.size).toBe(0);
  });
});
