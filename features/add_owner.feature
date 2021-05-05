
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


  Scenario: I do not want to add a new owner anymore
    Given I am on the page to add a new owner
    When I click on the back button
    Then I expect to go back to the page with a table of owners info



