#!/usr/bin/fish

# Set up the directory structure
set extension_dir chrome_extension
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
  const textArea = document.querySelector("textarea, input[type=\"text\"]");
  if (textArea) {
    textArea.value = text;
    const inputEvent = new Event("input", { bubbles: true });
    textArea.dispatchEvent(inputEvent);
  }
}

function clickSubmit() {
  const submitButton = document.querySelector("button[type=\"submit\"]");
  if (submitButton) {
    submitButton.click();
  }
}

function waitForResponse(callback) {
  const observer = new MutationObserver((mutations) => {
    const responseContainer = document.querySelector(".response"); // Assuming response class exists
    if (responseContainer && responseContainer.textContent.length > 0) {
      observer.disconnect();
      callback();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function processNextChapter() {
  if (currentIndex < chapters.length) {
    fillTextArea(chapters[currentIndex]);
    clickSubmit();
    waitForResponse(() => {
      currentIndex++;
      processNextChapter();
    });
  }
}

// Start the process
processNextChapter();' >$extension_dir/content.js

# Create background.js
echo 'chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("https://chatgpt.com/c/")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  }
});' >$extension_dir/background.js

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

# Create popup.js
echo 'document.getElementById("start").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "start" });
});' >$extension_dir/popup.js

# Print success message
echo "Chrome extension files created in $extension_dir"
