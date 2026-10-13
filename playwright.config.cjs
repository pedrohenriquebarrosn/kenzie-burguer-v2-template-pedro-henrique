const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  use: { baseURL: 'http://127.0.0.1:5173', headless: true, browserName: 'chromium' },
  webServer: {
    command: 'yarn dev --host 127.0.0.1',
    url: 'http://127.0.0.1:5173',
    timeout: 60000,
    reuseExistingServer: false,
  },
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
});
