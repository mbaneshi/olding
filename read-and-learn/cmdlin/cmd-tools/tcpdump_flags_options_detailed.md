**Timestamp:** 2024-10-19 08:53:15 UTC  
**Description:** Detailed list of `tcpdump` flags and options with elaborated descriptions.  
**Lines:** 31  
**Characters:** 1,613  

Here’s a more detailed list of `tcpdump` flags and options:

- `-i <interface>`:  
  Specify the network interface to capture packets from. If omitted, `tcpdump` selects the first non-loopback interface.

- `-n`:  
  Prevents the conversion of addresses to names (both DNS and service names), displaying raw IP addresses and port numbers instead. This speeds up output.

- `-vv`:  
  Increases the verbosity of the output. Use `-vvv` for even more detail, including more information about packet headers.

- `-c <count>`:  
  Sets the maximum number of packets to capture. Once this number is reached, `tcpdump` will terminate.

- `-w <file>`:  
  Directs `tcpdump` to write captured packets to a specified file in binary format for later analysis. This can be useful for large captures.

- `-r <file>`:  
  Reads packets from a specified file (created with the `-w` option) instead of capturing live packets.

- `-s <snaplen>`:  
  Defines the maximum number of bytes to capture for each packet. The default is usually 68 or 96 bytes; set this to a larger value (e.g., 65535) to capture full packets.

- `-p`:  
  Disables promiscuous mode. Normally, `tcpdump` captures all packets on the network, but with this flag, it only captures packets addressed to the host.

- `-e`:  
  Displays the link-layer header information in the output, which is useful for understanding the lower-level details of the packets.

- `-X`:  
  Outputs the contents of the packet in both hexadecimal and ASCII, allowing for deeper inspection of the data.

- `-A`:  
  Prints each packet in ASCII, useful for viewing textual data such as HTTP requests or responses.

- `-l`:  
  Makes stdout line-buffered, which is helpful when piping output to other commands or files, ensuring timely display.

- `-q`:  
  Enables quiet mode, which reduces the amount of output by omitting some of the packet details, showing only summary information.

- `-D`:  
  Lists all available network interfaces for capture, providing their names and descriptions.

- `-F <file>`:  
  Reads a file containing filter expressions, allowing for more complex filtering without needing to type the expression directly in the command line.

- `-Y <filter>`:  
  Applies a display filter while capturing, which is useful for narrowing down captured packets to specific criteria.

- `-V`:  
  Displays the version information of `tcpdump`, which can help ensure compatibility with other tools or libraries.

For comprehensive filtering and usage, refer to the `man` page (`man tcpdump`) for detailed examples and advanced options.

```bash
nvim tcpdump_flags_options_detailed.md
```
