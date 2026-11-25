import { defineConfig } from 'mobilewright';

export default defineConfig({
  testDir: "./tests",
  platform: "android",
  bundleId: "asia.ifarmer.supplier.dev",
  reporter: [['html', { open: 'never' }]],
});
