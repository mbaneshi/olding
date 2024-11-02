**Timestamp:** `2023-10-19 13:50:00`  
**Description:** Summary of flags and options for curl, wget, nmap, Wireshark, and additional tools.  
**Lines:** 43  
**Characters:** 1845  

Here’s a summary of common flags and options for each of the listed tools:

### 1. **curl**
- `-X` – Specify request method (GET, POST, etc.)
- `-d` – Send data with POST request.
- `-H` – Add custom headers to request.
- `-o` – Write output to a file instead of stdout.
- `-u` – Specify user credentials for basic authentication.

### 2. **wget**
- `-O` – Save output to a specific file.
- `-r` – Recursive download.
- `-p` – Download all necessary files for displaying HTML pages.
- `--limit-rate` – Limit download speed.
- `-q` – Quiet mode (no output).

### 3. **nmap**
- `-sS` – TCP SYN scan (stealth).
- `-sP` – Ping scan (discover hosts).
- `-p` – Specify ports (e.g., `-p 80`).
- `-A` – Enable OS detection, version detection, script scanning, and traceroute.
- `-T` – Timing template (0-5, where 5 is fastest).

### 4. **Wireshark (Tshark for CLI)**
- `-r` – Read from a file.
- `-w` – Write output to a file.
- `-Y` – Display filter.
- `-f` – Capture filter.
- `-i` – Specify interface to capture on.

### 5. **tcpdump**
- `-i` – Interface to listen on.
- `-w` – Write output to a file.
- `-r` – Read from a file.
- `-c` – Stop after `n` packets.
- `-A` – Print packets in ASCII.

### 6. **htop**
- `F6` – Sort processes.
- `F9` – Kill a process.
- `F10` – Quit htop.
- `F3` – Search for a process.
- `F5` – Tree view.

### 7. **traceroute**
- `-m` – Maximum number of hops.
- `-p` – Specify port number.
- `-w` – Wait time for response.
- `-n` – Numeric output only (skip DNS resolution).

### 8. **iftop**
- `-i` – Interface to listen on.
- `-f` – Filter packets (e.g., by port).
- `-t` – Text output (no curses).
- `-s` – Show summary output.

### 9. **ping**
- `-c` – Count packets to send.
- `-i` – Interval between packets.
- `-t` – Time to live.
- `-W` – Wait time for a reply.

### 10. **netcat (nc)**
- `-l` – Listen mode.
- `-p` – Specify port number.
- `-v` – Verbose output.
- `-u` – UDP mode.

### 11. **ip**
- `addr` – Show/manipulate IP addresses.
- `link` – Show/manipulate link-layer devices.
- `route` – Show/manipulate routing table.

### 12. **dig**
- `@` – Specify DNS server.
- `-x` – Reverse lookup.
- `-t` – Specify query type (A, MX, etc.).

### 13. **lsof**
- `-i` – List open network files.
- `-u` – Specify user.
- `-p` – Specify process ID.

### 14. **whois**
- (No specific flags, generally just the domain or IP to query.)

```bash
nvim command_line_tools_flags.md
```
