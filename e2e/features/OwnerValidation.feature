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
Feature: Validate pet owner add and edit input 

Background: Preconditions for testing
    Given I reset the test data
    And  I launch the pet clinic application


#######
# Add funtionality
#######

Scenario Outline: Try to add pet owner with invalid data
    When I want to create a new pet owner in the application
    And I enter the pet owner with first name "<firstname>" last name "<lastname>" address "<address>" city "<city>" telephone "<telephone>"
    Then I can not add a new owner
    And I should get an add pet owner error message "<error message>"
    
    Examples:

    | firstname   | lastname | address | city | telephone | error message |
    | EMPTY | Hofhut |  1234 Fake Str|Springfield | 1234567890 | EMPTY |
    | Karl     | EMPTY |  1234 Fake Str|Springfield | 1234567890 | EMPTY |
    | Karl     | Hofhut | EMPTY |Springfield | 1234567890 | EMPTY |
    | Karl     | Hofhut |  1234 Fake Str| EMPTY | 1234567890 | EMPTY |
    | Karl     | Hofhut |  1234 Fake Str| Springfield | EMPTY | EMPTY |
    | SPACES     | Hofhut |  1234 Fake Str|Springfield | 1234567890 | First name must consist of letters only|
    | Karl     | SPACES |  1234 Fake Str|Springfield | 1234567890 | Last name must consist of letters only |
    | Karl     | Hofhut |  1234 Fake Str| Springfield | SPACES | Phone number only accept digits |
    | .Karl     | Hofhut |  1234 Fake Str|Springfield | 1234567890 | First name must consist of letters only |
    | Karl     | .Hofhut |  1234 Fake Str|Springfield | 1234567890 | Last name must consist of letters only |




Scenario Outline: Add pet owner with a  wrong telephone number
    When I want to create a new pet owner in the application
    And I enter the pet owner with first name "Karl" last name "Hofhut" address "1234 Fake St" city "Springfield" telephone "<telephone>"
    Then I can not add a new owner
    And I should get an add pet owner error message "Phone number only accept digits"

Examples:
    | telephone |
    | -1234567890 |
    | .12345678901 |
    | #123456789012 |
    | Hugo |

Scenario Outline: Add pet owner with valid data
    When I want to create a new pet owner in the application
    And I enter the pet owner with first name "<firstname>" last name "<lastname>" address "<address>" city "<city>" telephone "<telephone>"
    Then I can add a new owner

    Examples:

    | firstname   | lastname | address | city | telephone |
    | Gregory     | Peterson |  Hauptstrasse 6 | München | 0049800394892 |
    | A | Connors | 1234 Main St | New York | 1234567890 |
    | Berta | lloyd  |  1234 Main St | Springfield | 1234567890 |
    | Berta | lloyd  |  SPACES | Springfield | 1234567890 |
    | Berta | lloyd  |  1234 Main St | SPACES | 1234567890 |
    | Berta | lloyd  |  .1234 Main St | Springfield | 1234567890 |
    | Berta | lloyd  |  1234 Main St | .Springfield | 1234567890 |
 

    #######
    # Edit funtionality
    #######

Scenario Outline: Edit pet owner with invalid data
    When I edit the pet owner with the name "George Franklin"
    And I enter the pet owner with first name "<firstname>" last name "<lastname>" address "<address>" city "<city>" telephone "<telephone>"
    Then I can not save the changes to the owner data
    And I should get an edit pet owner error message "<error message>"
 
 Examples:
 
 | firstname   | lastname | address | city | telephone |error message |
 | EMPTY       | Franklin |  110 W. Liberty St. | Madison | 6085551023 | First name is required|
 | George      | EMPTY |  110 W. Liberty St. | Madison | 6085551023 | Last name is required |
 | George     | Franklin |  EMPTY  | Madison | 6085551023 | Address is required|
 | George     | Franklin |  110 W. Liberty St. | EMPTY | 6085551023 | City is required|
 | George     | Franklin |  110 W. Liberty St. | Madison | EMPTY | Phone number is required|
 | SPACES     | Franklin |  110 W. Liberty St. | Madison | 6085551023 | First name must consist of letters only|
 | George     | SPACES |  110 W. Liberty St. | Madison | 6085551023 | Last name must consist of letters only|
 | George     | Franklin |  110 W. Liberty St. | Madison | SPACES | Phone number only accept digits|
 | .George     | Franklin |  110 W. Liberty St. | Madison | 6085551023 | First name must consist of letters only |
 | George     | .Franklin |  110 W. Liberty St. | Madison | 6085551023 | Last name must consist of letters only |





Scenario Outline: Edit pet owner with valid data
   When I edit the pet owner with the name "George Franklin"
   And I enter the pet owner with first name "<firstname>" last name "<lastname>" address "<address>" city "<city>" telephone "<telephone>"
   Then I can save the changes to the owner data

Examples:

| firstname   | lastname | address | city | telephone |
| Gregory     | Peterson |  Hauptstrasse 6 | München | 0049800394892 |
| A | Connors | 1234 Main St | New York | 1234567890 |
| Berta | lloyd  |  1234 Main St | Springfield | 1234567890 |
| George     | Franklin |  SPACES | Madison | 6085551023 |
| George     | Franklin |  110 W. Liberty St. | SPACES | 6085551023 |