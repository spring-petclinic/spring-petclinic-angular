const chai = require("chai");
var expect = chai.expect;
var eventually = chai.eventually;
// var chaiAsPromised = require('chai-as-promised');
// import { Given } from "@cucumber/cucumber";
const { Given, Then, When, BeforeAll } = require("@cucumber/cucumber");
const { browser } = require("protractor");

BeforeAll({ timeout: 100 * 1000 }, async () => {
  console.log(browser.baseUrl);
  // chai.use(chaiAsPromised);
  await browser.get("/");
});
Given("I am on the page to add a new owner", async function () {
  // Write code here that turns the phrase above into concrete actions
  // http://localhost:4200/petclinic/owners
  // http://localhost:4200/petclinic/owners/add
  await browser.get(`/petclinic/owners/add`);
});

When("I click on the back button", async function () {
  // Write code here that turns the phrase above into concrete actions
  const backButton = await element(by.cssContainingText(".btn", "Back"));
  backButton.click();
  //expect(backButton.click()).not.to.be.undefined;
});
Then(
  "I expect to go back to the page with a table of owners info",
  async function () {
    const currentUrl = await browser.getCurrentUrl();
    //console.log(browser.getCurrentUrl());
    // expect(currentUrl).equals(`${browser.baseUrl}petclinic/owners/add`);

  //   browser.wait(protractor.ExpectedConditions.urlContains('petclinic/owners'), 5000).then(function(result) {
  //     expect(result).toEqual(true);
  // });
  // expect(browser.getCurrentUrl()).to.eventually
  //     .equal(`${browser.baseUrl}petclinic/owners/add`);
  browser.getCurrentUrl().then(function(currentUrl){
    expect(currentUrl).to.equal(`${browser.baseUrl}petclinic/owners`);
  })
  }
);

Given("I am on the add owner page", async function () {
  await browser.get(`/petclinic/owners/add`);
});

Given("The input for Telephone is not a series of numbers", async function () {
  // Write code here that turns the phrase above into concrete actions
  const telephone = element(by.id("telephone"));
  telephone.sendKeys("asdf");
  expect(telephone).not.to.be.undefined;
});

When("I try to click on Add Owner", async function () {
  // Write code here that turns the phrase above into concrete actions
  const addOwnerButton = element(by.cssContainingText(".btn", "Add Owner"));
  addOwnerButton.click();
});

Then("I expect the Add Owner button to not be clickable", async function () {
  await browser.waitForAngularEnabled();
  // Write code here that turns the phrase above into concrete actions
  // await expect(
  //   element(by.cssContainingText(".btn", "Add Owner")).undefined
  // ).should.eventually.equals(true);

  await expect(
    element(by.cssContainingText(".btn", "Add Owner")).getAttribute('disabled')).to.not.be.undefined;
});
