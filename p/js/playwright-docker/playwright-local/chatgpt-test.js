const { chromium } = require('playwright');

(async () => {
  // Connect to the existing Chrome instance with remote debugging
  console.log('Connecting to Chrome...');
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  console.log('Connected to Chrome.');

  // Get all open pages
  const pages = await browser.pages();
  let page;

  // Use the first open page if available
  if (pages.length > 0) {
    page = pages[0];
    console.log('Using existing page.');
  } else {
    console.log('No pages are open. Creating a new page.');
    page = await browser.newPage();
  }

  // Navigate to ChatGPT
  console.log('Navigating to ChatGPT...');
  await page.goto('https://chat.openai.com', { waitUntil: 'domcontentloaded' });
  console.log('Navigated to ChatGPT.');

  // Wait for the input box to be visible
  console.log('Waiting for input box to be visible...');
  await page.waitForSelector('textarea'); // Update the selector if necessary
  console.log('Input box is now visible.');

  // Type "hi" into the input box
  console.log('Typing "hi" into the input box...');
  await page.fill('textarea', 'hi'); // Update the selector if necessary
  console.log('"hi" has been typed.');

  // Wait for the send button to be visible and click it
  console.log('Waiting for send button to be visible...');
  await page.waitForSelector('button[type="submit"]'); // Update the selector if necessary
  console.log('Send button is now visible. Clicking...');
  await page.click('button[type="submit"]');
  console.log('Clicked the send button.');

  // Wait for a response (adjust timeout as needed)
  console.log('Waiting for response...');
  await page.waitForTimeout(2000); // Adjust the timeout if necessary

  // Capture a screenshot of the page after sending the message
  console.log('Taking a screenshot...');
  await page.screenshot({ path: 'chatgpt-response.png', fullPage: true });
  console.log('Screenshot taken: chatgpt-response.png');

  // Clean up and disconnect
  console.log('Disconnecting from the browser...');
  await browser.disconnect();
  console.log('Disconnected from Chrome. Script completed successfully.');
})().catch(err => {
  console.error('Error occurred:', err);
});

