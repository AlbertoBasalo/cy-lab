import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    viewportHeight: 768,
    viewportWidth: 1024,
    env: {
      apiUrl: "http://localhost:3000",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
