To inspect and get all the available content of the `chrome.runtime` object (such as its methods, properties, and events), you can programmatically explore it using JavaScript.

In a Chrome Extension environment (like the background script, popup script, or content script), you can list all the available properties and methods by iterating over the `chrome.runtime` object using `console.log()` or `Object.keys()` and `Object.getOwnPropertyNames()`.

### Code to Inspect `chrome.runtime`:

You can run this code in the Developer Console of a Chrome Extension or in a script that is part of your extension (such as a background script):

```js
console.log("All available properties and methods of chrome.runtime:");
console.log(Object.getOwnPropertyNames(chrome.runtime));

// Alternatively, you can use:
Object.getOwnPropertyNames(chrome.runtime).forEach((prop) => {
  console.log(`${prop}:`, chrome.runtime[prop]);
});
```

### What You Will See:

When you run this code, you'll get a list of all the properties and methods that are part of `chrome.runtime`. The typical output includes:

1. **Methods**:
   - `chrome.runtime.connect()`
   - `chrome.runtime.getBackgroundPage()`
   - `chrome.runtime.getManifest()`
   - `chrome.runtime.getURL()`
   - `chrome.runtime.sendMessage()`
   - `chrome.runtime.reload()`
   - `chrome.runtime.setUninstallURL()`
2. **Properties**:

   - `chrome.runtime.id`
   - `chrome.runtime.lastError`

3. **Events**:
   - `chrome.runtime.onConnect`
   - `chrome.runtime.onInstalled`
   - `chrome.runtime.onMessage`
   - `chrome.runtime.onSuspend`
   - `chrome.runtime.onStartup`
   - `chrome.runtime.onUpdateAvailable`

This will give you the full listing of what is attached to `chrome.runtime`, including all methods, properties, and event listeners available to your extension.

---

### Example Output:

The output from the above code would look like:

```
All available properties and methods of chrome.runtime:
[
  "id",
  "connect",
  "getBackgroundPage",
  "getManifest",
  "getURL",
  "sendMessage",
  "reload",
  "setUninstallURL",
  "onConnect",
  "onInstalled",
  "onMessage",
  "onSuspend",
  "onStartup",
  "onUpdateAvailable",
  "lastError"
]
```

You can further explore each property or method by logging it individually if needed:

```js
console.log(chrome.runtime.id); // Logs the extension ID
```

This approach allows you to dynamically inspect the `chrome.runtime` object and see what functionality is available in your specific environment.

```bash
nvim chrome_runtime_exploration.md
```
