
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connect({
    wsEndpoint: 'ws://127.0.0.1:9222/devtools/browser/1f2c196e-eb4a-4405-b45c-b29141697f7c'
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.example.com');

  // Your automation code here
  console.log(await page.title()); // Example: Print the page title

  await browser.close();
})();
