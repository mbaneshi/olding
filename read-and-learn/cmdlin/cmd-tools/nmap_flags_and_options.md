**Timestamp**: 2024-10-19  
**Short Description**: List of Nmap flags and options with brief descriptions  
**Response Length**: 17 lines, 835 characters  

Here’s a concise list of commonly used Nmap flags and options:

- `-sS`: TCP SYN scan (stealth scan)
- `-sT`: TCP connect scan
- `-sU`: UDP scan
- `-sA`: TCP ACK scan
- `-sP`: Ping scan (host discovery)
- `-sV`: Service version detection
- `-sC`: Run default scripts (NSE)
- `-O`: OS detection
- `-p`: Specify ports to scan (e.g., `-p 22,80`)
- `-Pn`: Treat all hosts as online (skip host discovery)
- `-v`: Verbose output
- `-oN`: Output scan results to a file in normal format
- `-oG`: Output scan results to a file in grepable format
- `-oX`: Output scan results to a file in XML format
- `-h`: Display help and options
- `--script`: Run specific Nmap scripts
- `-iL`: Input from a file containing a list of hosts

```bash
nvim nmap_flags_and_options.md
```
