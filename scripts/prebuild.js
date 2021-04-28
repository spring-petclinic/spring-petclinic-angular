#!/usr/bin/env node

// @see https://github.com/angular/angular-cli/issues/4318
const fs = require("fs");
const path = require("path");

const ejs = require("ejs");
const ENVIRONMENT_SUFFIXES_TO_WRITE = ["prod", "e2e"];

const environmentFilesDirectory = path.join(__dirname, "../src/environments");
const targetEnvironmentTemplateFileName = "environment.ts.template";
// const targetEnvironmentFileName = "environment.prod.ts";

// Define default values in case there are no defined ones,
// but you should define only non-crucial values here,
// because build should fail if you don't provide the correct values
// for your production environment
const defaultEnvValues = {
  REST_API_URL: "localhost",
};

// Load template file
const environmentTemplate = fs.readFileSync(
  path.join(environmentFilesDirectory, targetEnvironmentTemplateFileName),
  { encoding: "utf-8" }
);

// Generate output data
const output = ejs.render(
  environmentTemplate,
  Object.assign({}, defaultEnvValues, process.env)
);
for (let suffix of ENVIRONMENT_SUFFIXES_TO_WRITE) {
  function getFileName(suffix) {
    return `environment.${suffix}.ts`;
  }
  // Write environment file
  fs.writeFileSync(
    path.join(environmentFilesDirectory, getFileName(suffix)),
    output
  );
}

process.exit(0);
