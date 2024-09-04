#
# Copyright 2024 the original author or authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# author Holger Mayer
#
@CRUD
Feature: CRUD Owner

Background: Preconditions for testing
    Given I reset the test data
    And   I launch the pet clinic application   
    
Scenario: Add new owner
    When I want to create a new pet owner in the application
    And I enter the pet owner with first name "Travis" last name "Peterson" address "1234 Fake St" city "Springfield" telephone "1234567890"
    And I save the new pet owner record
    Then I see the owner "Travis Peterson" in the pet owner list
    And I see the owner details with first name "Travis" last name "Peterson" address "1234 Fake St" city "Springfield" telephone "1234567890"


Scenario: Edit  owner
    When I want to create a new pet owner in the application
    And I enter the pet owner with first name "Clark" last name "Kent" address "1234 Fake St" city "Springfield" telephone "1234567890"
    And I save the new pet owner record
    And I select the owner "Clark Kent"
    And I begin editing the owner record
    And I enter the pet owner with first name "Travis" last name "Peterson" address "North Park Blvd" city "Bielefeld" telephone "49492020"
    And I save the changed pet owner record
    Then I see the owner "Travis Peterson" in the pet owner list
    And I see the owner details with first name "Travis" last name "Peterson" address "North Park Blvd" city "Bielefeld" telephone "49492020"

###Information:
### Scenario: Delete owner
### There is currently no way to delete an owner in the pet clinic application front end
### This can be done only by calling the Rest API directly

Scenario: List owner 
    When I want to find a pet owner in the application
    Then  I see a list of owners

Scenario: Filter List owner by "Es"
    When I want to find a pet owner in the application
    And I filter the pet owners for "es"
    Then  I see a list of owners with "es" in the Name

Scenario: Filter unique  owner by "Peterson"
    When I want to find a pet owner in the application
    And I filter the pet owners for "Peterson"
    Then  I see a list of owners with "Peterson" in the Name

Scenario: Filter the not existing  owner "Travis"
    When I want to find a pet owner in the application
    And I filter the pet owners for "Travis"
    Then  I see an empty result list