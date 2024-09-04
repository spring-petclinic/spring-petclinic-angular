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
import PetAdd_PO from "../../page_objects/PetAdd_PO";

const addPage = new PetAdd_PO();
const homePage = new Homepage_PO();


const { When,Then, After } = require("@badeball/cypress-cucumber-preprocessor");

   
When("I enter the new pets name {string}",(name) => {
    addPage.setName(name);
}) 

When("I enter the new pets birth date {string}",(name) => {
    addPage.setBirthDate(name);
}) 

When("I select the new pets pet type {string}",(name) => {
    addPage.setPetType(name)
}) 


When("I change the pets name {string}",(name) => {
    addPage.setName(name);
}) 

When("I change the pets birth date {string}",(name) => {
    addPage.setBirthDate(name);
}) 

When("I select a changed pets pet type {string}",(name) => {
    addPage.setPetType(name)
}) 


Then("I can not add a new pet",() => {
   addPage.verifyAddSaveButtonDisabled();
})

Then("I can add a new pet",() => {
    addPage.verifyAddSaveButtonEnabled();
})

Then("I can not save the changes to the pet data",() => {
    addPage.verifyEditSaveButtonDisabled();
})

Then("I can save the changes to the pet data",() => {
    addPage.verifyEditSaveButtonEnabled();
})


Then("I should get an add pet error message {string}",(message) => {
    if (message.trim() != "EMPTY") {
        addPage.verifyErrorMessage(message);
    }
})

Then("I should get an edit pet error message {string}",(message) => {
    if (message.trim() != "EMPTY") {
        addPage.verifyErrorMessage(message);
    }
})
