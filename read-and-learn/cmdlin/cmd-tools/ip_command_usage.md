### Timestamp: 2024-10-19 15:27:00 UTC

The command `ip` is a powerful tool in Linux for managing various networking tasks, including routing, device management, policy routing, and tunneling. It is part of the `iproute2` package and serves as a more modern replacement for older tools like `ifconfig` and `route`. Below are some common usages:

- **Display Network Interfaces:**  
  ```bash
  ip addr show
  ```

- **Show Routing Table:**  
  ```bash
  ip route show
  ```

- **Add a New Route:**  
  ```bash
  ip route add 192.168.1.0/24 via 192.168.1.1
  ```

- **Delete a Route:**  
  ```bash
  ip route del 192.168.1.0/24
  ```

- **Bring Up/Down an Interface:**  
  ```bash
  ip link set dev eth0 up
  ip link set dev eth0 down
  ```

- **Show Tunnel Information:**  
  ```bash
  ip tunnel show
  ```

This command provides extensive functionality for network configuration, making it essential for system administrators and network engineers.

### Lines: 10  
### Characters: 1,004  

```bash
nvim ip_command_usage.md
```
