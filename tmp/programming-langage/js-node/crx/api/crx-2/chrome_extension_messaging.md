### Messaging in Chrome Extensions

Messaging in Chrome Extensions allows different components of an extension (such as background scripts, content scripts, popup scripts, and options pages) to communicate with each other. This system is essential for passing data and triggering actions between the isolated environments within the extension.

There are two main types of messaging:

1. **One-time requests (Short-lived messaging):**
   This is useful for sending a message and waiting for a response only once.

2. **Persistent connections (Long-lived messaging):**
   This allows for continuous communication between different parts of the extension.

### 1. **One-time Requests (Short-lived Messaging)**

This type of messaging is used when you need to send a message from one part of your extension (e.g., content script) to another (e.g., background script) and get a response in return.

#### How it works:

- **`chrome.runtime.sendMessage()`**: Sends a message to the background script or other parts of the extension.
- **`chrome.runtime.onMessage.addListener()`**: Listens for incoming messages and allows responding to them.

#### Example:

##### Sending a message from a content script to the background script:

**Content Script:**

```js
chrome.runtime.sendMessage({ action: "getData" }, (response) => {
  console.log("Received response:", response.data);
});
```

**Background Script:**

```js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getData") {
    // Respond with some data
    sendResponse({ data: "Here is the data from the background script" });
  }
  // Returning true allows asynchronous response
  return true;
});
```

In this scenario:

- The content script sends a message containing an action `"getData"`.
- The background script listens for the message, processes it, and sends back a response using the `sendResponse()` function.

#### Messaging between extensions:

Chrome also allows messaging between different Chrome Extensions. You can use `chrome.runtime.sendMessage()` to send messages to another extension if you know its extension ID.

```js
chrome.runtime.sendMessage(
  "other_extension_id",
  { action: "request" },
  (response) => {
    console.log(response);
  },
);
```

### 2. **Persistent Connections (Long-lived Messaging)**

This type of messaging establishes a persistent connection that allows both sides (e.g., content script and background script) to exchange multiple messages continuously without needing to reopen the communication channel each time.

#### How it works:

- **`chrome.runtime.connect()`**: Opens a persistent connection.
- **`chrome.runtime.onConnect.addListener()`**: Listens for incoming connections from other parts of the extension.
- **`port.postMessage()`**: Sends a message over the established connection.
- **`port.onMessage.addListener()`**: Listens for incoming messages on the persistent connection.

#### Example:

##### Establishing a persistent connection between a content script and a background script:

**Content Script:**

```js
const port = chrome.runtime.connect({ name: "content-background-connection" });

port.postMessage({ action: "ping" });

port.onMessage.addListener((response) => {
  console.log("Response from background:", response);
});
```

**Background Script:**

```js
chrome.runtime.onConnect.addListener((port) => {
  console.log("Port name:", port.name);

  port.onMessage.addListener((message) => {
    if (message.action === "ping") {
      console.log("Ping received from content script.");
      port.postMessage({ response: "pong" });
    }
  });
});
```

In this case:

- The content script establishes a persistent connection to the background script using `chrome.runtime.connect()`.
- The background script listens for the connection using `chrome.runtime.onConnect.addListener()`.
- The content script sends a message `"ping"` over the connection using `port.postMessage()`.
- The background script listens for messages on the connection and replies with `"pong"`.

### 3. **Cross-origin Messaging**

Chrome extensions support messaging across different contexts (e.g., between the content script and the background script). However, communication with web pages (non-extension scripts) must use the `chrome.runtime.sendMessage()` or `chrome.tabs.sendMessage()`.

For example, to send a message from the background script to a content script running on a specific tab:

```js
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(
    tabs[0].id,
    { action: "fetchContent" },
    (response) => {
      console.log(response);
    },
  );
});
```

### 4. **Error Handling**

When using `chrome.runtime.sendMessage()` or `chrome.runtime.connect()`, it’s important to handle potential errors. If something goes wrong (e.g., the target does not respond), `chrome.runtime.lastError` will contain an error message.

```js
chrome.runtime.sendMessage({ action: "doSomething" }, (response) => {
  if (chrome.runtime.lastError) {
    console.error("Error:", chrome.runtime.lastError.message);
  } else {
    console.log(response);
  }
});
```

---

### Summary of Messaging Types:

1. **One-time Messaging (Short-lived)**

   - Use `chrome.runtime.sendMessage()` to send a message and `chrome.runtime.onMessage.addListener()` to receive it.
   - Great for one-off requests that expect a single response.

2. **Persistent Messaging (Long-lived)**
   - Use `chrome.runtime.connect()` to establish a long-lived connection and `port.postMessage()` to exchange messages over this connection.
   - Use `chrome.runtime.onConnect.addListener()` to handle connection requests.

Messaging is the primary way different parts of a Chrome Extension communicate, allowing for flexibility in how you design interactions between scripts.

```bash
nvim chrome_extension_messaging.md
```
