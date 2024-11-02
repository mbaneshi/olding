**Timestamp:** `2023-10-19 14:05:00`  
**Description:** Detailed flags and options for curl, wget, nmap, Wireshark, and additional tools with explanations.  
**Lines:** 114  
**Characters:** 5090  

Here’s a more elaborated list of flags and options for each of the tools, including explanations for better understanding.

### 1. **curl**
- `-X, --request <method>`  
  Specify a custom request method to use when communicating with the server (e.g., GET, POST, DELETE).
  
- `-d, --data <data>`  
  Send specified data with the request. For POST requests, data is sent in the body.

- `-H, --header <header>`  
  Add a custom header to the request, useful for API calls requiring tokens or content types.

- `-o, --output <file>`  
  Write the output to a specified file instead of stdout, useful for saving downloaded content.

- `-u, --user <user:password>`  
  Specify user credentials for basic HTTP authentication.

### 2. **wget**
- `-O, --output-document=<file>`  
  Save the downloaded file under a different name instead of the default name.

- `-r, --recursive`  
  Download files recursively, useful for downloading entire websites.

- `-p, --page-requisites`  
  Download all necessary files for displaying HTML pages, such as images and stylesheets.

- `--limit-rate=<rate>`  
  Limit the download speed, which can help when managing bandwidth.

- `-q, --quiet`  
  Operate in quiet mode; suppress output messages unless there is an error.

### 3. **nmap**
- `-sS, --syn`  
  Conduct a TCP SYN scan, which is stealthy and often bypasses firewalls.

- `-sP, --ping`  
  Perform a ping scan to discover hosts on the network without port scanning.

- `-p, --port <port>`  
  Specify a specific port or range of ports to scan (e.g., `-p 22,80` or `-p 1-100`).

- `-A, --aggressive`  
  Enable OS detection, version detection, script scanning, and traceroute in a single command.

- `-T <timing>`  
  Set timing template (0-5), where 5 is the fastest and 0 is the slowest, useful for adjusting scan speed.

### 4. **Wireshark (Tshark for CLI)**
- `-r, --read <file>`  
  Read packets from a specified file instead of capturing live data.

- `-w, --write <file>`  
  Write captured packets to a specified file for later analysis.

- `-Y, --display-filter <filter>`  
  Apply a display filter to show only the packets that match specific criteria.

- `-f, --capture-filter <filter>`  
  Set a capture filter to limit the packets captured based on specific criteria (e.g., by port).

- `-i, --interface <interface>`  
  Specify the network interface to capture data on, essential for targeting specific traffic.

### 5. **tcpdump**
- `-i <interface>`  
  Specify the network interface to listen on (e.g., `eth0`, `wlan0`).

- `-w <file>`  
  Write the output to a specified file for later analysis.

- `-r <file>`  
  Read packets from a file instead of capturing live data.

- `-c <count>`  
  Capture a specified number of packets and then exit, useful for limiting output.

- `-A`  
  Print packet contents in ASCII for easy readability.

### 6. **htop**
- `F6`  
  Sort processes by various criteria (CPU, memory usage, etc.).

- `F9`  
  Kill a selected process interactively.

- `F10`  
  Quit htop.

- `F3`  
  Search for a specific process by name.

- `F5`  
  Switch to tree view to visualize process hierarchies.

### 7. **traceroute**
- `-m <max-hops>`  
  Set the maximum number of hops to traverse before stopping.

- `-p <port>`  
  Specify the destination port to use in the trace.

- `-w <wait>`  
  Set the wait time for a response from each hop (in seconds).

- `-n`  
  Skip DNS resolution for IP addresses, providing numeric output only.

### 8. **iftop**
- `-i <interface>`  
  Specify the interface to monitor for bandwidth usage.

- `-f <filter>`  
  Apply a filter to display traffic that matches specific criteria (e.g., by port).

- `-t`  
  Run in text mode, useful for viewing in a non-graphical environment.

- `-s <seconds>`  
  Set the update interval for displayed information.

### 9. **ping**
- `-c <count>`  
  Send a specified number of packets before stopping.

- `-i <interval>`  
  Set the interval (in seconds) between packets sent.

- `-t <ttl>`  
  Set the time to live for the packet, controlling how many hops it can make.

- `-W <timeout>`  
  Set the wait time for a reply before moving on.

### 10. **netcat (nc)**
- `-l`  
  Enable listening mode for incoming connections.

- `-p <port>`  
  Specify the port number for connections (only in listen mode).

- `-v`  
  Enable verbose output for more detailed information during execution.

- `-u`  
  Operate in UDP mode instead of the default TCP.

### 11. **ip**
- `addr`  
  Manage and display IP address information.

- `link`  
  Manage and display link-layer information.

- `route`  
  Display and manipulate the routing table.

### 12. **dig**
- `@<server>`  
  Specify a DNS server to query.

- `-x <address>`  
  Perform a reverse lookup for the given IP address.

- `-t <type>`  
  Specify the DNS record type to query (A, MX, TXT, etc.).

### 13. **lsof**
- `-i`  
  List open network files and connections.

- `-u <user>`  
  Show files opened by a specific user.

- `-p <pid>`  
  Show files opened by a specific process ID.

### 14. **whois**
- `<domain>`  
  Query information about a domain or IP address. No flags are typically required.

```bash
nvim command_line_tools_detailed_flags.md
```
