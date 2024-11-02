The `chrome.runtime` API is a standalone object provided by Chrome Extensions, and you can interact with it by attaching event listeners, methods, and accessing properties. However, `chrome.runtime` itself cannot have custom objects attached directly to it.

Here are the main types of items that can "attach" to `chrome.runtime`, meaning you can interact with them through `chrome.runtime`:

### 1. **Event Listeners**

Event listeners can be attached to `chrome.runtime` to listen for specific extension lifecycle events. For example:

- **`chrome.runtime.onInstalled`**: Listen for when the extension is installed or updated.
- **`chrome.runtime.onMessage`**: Listen for messages sent from other extension parts (e.g., content scripts or popup scripts).
- **`chrome.runtime.onSuspend`**: Listen for when the background page is about to be unloaded.
- **`chrome.runtime.onUpdateAvailable`**: Listen for updates available for the extension.
- **`chrome.runtime.onStartup`**: Listen when the browser starts.

Example of attaching an event listener:

```js
chrome.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed or updated:", details.reason);
});
```

### 2. **Methods**

You can invoke methods provided by the `chrome.runtime` object to perform various actions, such as sending messages, getting the extension's information, or reloading the extension:

- **`chrome.runtime.sendMessage()`**: Send a message to another part of the extension (e.g., background or popup script).
- **`chrome.runtime.getManifest()`**: Retrieve the content of the `manifest.json` file.
- **`chrome.runtime.getURL()`**: Get the absolute URL to a resource within the extension (useful for referencing images or files).
- **`chrome.runtime.connect()`**: Open a long-lived connection to another part of the extension (e.g., between content script and background page).
- **`chrome.runtime.reload()`**: Reload the extension programmatically.

Example of invoking a method:

```js
chrome.runtime.sendMessage({ action: "fetchData" }, (response) => {
  console.log("Response:", response);
});
```

### 3. **Properties**

You can access several properties attached to `chrome.runtime` to get information about the extension:

- **`chrome.runtime.id`**: The unique identifier for the extension.
- **`chrome.runtime.lastError`**: Contains details of the last runtime error, especially for handling errors during asynchronous API calls.
- **`chrome.runtime.getBackgroundPage()`**: Retrieves the background page window object (if applicable).

Example of accessing a property:

```js
console.log("Extension ID:", chrome.runtime.id);
```

### 4. **Port Object (from `chrome.runtime.connect`)**

You can establish a long-lived connection between different parts of the extension using `chrome.runtime.connect()`. The returned object (`Port`) can be used to send and receive messages over this connection.

Example of using `chrome.runtime.connect()`:

```js
const port = chrome.runtime.connect({ name: "myChannel" });

port.postMessage({ action: "greet" });

port.onMessage.addListener((msg) => {
  console.log("Message from background script:", msg);
});
```

---

### Summary:

While you cannot attach custom objects directly to `chrome.runtime`, you can interact with it through:

1. **Event Listeners**: For handling lifecycle events (e.g., `onInstalled`, `onMessage`).
2. **Methods**: To communicate between extension parts or retrieve extension information (e.g., `sendMessage()`, `getManifest()`).
3. **Properties**: For getting specific information or handling errors (e.g., `chrome.runtime.id`, `chrome.runtime.lastError`).
4. **Port Object**: Establish long-lived communication between scripts via `chrome.runtime.connect()`.

```bash
nvim chrome_runtime_attached_objects.md
```
