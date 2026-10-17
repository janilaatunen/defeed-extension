import { defineConfig } from 'wxt';

export default defineConfig({
  manifestVersion: 3,
  manifest: {
    name: 'Defeed',
    permissions: ['storage'],
    browser_specific_settings: {
      gecko: {
        id: 'defeed@laatunen.fi',
        strict_min_version: '128.0',
        data_collection_permissions: { required: ['none'] },
      },
      gecko_android: {
        strict_min_version: '128.0',
      },
    },
  },
});
