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
Feature: Validate PetTypes add and edit input 

Background: Preconditions for testing
    Given I reset the test data
    And  I launch the pet clinic application



    Scenario Outline: Add pet type with invalid name
        When I want to create a pet type in the application
        And I add a pet type 
        And I enter the new pet type name "<name>" 
        Then I can not add a new pet type
        And I should get an add pet type error message "<error message>"

        Examples:

        | name        |  error message |
        | EMPTY       | EMPTY |
        | SPACES | Name must begin with a letter or digit |
        | .Fish1  |Name must begin with a letter or digit |

    Scenario Outline: Add pet type with valid name
        When I want to create a pet type in the application
        And I add a pet type 
        And I enter the new pet type name "<name>" 
        Then I can add a new pet type

        Examples:

        | name        |
        | Cat       |
        | Dog2 |
        | Fish1  |
        | Fis2Chips  |


Scenario Outline: Edit pet type with invalid name
    When I want to edit a pet type in the application
    And I select the pet type "cat"
    And I change the pet type name to "<name>"
    Then I can not save the changes to the pet type data
    And I should get an edit pet type error message "<error message>"
    
    Examples:

    | name        | error message |
    | EMPTY       | EMPTY |
    | SPACES | Name must begin with a letter or digit |
    | .dog  | Name must begin with a letter or digit |
    
    
    Scenario Outline: Edit pet type with valid name
        When I want to edit a pet type in the application
    And I select the pet type "cat"
    And I change the pet type name to "<name>"
    Then I can save the changes to the pet type data
    
        Examples:
    
        | name        |
        | Cat       |
        | Dog2 |
        | Fish1  |
        | Fish2Chips  |
    
    
    