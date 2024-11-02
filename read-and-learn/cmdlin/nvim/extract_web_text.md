Here is a Python script that uses the `requests` library to fetch the HTML content of a webpage and `BeautifulSoup` from `bs4` to extract and print all the text:

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

### Instructions:

1. Make sure to install the required libraries before running:
   ```bash
   pip install requests beautifulsoup4
   ```

This script fetches the webpage, extracts the text, and saves it to a file named `extracted_text.txt`.

```bash
nvim extract_web_text.md
```
