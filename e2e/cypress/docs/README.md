# E2E testing with Cypress and Cucumber

## Overview

The implemented e2e test suite uses [Gherkin](https://cucumber.io/docs/gherkin/reference/) feature files for test descriptions. The test system reads these feature files and links each scenario test step to a step definition in a JavaScript file. In the step definition, we implement the corresponding test actions by calling page object functions. These page objects realize specific test functions of the application under test using [Cypress](http://www.cypress.io/).


## Test suite structure


### cypress.config.ts

The file cypress.config.ts is stored under the project root.
This file contains the basic configuration for the test suite. The most crucial part includes the definitions of the locations, where the different test files (input or results) are stored.

### Feature files

We store the feature files under ***e2e/features***.
The [Gherkin](https://cucumber.io/docs/gherkin/reference/) language is used to write test system agnostic descriptions of test cases.
#### Special Keywords
In this test suite, we use the following special keywords in test steps or example tables.

EMPTY
SPACES

EMPTY is automatically replaced during testing by an empty string: "". 
SPACES is automatically replaced by a string comprising only space characters: "   ".


#### Tags

There are several tags defined in the test suite. 

Important is the tag `@Bug`. This tag shows scenarios that will fail because of a known bug. With `npm confirmation-test` one can retest these exclusively during fixing bugs.

### Step definitions
You can find the step definition files under ***e2e/cypress/support/step_definitions***.
Developers write step definition files in JavaScript or (in the future) TypeScript. 
 Besides the definition of the keywords (Given, When, Then, And) these files are test suite agnostic. The test suite needs to be written in Javascript or TypeScript.

It is important to make sure that the string value of a step definition header fits to the scenario steps in the feature files.

### Page objects

You can find the page object files under  ***e2e/cypress/support/page_objects***.

They contain page classes that implement the test tool specific automation code. Each function implements one input or verification sequence of a single page of the application under test. 

### Tools

You can find the tool files under  ***e2e/cypress/support/tools***.
Currently, the only tool is the implementation for a rest api access to delete a specific pet owner. The reason for this is that there is no UI function in the Angular application under test to delete a pet owner.

## Running the test suite

There are different ways to call the test suite.

### Interactive with the Cypress app

In the terminal enter `npx cypress open`.

Then the cypress app will open. Select E2E testing and electron browser to test. You now will see a list of feature files to run interactively.


### Headless with NPM

There are two test execution variants defined in the package.json

`npm full-regression-test`- this will run all feature files
`npm confirmation-test`- this will run only scenarios or features tagged with @Bug.

## Reports

After a test run there is an [HTML report](../reports/html/cucumber-report.html) available under ***e2e/cypress/reports/cucumber-report.html***.

You can find the screen shot files under ***e2e/cypress/screenshots***.

## FAQ

### I want to run the rest server backend or the Angular front end from a different base URL than in the example defined.

The test suite uses the file ***e2e/cypress/fixtures/config.json*** to define the base URLs of the rest server app and the Angular front end app. If these URLs are not the standard values, these need to be changed.