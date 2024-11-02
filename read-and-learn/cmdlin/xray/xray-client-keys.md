**Timestamp**: 2024-10-18 13:12:00  
**Short Description**: List of all keys available in Xray client-side config  
**Response Length**: 73 lines, 3918 characters

Here is a comprehensive list of the keys used in an **Xray client-side config** (`config.json`). The structure of the configuration is modular, so different sections (like inbounds, outbounds, transport, etc.) have their own specific keys. Each key has its own function depending on the protocol, stream settings, security, etc.

### **General Keys:**

- **`log`**:

  - `loglevel`: Controls logging level (`debug`, `info`, `warning`, `error`, `none`).

- **`inbounds`**:

  - `port`: The port to listen on.
  - `protocol`: Protocol to use (`socks`, `http`, `shadowsocks`, etc.).
  - `settings`: Detailed settings depending on the protocol (e.g., authentication for `socks`, `udp` support, etc.).
  - `streamSettings`: Optional settings for transport layers (similar to outbounds).
  - `sniffing`: For detecting underlying protocols.

- **`outbounds`**:
  - `protocol`: The outbound protocol (`vmess`, `vless`, `socks`, `freedom`, etc.).
  - `settings`: Settings for the outbound protocol (e.g., for `vmess`, you have `vnext`, `users`, etc.).
  - `streamSettings`: Options for how to transport packets (TCP, mKCP, WebSocket, HTTP/2, QUIC).
  - `mux`: Settings for multiplexing connections.

### **Common Protocol-Specific Keys**

- **VLESS**:

  - `vnext`: The server to connect to.
    - `address`: Server address.
    - `port`: Server port.
    - `users`: Authentication information for VLESS.
      - `id`: The unique ID (UUID).
      - `encryption`: Encryption method, usually `"none"` for VLESS.

- **VMess**:

  - `vnext`: List of servers to connect to.
    - `address`: Server IP/domain.
    - `port`: Server port.
    - `users`: User information.
      - `id`: UUID for the user.
      - `alterId`: Secondary identification (deprecated in newer versions).
      - `security`: Encryption method (`auto`, `aes-128-gcm`, `chacha20-poly1305`).

- **Shadowsocks**:
  - `servers`: The servers to use.
    - `address`: Server address.
    - `port`: Server port.
    - `method`: Encryption method (e.g., `aes-256-gcm`, `chacha20-ietf-poly1305`).
    - `password`: Shadowsocks password.

### **Transport/Stream Settings Keys:**

- **`streamSettings`**:

  - **`network`**: Defines the transport method (`tcp`, `kcp`, `ws`, `http`, `quic`, `grpc`).
  - **`security`**: Security type (`tls`, `none`).
    - **`tlsSettings`**:
      - `serverName`: The server name for SNI.
      - `allowInsecure`: Allows insecure TLS (default is `false`).
    - **`realitySettings`**: (Used for Reality protocol)
      - `fingerprint`: Specifies the TLS fingerprint to use.
      - `alpn`: List of application layer protocols (`h3`, `h2`, `http/1.1`).
  - **TCP** (`tcpSettings`):

    - `header`: Defines the type of header (`none`, `http`).
      - `request` / `response`: HTTP headers for a masked connection.

  - **mKCP** (`kcpSettings`):

    - `mtu`: Maximum Transmission Unit.
    - `tti`: Time to transmit interval.
    - `uplinkCapacity`: Uplink speed capacity.
    - `downlinkCapacity`: Downlink speed capacity.
    - `congestion`: Whether to enable congestion control.
    - `readBufferSize` / `writeBufferSize`: Buffer size settings.
    - `header`: Type of KCP header (`none`, `srtp`, `utp`, `wechat-video`, etc.).

  - **WebSocket** (`wsSettings`):

    - `path`: Path for the WebSocket connection.
    - `headers`: Custom headers for WebSocket.

  - **gRPC** (`grpcSettings`):
    - `serviceName`: The service name for gRPC transport.
  - **QUIC** (`quicSettings`):
    - `security`: Type of encryption (`none`, `aes-128-gcm`, `chacha20-poly1305`).
    - `key`: Key for encryption.
    - `header`: QUIC header type (`none`, `srtp`, etc.).

### **Routing Keys:**

- **`routing`**:
  - `domainStrategy`: Strategy for DNS resolution (`AsIs`, `IPIfNonMatch`, `IPOnDemand`).
  - `rules`: A list of rules for routing traffic.
    - `type`: The rule type (`field`).
    - `outboundTag`: The outbound to match for this rule.
    - `domain`: List of domains to match for this rule.
    - `ip`: List of IP addresses to match.

### **DNS Settings**

- **`dns`**:
  - `servers`: List of DNS servers.
  - `clientIp`: The client IP to use for DNS queries (optional).
  - `queryStrategy`: Strategy for DNS queries (`UseIP`, `UseIPv4`, `UseIPv6`).

### **Other Important Keys**

- **`mux`**:

  - `enabled`: Enable or disable multiplexing.
  - `concurrency`: The number of multiplexed connections allowed.

- **`policy`**:

  - `levels`: Policy levels for different users.
    - `handshake`: Timeout for handshake.
    - `connIdle`: Idle timeout for connections.
    - `uplinkOnly` / `downlinkOnly`: Limits for data transfer.

- **`stats`**:

  - Used to enable traffic and performance statistics.

- **`api`**:

  - `tag`: API tag for managing the service.
  - `services`: List of services to enable (e.g., `StatsService` for monitoring).

- **`fakedns`**:
  - Provides fake DNS answers for certain domains or IP addresses.

This list covers the key components for an **Xray client-side configuration**. Each section can be customized depending on your specific setup and network environment.

```bash
nvim xray-client-keys.md
```
