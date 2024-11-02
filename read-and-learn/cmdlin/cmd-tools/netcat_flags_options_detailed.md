**Timestamp:** 2024-10-19 17:08:15 UTC  
**Description:** Detailed list of flags and options for the `netcat` (nc) utility, including explanations of their functionality.  
**Lines:** 35  
**Characters:** 1,488  

```bash
nvim netcat_flags_options_detailed.md
```

```
-a              Allow connections to any IP address. Useful for flexible listening.
-b              Allow broadcasting. This enables the sending of broadcast packets.
-c <cmd>       Execute <cmd> after connecting. This can be used to pipe output to a command.
-e <program>   Execute <program> after the connection is established. Often used for reverse shells.
-g <host>      Source route to <host>. Not commonly supported; used for routing through specific hosts.
-h              Show help information. Displays available options and their descriptions.
-i <seconds>   Delay interval for lines sent. This is useful for controlling the rate of data transmission.
-l              Listen mode (server). This flag tells netcat to listen for incoming connections instead of initiating them.
-n              No DNS resolution. This makes netcat operate using only numerical IP addresses, speeding up connections.
-p <port>      Local port number to use. Specifies the port number for local connections or listening.
-r              Randomize local and remote ports. Useful for testing by avoiding predictable port use.
-s <addr>      Local address to bind to. Allows specification of the IP address netcat will use to send data.
-u              UDP mode instead of TCP. Switches the transport layer protocol to UDP for connectionless communication.
-v              Verbose mode. Enables more detailed output, which is helpful for debugging connection issues.
-w <seconds>   Timeout for connects and final net reads. This prevents hanging indefinitely on connections.
```
