### 24. **Proxy API** - In-Depth Guide

The **Proxy API** in Chrome allows extensions to control the browser’s proxy settings. This API is useful for developers building extensions that need to configure or dynamically change how Chrome connects to the internet through different proxy servers. It provides fine-grained control over various proxy settings, such as HTTP, HTTPS, and SOCKS proxies, along with the ability to define custom proxy rules.

---

### **Core Features**

- **Set Proxy Rules**: Configure rules for different types of proxies (HTTP, HTTPS, SOCKS) based on URL patterns or specific conditions.
- **Dynamic Proxy Configuration**: Change proxy settings dynamically based on network conditions or other factors.
- **Bypass Lists**: Specify which URLs should bypass the proxy settings.
- **Proxy Authentication**: Handle scenarios where proxies require authentication by prompting users for credentials or using predefined settings.
- **PAC Scripts**: Provide custom Proxy Auto-Configuration (PAC) scripts to define complex proxy rules.

---

### **How to Use the Proxy API**

To use the Proxy API, declare the `"proxy"` permission in your `manifest.json`:

```json
{
  "name": "My Proxy Extension",
  "version": "1.0",
  "manifest_version": 3,
  "permissions": ["proxy"],
  "background": {
    "service_worker": "background.js"
  }
}
```

Note that the Proxy API requires the extension to run in the background context since it often needs to modify or inspect proxy settings at runtime.

---

### **Basic Methods and Properties**

1. **Set Proxy Configuration**

The `chrome.proxy.settings.set()` method is used to define or update proxy settings for the browser. The settings can be set globally or for specific URLs.

##### **Example Use Case**: Setting an HTTP proxy for all traffic

```javascript
chrome.proxy.settings.set(
  {
    value: {
      mode: "fixed_servers",
      rules: {
        singleProxy: {
          scheme: "http",
          host: "myproxy.example.com",
          port: 8080,
        },
      },
    },
    scope: "regular",
  },
  () => {
    console.log("Proxy settings updated.");
  },
);
```

This sets an HTTP proxy at `myproxy.example.com:8080` for all browsing activity.

---

2. **Proxy Modes**

The proxy settings support several modes, each controlling how proxy settings are applied:

- `direct`: No proxy, connects directly to the internet.
- `auto_detect`: Automatically detects proxy settings (e.g., via WPAD).
- `pac_script`: Uses a Proxy Auto-Config (PAC) script.
- `fixed_servers`: Specifies fixed proxy servers for different protocols (HTTP, HTTPS, SOCKS).
- `system`: Uses the system's default proxy settings.

##### **Example Use Case**: Setting PAC script mode

```javascript
chrome.proxy.settings.set(
  {
    value: {
      mode: "pac_script",
      pacScript: {
        url: "http://example.com/mypacfile.pac",
      },
    },
    scope: "regular",
  },
  () => {
    console.log("PAC script applied.");
  },
);
```

This example applies a PAC script from the provided URL to dynamically determine the proxy settings based on the script's logic.

---

3. **Get Proxy Configuration**

To retrieve the current proxy configuration, use `chrome.proxy.settings.get()`. This is useful to inspect and log what proxy settings are currently active.

##### **Example Use Case**: Retrieving the current proxy settings

```javascript
chrome.proxy.settings.get({}, (config) => {
  console.log("Current Proxy Settings:", config.value);
});
```

This logs the current proxy configuration to the console.

---

4. **Clear Proxy Configuration**

To reset Chrome's proxy settings and revert back to the system default, use the `chrome.proxy.settings.clear()` method.

##### **Example Use Case**: Clearing proxy settings

```javascript
chrome.proxy.settings.clear({ scope: "regular" }, () => {
  console.log("Proxy settings cleared.");
});
```

This clears any proxy configuration set by the extension and reverts back to system-wide settings.

---

5. **Handle Proxy Authentication**

The Proxy API doesn’t directly handle authentication. However, you can combine it with the **chrome.webRequest** API to handle proxy credentials dynamically. For instance, you can intercept authentication requests and supply credentials programmatically.

##### **Example Use Case**: Handling proxy authentication

```javascript
chrome.webRequest.onAuthRequired.addListener(
  (details, callback) => {
    callback({
      authCredentials: { username: "proxyUser", password: "proxyPass" },
    });
  },
  { urls: ["<all_urls>"] },
  ["blocking"],
);
```

In this case, whenever a proxy server requires authentication, the extension automatically supplies the credentials.

---

### **Use Cases**

#### 1. **Geo-Location-Based Proxy Switching**

- **Problem**: Users may need to use different proxy servers depending on their location or region.
- **Solution**: Create an extension that dynamically switches proxy settings based on the user's IP address or other location-based data.

```javascript
function setProxyByRegion(region) {
  const proxySettings = {
    US: { host: "us-proxy.example.com", port: 8080 },
    EU: { host: "eu-proxy.example.com", port: 8080 },
  };

  chrome.proxy.settings.set(
    {
      value: {
        mode: "fixed_servers",
        rules: {
          singleProxy: proxySettings[region],
        },
      },
    },
    () => {
      console.log(`Proxy set for region: ${region}`);
    },
  );
}
```

This script dynamically sets the proxy based on the region provided (US or EU in this case).

#### 2. **Corporate Proxy Policies**

- **Problem**: Companies often need to enforce specific proxy settings for security or regulatory reasons.
- **Solution**: Create an extension that enforces proxy rules for all corporate network traffic, bypassing proxies for internal websites.

```javascript
chrome.proxy.settings.set(
  {
    value: {
      mode: "fixed_servers",
      rules: {
        singleProxy: {
          scheme: "http",
          host: "corp-proxy.company.com",
          port: 3128,
        },
        bypassList: ["*.internal.company.com"],
      },
    },
  },
  () => {
    console.log("Corporate proxy settings applied.");
  },
);
```

This configures all traffic to go through the corporate proxy except for internal websites.

#### 3. **Custom Proxy Rules via PAC Script**

- **Problem**: Users need complex proxy rules, such as routing specific domains through different proxies.
- **Solution**: Use a PAC script to define custom proxy rules based on the destination URL.

```javascript
const pacScript = `
  function FindProxyForURL(url, host) {
    if (dnsDomainIs(host, ".example.com")) {
      return "PROXY proxy1.example.com:8080";
    }
    return "DIRECT";
  }
`;

chrome.proxy.settings.set(
  {
    value: {
      mode: "pac_script",
      pacScript: {
        data: pacScript,
      },
    },
  },
  () => {
    console.log("PAC script applied for custom proxy rules.");
  },
);
```

This script sends requests for `.example.com` through a proxy, while other requests go directly to the internet.

---

### **Best Practices for Proxy API**

1. **Use PAC Scripts for Complex Logic**: When needing sophisticated rules, like routing different URLs through different proxies, rely on PAC scripts rather than trying to hardcode rules using the fixed server mode.

2. **Test Proxy Configurations Thoroughly**: Always test proxy configurations, especially in enterprise environments where policies might change dynamically. Ensure that proxies work across different network environments.

3. **Graceful Fallback**: Implement a fallback mechanism, especially when using external PAC scripts. If the script cannot be loaded or applied, the extension should revert to default proxy settings.

4. **Handle Credentials Securely**: If proxy authentication is required, never hardcode credentials directly in your code. Use secure storage mechanisms (like Chrome's `chrome.storage` API) to manage sensitive data.

5. **Monitor Changes**: Use the `chrome.proxy.settings.get()` method to regularly monitor and ensure that the proxy settings are still in place, particularly in shared or corporate environments.

---

### **Potential Pitfalls**

- **Proxy Loops**: Be cautious when configuring proxies to ensure there are no proxy loops (e.g., routing traffic to a proxy that points back to itself), which can lead to infinite loops and network failures.

- **Compatibility Issues with PAC Scripts**: Some network environments may block PAC scripts from being loaded. Ensure fallback mechanisms are in place for critical browsing tasks.

- **Changing Proxy Mid-Session**: Changing proxy settings while a session is active may lead to disrupted connections. Always test the behavior of proxy changes in real-world use cases.

---

### **Conclusion**

The Proxy API is a powerful tool for developers looking to manage network connections through proxies. Whether it's for corporate environments, geo-restrictions, or custom browsing experiences, the Proxy API enables fine-tuned control over how traffic is routed, offering flexibility and dynamic configuration options.

---

Timestamp: 2024-10-14 20:25:00  
Short description: Comprehensive guide to Chrome Proxy API, covering proxy rules, PAC scripts, authentication handling, and best practices.  
Lines: 93  
Characters: 6204  
`proxy-api-guide.md`
