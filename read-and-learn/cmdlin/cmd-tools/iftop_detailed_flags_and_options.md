**Timestamp:** 2024-10-19 00:05:00 UTC  
**Short Description:** Here’s a detailed list of `iftop` flags and options, including descriptions and examples where applicable:

1. **`-i <interface>`**  
   Specify the network interface to monitor. For example, `-i eth0` will monitor the Ethernet interface named `eth0`.

2. **`-F <filter>`**  
   Use a filter expression to specify which packets to display, formatted similarly to tcpdump. For instance, `-F "net 192.168.1.0/24"` shows traffic for the specified network.

3. **`-f <filter>`**  
   Similar to `-F`, it filters packets based on a specified condition. For example, `-f "port 80"` displays only HTTP traffic.

4. **`-B`**  
   This flag tells `iftop` to display bandwidth usage in bytes instead of bits, making it easier to understand the data rates in more conventional terms.

5. **`-N`**  
   Instead of displaying service names, this option will show port numbers, which can be useful for more technical analysis.

6. **`-s <seconds>`**  
   Sets the sampling interval for how often to update the display. For instance, `-s 2` updates every 2 seconds.

7. **`-t`**  
   Runs `iftop` in non-interactive mode. This is useful for logging or capturing output to a file.

8. **`-h`**  
   Displays help information for `iftop`, including all available options and usage.

9. **`-n`**  
   Disables DNS resolution, which can speed up the display if you do not need to resolve IP addresses to hostnames.

10. **`-N`**  
    When combined with `-n`, it shows port numbers instead of resolving them to service names.

11. **`-p`**  
    Places `iftop` into "promiscuous" mode, allowing it to capture all packets on the network segment, not just those destined for the interface.

12. **`-m <size>`**  
    Sets the maximum number of connections to display, for example, `-m 20` limits to the top 20 connections.

13. **`-e <size>`**  
    Sets the number of lines to display per connection (the default is 2).

14. **`-d <duration>`**  
    Sets the duration to display each connection (default is 10 seconds).

**Lines:** 21  
**Characters:** 1095  
**Filename:**
```bash
nvim iftop_detailed_flags_and_options.md
```
