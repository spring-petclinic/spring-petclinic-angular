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


import SpecialtiesList_PO from "../../page_objects/SpecialtiesList_PO";
import SpecialtiesEdit_PO from "../../page_objects/SpecialtyEdit_PO";


const specialtiesListPage = new SpecialtiesList_PO();
const specialtiesEditPage = new SpecialtiesEdit_PO();

const { When,Then, After } = require("@badeball/cypress-cucumber-preprocessor");



When("I add a specialty",() => {
    specialtiesListPage.addSpecialty();
})



When("I enter in the specialty name {string}",(name) => {
    specialtiesEditPage.setName(name);
})



When("I select the specialty {string}",(name) => {
    specialtiesListPage.beginEditSpecialty(name);
})

When("I change the specialty name to {string}",(name) => {
    specialtiesEditPage.setName(name);
})



Then("I can not add a new specialty",() => {
    specialtiesListPage.validateAddButtonDisabled();
})

Then("I can not save the changes to the specialty data",() => {
    specialtiesEditPage.validateEditButtonDisabled();
})


Then("I can add a new specialty",() => {
    specialtiesListPage.validateAddButtonEnabled();
})

Then("I can save the changes to the specialty data",() => {
    specialtiesEditPage.validateEditButtonEnabled();
})


Then("I should get an add specialty error message {string}",(message) => {
    if (message.trim() != "EMPTY") {
         specialtiesListPage.validateErrorMessage(message);
    }
})

Then("I should get an edit specialty error message {string}",(message) => {
    if (message.trim() != "EMPTY") {
        specialtiesEditPage.validateErrorMessage(message);
    }
})

