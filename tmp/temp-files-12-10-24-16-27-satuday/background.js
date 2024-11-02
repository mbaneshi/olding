chrome.commands.onCommand.addListener((command) => {
  if (command === "_execute_action") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: startNewChat
      });
    });
  }
});

function startNewChat() {
  // Check if you're on the ChatGPT page
  if (window.location.href.includes("chatgpt.com")) {
    // Example logic to start a new chat (it might vary depending on how the page works)
    const newChatButton = document.querySelector(".new-chat-button"); // replace with actual selector
    if (newChatButton) {
      newChatButton.click();
    } else {
      console.log("New chat button not found!");
    }
  }
}

