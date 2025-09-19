const { expect } = require('@playwright/test');

class SignInPage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async fillField(label, value) {
    await this.page.getByLabel(label).fill(value);
  }

  async clickButton(name) {
    await this.page.getByRole('button', { name, exact: true }).click();
  }

  async verifyEmailEmpty() {
    const email = this.page.getByLabel(/email address/i);
    await expect(email).toHaveAttribute('aria-invalid', /true/i);
  }

  async verifyPasswordEmpty() {
    const password = this.page.getByLabel(/password/i);
    await expect(password).toHaveAttribute('aria-invalid', /true/i);
  }  

  async verifyAuthError() {
    await expect(this.page.getByText(/we do not recognize this email password combination/i)).toBeVisible();
  }  

  async verifyErrors(error) {
    await expect(this.page.locator(`text=${error}`)).toBeVisible();
  }  

  async verifyOnEmailEntryStep() {
    await expect(this.page.getByRole('button', { name: /continue/i })).toBeVisible();
  }  

}

module.exports = SignInPage;