import { getSettings, setEnabled, setFeature, watchSettings, type Settings } from '@/lib/settings';
import { sites } from '@/sites';

const enabled = document.querySelector<HTMLInputElement>('#enabled')!;
const container = document.querySelector<HTMLElement>('#sites')!;
const featureInputs = new Map<string, HTMLInputElement>();
const fieldsets: HTMLFieldSetElement[] = [];

for (const site of sites) {
  const fieldset = document.createElement('fieldset');
  const legend = document.createElement('legend');
  legend.textContent = site.label;
  fieldset.append(legend);

  for (const feature of site.features) {
    const row = document.createElement('label');
    row.className = 'row';
    const text = document.createElement('span');
    text.textContent = feature.label;
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.setAttribute('role', 'switch');
    input.addEventListener('change', () => setFeature(site.id, feature.id, input.checked));
    row.append(text, input);
    fieldset.append(row);
    featureInputs.set(`${site.id}.${feature.id}`, input);
  }

  container.append(fieldset);
  fieldsets.push(fieldset);
}

enabled.addEventListener('change', () => setEnabled(enabled.checked));

function render(settings: Settings) {
  enabled.checked = settings.enabled;
  for (const fieldset of fieldsets) fieldset.disabled = !settings.enabled;
  for (const [siteId, features] of Object.entries(settings.sites)) {
    for (const [featureId, on] of Object.entries(features)) {
      const input = featureInputs.get(`${siteId}.${featureId}`);
      if (input) input.checked = on;
    }
  }
}

render(await getSettings());
// Keeps the popup in sync if settings change elsewhere (another window or a synced device).
watchSettings(render);
