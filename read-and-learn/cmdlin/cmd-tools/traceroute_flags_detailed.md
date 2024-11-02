**Timestamp:** 2024-10-19 12:50:45  
**Short Description:** Detailed descriptions of `traceroute` command flags and options.  
**Number of Lines:** 27  
**Characters:** 1038  

Here’s a more detailed list of the flags and options for the `traceroute` command:

- `-m <max_ttl>`:  
  Sets the maximum time-to-live (TTL) for the packets sent. This value determines the maximum number of hops (routers) that packets can traverse before being discarded. It’s useful for limiting the number of hops in a trace.

- `-p <port>`:  
  Specifies the destination port number to connect to. This is particularly useful when probing services that listen on specific ports, helping to determine the route to that service.

- `-w <wait_time>`:  
  Sets the time (in seconds) to wait for a response from each hop before timing out. This can help adjust the responsiveness of the command based on network latency.

- `-q <n_queries>`:  
  Sets the number of probes to send per hop. By default, `traceroute` sends three probes, but you can adjust this to send more or fewer, which can be helpful for getting a more reliable result.

- `-I`:  
  Instructs `traceroute` to use ICMP ECHO instead of UDP datagrams. This can be useful for troubleshooting firewalls that may block UDP traffic but allow ICMP packets.

- `-T`:  
  Uses TCP SYN packets instead of the default UDP packets. This method can help bypass certain security measures that might block UDP traffic, allowing you to see routes to TCP-based services.

- `-6`:  
  Forces `traceroute` to use IPv6 instead of IPv4. This option is essential for troubleshooting and diagnosing connectivity issues in an IPv6 network.

- `-n`:  
  Displays numeric addresses instead of resolving hostnames. This option can speed up the command execution, especially in environments where DNS resolution is slow or unreliable.

- `-h`:  
  Displays help information, including a summary of all available options and usage syntax for the command.

- `-r`:  
  Bypasses the normal routing table and uses the specified destination address directly, which can be useful in testing specific routes.

- `-g <gateway>`:  
  Specifies a loose source route through the specified gateway. It can be used to force packets through specific hops, which can be helpful in diagnosing routing issues.

- `-A`:  
  Enables the use of ARP (Address Resolution Protocol) requests to resolve link-layer addresses, which can assist in diagnosing issues on local networks.

```bash
nvim traceroute_flags_detailed.md
```
