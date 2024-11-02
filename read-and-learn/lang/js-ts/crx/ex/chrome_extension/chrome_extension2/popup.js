document.getElementById("start").addEventListener("click", () => {
  console.log("Start button clicked, sending message to background script...");
  chrome.runtime.sendMessage({ action: "start" }, () => {
    console.log("Message sent to background script.");
  });
});
