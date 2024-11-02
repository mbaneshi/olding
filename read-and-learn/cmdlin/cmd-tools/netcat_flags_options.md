**Timestamp:** 2024-10-19 17:06:45 UTC  
**Description:** A list of flags and options for the `netcat` (nc) utility with brief descriptions.  
**Lines:** 14  
**Characters:** 611  

```bash
nvim netcat_flags_options.md
```

```
-a              Allow connections to any IP address.
-b              Allow broadcasting.
-c <cmd>       Execute <cmd> after connecting.
-e <program>   Execute <program> after connection established.
-g <host>      Source route to <host> (not universally supported).
-h              Show help information.
-i <seconds>   Delay interval for lines sent.
-l              Listen mode (server).
-n              No DNS resolution, only numerical IP.
-p <port>      Local port number to use.
-r              Randomize local and remote ports.
-s <addr>      Local address to bind to.
-u              UDP mode instead of TCP.
-v              Verbose mode, show more information.
-w <seconds>   Timeout for connects and final net reads.
```
