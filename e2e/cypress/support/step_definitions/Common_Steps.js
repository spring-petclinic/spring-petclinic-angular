
import Homepage_PO from "../page_objects/Homepage_PO";

const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

const homePage = new Homepage_PO();

Given("I reset the test data", () => {
  /*
  cy.request("GET", "http://localhost:8080/api/test/reset").then((response) => {
    expect(response.status).to.eq(200)
  })
    */
});

Given("I launch the pet clinic application", () => {
  homePage.navigate("")
})

When("I want to find a pet owner in the application",() => {
  homePage.selectFindOwnerNavItem();
})

When("I want to create a new pet owner in the application",() => {
  homePage.selectAddOwnerNavItem();
})

When("I want to create a pet type in the application",() => {  
  homePage.selectPetTypesNavItem();
})

When("I want to edit a pet type in the application",() => {
  homePage.selectPetTypesNavItem();
})


When("I want to create a new pet in the application",() => {
  homePage.addPetToOwnerGeorgeFranklin();
})

When("I want to edit a pet with the name {string} in the application",(name) => {
  homePage.editPetLeoOfOwnerGeorgeFranklin();
})

When("I want to create a specialty in the application", () => {
  homePage.selectSpecialtiesNavItem()
})


When("I want to edit a specialty in the application", () => {
  homePage.selectSpecialtiesNavItem()
})



When("I want to create a new veterinarian in the application", () => {
  homePage.selectAddVeterinarianNavItem()
});


When("I want to create a new visitation appointment in the application",() => { 
  homePage.selectAddVisitNavItem();
})



/** Generic text message check */
Then("I see a message {string}",(message) => {
  homePage.contains(message);
});