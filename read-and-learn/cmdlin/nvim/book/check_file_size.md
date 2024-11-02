You can use Python to check the size of a file before downloading it by making a `HEAD` request to the URL. This request retrieves the file's headers, which often include the `Content-Length` field indicating the file size in bytes. Below is a script that accomplishes this:

```python
import requests

def get_file_size(url):
    try:
        response = requests.head(url, allow_redirects=True)
        content_length = response.headers.get('Content-Length')

        if content_length is None:
            print("Content-Length header not found. Unable to determine file size.")
        else:
            file_size = int(content_length)
            print(f"File size: {file_size / (1024 * 1024):.2f} MB ({file_size} bytes)")
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")

# Example usage
url = "https://example.com/yourfile.zip"
get_file_size(url)
```

### Breakdown:

1. **`requests.head()`**: Sends a `HEAD` request to the URL. This method fetches only the headers without downloading the file.
2. **`Content-Length`**: Extracts the file size from the `Content-Length` header.
3. **Error Handling**: Catches exceptions to handle cases where the URL might not be reachable.

You can replace the `url` variable with the actual URL you're working with.

### Bash file creation snippet:

```bash
nvim check_file_size.md
```

Timestamp: 2024-10-16
