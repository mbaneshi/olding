
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
      "16": "images/icon16.png",
      "48": "images/icon48.png",
      "128": "images/icon128.png"
    }
  },
  "permissions": [
    "activeTab"
  ],
  "icons": {
    "16": "images/icon16.png",
    "48": "images/icon48.png",
    "128": "images/icon128.png"
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

# Create icon placeholder files (optional)
touch $extension_name/images/icon16.png
touch $extension_name/images/icon48.png
touch $extension_name/images/icon128.png

# Print completion message
echo "Chrome extension setup completed in the $extension_name directory."
