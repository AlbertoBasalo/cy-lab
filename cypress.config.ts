import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    viewportWidth: 1280,
    viewportHeight: 1024,
    defaultCommandTimeout: 4000,
    screenshotOnRunFailure: false,
    video: false,
    videoCompression: 32,
    videosFolder: 'cypress/reports/videos',
    screenshotsFolder: 'cypress/reports/screenshots',
    env: {
      apiUrl: 'http://localhost:3000/api',
      testUser: {
        email: 'test@valid.org',
        password: '@validPassword1',
      }
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
