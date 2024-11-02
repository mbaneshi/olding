**Timestamp**: 2024-10-18 13:20:00  
**Short Description**: List of all available keys for Xray server-side config  
**Response Length**: 75 lines, 4114 characters

Here is a comprehensive list of all keys available for **Xray server-side configurations** (`config.json`). Similar to the client-side configuration, the server config includes protocol, stream, transport, and security settings, but it also includes keys for managing inbound traffic and user authentication on the server.

### **General Keys:**

- **`log`**:
  - `loglevel`: Controls logging level (`debug`, `info`, `warning`, `error`, `none`).
  - `access`: Path to access log file.
  - `error`: Path to error log file.

### **Inbound Keys:**

- **`inbounds`**:
  - `port`: The port on which the server listens.
  - `protocol`: The protocol for the inbound connection (`vmess`, `vless`, `shadowsocks`, `socks`, etc.).
  - `listen`: The IP address the server listens on (`0.0.0.0` for all interfaces).
  - `settings`: Protocol-specific settings.
    - For `vmess` and `vless`, it contains user and security-related keys:
      - `clients`: List of users who are allowed to connect.
        - `id`: User ID (UUID).
        - `alterId`: (VMess only, deprecated in newer versions).
        - `level`: User level.
        - `email`: User email for identification.
      - `decryption`: Type of encryption (e.g., `"none"` for VLESS).
      - `fallbacks`: Fallbacks for VLESS XTLS servers.
    - For `shadowsocks`, it contains:
      - `password`: The Shadowsocks password.
      - `method`: Encryption method (`aes-256-gcm`, `chacha20-ietf-poly1305`, etc.).
  - `streamSettings`: Defines how the connection is transported (e.g., via `tcp`, `kcp`, `ws`, etc.).
  - `sniffing`: For detecting underlying protocols (`tls`, `http`, etc.).

### **Outbound Keys**:

- **`outbounds`**:
  - The outbound rules define how the server sends traffic.
  - `protocol`: Protocol for outbound (`freedom` for direct access, `blackhole` to drop packets, etc.).
  - `settings`: Protocol-specific settings. For instance:
    - `freedom`: No specific settings.
    - `blackhole`: No specific settings.
  - `streamSettings`: Defines transport options (similar to `inbounds`).

### **Transport/Stream Settings Keys**:

- **`streamSettings`**:

  - **`network`**: Transport layer (`tcp`, `kcp`, `ws`, `http`, `quic`, `grpc`).
  - **`security`**: Type of security (`tls`, `xtls`, `none`).
    - **`tlsSettings`**:
      - `serverName`: Server name for SNI.
      - `certificates`: TLS certificate settings.
        - `certificateFile`: Path to the TLS certificate file.
        - `keyFile`: Path to the TLS private key file.
      - `allowInsecure`: Whether to allow insecure connections (default `false`).
    - **`xtlsSettings`**:
      - Similar to `tlsSettings` but with enhanced settings for XTLS.
    - **`realitySettings`**: Used for Reality protocol on servers.
      - `show`: Whether to show Reality settings.
      - `fingerprint`: Specifies the TLS fingerprint.
      - `serverNames`: List of server names.
  - **TCP** (`tcpSettings`):
    - `header`: TCP obfuscation settings (`none`, `http`).
      - `request`: HTTP headers for masking.
  - **mKCP** (`kcpSettings`):

    - `mtu`: Maximum Transmission Unit.
    - `tti`: Time to transmit interval.
    - `uplinkCapacity`: Uplink speed capacity.
    - `downlinkCapacity`: Downlink speed capacity.
    - `congestion`: Whether to enable congestion control.
    - `header`: KCP header obfuscation (`none`, `srtp`, `utp`, `wechat-video`, etc.).

  - **WebSocket** (`wsSettings`):

    - `path`: WebSocket URL path.
    - `headers`: Custom HTTP headers.

  - **QUIC** (`quicSettings`):

    - `security`: Type of encryption (`none`, `aes-128-gcm`, `chacha20-poly1305`).
    - `key`: Encryption key.
    - `header`: QUIC header obfuscation (`none`, `srtp`, etc.).

  - **gRPC** (`grpcSettings`):
    - `serviceName`: The service name for gRPC transport.

### **Policy Settings**:

- **`policy`**:
  - Allows setting different levels of policies for different users.
  - `levels`: User levels.
    - `handshake`: Maximum handshake time.
    - `connIdle`: Idle timeout for connections.
    - `uplinkOnly` / `downlinkOnly`: Data rate limits.
    - `statsUserUplink` / `statsUserDownlink`: Whether to collect statistics.

### **Routing Settings**:

- **`routing`**:
  - Controls how incoming traffic is routed.
  - `domainStrategy`: How domains are resolved (`AsIs`, `IPIfNonMatch`, `IPOnDemand`).
  - `rules`: Routing rules for handling traffic.
    - `type`: The rule type (e.g., `field`).
    - `domain`: List of domains to match for this rule.
    - `ip`: List of IP addresses to match for this rule.
    - `outboundTag`: The outbound to use for this rule.
    - `port`: Port-based routing.

### **DNS Settings**:

- **`dns`**:
  - Configures DNS behavior.
  - `servers`: List of DNS servers.
  - `clientIp`: The client IP to use for DNS requests (optional).
  - `queryStrategy`: DNS query strategy (`UseIP`, `UseIPv4`, `UseIPv6`).

### **Other Important Keys**:

- **`stats`**:
  - Enables collection of traffic and performance statistics.
- **`api`**:

  - API access settings for server management.
  - `tag`: API tag.
  - `services`: List of services to enable (e.g., `StatsService`).

- **`fakedns`**:
  - Used to provide fake DNS responses for specific domains.

This list outlines the main keys used for configuring an **Xray server**. Depending on the protocol and transport method, you may need to customize certain sections.

```bash
nvim xray-server-keys.md
```
