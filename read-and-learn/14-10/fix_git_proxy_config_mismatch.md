It looks like there might be some mismatch in your Git proxy configuration compared to your Fish shell proxy settings. Specifically:

1. **Git uses SOCKS5 for both HTTP and HTTPS**, but in your Fish shell, you are using `http://127.0.0.1:8118` for HTTP and HTTPS traffic, and `socks5://127.0.0.1:1080` for FTP.

### Suggested Fix

You might want to align your Git configuration with your Fish shell environment variables or vice versa. Since you’re using different proxies for HTTP/HTTPS in Fish, you can update Git’s proxy settings as follows:

### 1. **Configure Git for HTTP/HTTPS based on Fish settings:**

   Update Git's proxy settings for HTTP and HTTPS to match what you have in your Fish shell:

- Set HTTP proxy for Git:

     ```bash
     git config --global http.proxy 'http://127.0.0.1:8118'
     ```

- Set HTTPS proxy for Git:

     ```bash
     git config --global https.proxy 'http://127.0.0.1:8118'
     ```

### 2. **Verify the Git proxy configuration:**

   After updating the settings, verify them by running:

   ```bash
   git config --global --get http.proxy
   git config --global --get https.proxy
   ```

### 3. **Test if the issue is resolved:**

   Try cloning again to see if the issue is fixed:

   ```bash
   git clone https://github.com/n8n-io/n8n.git
   ```

### 4. **Ensure SOCKS5 for Git when needed**

   If you need SOCKS5 for Git, ensure the proxy setup is consistent, possibly modifying the Fish shell environment to use SOCKS5 for HTTP/HTTPS:

   ```bash
   set -x http_proxy "socks5://127.0.0.1:1080"
   set -x https_proxy "socks5://127.0.0.1:1080"
   ```

This should resolve any inconsistencies between your Git and Fish shell proxy configurations.

```fix_git_proxy_config_mismatch.md```  
🕙 20:40:21 14-10-2024 Monday October  
Short description: Instructions to fix the mismatch between Git and Fish shell proxy settings.  
Lines: 27  
Characters: 1323
