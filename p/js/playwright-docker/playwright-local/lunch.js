
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connect({
    wsEndpoint: 'http://localhost:9222/devtools/browser/<id>'
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.example.com');

  // Your automation code here

  await browser.close();
})();
