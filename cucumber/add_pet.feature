Feature: A user manages pets
  Every user should want a pet, after all

  Scenario: A user is a person
    Given the user is logged in
    Given the user does not have more than three pets
    When the user presses the Add Pet button
    Then the Add Pet dialog should appear