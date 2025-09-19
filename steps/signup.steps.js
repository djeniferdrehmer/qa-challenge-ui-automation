const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SignUpPage = require('../pages/signup.page');
let signUpPage;

Given('I open the sign-up {string} page', async function (url) {
  signUpPage = new SignUpPage(this.page);
  await signUpPage.navigate(url);
});

When('I fill {string} with a new business email', async function (field) {
    const now = new Date();
    const formatted = now.toISOString().replace(/[:.]/g, '-'); 
    this.generatedEmail = `reap-new-user+${formatted}@mailsac.com`;
    await signUpPage.fillField(field, this.generatedEmail);
});

Then('I should be on the {string} screen', async function (screenName) {
  await signUpPage.verifyOnScreen(screenName);
});

Then('I should see the confirmation text including the generated email', async function () {
  await signUpPage.verifyConfirmationText(this.generatedEmail);
});

Then('I should see a toast {string}', async function (toast) {
  await signUpPage.verifyToast(toast);
});

Then('I should remain on the sign-up form', async function () {
  await expect(this.page).toHaveURL(/sign-up/);
});

Then('the password rule {string} is failing', async function (rule) {
  await signUpPage.verifyPasswordRuleError(rule);
});

Then('no password rules should be failing', async function () {
  await signUpPage.verifyNoPasswordErrors();
});

Then('I should see required error for the password field', async function () {
  await signUpPage.verifyPasswordEmpty();
});