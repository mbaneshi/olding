### Available Google Chrome Extension APIs

Chrome Extensions provide a rich set of APIs to interact with the browser, control behavior, manipulate content, and enhance the user experience. Below is a detailed list of key Chrome Extension APIs you can explore for hands-on learning:

#### 1. **Alarms API**
   - Allows extensions to schedule tasks to be executed at a specific time or after a specific delay.
   - Example: Set an alarm to trigger an action in the background at regular intervals.
   
   ```md
   chrome.alarms.create(alarmName, options);
   ```

#### 2. **Bookmarks API**
   - Manage the browser’s bookmark system, including creating, organizing, and removing bookmarks.
   - Example: Add a new bookmark or list all bookmarks.

   ```md
   chrome.bookmarks.create(bookmarkDetails, callback);
   ```

#### 3. **Browser Action API**
   - Provides ways to control your extension’s icon in the toolbar, including adding badges, popups, or tooltips.
   - Example: Set badge text and color on the extension's icon.
   
   ```md
   chrome.browserAction.setBadgeText({ text: '5' });
   ```

#### 4. **Browsing Data API**
   - Lets you remove browsing data, such as history, cache, and cookies, for privacy or optimization.
   - Example: Clear browser cookies and cache.
   
   ```md
   chrome.browsingData.remove(options, dataToRemove, callback);
   ```

#### 5. **Commands API**
   - Allows extensions to bind keyboard shortcuts to actions.
   - Example: Trigger a specific function with a keyboard shortcut.
   
   ```md
   chrome.commands.onCommand.addListener(function(command) {
       console.log('Command:', command);
   });
   ```

#### 6. **Content Scripts API**
   - Inject JavaScript and CSS into web pages. These scripts run in the context of web pages, allowing manipulation of DOM or interaction with page content.
   - Example: Inject a script into a specific page to modify its content.
   
   ```md
   chrome.tabs.executeScript(tabId, { file: 'content.js' });
   ```

#### 7. **Cookies API**
   - Gives access to the browser’s cookie store and allows creating, reading, and deleting cookies.
   - Example: Get cookies for a specific domain or set a new cookie.
   
   ```md
   chrome.cookies.get({ url: 'https://example.com', name: 'cookieName' }, callback);
   ```

#### 8. **Declarative Content API**
   - Set rules to show your extension's page action (or take actions) based on the content of web pages.
   - Example: Show your extension icon when visiting certain websites.
   
   ```md
   chrome.declarativeContent.onPageChanged.addRules([rule]);
   ```

#### 9. **Downloads API**
   - Manage downloads in Chrome, such as starting a download or managing existing ones.
   - Example: Trigger a file download and track its progress.
   
   ```md
   chrome.downloads.download(options, callback);
   ```

#### 10. **Events API**
   - Handle events within Chrome extensions. Many APIs trigger events that your extension can listen to.
   - Example: Listen for specific events, such as network requests or alarms.
   
   ```md
   chrome.events.addListener(callback);
   ```

#### 11. **History API**
   - Access and manipulate the browser's history.
   - Example: Add, delete, or query browser history entries.
   
   ```md
   chrome.history.search(query, callback);
   ```

#### 12. **Identity API**
   - Manage user authentication and obtain OAuth tokens for authentication with external services.
   - Example: Get OAuth tokens for Google services.
   
   ```md
   chrome.identity.getAuthToken({ interactive: true }, callback);
   ```

#### 13. **Idle API**
   - Detect whether the system is idle and perform actions accordingly.
   - Example: Run tasks when the system is idle for a set period.
   
   ```md
   chrome.idle.queryState(detectionIntervalInSeconds, callback);
   ```

#### 14. **Notifications API**
   - Create, update, and manage notifications displayed to the user.
   - Example: Display custom notifications to the user.
   
   ```md
   chrome.notifications.create(notificationId, options, callback);
   ```

#### 15. **Omnibox API**
   - Integrate with Chrome’s address bar (omnibox) to offer suggestions based on user input.
   - Example: Provide autocomplete suggestions for a search keyword.
   
   ```md
   chrome.omnibox.onInputChanged.addListener(callback);
   ```

#### 16. **Page Action API**
   - Show an icon in the address bar for specific tabs/pages and trigger actions based on its click.
   - Example: Add a page action for certain websites.
   
   ```md
   chrome.pageAction.show(tabId);
   ```

#### 17. **Permissions API**
   - Request or remove permissions from users dynamically.
   - Example: Request additional permissions during runtime.
   
   ```md
   chrome.permissions.request({ permissions: ['tabs'] }, callback);
   ```

#### 18. **Runtime API**
   - Communication and management functions for your extension, such as version management, messaging between components, and runtime events.
   - Example: Check the current extension version or send a message between components.
   
   ```md
   chrome.runtime.getManifest();
   ```

#### 19. **Storage API**
   - Store and retrieve data (local or sync) across browser sessions or devices.
   - Example: Save and retrieve extension preferences.
   
   ```md
   chrome.storage.sync.set({ key: value }, callback);
   ```

#### 20. **Tabs API**
   - Interact with browser tabs, including creating, modifying, querying, or closing tabs.
   - Example: Open a new tab or modify an existing tab's URL.
   
   ```md
   chrome.tabs.create({ url: 'https://example.com' });
   ```

#### 21. **Web Navigation API**
   - Monitor and respond to navigation events, like page loads, redirects, or link clicks.
   - Example: Detect when a user navigates to a specific page.
   
   ```md
   chrome.webNavigation.onCompleted.addListener(callback);
   ```

#### 22. **Web Request API**
   - Monitor and modify network requests, allowing an extension to view, block, or modify outgoing and incoming requests.
   - Example: Modify headers of outgoing requests or block certain requests.
   
   ```md
   chrome.webRequest.onBeforeSendHeaders.addListener(callback);
   ```

#### 23. **Windows API**
   - Manage browser windows, such as creating new ones, querying them, or managing their properties.
   - Example: Create a new browser window.
   
   ```md
   chrome.windows.create(createData, callback);
   ```

---

Each of these APIs comes with various methods, events, and properties to give you detailed control over the browser's behavior and the user's experience. You can integrate these APIs into your extensions to create rich, functional browser experiences.

Timestamp: 2024-10-14 15:23:55  
Short description: A comprehensive list of available Google Chrome extension APIs for hands-on exploration.  
Lines: 94  
Characters: 6164  
```chrome-extension-apis-list.md```
