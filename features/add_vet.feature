Feature: Add a new vet
    As a clinic manager
    I should add new veterinarians to my clinic

    # Background: I have a clinic with these specialties
    #     Given the following specialities:
    #         | specialities |
    #         | radiology    |
    #         | surgery      |
    #         | dentistry    |

    #     And I am on the Add New Veterinarian page
    Scenario Outline: Add new veterinarians with specializations
        Given I am on the Add New Veterinarian page
        When I type in <First Name> for First Name
        And I type in <Last Name> for Last Name
        And I select <Specialty> from the Type dropdown
        Then I should be able to click Save Vet
        And I should see "Name" added to the list of veterinarians

        Examples:
            | First Name | Last Name  | Specialty | Name               |
            | Wuxin      | Zeng       | radiology | Wuxin Zeng         |
            | Spencer    | Stolworthy | surgery   | Spencer Stolworthy |