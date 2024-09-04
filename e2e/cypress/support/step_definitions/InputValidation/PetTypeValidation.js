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
/// <reference types="cypress" />


import PetTypeList_PO from "../../page_objects/PetTypeList_PO";
import PetTypeEdit_PO from "../../page_objects/PetTypeEdit_PO";


const petTypeListPage = new PetTypeList_PO();
const petTypeEditPage = new PetTypeEdit_PO();

const { When,Then, After } = require("@badeball/cypress-cucumber-preprocessor");



When("I add a pet type",() => {
    petTypeListPage.addPetType();
})


When("I enter the new pet type name {string}",(name) => {
    petTypeListPage.setName(name);
})


When("I select the pet type {string}",(name) => {
    petTypeListPage.beginEditPetType(name);
})

When("I change the pet type name to {string}",(name) => {
    petTypeEditPage.setName(name);
})



Then("I can not add a new pet type",() => {
    petTypeListPage.validateAddButtonDisabled();
})


Then("I can add a new pet type",() => {
    petTypeListPage.validateAddButtonEnabled();
})

Then("I can not save the changes to the pet type data",() => {
    petTypeEditPage.validateEditButtonDisabled();
})

Then("I can save the changes to the pet type data",() => {
    petTypeEditPage.validateEditButtonEnabled();
})


Then("I should get an add pet type error message {string}",(message) => {
    if (message != "EMPTY") {   
        petTypeListPage.validateErrorMessage(message);
    }
})

Then("I should get an edit pet type error message {string}",(message) => {
    if (message != "EMPTY") {   
        petTypeEditPage.validateErrorMessage(message);
    }
})

