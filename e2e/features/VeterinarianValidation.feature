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
Feature: Validate Veterinarian add and edit input 

Background: Preconditions for testing
    Given I reset the test data
    And  I launch the pet clinic application

Scenario Outline: Add veterinarian with invalid data
    When I want to create a new veterinarian in the application
    And  I enter the new veterinarians first name "<firstname>" last name "<lastname>"
    Then I can not add a new veterinarian
    And I should get an add veterinarian error message "<error message>"
    
    Examples:

    | firstname   | lastname  |  error message |
    | EMPTY       | Peterson  | EMPTY |
    | Gregory     | EMPTY     | EMPTY |
    | SPACES      | Peterson  | First Name may only consist of letters |
    | Gregory     | SPACES    | Last Name may only consist of letters |
    | .Gregory    | Peterson  | First Name may only consist of letters |
    | Gregory     | .Peterson | Last Name may only consist of letters |
    



Scenario Outline: Add veterinarian with valid name
    When I want to create a new veterinarian in the application
    And  I enter the new veterinarians first name "<firstname>" last name "<lastname>"
    Then I can add a new veterinarian
    Examples:

    | firstname        | lastname |
    | Gregory     | Peterson |
    | A | Connors |
    | Berta | lloyd  |




Scenario Outline: Edit veterinarian with invalid data
    When I edit the veterinarian with the name "James Carter"
    And  I change the edited veterinarians first name "<firstname>" last name "<lastname>"
    Then I can not save the changes to the veterinarian data
    And I should get an edit veterinarian error message "<error message>"
   
    Examples:
    
    | firstname   | lastname  |  error message |
    | EMPTY       | Peterson  | First Name is required |
    | Gregory     | EMPTY     | Last Name is required |
    | SPACES      | Peterson  | First Name may only consist of letters |
    | Gregory     | SPACES    | Last Name may only consist of letters |
    | .Gregory    | Peterson  | First Name may only consist of letters |
    | Gregory     | .Peterson | Last Name may only consist of letters |
    




@Bug 
# Example 2  charaacter count missmatch 1/2 in input field
Scenario Outline: Edit veterinarian with valid name
    When I edit the veterinarian with the name "James Carter"
    And  I change the edited veterinarians first name "<firstname>" last name "<lastname>"
   Then I can save the changes to the veterinarian data

    Examples:

    | firstname        | lastname |
    | Gregory     | Peterson |
    | A | Connors |
    | Berta | lloyd  |