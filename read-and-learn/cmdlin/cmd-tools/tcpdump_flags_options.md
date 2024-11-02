**Timestamp:** 2024-10-19 08:53:15 UTC  
**Description:** List of `tcpdump` flags and options with brief descriptions.  
**Lines:** 17  
**Characters:** 769  

Here’s a list of common `tcpdump` flags and options along with very short descriptions:

- `-i <interface>`: Specify the network interface to listen on.
- `-n`: Disable name resolution (IP addresses only).
- `-vv`: Increase the verbosity of the output (more detail).
- `-c <count>`: Limit the number of packets to capture.
- `-w <file>`: Write the captured packets to a file.
- `-r <file>`: Read packets from a saved file instead of capturing live.
- `-s <snaplen>`: Set the snapshot length (bytes to capture).
- `-p`: Disable promiscuous mode (only captures packets for the host).
- `-e`: Display link-level header information.
- `-X`: Print the packet contents in both hex and ASCII.
- `-A`: Print each packet in ASCII.
- `-l`: Make stdout line-buffered (useful for piping).
- `-q`: Quiet mode (less verbose output).
- `-D`: List all available interfaces for capture.
- `-F <file>`: Read filter expressions from a file.
- `-Y <filter>`: Apply a display filter while capturing.
- `-V`: Print the version information of `tcpdump`.

For a complete list of options and details, you can always refer to the `man` page by running `man tcpdump`.

```bash
nvim tcpdump_flags_options.md
```
