chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received in background script:", request.action);
  if (request.action === "start") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log("Tabs query result:", tabs);
      if (tabs.length > 0 && tabs[0].url.includes("https://chatgpt.com/c/")) {
        console.log("Injecting content script...");
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["content.js"]
        }, () => {
          console.log("Content script injected successfully.");
        });
      } else {
        console.error("No valid tab or wrong URL.");
      }
    });
  }
});
