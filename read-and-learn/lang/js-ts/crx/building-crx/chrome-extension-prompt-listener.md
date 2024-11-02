To achieve this, we will define a workflow where:

1. **Text Input**: We will create a text input for the user to enter the initial prompt (e.g., "Bring outline of a book about healthy life"). This text will be fed into the chat system.
2. **Listening for Page Population**: The content script will monitor the page and detect when the response (e.g., the outline) has been fully loaded.
3. **Processing Each Entry**: Once the page is populated with the outline, the script will loop through each entry (chapter or section) and automatically send the next entry to the input area, waiting for the response. It will then send the next entry after the previous one has been fully processed.

4. **Automation for Next Entry**: The script will detect when the response for one entry is fully populated, and then it will feed the next entry from the outline into the chat, simulating the process of manual interaction with a button click.

### Step-by-Step Content Script with Event Listener and Text Input

#### 1. Create an Input Box for Initial Prompt

We will inject an input box for the user to provide the initial prompt. This will allow manual interaction with the chat.

```javascript
// Function to inject an input box for user prompts
function injectPromptInput() {
  const inputBox = document.createElement("input");
  inputBox.id = "prompt-input-box";
  inputBox.placeholder = "Enter your prompt here...";
  inputBox.style = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px;
        width: 300px;
        font-size: 16px;
        border-radius: 5px;
        border: 1px solid #ccc;
        z-index: 1000;
    `;

  document.body.appendChild(inputBox);

  return inputBox;
}

// Example usage: Inject input box
const userPromptInput = injectPromptInput();
```

This input box will appear in the top-right corner of the page. The user can enter the initial prompt for the outline.

#### 2. Listen for Button Click to Send Initial Prompt

We can associate this input box with the button that sends the message (for example, the "Submit" button).

```javascript
// Function to send the initial user prompt to the chat
function handleSendInitialPrompt() {
  const initialPrompt = userPromptInput.value; // Get value from the input box
  if (initialPrompt) {
    feedPrompt("#prompt-input", initialPrompt); // Feed it to the chat
    clickButton("#submit-button"); // Simulate button click to send
    console.log(`Initial prompt sent: "${initialPrompt}"`);
  } else {
    console.log("Please enter a prompt.");
  }
}

// Add an event listener for when the user presses Enter in the input box
userPromptInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSendInitialPrompt(); // Send the initial prompt when Enter is pressed
  }
});
```

This will send the initial prompt to the chat when the user presses **Enter** after typing their request.

#### 3. Monitor Page Population for Outline Response

Once the initial prompt is sent (e.g., to generate the book outline), we will use a `MutationObserver` to monitor the page and detect when the response (outline) is fully populated. This can be done by checking when specific elements (e.g., paragraph tags or list items) appear in the DOM.

```javascript
// Function to observe when the chat response is fully populated
function observeChatResponse(outlineSelector, callback) {
  const observer = new MutationObserver((mutationsList, observer) => {
    const outlineElement = document.querySelector(outlineSelector);
    if (outlineElement) {
      console.log("Chat response populated with outline.");
      observer.disconnect(); // Stop observing once the outline is detected
      callback(outlineElement); // Call the callback with the populated outline
    }
  });

  // Start observing the body for changes
  observer.observe(document.body, { childList: true, subtree: true });
}

// Example usage: Start observing the page for the outline
observeChatResponse(".chat-response-outline", (outlineElement) => {
  // Extract entries from the outline once it appears
  const entries = Array.from(outlineElement.querySelectorAll("li")).map(
    (li) => li.innerText,
  );
  console.log("Entries extracted from the outline:", entries);

  // Process each entry
  processOutlineEntries(entries);
});
```

This function will listen for when the page (or chat) gets populated with the outline, and then it will extract the entries (like chapters or sections).

#### 4. Process Each Outline Entry

Once the outline is detected, we will iterate over the entries (each chapter or section) and send them one by one to the chat. After sending each entry, the script will wait for the response to fully load before sending the next one.

```javascript
// Function to process each outline entry one by one
function processOutlineEntries(entries) {
  let currentIndex = 0;

  // Function to send the next entry
  function sendNextEntry() {
    if (currentIndex < entries.length) {
      const currentEntry = entries[currentIndex];
      console.log(`Sending entry: ${currentEntry}`);
      feedPrompt("#prompt-input", currentEntry); // Feed the entry into the chat
      clickButton("#submit-button"); // Simulate the button click to send
      currentIndex++; // Move to the next entry
    } else {
      console.log("All entries have been processed.");
    }
  }

  // Function to observe the chat for when an entry response is fully populated
  function observeEntryResponse() {
    observeChatResponse(".chat-response", () => {
      console.log("Response for the current entry has been populated.");
      sendNextEntry(); // Send the next entry once the previous response is ready
    });
  }

  // Start processing the first entry
  sendNextEntry();
  observeEntryResponse(); // Start observing for the response to the first entry
}
```

### How This Works:

1. **Initial Prompt**: The user enters the first prompt (e.g., "Bring an outline of a book about healthy life") into the injected input box, and it sends that to the chat.
2. **Listening for Outline**: The content script monitors the chat and detects when the outline is fully populated (using `MutationObserver`).

3. **Processing Entries**: Once the outline is detected, the script extracts all the entries (e.g., chapters) from the outline and sends them one by one.

4. **Waiting for Responses**: For each entry, the script waits for the response to be fully populated before moving to the next entry, simulating manual interaction.

### Full Content Script Example:

```javascript
// Inject an input box for user prompts
function injectPromptInput() {
  const inputBox = document.createElement("input");
  inputBox.id = "prompt-input-box";
  inputBox.placeholder = "Enter your prompt here...";
  inputBox.style = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px;
        width: 300px;
        font-size: 16px;
        border-radius: 5px;
        border: 1px solid #ccc;
        z-index: 1000;
    `;
  document.body.appendChild(inputBox);
  return inputBox;
}

// Function to send the initial user prompt to the chat
function handleSendInitialPrompt() {
  const initialPrompt = userPromptInput.value; // Get value from the input box
  if (initialPrompt) {
    feedPrompt("#prompt-input", initialPrompt); // Feed it to the chat
    clickButton("#submit-button"); // Simulate button click to send
    console.log(`Initial prompt sent: "${initialPrompt}"`);
  } else {
    console.log("Please enter a prompt.");
  }
}

// Function to feed a prompt into an input field
function feedPrompt(inputSelector, promptText) {
  const inputElement = document.querySelector(inputSelector);
  if (inputElement) {
    inputElement.value = promptText;
    console.log(`Prompt "${promptText}" has been entered.`);
  } else {
    console.log(`Input field with selector "${inputSelector}" not found.`);
  }
}

// Function to click a button
function clickButton(buttonSelector) {
  const button = document.querySelector(buttonSelector);
  if (button) {
    button.click();
    console.log(`Button with selector "${buttonSelector}" clicked.`);
  } else {
    console.log(`Button with selector "${buttonSelector}" not found.`);
  }
}

// Function to observe when the chat response is fully populated
function observeChatResponse(outlineSelector, callback) {
  const observer = new MutationObserver((mutationsList, observer) => {
    const outlineElement = document.querySelector(outlineSelector);
    if (outlineElement) {
      console.log("Chat response populated with outline.");
      observer.disconnect(); // Stop observing once the outline is detected
      callback(outlineElement); // Call the callback with the populated outline
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Function to process each outline entry one by one
function processOutlineEntries(entries) {
  let currentIndex = 0;

  // Function to send the next entry
  function sendNextEntry() {
    if (currentIndex < entries.length) {
      const currentEntry = entries[currentIndex];
      console.log(`Sending entry: ${currentEntry}`);
      feedPrompt("#prompt-input", currentEntry);
      clickButton("#submit-button");
      currentIndex++;
    } else {
      console.log("All entries have been processed.");
    }
  }

  // Observe response after each entry
  function observeEntryResponse() {
    observeChatResponse(".chat-response", () => {
      console.log("Response for the current entry has been populated.");
      sendNextEntry();
    });
  }

  // Start processing the first entry
  sendNextEntry();
  observeEntryResponse();
}

// Inject input and handle prompt submission
const userPromptInput = injectPromptInput();
userPromptInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSendInitialPrompt();
  }
});
```

---

#### Timestamp:

- **2024-10-15 15:24:00**

#### Summary:

- Added a text input box, automated prompt feeding, response population detection, and outlined how to process entries step by step.

#### Content length:

- **Number of lines**: 103
- **Characters**: 5,731

```bash
nvim chrome-extension-prompt-listener.md
```
