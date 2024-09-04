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
Feature: Validate Specialties add and edit input 

Background: Preconditions for testing
    Given I reset the test data
    And  I launch the pet clinic application


Scenario Outline: Add specialty with an invalid  name
    When I want to create a specialty in the application
    And I add a specialty
    And  I enter in the specialty name "<name>"
    Then I can not add a new specialty
    And I should get an add specialty error message "<error message>"
    
        Examples:
    
        | name        | error message |
        | EMPTY     | EMPTY |
        | SPACES | Name must begin with a letter or digit |
        | .Neurology  | Name must begin with a letter or digit |
        

Scenario Outline: Add specialty with valid name
When I want to create a specialty in the application
And  I add a specialty
And  I enter in the specialty name "<name>"
Then I can add a new specialty

    Examples:

    | name        |
    | Surgery     |
    | 1Cardio1logy |
    | Neurology;  |
    | Radiology.  |
    | Oncology1   |




Scenario Outline: Edit specialty with invalid name
    When  I want to edit a specialty in the application
    And I select the specialty "radiology"
    And I change the specialty name to "<name>"
    Then I can not save the changes to the specialty data 
    And I should get an edit specialty error message "<error message>"
        Examples:
    
        | name        | error message |
        | EMPTY     | Name is required |
        | SPACES | Name must begin with a letter or digit |
        | .Neurology  | Name must begin with a letter or digit |


    
    Scenario Outline: Edit specialty with valid name
    When  I want to edit a specialty in the application
    And I select the specialty "radiology"
    And I change the specialty name to "<name>"
    Then I can save the changes to the specialty data 
    
        Examples:
    
        | name        |
        | Cardiologist       |
        | Dermatologist2 |
        | Pediatrician1  |
        | Licensed Practical Nurse  |
    
    