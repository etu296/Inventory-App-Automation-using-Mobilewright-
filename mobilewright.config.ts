import { defineConfig } from 'mobilewright';

export default defineConfig({
  testDir: "./tests",
  platform: "android",
  bundleId: "com.inventoryhub.app",
  reporter: [['html', { open: 'never' }]],
});
