### 2. **`chrome.tabs` API**

The `chrome.tabs` API allows Chrome extensions to interact with the browser's tab system. This includes querying, creating, updating, removing, or moving tabs, as well as injecting scripts or listening for tab events.

Here's a deep dive into the various features and methods available in the `chrome.tabs` API, complete with usage examples and TypeScript-style definitions for clarity.

---

### Key Methods and Their Parameters

---

#### 1. **`chrome.tabs.query()`**

**Purpose:**  
Allows you to retrieve information about open tabs that match the given criteria. This is useful for obtaining the currently active tab, filtering tabs by URL, or listing all tabs in a window.

**Method Signature:**

```js
chrome.tabs.query(queryInfo, callback);
```

**Parameters:**

- **`queryInfo`** (`object`, required): The properties of the tabs you want to filter. Example fields include:
  - **`active`** (`boolean`): Whether the tab is the active tab in its window.
  - **`currentWindow`** (`boolean`): Whether the tab is in the current window.
  - **`url`** (`string` or `array`, optional): A URL pattern or patterns to match.
- **`callback`** (`function`, required): A function that is called with the array of `Tab` objects that match the query.

**Type Definition** (TypeScript):

```ts
query(
  queryInfo: { active?: boolean, currentWindow?: boolean, url?: string | string[] },
  callback: (tabs: chrome.tabs.Tab[]) => void
): void;
```

**Example:**

```js
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  console.log("Current tab URL:", tabs[0].url);
});
```

---

#### 2. **`chrome.tabs.create()`**

**Purpose:**  
Creates a new tab in the browser with a given URL or options, allowing your extension to open new web pages programmatically.

**Method Signature:**

```js
chrome.tabs.create(createProperties, callback);
```

**Parameters:**

- **`createProperties`** (`object`, required): The properties for the new tab. Example fields include:

  - **`url`** (`string`, optional): The URL to open in the new tab.
  - **`active`** (`boolean`, optional): Whether to make the new tab active or not.
  - **`index`** (`number`, optional): The position of the new tab.

- **`callback`** (`function`, optional): A function that is called with the newly created `Tab` object.

**Type Definition** (TypeScript):

```ts
create(
  createProperties: { url?: string, active?: boolean, index?: number },
  callback?: (tab: chrome.tabs.Tab) => void
): void;
```

**Example:**

```js
chrome.tabs.create({ url: "https://example.com", active: true }, (newTab) => {
  console.log("Created new tab with ID:", newTab.id);
});
```

---

#### 3. **`chrome.tabs.update()`**

**Purpose:**  
Updates the properties of an existing tab, such as changing its URL or reloading the page.

**Method Signature:**

```js
chrome.tabs.update(tabId, updateProperties, callback);
```

**Parameters:**

- **`tabId`** (`number`, optional): The ID of the tab to update. If omitted, the currently active tab in the current window is used.
- **`updateProperties`** (`object`, required): The properties to update. Example fields include:
  - **`url`** (`string`, optional): Navigates the tab to the specified URL.
  - **`active`** (`boolean`, optional): Whether to make the tab active.
- **`callback`** (`function`, optional): A function that is called with the updated `Tab` object.

**Type Definition** (TypeScript):

```ts
update(
  tabId?: number,
  updateProperties: { url?: string, active?: boolean },
  callback?: (tab: chrome.tabs.Tab) => void
): void;
```

**Example:**

```js
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentTabId = tabs[0].id;
  chrome.tabs.update(currentTabId, { url: "https://example.com" });
});
```

---

#### 4. **`chrome.tabs.remove()`**

**Purpose:**  
Closes one or more tabs specified by their ID.

**Method Signature:**

```js
chrome.tabs.remove(tabIds, callback);
```

**Parameters:**

- **`tabIds`** (`number` or `array`, required): The ID(s) of the tabs to close.
- **`callback`** (`function`, optional): A function that is called when the tab(s) are successfully removed.

**Type Definition** (TypeScript):

```ts
remove(tabIds: number | number[], callback?: () => void): void;
```

**Example:**

```js
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentTabId = tabs[0].id;
  chrome.tabs.remove(currentTabId);
});
```

---

#### 5. **`chrome.tabs.executeScript()`** (Deprecated in Manifest V3)

**Purpose:**  
Injects JavaScript code into a tab's web page. Deprecated in Manifest V3; you should use the `scripting` API instead.

**Method Signature:**

```js
chrome.tabs.executeScript(tabId, details, callback);
```

**Parameters:**

- **`tabId`** (`number`, optional): The ID of the tab where the script should be injected.
- **`details`** (`object`, required): Details about the script to be injected. Fields include:
  - **`code`** (`string`, optional): The code to execute.
  - **`file`** (`string`, optional): A file containing the code to execute.
- **`callback`** (`function`, optional): A function called with the results of the executed script.

**Type Definition** (TypeScript):

```ts
executeScript(
  tabId?: number,
  details: { code?: string, file?: string },
  callback?: (result: any[]) => void
): void;
```

**Example:**

```js
chrome.tabs.executeScript(null, {
  code: 'document.body.style.backgroundColor = "red";',
});
```

For Manifest V3, use:

```js
chrome.scripting.executeScript({
  target: { tabId: currentTabId },
  function: () => {
    document.body.style.backgroundColor = "red";
  },
});
```

---

### Key Events in `chrome.tabs`

---

#### 1. **`chrome.tabs.onUpdated.addListener()`**

**Purpose:**  
Fired when a tab is updated (e.g., a tab’s URL changes or it reloads).

**Method Signature:**

```js
chrome.tabs.onUpdated.addListener(callback);
```

**Parameters:**

- **`callback`** (`function`, required): A function that is called when a tab is updated. The callback function receives three parameters:
  - **`tabId`** (`number`): The ID of the updated tab.
  - **`changeInfo`** (`object`): Contains information about what was updated (e.g., `status`, `url`).
  - **`tab`** (`object`): The updated `Tab` object.

**Type Definition** (TypeScript):

```ts
onUpdated.addListener(
  callback: (tabId: number, changeInfo: { status?: string, url?: string }, tab: chrome.tabs.Tab) => void
): void;
```

**Example:**

```js
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url.includes("example.com")) {
    console.log("Tab finished loading example.com");
  }
});
```

---

#### 2. **`chrome.tabs.onCreated.addListener()`**

**Purpose:**  
Fired when a new tab is created.

**Method Signature:**

```js
chrome.tabs.onCreated.addListener(callback);
```

**Parameters:**

- **`callback`** (`function`, required): A function that is called when a new tab is created. The callback receives one parameter:
  - **`tab`** (`object`): The new `Tab` object.

**Type Definition** (TypeScript):

```ts
onCreated.addListener(callback: (tab: chrome.tabs.Tab) => void): void;
```

**Example:**

```js
chrome.tabs.onCreated.addListener((tab) => {
  console.log("New tab created with ID:", tab.id);
});
```

---

#### 3. **`chrome.tabs.onRemoved.addListener()`**

**Purpose:**  
Fired when a tab is closed.

**Method Signature:**

```js
chrome.tabs.onRemoved.addListener(callback);
```

**Parameters:**

- **`callback`** (`function`, required): A function that is called when a tab is removed. The callback function receives two parameters:
  - **`tabId`** (`number`): The ID of the closed tab.
  - **`removeInfo`** (`object`): Information about the removal, such as whether the tab is being replaced.

**Type Definition** (TypeScript):

```ts
onRemoved.addListener(
  callback: (tabId: number, removeInfo: { isWindowClosing: boolean }) => void
): void;
```

**Example:**

```js
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  console.log(
    `Tab ${tabId} was closed. Window closing: ${removeInfo.isWindowClosing}`,
  );
});
```

---

### Conclusion:

The `chrome.tabs` API offers extensive functionality for managing and interacting with browser tabs in your Chrome extension. You can query tabs, create or update them, inject scripts, and listen to tab events like updates or closures.

Leveraging TypeScript-style type definitions can improve code readability and make it easier to work with the API, providing helpful intellisense and autocompletion.

```bash
nvim chrome_tabs_api_overview.md
```
