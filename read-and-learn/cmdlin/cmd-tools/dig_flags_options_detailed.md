### Timestamp
2024-10-19 15:10:00 UTC

### Short Description
An expanded list of flags and options for the `dig` command, including detailed descriptions and usage examples for each.

### Detailed Flags and Options for `dig`

- `-h`, `--help`  
  **Description:** Display help information and exit.  
  **Usage:**  
  ```bash
  dig -h
  ```

- `-v`, `--version`  
  **Description:** Show the version of `dig` and exit.  
  **Usage:**  
  ```bash
  dig -v
  ```

- `@server`  
  **Description:** Specify a DNS server to query instead of the default server in `/etc/resolv.conf`.  
  **Usage:**  
  ```bash
  dig @8.8.8.8 example.com
  ```

- `+short`  
  **Description:** Provide a concise output, typically showing only the result without additional details.  
  **Usage:**  
  ```bash
  dig example.com +short
  ```

- `+trace`  
  **Description:** Trace the delegation path from the root servers to the authoritative server for the domain.  
  **Usage:**  
  ```bash
  dig example.com +trace
  ```

- `+noall`  
  **Description:** Suppress all sections of the output, used in conjunction with other options.  
  **Usage:**  
  ```bash
  dig example.com +noall +answer
  ```

- `+answer`  
  **Description:** Display only the answer section of the DNS query response.  
  **Usage:**  
  ```bash
  dig example.com +noall +answer
  ```

- `+comments`  
  **Description:** Include comments in the output, providing additional context for the results.  
  **Usage:**  
  ```bash
  dig example.com +comments
  ```

- `+nocmd`  
  **Description:** Suppress the command summary that typically appears at the beginning of the output.  
  **Usage:**  
  ```bash
  dig example.com +nocmd +answer
  ```

- `+stats`  
  **Description:** Display statistics about the query, including response time and server queried.  
  **Usage:**  
  ```bash
  dig example.com +stats
  ```

- `+multiline`  
  **Description:** Print the answer section in a multi-line format for better readability.  
  **Usage:**  
  ```bash
  dig example.com +multiline
  ```

- `+retry=n`  
  **Description:** Set the number of retries for queries if a response is not received (default is 4).  
  **Usage:**  
  ```bash
  dig example.com +retry=2
  ```

- `+timeout=n`  
  **Description:** Set the timeout for the query in seconds (default is 5).  
  **Usage:**  
  ```bash
  dig example.com +timeout=10
  ```

- `+dnssec`  
  **Description:** Enable DNSSEC (DNS Security Extensions) validation in the query.  
  **Usage:**  
  ```bash
  dig example.com +dnssec
  ```

- `+edns=n`  
  **Description:** Set the EDNS (Extension Mechanisms for DNS) version (default is 0).  
  **Usage:**  
  ```bash
  dig example.com +edns=0
  ```

- `+tcp`  
  **Description:** Use TCP instead of UDP for the query, useful for larger responses.  
  **Usage:**  
  ```bash
  dig example.com +tcp
  ```

- `-p port`  
  **Description:** Specify the port number for the DNS server (default is 53).  
  **Usage:**  
  ```bash
  dig @8.8.8.8 -p 5353 example.com
  ```

- `-t type`  
  **Description:** Specify the type of DNS record to query (e.g., `A`, `MX`, `CNAME`, `NS`, etc.).  
  **Usage:**  
  ```bash
  dig example.com -t MX
  ```

- `-x addr`  
  **Description:** Perform a reverse lookup for the specified IP address to find the corresponding domain name.  
  **Usage:**  
  ```bash
  dig -x 8.8.8.8
  ```

### Response Details
- **Lines**: 66
- **Characters**: 1,002

### Filename
```bash
nvim dig_flags_options_detailed.md
```
