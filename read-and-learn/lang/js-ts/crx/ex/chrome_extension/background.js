chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("https://chatgpt.com/c/")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  }
});
