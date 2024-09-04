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
Feature: Validate visit add and edit input 

Background: Preconditions for testing
    Given I reset the test data
    And I launch the pet clinic application


Scenario Outline: Add visit with invalid data
    When I want to create a new visitation appointment in the application
     And I enter the new visit description "<description>"
    And I enter the new visit date "<visitdate>"
    Then I can not add a new visitation appointment
    And I should get an add visit error message "<error message>"
    Examples:

    | description        | visitdate  |  error message |
    | EMPTY              | 2021/10/05 |  EMPTY |
    | worm checkup       | EMPTY      |  EMPTY |
    | worm checkup       | SPACES     |  Date is required |

  

 
    Scenario Outline: Add visit with valid data
    When  I want to create a new visitation appointment in the application
    And I enter the new visit description "<description>"
    And I enter the new visit date "<visitdate>"
     Then I can add a new visitation appointment

    Examples:

    | description        | visitdate  | 
    | worm checkup       | 2021/10/05 |  
    | SPACES             | 2021/10/05 |  
    | .worm checkup      | 2021/10/05 |  
    | worm checkup      | .2021/10/05 |  
    | weight check #1    | 2023/6/3   | 



Scenario Outline: Edit visit with invalid data
    When I edit the visit for the pet named "Max"
    And I change the visit description "<description>"
    And I change the visit date "<visitdate>"
     Then I can not save the changes to the visitation appointment
    And I should get an edit visit error message "<error message>"
    Examples:

    | description        | visitdate  |  error message |
    | EMPTY              | 2021/10/05 |  Description is required |
    | worm checkup       | EMPTY      |  Date is required |
    | worm checkup       | SPACES     |  Date is required |

  



Scenario Outline: Edit visit with valid name
When I edit the visit for the pet named "Max"
And I change the visit description "<description>"
And I change the visit date "<visitdate>"
Then I can save the changes to the visitation appointment

Examples:

| description        | visitdate  | 
| worm checkup       | 2021/10/05 |  
| SPACES             | 2021/10/05 |  
| .worm checkup      | 2021/10/05 |  
| worm checkup      | .2021/10/05 |  
| weight check #1    | 2023/6/3   | 

