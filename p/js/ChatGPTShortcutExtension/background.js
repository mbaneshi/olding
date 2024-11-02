
chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case "_open_new_chat":
      chrome.tabs.create({ url: 'https://chatgpt.com' });  // Opens a new ChatGPT tab
      break;
    case "_clear_chat":
      // Add functionality to clear chat, if supported
      console.log("Chat cleared (functionality to be implemented).");
      break;
    case "_toggle_dark_mode":
      // Add functionality to toggle dark mode, if supported
      console.log("Toggled dark/light mode (functionality to be implemented).");
      break;
    case "_show_help":
      // Display help information
      console.log("Help: Available commands - Ctrl+Alt+N, Ctrl+Alt+J, Ctrl+Alt+D, Ctrl+Alt+H, Ctrl+Alt+S");
      break;
    case "_save_conversation":
      // Add functionality to save conversation history, if supported
      console.log("Saved conversation (functionality to be implemented).");
      break;
    default:
      console.error("Unknown command:", command);
  }
});

