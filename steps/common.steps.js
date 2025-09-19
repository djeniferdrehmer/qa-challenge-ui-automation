const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I fill {string} with {string}', async function (label, value) {
  await this.page.getByLabel(label).fill(value);
});

When('I click the {string} button', async function (name) {
  await this.page.getByRole('button', { name }).click();
});

Then('I should see the error for {string}', async function (error) {
  await expect(this.page.getByText(error)).toBeVisible();
});

When('I click the {string} toggle', async function (label) {
  await this.page.getByRole('button', { name: label }).click();
});

Then('the password field should be visible', async function () {
  await expect(this.page.getByLabel('Choose a password')).toHaveAttribute('type', 'text');
});

Then('the password field should be masked', async function () {
  await expect(this.page.getByLabel('Choose a password')).toHaveAttribute('type', 'password');
});