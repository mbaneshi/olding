
const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    // Attach to the running instance of Chrome
    const browser = await chromium.connectOverCDP('http://localhost:9222');

    const context = await browser.newContext({
        // Enable network logging
        recordVideo: { dir: 'videos/', size: { width: 1280, height: 720 } }
    });

    const page = await context.newPage();

    // Enable detailed logging
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    
    // Prepare to log requests and responses
    const logs = [];

    page.on('request', request => {
        const logEntry = {
            type: 'request',
            url: request.url(),
            method: request.method(),
            headers: request.headers(),
            postData: request.postData(),
        };
        logs.push(logEntry);
        console.log('Request:', logEntry);
    });

    page.on('response', async response => {
        const logEntry = {
            type: 'response',
            url: response.url(),
            status: response.status(),
            headers: response.headers(),
            body: await response.body(), // Capture response body
        };
        logs.push(logEntry);
        console.log('Response:', logEntry);
    });

    // Navigate to ChatGPT
    await page.goto('https://chat.openai.com/');

    // Wait for the input element to be visible and fill it
    const inputSelector = 'textarea[placeholder="Send a message..."]';
    await page.waitForSelector(inputSelector);
    await page.fill(inputSelector, 'hi');

    // Submit the message
    await page.keyboard.press('Enter');

    // Wait for the response
    await page.waitForSelector('.message.response', { timeout: 30000 }); // Adjust the selector as needed

    // Get the last response message
    const response = await page.locator('.message.response').last().innerText();
    console.log('ChatGPT Response:', response);

    // Save logs to a file
    fs.writeFileSync('network_logs.json', JSON.stringify(logs, null, 2));

    // Close the browser
    await browser.close();
})();
