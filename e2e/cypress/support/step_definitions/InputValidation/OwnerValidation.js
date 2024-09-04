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
import OwnerAdd_PO from "../../page_objects/OwnerAdd_PO";



const homePage = new Homepage_PO();
const addPage = new OwnerAdd_PO();



const { When,Then, After } = require("@badeball/cypress-cucumber-preprocessor");



When("I edit the pet owner with the name {string}",(name) => {
    homePage.editOwnerGeorgeFranklin();
})



Then("I can not add a new owner",() => {
    addPage.verifyAddSaveButtonDisabled();
})

Then("I can add a new owner",() => {
    addPage.verifyAddSaveButtonEnabled();
})

Then("I can not save the changes to the owner data",() => {
    addPage.verifyEditSaveButtonDisabled();
})

Then("I can save the changes to the owner data",() => {
    addPage.verifyEditSaveButtonEnabled();
})


Then("I should get an add pet owner error message {string}",(message) => {
    if (message.trim() != "EMPTY") {
        addPage.verifyErrorMessage(message.trim());
    }
})

Then("I should get an edit pet owner error message {string}",(message) => {
    if (message.trim() != "EMPTY") {
        addPage.verifyErrorMessage(message.trim());
    }
})