/*
 *
 *  * Copyright 2016-2017 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

/**
 * @author Holger Mayer
 */
///<reference types="cypress" />


import Homepage_PO from "../../page_objects/Homepage_PO";
import VeterinarianAdd_PO from "../../page_objects/VeterinarianAdd_PO";
import VeterinarianList_PO from "../../page_objects/VeterinarianList_PO";
import VeterinarianEdit_PO from "../../page_objects/VeterinarianEdit_PO";

const homePage = new Homepage_PO();
const addPage = new VeterinarianAdd_PO();
const editPage = new VeterinarianEdit_PO();
const listPage = new VeterinarianList_PO();

const { When,Then, After } = require("@badeball/cypress-cucumber-preprocessor");


When("I enter the new veterinarians first name {string} last name {string}",(firstName,lastName) => {    
    addPage.setFirstName(firstName);
    addPage.setLastName(lastName);

})


When("I change the edited veterinarians first name {string} last name {string}",(firstName,lastName) => {    
    addPage.setFirstName(firstName);
    addPage.setLastName(lastName);

})


When("I edit the veterinarian with the name {string}",(name) => {
    homePage.selectListVeterinarianNavItem();
    listPage.editVeterinarian(name);
})



Then("I can not add a new veterinarian",() => {
    addPage.verifySaveButtonDisabled();
})

Then("I can add a new veterinarian",() => {
    addPage.verifySaveButtonEnabled();
})

Then("I can not save the changes to the veterinarian data",() => {
    editPage.verifySaveButtonDisabled();
})

Then("I can save the changes to the veterinarian data",() => {
    editPage.verifySaveButtonEnabled();
})


Then("I should get an add veterinarian error message {string}",(message) => {
    if (message != "EMPTY") {
        addPage.verifyErrorMessage(message);
    }
})

Then("I should get an edit veterinarian error message {string}",(message) => {
    if (message != "EMPTY") {
      editPage.verifyErrorMessage(message);
    }
})
