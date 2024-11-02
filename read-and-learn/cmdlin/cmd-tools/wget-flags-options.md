**Timestamp**: 2024-10-19 14:05:00  
**Description**: List of flags and options for `wget` with short descriptions.  
**Lines**: 17  
**Characters**: 741  

Here’s a list of common `wget` flags and options with brief descriptions:

- `-V, --version`: Display version information.
- `-h, --help`: Show help message.
- `-r, --recursive`: Download files recursively.
- `-np, --no-parent`: Do not ascend to the parent directory.
- `-N, --timestamping`: Download only if the remote file is newer.
- `-c, --continue`: Resume a partially downloaded file.
- `-P, --directory-prefix=PREFIX`: Save files in the specified directory.
- `-A, --accept=LIST`: Download only files with specified extensions.
- `-R, --reject=LIST`: Reject files with specified extensions.
- `-l, --level=NUMBER`: Set the maximum recursion depth.
- `-k, --convert-links`: Convert links for offline viewing.
- `-p, --page-requisites`: Download all necessary files for a page.
- `-q, --quiet`: Suppress output (except for errors).
- `-O, --output-document=FILE`: Save the output to a specific file.
- `--no-check-certificate`: Skip SSL certificate checks.
- `--limit-rate=RATE`: Limit download speed.
- `--user=USER` and `--password=PASS`: Specify authentication credentials.

For a complete list and details, refer to the `wget` man page.

```bash
nvim wget-flags-options.md
```
