const { Given, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SignInPage = require('../pages/signin.page');
let signInPage;

Given('I open the sign-in {string} page', async function (url) {
  signInPage = new SignInPage(this.page);
  await signInPage.navigate(url);
});

Then('I should see required error for the email field', async function () {
  await signInPage.verifyEmailEmpty();
});

Then('I should remain on the sign-in page', async function () {
  await expect(this.page).toHaveURL(/sign-in/);
});

Then('I should see error for the empty password', async function () {
  await signInPage.verifyPasswordEmpty();
});

Then('I should see an authentication error message', async function () {
  await signInPage.verifyAuthError();
});

Then('I should return to the email entry step', async function () {
  await signInPage.verifyOnEmailEntryStep();
});

Then('I should be on the Reset password page', async function () {
  await expect(this.page).toHaveURL(/forgot-password/);
});