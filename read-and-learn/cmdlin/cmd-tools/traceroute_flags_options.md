**Timestamp:** 2024-10-19 12:47:22  
**Short Description:** A concise list of `traceroute` command flags and options with brief descriptions.  
**Number of Lines:** 12  
**Characters:** 422  

Here’s a list of common flags and options for the `traceroute` command:

- `-m <max_ttl>`: Set the maximum time-to-live (TTL) for the packets.
- `-p <port>`: Specify the destination port number to connect to.
- `-w <wait_time>`: Set the time to wait for a response (in seconds).
- `-q <n_queries>`: Set the number of probes to send per hop (default is 3).
- `-I`: Use ICMP ECHO instead of UDP datagrams.
- `-T`: Use TCP SYN packets instead of UDP.
- `-6`: Use IPv6 instead of IPv4.
- `-n`: Show numeric addresses instead of resolving hostnames.
- `-h`: Display help and usage information.

```bash
nvim traceroute_flags_options.md
```
