
#!/usr/bin/env fish

# Define the extension name
set extension_name my-chrome-extension

# Create the directory structure
mkdir -p $extension_name/images

# Create manifest.json
echo '{
  "manifest_version": 3,
  "name": "My First Chrome Extension",
  "version": "1.0",
  "description": "A simple Chrome extension to demonstrate basic features.",
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "images/icon16.svg",
      "48": "images/icon48.svg",
      "128": "images/icon128.svg"
    }
  },
  "permissions": [
    "activeTab"
  ],
  "icons": {
    "16": "images/icon16.svg",
    "48": "images/icon48.svg",
    "128": "images/icon128.svg"
  }
}' >$extension_name/manifest.json

# Create popup.html
echo '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="popup.css">
    <title>My Chrome Extension</title>
</head>
<body>
    <h1>Hello, Chrome Extension!</h1>
    <button id="click-me">Click Me!</button>
    <div id="result"></div>
    <script src="popup.js"></script>
</body>
</html>' >$extension_name/popup.html

# Create popup.js
echo 'document.getElementById("click-me").addEventListener("click", function() {
    document.getElementById("result").textContent = "Button clicked!";
});' >$extension_name/popup.js

# Create popup.css
echo 'body {
    width: 200px;
    font-family: Arial, sans-serif;
    padding: 10px;
}

h1 {
    font-size: 16px;
    margin: 0 0 10px;
}

button {
    padding: 5px 10px;
    margin-top: 10px;
    cursor: pointer;
}' >$extension_name/popup.css

# Create SVG Icons
# 16x16 Icon
echo '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="16" height="16">
  <path d="M32 8c-10 0-19 5-24 14 5 9 14 14 24 14s19-5 24-14c-5-9-14-14-24-14z" fill="#1E88E5"/>
</svg>' >$extension_name/images/icon16.svg

# 48x48 Icon
echo '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="48" height="48">
  <path d="M32 8c-10 0-19 5-24 14 5 9 14 14 24 14s19-5 24-14c-5-9-14-14-24-14z" fill="#1E88E5"/>
</svg>' >$extension_name/images/icon48.svg

# 128x128 Icon
echo '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="128" height="128">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(30,136,229);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(63,81,181);stop-opacity:1" />
    </linearGradient>
  </defs>
  <path d="M32 8c-10 0-19 5-24 14 5 9 14 14 24 14s19-5 24-14c-5-9-14-14-24-14z" fill="url(#grad1)"/>
</svg>' >$extension_name/images/icon128.svg

# Print completion message
echo "Chrome extension setup completed in the $extension_name directory with SVG icons."
