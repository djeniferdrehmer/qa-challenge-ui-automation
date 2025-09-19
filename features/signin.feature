@ui @signin
Feature: Ramp Sign-in

  Background:
    Given I open the sign-in "https://app.ramp.com/sign-in" page

    @required_field
    Scenario: Submitting empty email shows required error
        When I click the "Continue" button
        Then I should see required error for the email field
        And I should remain on the sign-in page

    @required_field
    Scenario: Empty password shows required error
        When I fill "Email address" with "user@company.com"
        And I click the "Continue" button
        And I click the "Sign in to Ramp" button
        Then I should see error for the empty password

    @wrong_credential
    Scenario: Invalid password shows an authentication error
        When I fill "Email address" with "user@company.com"
        And I click the "Continue" button
        And I fill "Password" with "wrongPassword!"
        And I click the "Sign in to Ramp" button
        Then I should see an authentication error message

    @email_validation
    Scenario Outline: Invalid email format
        When I fill "Email address" with "<email>"
        And I click the "Continue" button
        Then I should see the error for "Invalid email address"
        And I should remain on the sign-in page

        Examples:
        | email            |
        | user@domain      |
        | .user@domain.com |
        | user..dot@ex.com |
        
    @switch_email
    Scenario: Switch to a different email from password step
        When I fill "Email address" with "user@company.com"
        And I click the "Continue" button
        And I click the "Use a different email" button
        Then I should return to the email entry step