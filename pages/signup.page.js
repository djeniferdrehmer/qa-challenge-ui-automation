const { expect } = require('@playwright/test');

class SignUpPage {
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

  async verifyOnScreen(screenName) {
    if (screenName === "Verify your email") {
      await expect(this.page.getByRole("heading", { name: /Verify your email/i })).toBeVisible({ timeout: 30000 });
    }
  }

  async verifyConfirmationText(email) {
    await expect(this.page.locator(`text=${email}`)).toBeVisible();
  }

  async verifyToast(message) {
    const toast = this.page.locator('[data-test-id="RyuToast-title"]');
    await toast.waitFor({ state: "visible"});
    await expect(toast).toHaveText(message);
  }

  async verifyErrors(error) {
    await expect(this.page.locator(`text=${error}`)).toBeVisible();
  }

  async verifyPasswordEmpty() {
    const password = this.page.getByLabel(/choose a password/i);
    await expect(password).toHaveAttribute('aria-invalid', /true/i);
  }

  async verifyPasswordRuleError(ruleText) {
    const rule = this.page.getByText(ruleText, { exact: true });
    await expect(rule).toBeVisible();
    await expect(rule).toHaveClass(/RyuTextAsRoot--destructiveColor/);
    await expect(rule.locator('svg')).toHaveClass(/RyuIconSvg--x-square/);
  }

  async verifyNoPasswordErrors() {
    const password = this.page.getByLabel(/choose a password/i);
    const describedBy = await password.getAttribute('aria-describedby');
    const rules = this.page.locator(`[id="${describedBy}"]`);
    await expect(rules.locator('.RyuTextAsRoot--destructiveColor')).toHaveCount(0);
    await expect(rules.locator('.RyuIconSvg--x-square')).toHaveCount(0);
  }

  async verifyPasswordMasked() {
    const password = this.page.getByLabel(/choose a password/i);
    await expect(password).toHaveAttribute('type', 'password');
  }

  async verifyPasswordVisible() {
    const password = this.page.getByLabel(/choose a password/i);
    await expect(password).toHaveAttribute('type', 'text');
  }

  async clickPasswordToggle(label) {
    await this.page.getByRole('button', { name: label, exact: true }).click();
  }

}

module.exports = SignUpPage;