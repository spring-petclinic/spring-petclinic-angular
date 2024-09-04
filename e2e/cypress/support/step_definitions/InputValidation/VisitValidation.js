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
import VisitAdd_PO from "../../page_objects/VisitAdd_PO";

const addPage = new VisitAdd_PO();
const homePage = new Homepage_PO();


const { When,Then, After } = require("@badeball/cypress-cucumber-preprocessor");


When("I edit the visit for the pet named {string}",(name) => {
    homePage.editVisitOfPetMax(name);
})


   
When("I enter the new visit description {string}",(name) => {
    addPage.setDescription(name);
}) 

When("I enter the new visit date {string}",(name) => {
    addPage.setVisitDate(name);
}) 


When("I change the visit description {string}",(name) => {
    addPage.setDescription(name);
}) 

When("I change the visit date {string}",(name) => {
    addPage.setVisitDate(name);
}) 


Then("I can not add a new visitation appointment",() => {
   addPage.verifyAddSaveButtonDisabled();
})

Then("I can add a new visitation appointment",() => {
    addPage.verifyAddSaveButtonEnabled();
})

Then("I can not save the changes to the visitation appointment",() => {
    addPage.verifyEditSaveButtonDisabled();
})

Then("I can save the changes to the visitation appointment",() => {
    addPage.verifyEditSaveButtonEnabled();
})


Then("I should get an add visit error message {string}",(message) => {
    if (message != "EMPTY") {
        addPage.verifyErrorMessage(message);
    }   
})

Then("I should get an edit visit error message {string}",(message) => {
    if (message != "EMPTY") {
        addPage.verifyErrorMessage(message);
    }   
})
