### Timestamp
2024-10-19 15:00:00 UTC

### Short Description
A brief overview of the `dig` command, a powerful DNS lookup tool commonly used for querying DNS name servers.

### Content
`dig` (Domain Information Groper) is a command-line utility for querying DNS (Domain Name System) servers to obtain information about various DNS records. It is commonly used by network administrators and developers for troubleshooting DNS issues and gathering information about domain names.

#### Basic Syntax
```bash
dig [options] [@server] [name] [type]
```

- `@server`: Specifies the DNS server to query (optional).
- `name`: The domain name to look up (e.g., `example.com`).
- `type`: The type of DNS record to query (e.g., `A`, `AAAA`, `MX`, `CNAME`, etc.).

#### Examples
1. **Basic Query**:
   ```bash
   dig example.com
   ```

2. **Query Specific DNS Record Type**:
   ```bash
   dig example.com MX
   ```

3. **Using a Specific DNS Server**:
   ```bash
   dig @8.8.8.8 example.com
   ```

4. **Short Format Output**:
   ```bash
   dig +short example.com
   ```

#### Common Options
- `+short`: Provides a concise output.
- `+trace`: Traces the delegation path to the authoritative DNS servers.
- `+noall +answer`: Shows only the answer section of the query.

### Additional Information
`dig` is a part of the BIND (Berkeley Internet Name Domain) package and is available on most UNIX-like operating systems, including Linux and macOS.

### Response Details
- **Lines**: 29
- **Characters**: 395

### Filename
```bash
nvim dig_dns_lookup_tool.md
```
