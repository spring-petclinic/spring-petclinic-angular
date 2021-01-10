// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
    capabilities: {
    browserName: 'chrome',
    chromeOptions: {
        args: ['no-sandbox',
        '--remote-debugging-port=9222'
        , '--test-type=browser'
        ,'disable-infobars'
        ,'--disable-extensions'
        ,'--disable-dev-shm-usage'
        , '--window-size=800,600'
        ,'--disable-gpu'
        ,'--headless'
        ,' --single-process'
        , '--silent',        
        ],
    },
    useAllAngular2AppRoots: true,
  },  
  directConnect: true,
  chromeDriver: '/usr/bin/chromedriver',
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};