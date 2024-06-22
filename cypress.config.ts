import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    defaultCommandTimeout: 4000,
    screenshotOnRunFailure: false,
    video: false,
    viewportHeight: 1366,
    viewportWidth: 1024,
    env: {
      apiUrl: "http://localhost:3000/api",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
