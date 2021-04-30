
Feature: Add New Owner
  I want my pet clinic to serve multiple clients.

  Scenario: I provide a non-numeric telephone number
    Given I am on the add owner page
    And The input for Telephone is not a series of numbers
    When I try to click on Add Owner
    Then I expect the Add Owner button to not be clickable

  Scenario: I pass all the field validations
    Given I provide the right inputs for all the fields
    When I click add new owner
    Then I expect a new owner is added to the list of owners

  Scenario: I provide an invalid first name
    Given I provide valid inputs to all fields
    When I change my first name to be 1 character
    Then I expect to see a big "x" next to first name and an error message

  Scenario: I leave the city field blank
    Given I provide valid inputs to all fields
    When I deleted the city input
    And when I proceed with the city field blank
    Then I expect to see a big "x" and an error message telling me the field is required


  Scenario: I do not want to add a new owner anymore
    Given I am on the page to add a new owner
    When I click on the back button
    Then I expect to go back to the page with a table of owners info



