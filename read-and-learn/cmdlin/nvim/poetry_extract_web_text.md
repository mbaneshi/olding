Here's a Python script adapted for your environment using `pip3` and `poetry`. You can add the necessary dependencies via Poetry.

1. Install the required dependencies:

   ```bash
   poetry add requests beautifulsoup4
   ```

2. Use the script below to extract text:

```python
import requests
from bs4 import BeautifulSoup

# URL to extract text from
url = "https://lazyvim-ambitious-devs.phillips.codes/"

# Send a GET request to the URL
response = requests.get(url)

# Parse the page content using BeautifulSoup
soup = BeautifulSoup(response.content, "html.parser")

# Extract and print all text from the page
text = soup.get_text()

# Save the extracted text to a file
with open("extracted_text.txt", "w") as file:
    file.write(text)

print("Text extracted and saved to extracted_text.txt")
```

This script should work in your setup with `poetry`.

```bash
nvim poetry_extract_web_text.md
```
