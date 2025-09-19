const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');

Before(async function () {
  await this.openBrowser();
});

After(async function () {
  await this.closeBrowser();
});

setDefaultTimeout(15 * 1000);