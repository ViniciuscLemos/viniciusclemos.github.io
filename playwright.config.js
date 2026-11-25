// @ts-check
const { defineConfig, devices } = require('@playwright/test');

// The site is static, so a plain file server is enough to test it.
const PORT = 4340;

module.exports = defineConfig({
  testDir: 'e2e',
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: { baseURL: `http://localhost:${PORT}` },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'phone', use: { ...devices['Pixel 7'] } },
  ].map((project) => ({
    ...project,
    // on my machine it uses the Edge that is already installed
    use: { ...project.use, channel: process.env.CI ? undefined : 'msedge' },
  })),
  webServer: {
    command: `python -m http.server ${PORT} --directory site`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
  },
});
