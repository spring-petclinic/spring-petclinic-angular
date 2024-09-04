///<reference types="cypress" />


import OwnerAdd_PO from "../page_objects/OwnerAdd_PO";


const addPage = new OwnerAdd_PO();



const { When,Then, After } = require("@badeball/cypress-cucumber-preprocessor");


When("I save the new pet owner record",() => {
    addPage.addOwner();
})

When("I save the changed pet owner record",() => {
    addPage.updateOwner()
})


When("I enter the pet owner with first name {string} last name {string} address {string} city {string} telephone {string}",(firstName,lastName,address,city,telephone) => {
 
    addPage.setFirstName(firstName);
    addPage.setLastName(lastName);
    addPage.setAddress(address);
    addPage.setCity(city);
    addPage.setTelephone(telephone);
})