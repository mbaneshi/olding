**Timestamp:** `2023-10-19 14:20:00`  
**Description:** Comprehensive overview of flags and options for various command-line tools, including detailed explanations and examples.  
**Lines:** 170  
**Characters:** 7424  

Here’s a more detailed and comprehensive overview of the flags and options for the command-line tools you mentioned, along with explanations and usage examples.

### 1. **curl**
- `-X, --request <method>`  
  Specify the HTTP method to use (GET, POST, PUT, DELETE, etc.).  
  **Example:**  
  ```bash
  curl -X POST http://example.com/api/resource
  ```

- `-d, --data <data>`  
  Send data with POST requests. When using this flag, curl will automatically set the request method to POST.  
  **Example:**  
  ```bash
  curl -d "param1=value1&param2=value2" http://example.com/api/resource
  ```

- `-H, --header <header>`  
  Add a custom HTTP header to the request, useful for API authentication or content-type specification.  
  **Example:**  
  ```bash
  curl -H "Authorization: Bearer token" http://example.com/api/resource
  ```

- `-o, --output <file>`  
  Save the output of the curl command to a file instead of displaying it in the terminal.  
  **Example:**  
  ```bash
  curl -o downloaded_file.html http://example.com
  ```

- `-u, --user <user:password>`  
  Specify username and password for server authentication.  
  **Example:**  
  ```bash
  curl -u user:pass http://example.com/protected
  ```

- `-L, --location`  
  Follow redirects when the server responds with a 3xx status code.  
  **Example:**  
  ```bash
  curl -L http://example.com/redirect
  ```

### 2. **wget**
- `-O, --output-document=<file>`  
  Save the downloaded file with a specified name, overriding the default filename.  
  **Example:**  
  ```bash
  wget -O custom_name.html http://example.com
  ```

- `-r, --recursive`  
  Download files recursively, useful for downloading entire directories or websites.  
  **Example:**  
  ```bash
  wget -r http://example.com/directory/
  ```

- `-p, --page-requisites`  
  Download all necessary resources for displaying HTML pages, such as images, CSS, and JavaScript files.  
  **Example:**  
  ```bash
  wget -p http://example.com/page.html
  ```

- `--limit-rate=<rate>`  
  Limit the download speed to avoid network congestion. You can specify the rate in bytes, kilobytes, or megabytes.  
  **Example:**  
  ```bash
  wget --limit-rate=200k http://example.com/largefile.zip
  ```

- `-q, --quiet`  
  Run in quiet mode; suppress output messages unless there is an error.  
  **Example:**  
  ```bash
  wget -q http://example.com/silent_download.zip
  ```

- `-nc, --no-clobber`  
  Prevent overwriting files that already exist.  
  **Example:**  
  ```bash
  wget -nc http://example.com/file.txt
  ```

### 3. **nmap**
- `-sS, --syn`  
  Conduct a TCP SYN scan, which is stealthy and less likely to be logged by firewalls.  
  **Example:**  
  ```bash
  nmap -sS 192.168.1.1
  ```

- `-sP, --ping`  
  Perform a ping scan to identify live hosts without scanning ports.  
  **Example:**  
  ```bash
  nmap -sP 192.168.1.0/24
  ```

- `-p, --port <port>`  
  Specify a single port or a range of ports to scan (e.g., `-p 22,80` or `-p 1-100`).  
  **Example:**  
  ```bash
  nmap -p 22,80 192.168.1.1
  ```

- `-A, --aggressive`  
  Enable OS detection, version detection, script scanning, and traceroute.  
  **Example:**  
  ```bash
  nmap -A 192.168.1.1
  ```

- `-T <timing>`  
  Set timing template (0-5), where 0 is the slowest and 5 is the fastest, adjusting for network conditions.  
  **Example:**  
  ```bash
  nmap -T4 192.168.1.1
  ```

- `-oN, --output-normal <file>`  
  Save the output of the scan in a normal human-readable format to a file.  
  **Example:**  
  ```bash
  nmap -oN scan_results.txt 192.168.1.1
  ```

### 4. **Wireshark (Tshark for CLI)**
- `-r, --read <file>`  
  Read packets from a specified capture file instead of capturing live data.  
  **Example:**  
  ```bash
  tshark -r capture.pcap
  ```

- `-w, --write <file>`  
  Write captured packets to a specified file for later analysis.  
  **Example:**  
  ```bash
  tshark -w output.pcap
  ```

- `-Y, --display-filter <filter>`  
  Apply a display filter to show only packets that match specific criteria.  
  **Example:**  
  ```bash
  tshark -Y "http.request"
  ```

- `-f, --capture-filter <filter>`  
  Set a capture filter to limit the packets captured based on specific criteria (e.g., by port).  
  **Example:**  
  ```bash
  tshark -f "tcp port 80"
  ```

- `-i, --interface <interface>`  
  Specify the network interface to capture data on. Use `-D` to list available interfaces.  
  **Example:**  
  ```bash
  tshark -i eth0
  ```

- `-c <count>`  
  Stop capturing after a specified number of packets.  
  **Example:**  
  ```bash
  tshark -c 100
  ```

### 5. **tcpdump**
- `-i <interface>`  
  Specify the network interface to listen on (e.g., `eth0`, `wlan0`).  
  **Example:**  
  ```bash
  tcpdump -i eth0
  ```

- `-w <file>`  
  Write the captured packets to a specified file for later analysis.  
  **Example:**  
  ```bash
  tcpdump -w capture.pcap
  ```

- `-r <file>`  
  Read packets from a file instead of capturing live data.  
  **Example:**  
  ```bash
  tcpdump -r capture.pcap
  ```

- `-c <count>`  
  Capture a specified number of packets and then exit.  
  **Example:**  
  ```bash
  tcpdump -c 50
  ```

- `-A`  
  Print packet contents in ASCII format for easier readability.  
  **Example:**  
  ```bash
  tcpdump -A -i eth0
  ```

- `-s <snaplen>`  
  Set the snapshot length, which determines how much of each packet to capture.  
  **Example:**  
  ```bash
  tcpdump -s 0 -i eth0  # Capture entire packets
  ```

### 6. **htop**
- `F6`  
  Sort processes by various criteria such as CPU, memory, or time. Simply press the F6 key and choose the sorting criteria.

- `F9`  
  Kill a selected process. You’ll be prompted to choose a signal to send (e.g., SIGTERM, SIGKILL).

- `F10`  
  Quit htop and return to the terminal.

- `F3`  
  Search for a specific process by name. After pressing F3, type the process name to filter the list.

- `F5`  
  Switch to tree view to visualize process hierarchies, helping you see parent-child relationships.

### 7. **traceroute**
- `-m <max-hops>`  
  Set the maximum number of hops to traverse before stopping.  
  **Example:**  
  ```bash
  traceroute -m 20 google.com
  ```

- `-p <port>`  
  Specify the destination port to use in the trace (defaults to 33434).  
  **Example:**  
  ```bash
  traceroute -p 80 google.com
  ```

- `-w <wait>`  
  Set the wait time (in seconds) for a response from each hop.  
  **Example:**  
  ```bash
  traceroute -w 2 google.com
  ```

- `-n`  
  Skip DNS resolution for IP addresses, providing numeric output only.  
  **Example:**  
  ```bash
  traceroute -n google.com
  ```

### 8. **iftop**
- `-i <interface>`

  
  Specify the interface to monitor for bandwidth usage (e.g., `eth0`).  
  **Example:**  
  ```bash
  iftop -i eth0
  ```

- `-f <filter>`  
  Apply a filter to display traffic that matches specific criteria (e.g., by port or IP).  
  **Example:**  
  ```bash
  iftop -f "port 80"
  ```

- `-t`  
  Run in text mode, useful for viewing output in a non-graphical terminal.  
  **Example:**  
  ```bash
  iftop -t -i eth0
  ```

- `-s <seconds>`  
  Set the update interval for displayed information.  
  **Example:**  
  ```bash
  iftop -s 5 -i eth0
  ```

### 9. **ping**
- `-c <count>`  
  Send a specified number of packets before stopping.  
  **Example:**  
  ```bash
  ping -c 4 google.com
  ```

- `-i <interval>`  
  Set the interval (in seconds) between packets sent.  
  **Example:**  
  ```bash
  ping -i 2 google.com
  ```

- `-t <ttl>`  
  Set the time to live (TTL) for the packet, controlling how many hops it can make.  
  **Example:**  
  ```bash
  ping -t 64 google.com
  ```

- `-W <timeout>`  
  Set the wait time for a reply before moving on.  
  **Example:**  
  ```bash
  ping -W 1 google.com
  ```

### 10. **netcat (nc)**
- `-l`  
  Enable listening mode for incoming connections.  
  **Example:**  
  ```bash
  nc -l -p 12345
  ```

- `-p <port>`  
  Specify the port number for connections (only in listen mode).  
  **Example:**  
  ```bash
  nc -l -p 12345
  ```

- `-v`  
  Enable verbose output to see connection details.  
  **Example:**  
  ```bash
  nc -v example.com 80
  ```

- `-u`  
  Operate in UDP mode instead of the default TCP mode.  
  **Example:**  
  ```bash
  nc -u -l -p 12345
  ```

### 11. **ip**
- `addr`  
  Manage and display IP address information.  
  **Example:**  
  ```bash
  ip addr show
  ```

- `link`  
  Manage and display link-layer information.  
  **Example:**  
  ```bash
  ip link show
  ```

- `route`  
  Display and manipulate the routing table.  
  **Example:**  
  ```bash
  ip route show
  ```

- `neigh`  
  Show or manipulate the ARP table.  
  **Example:**  
  ```bash
  ip neigh show
  ```

### 12. **dig**
- `@<server>`  
  Specify a DNS server to query instead of the default.  
  **Example:**  
  ```bash
  dig @8.8.8.8 example.com
  ```

- `-x <address>`  
  Perform a reverse lookup for the given IP address.  
  **Example:**  
  ```bash
  dig -x 8.8.8.8
  ```

- `-t <type>`  
  Specify the DNS record type to query (A, MX, TXT, etc.).  
  **Example:**  
  ```bash
  dig -t MX example.com
  ```

### 13. **lsof**
- `-i`  
  List open network files and connections.  
  **Example:**  
  ```bash
  lsof -i
  ```

- `-u <user>`  
  Show files opened by a specific user.  
  **Example:**  
  ```bash
  lsof -u username
  ```

- `-p <pid>`  
  Show files opened by a specific process ID.  
  **Example:**  
  ```bash
  lsof -p 1234
  ```

### 14. **whois**
- `<domain>`  
  Query information about a domain or IP address.  
  **Example:**  
  ```bash
  whois example.com
  ```

- `-h <server>`  
  Specify a different WHOIS server to query.  
  **Example:**  
  ```bash
  whois -h whois.verisign-grs.com example.com
  ```

- `-p <port>`  
  Specify a port number to connect to the WHOIS server.  
  **Example:**  
  ```bash
  whois -p 43 example.com
  ```

```bash
nvim command_line_tools_comprehensive_flags.md
```
