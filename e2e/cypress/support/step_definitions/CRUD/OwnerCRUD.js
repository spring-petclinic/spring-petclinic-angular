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

import Homepage_PO from "../../page_objects/Homepage_PO";
import OwnerList_PO from "../../page_objects/OwnerList_PO";
import OwnerDetails_PO from "../../page_objects/OwnerDetails_PO";
import RestAPIClient from "../../tools/RestAPIClient";

const homepage = new Homepage_PO();
const ownerListPage = new OwnerList_PO();
const ownerDetailPage = new OwnerDetails_PO();

const restAPIClient = new RestAPIClient();

const { Given, When,Then , After} = require("@badeball/cypress-cucumber-preprocessor");

After(() => {
    restAPIClient.deleteOwnerByFirstNameAndLastName("Travis","Peterson");
})


When("I select the owner {string}", (fullname) => {
    ownerListPage.selectOwner(fullname);
})

When("I begin editing the owner record", () => {
    ownerDetailPage.editOwner();
})

When("I filter the pet owners for {string}",(filterString) => {
    ownerListPage.filterBy(filterString);
})



Then("I see the owner {string} in the pet owner list",(fullname) => {
    ownerListPage.validateOwnerInList(fullname);
})

Then("I see a list of owners",() => {
    ownerListPage.validateInitialOwner();
})

Then("I see a list of owners with {string} in the Name",(filter) => {
    ownerListPage.validateFiltered(filter);
})

Then("I see an empty result list", () => {
    ownerListPage.hasNoResults();
})

Then("I see the owner details with first name {string} last name {string} address {string} city {string} telephone {string}",(firstName,lastName,address,city,telephone) => {

    homepage.selectFindOwnerNavItem();

    let fullname = firstName + " " + lastName;

    ownerListPage.selectOwner(fullname);
    ownerDetailPage.validateOwner(fullname,address, city, telephone);
})

