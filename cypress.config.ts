import { defineConfig } from "cypress";
import * as createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
export default defineConfig({
  e2e: {
    specPattern: "e2e/features/**/*.feature",
    supportFile: 'e2e/cypress/support/**/e2e.{js,jsx,ts,tsx}', // Adjust this if you have a support file
    fixturesFolder: 'e2e/cypress/fixtures',
    screenshotsFolder: 'e2e/cypress/screenshots',
    videosFolder: 'e2e/cypress/videos',
    downloadsFolder: 'e2e/cypress/downloads',
    video: false,
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});