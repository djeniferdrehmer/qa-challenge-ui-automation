@ui @signup
Feature: Ramp Sign-up

  Background:
    Given I open the sign-up "https://app.ramp.com/sign-up" page

    @success @verify_email
    Scenario: Successful sign-up form and verify email screen
      When I fill "Work email address" with a new business email
      And I fill "First name" with "John"
      And I fill "Last name" with "Doe"
      And I fill "Choose a password" with "Valid123Valid!"
      And I click the "Start application" button
      Then I should be on the "Verify your email" screen
      And I should see the confirmation text including the generated email
      When I click the "Re-send Email" button
      Then I should see a toast "Verification email re-sent."

    @required_field
    Scenario: Required field errors when submitting empty form
        When I click the "Start application" button
        Then I should see the error for "Enter an email address"
        And I should see the error for "First name is required"
        And I should see the error for "Last name is required"
        And I should see required error for the password field

    @required_field
    Scenario Outline: Required field error when a single field is missing
        When I fill "Work email address" with "<email>"
        And I fill "First name" with "<first>"
        And I fill "Last name" with "<last>"
        And I fill "Choose a password" with "<password>"
        And I click the "Start application" button
        Then I should see the error for "<expectedErrorField>"

        Examples:
            | email            | first | last | password       | expectedErrorField     |
            |                  | John  | Doe  | Valid123Valid! | Enter an email address |
            | user@company.com |       | Doe  | Valid123Valid! | First name is required |
            | user@company.com | John  |      | Valid123Valid! | Last name is required  |

    @name_validation
    Scenario Outline: Names must contain at least one letter
        When I fill "Work email address" with "user@company.com"
        And I fill "First name" with "123"
        And I fill "Last name" with "@@@"
        And I fill "Choose a password" with "Valid123Valid!"
        And I click the "Start application" button
        Then I should see the error for "First name must contain at least one letter"
        And I should see the error for "Last name must contain at least one letter"
            
    @email_validation
    Scenario Outline: Business email validation
        When I fill "Work email address" with "<email>"
        And I fill "First name" with "John"
        And I fill "Last name" with "Doe"
        And I fill "Choose a password" with "ValidPassword123!"
        And I click the "Start application" button
        Then I should see the error for "Enter a valid business email"
        And I should remain on the sign-up form

        Examples:
            | email             |
            | email@gmail.com   |
            | email@yahoo.com   |
            | email@outlook.com |
            | email@hotmail.com |
            | email@icloud.com  |
            | email@aol.com     |

    @email_validation
    Scenario Outline: Invalid email format
        When I fill "Work email address" with "<email>"
        And I fill "First name" with "John"
        And I fill "Last name" with "Doe"
        And I fill "Choose a password" with "ValidPassword123!"
        And I click the "Start application" button
        Then I should see the error for "Invalid email address"
        And I should remain on the sign-up form

        Examples:
            | email              |
            | invalid-email      |
            | @com               |
            | user@              |
            | user@.com          |
            | user@domain        |
            | user@@domain.com   |
            | .user@domain.com   |
            | üñîçødé@domain.com |
            | user..dot@ex.com   |

    @password_validation
    Scenario Outline: Password rules validation
        When I fill "Choose a password" with "<password>"
        Then the password rule "<rule>" is failing

        Examples:
            | password           | rule                           |
            | Short1!            | At least 12 characters         |
            | ABCDEFGHIJKLM1!    | At least 1 lowercase character |
            | alllowercase1!     | At least 1 uppercase character |
            | NoNumbersPassword! | At least 1 number              |
            | Passwordpassword1! | Not a commonly used password   |

    @password_validation 
    Scenario: Strong password passes all rules
        When I fill "Choose a password" with "ValidStrongPassword123!@"
        Then no password rules should be failing

    @password_validation
    Scenario: Password visibility toggle
        When I fill "Choose a password" with "#Abcdefghijk111!"
        Then the password field should be masked
        When I click the "Show password" toggle
        Then the password field should be visible
        When I click the "Hide password" toggle
        Then the password field should be masked