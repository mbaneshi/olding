#!/usr/bin/fish

# Set up the directory structure
set extension_dir chrome_extension2
mkdir -p $extension_dir

# Create manifest.json
echo '{
  "manifest_version": 3,
  "name": "Chapter Filler",
  "version": "1.0",
  "permissions": [
    "activeTab",
    "scripting"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["https://chatgpt.com/c/*"],
      "js": ["content.js"]
    }
  ],
  "action": {
    "default_popup": "popup.html"
  }
}' >$extension_dir/manifest.json

# Create popup.js
echo 'document.getElementById("start").addEventListener("click", () => {
  console.log("Start button clicked, sending message to background script...");
  chrome.runtime.sendMessage({ action: "start" }, () => {
    console.log("Message sent to background script.");
  });
});' >$extension_dir/popup.js

# Create background.js
echo 'chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
});' >$extension_dir/background.js

# Create content.js
echo 'let chapters = [
  "please elaborate as much as possible in chapter 1",
  "please elaborate as much as possible in chapter 2",
  "please elaborate as much as possible in chapter 3",
  "please elaborate as much as possible in chapter 4",
  "please elaborate as much as possible in chapter 5",
  "please elaborate as much as possible in chapter 6",
  "please elaborate as much as possible in chapter 7",
  "please elaborate as much as possible in chapter 8",
  "please elaborate as much as possible in chapter 9",
  "please elaborate as much as possible in chapter 10",
  "please elaborate as much as possible in chapter 11",
  "please elaborate as much as possible in chapter 12",
  "please elaborate as much as possible in chapter 13",
  "please elaborate as much as possible in chapter 14",
  "please elaborate as much as possible in appendix"
];

let currentIndex = 0;

function fillTextArea(text) {
  const textArea = document.querySelector("textarea, input[type=\\"text\\"]");
  console.log("Filling text area with:", text);
  if (textArea) {
    textArea.value = text;
    const inputEvent = new Event("input", { bubbles: true });
    textArea.dispatchEvent(inputEvent);
  } else {
    console.error("Textarea not found!");
  }
}

function clickSubmit() {
  const submitButton = document.querySelector("button[type=\\"submit\\"]");
  console.log("Clicking submit button...");
  if (submitButton) {
    submitButton.click();
  } else {
    console.error("Submit button not found!");
  }
}

function waitForResponse(callback) {
  console.log("Waiting for response...");
  const observer = new MutationObserver((mutations) => {
    const responseContainer = document.querySelector(".response");
    if (responseContainer && responseContainer.textContent.length > 0) {
      console.log("Response received:", responseContainer.textContent);
      observer.disconnect();
      callback();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function processNextChapter() {
  if (currentIndex < chapters.length) {
    console.log("Processing chapter", currentIndex + 1);
    fillTextArea(chapters[currentIndex]);
    clickSubmit();
    waitForResponse(() => {
      currentIndex++;
      processNextChapter();
    });
  } else {
    console.log("All chapters processed.");
  }
}

// Start the process
console.log("Starting chapter processing...");
processNextChapter();' >$extension_dir/content.js

# Create popup.html
echo '<!DOCTYPE html>
<html>
<head>
  <title>Chapter Filler</title>
</head>
<body>
  <h1>Start Filling Chapters</h1>
  <button id="start">Start</button>
  <script src="popup.js"></script>
</body>
</html>' >$extension_dir/popup.html

# Print success message
echo "Chrome extension files created in $extension_dir"
