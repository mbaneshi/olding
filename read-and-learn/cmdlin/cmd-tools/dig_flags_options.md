### Timestamp
2024-10-19 15:05:00 UTC

### Short Description
A comprehensive list of flags and options accepted by the `dig` command, along with very short descriptions for each.

### Flags and Options for `dig`

- `-h`, `--help`: Display help information and exit.
- `-v`, `--version`: Show version information and exit.
- `@server`: Query a specific DNS server.
- `+short`: Provide a concise output of the query result.
- `+trace`: Trace the path to the authoritative name server.
- `+noall`: Suppress all sections of the output.
- `+answer`: Show only the answer section of the query.
- `+comments`: Include comments in the output.
- `+nocmd`: Suppress the command summary in the output.
- `+stats`: Display statistics about the query.
- `+multiline`: Print the answer section in a multi-line format.
- `+retry=n`: Set the number of retries for queries (default is 4).
- `+timeout=n`: Set the timeout for the query in seconds (default is 5).
- `+dnssec`: Enable DNSSEC (DNS Security Extensions) validation.
- `+edns=n`: Set the EDNS version (default is 0).
- `+tcp`: Use TCP instead of UDP for the query.
- `-p port`: Specify the port number for the DNS server (default is 53).
- `-t type`: Specify the type of DNS record to query (e.g., `A`, `MX`).
- `-x addr`: Perform a reverse lookup for the specified IP address.

### Response Details
- **Lines**: 22
- **Characters**: 291

### Filename
```bash
nvim dig_flags_options.md
```
