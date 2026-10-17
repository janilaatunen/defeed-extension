import { storage } from 'wxt/utils/storage';
import type { Site } from './features';
import { sites as allSites } from '@/sites';

export interface Settings {
  enabled: boolean;
  sites: Record<string, Record<string, boolean>>;
}

type StoredSettings = Partial<Settings> | null;

const item = storage.defineItem<StoredSettings>('sync:settings', { fallback: null });

// Fills in defaults for anything missing, so features added in a later
// version start at their default, and drops ids that no longer exist.
export function resolveSettings(stored: StoredSettings, sites: Site[] = allSites): Settings {
  const resolved: Settings = { enabled: stored?.enabled ?? true, sites: {} };
  for (const site of sites) {
    const storedSite = stored?.sites?.[site.id] ?? {};
    resolved.sites[site.id] = Object.fromEntries(
      site.features.map((f) => [f.id, storedSite[f.id] ?? f.default]),
    );
  }
  return resolved;
}

export function isFeatureOn(settings: Settings, siteId: string, featureId: string): boolean {
  return settings.enabled && (settings.sites[siteId]?.[featureId] ?? false);
}

export async function getSettings(): Promise<Settings> {
  return resolveSettings(await item.getValue());
}

export async function setEnabled(enabled: boolean): Promise<void> {
  const settings = await getSettings();
  await item.setValue({ ...settings, enabled });
}

export async function setFeature(siteId: string, featureId: string, on: boolean): Promise<void> {
  const settings = await getSettings();
  settings.sites[siteId] = { ...settings.sites[siteId], [featureId]: on };
  await item.setValue(settings);
}

export function watchSettings(callback: (settings: Settings) => void): () => void {
  return item.watch((stored) => callback(resolveSettings(stored)));
}
