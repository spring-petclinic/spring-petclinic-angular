#
# Copyright 2024 the original author or authors.#
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

@InputValidation 
@Current
Feature: Validate pet add and edit input 

Background: Preconditions for testing
    Given I reset the test data
    And I launch the pet clinic application


Scenario Outline: Add pet with invalid name
    When I want to create a new pet in the application
    And I enter the new pets name "<name>"
    And I enter the new pets birth date "<birthdate>"
    And I select the new pets pet type "<pettype>"
    Then I can not add a new pet
    And I should get an add pet error message "<error message>"

    Examples:
    
    | name        | birthdate  | pettype | error message |
    | EMPTY       | 2021/10/05 | dog     |   EMPTY |
    | Gregory     | EMPTY      | dog     |    EMPTY |
    | Gregory     | 2021/10/05 | EMPTY   |   EMPTY |
    | SPACES      | 2021/10/05 | dog     |   Name must begin with a letter |
    | Gregory     | SPACES     | dog     |   BirthDate is required |
    | .Gregory     | 2021/10/05 | dog     |   Name must begin with a letter |


Scenario Outline: Add pet with valid data
    When I want to create a new pet in the application
    And I enter the new pets name "<name>"
    And I enter the new pets birth date "<birthdate>"
    And I select the new pets pet type "<pettype>"
    Then  I can add a new pet

    Examples:

    | name        | birthdate  | pettype |
    | Gregory     | 2021/10/05 | lizard |   
    | A           | 2023/6/3   | bird |
    | Gregory     | .2021/10/05 | lizard |  



Scenario Outline: Edit pet with invalid name
    When I want to edit a pet with the name "Leo" in the application
    And I change the pets name "<name>"
    And I change the pets birth date "<birthdate>"
    And I select a changed pets pet type "<pettype>"
    Then I can not save the changes to the pet data
    And I should get an edit pet error message "<error message>"

    Examples:
    
    | name        | birthdate  | pettype | error message |
    | EMPTY       | 2021/10/05 | dog     |   EMPTY |
    | Gregory     | EMPTY      | dog     |    EMPTY |
    | SPACES      | 2021/10/05 | dog     |   Name must begin with a letter |
    | Gregory     | SPACES     | dog     |   BirthDate is required |
    | .Gregory    | 2021/10/05 | dog     |   Name must begin with a letter |



Scenario Outline: Edit pet with valid name
When I want to edit a pet with the name "Leo" in the application 
And I change the pets name "<name>"
And I change the pets birth date "<birthdate>"
And I select a changed pets pet type "<pettype>"
Then I can save the changes to the pet data
Examples:

| name        | birthdate  | pettype |
| Gregory     | 2021/10/05 | lizard |   
| A           | 2023/6/3   | bird |
| Gregory     | .2021/10/05 | lizard |  
