import type { Site } from './features';
import { isFeatureOn, type Settings } from './settings';

export function featureAttribute(featureId: string): string {
  return `data-defeed-${featureId.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`;
}

export function applyFeatures(root: Element, site: Site, settings: Settings): void {
  for (const feature of site.features) {
    root.toggleAttribute(featureAttribute(feature.id), isFeatureOn(settings, site.id, feature.id));
  }
}
