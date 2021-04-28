// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require("jasmine-spec-reporter");

exports.config = {
  allScriptsTimeout: 11000,
  // specs: ["./e2e/**/*.e2e-spec.ts"],
  specs: ["cucumber/**/*.feature"],
  baseUrl: "http://localhost:4200/",
  capabilities: {
    browserName: "chrome",
  },
  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),
  seleniumAddress:
    process.env.SELENIUM_ADDRESS ?? "http://localhost:4444/wd/hub",
  cucumberOpts: {
    require: "features/step_definitions/*.ts",
  },

  // jasmineNodeOpts: {
  //   showColors: true,
  //   defaultTimeoutInterval: 30000,
  //   print: function () {},
  // },
  onPrepare() {
    require("ts-node").register({
      project: "cucumber/tsconfig.cucumber.json",
    });
    // jasmine
    //   .getEnv()
    //   .addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  },
};
