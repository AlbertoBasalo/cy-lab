import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    defaultCommandTimeout: 4000,
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/screenshots",
    trashAssetsBeforeRuns: true,
    video: false,
    videosFolder: "cypress/videos",
    viewportHeight: 768,
    viewportWidth: 1024,
    env: {
      apiUrl: "http://localhost:3000",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      //https://dev.to/samelawrence/how-to-test-in-multiple-environments-in-cypress-10-1i9h
      // if (config.env.master) {
      //   return {
      //     baseUrl: "<master env baseUrl>",
      //     env: {
      //       env: "master",
      //       auth_username: "<email>",
      //       auth_password: "<password>",
      //     },
      //   };
      // }
      // return {
      //   baseUrl: "<qa env baseUrl>",
      //   env: {
      //     env: "qa",
      //     auth_username: "<email>",
      //     auth_password: "<password>",
      //   },
      // };
    },
  },
});
