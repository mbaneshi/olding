pwd 180ms  Tue 01 Oct 2024 07:36:14 PM UTC
/home/mehdi/xray-docker-cloudflare-caddy

ls -la Tue 01 Oct 2024 07:36:52 PM UTC
total 40
drwxrwxr-x 5 mehdi mehdi 4096 Oct 1 19:33 ./
drwxr-x--- 25 mehdi mehdi 4096 Oct 1 19:28 ../
drwxrwxr-x 2 mehdi mehdi 4096 Oct 1 19:34 caddy/
-rw-rw-r-- 1 mehdi mehdi 787 Oct 1 19:31 docker-compose.yml
-rw-rw-r-- 1 mehdi mehdi 186 Oct 1 09:35 .dockerignore
-rw-rw-r-- 1 mehdi mehdi 321 Oct 1 19:33 .env
drwxrwxr-x 8 mehdi mehdi 4096 Oct 1 16:48 .git/
-rw-rw-r-- 1 mehdi mehdi 405 Oct 1 10:50 .gitignore
-rw-rw-r-- 1 mehdi mehdi 2941 Oct 1 16:18 README.md
drwxrwxr-x 2 mehdi mehdi 4096 Oct 1 19:34 xray/

│ File: docker-compose.yml
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
services:
caddy:
build:
context: ./caddy
dockerfile: Dockerfile
ports:
- "${CADDY_PORT}:${CADDY_PORT}"
- "${CADDY_SSL_PORT}:${CADDY_SSL_PORT}"
volumes:
- ./caddy/Caddyfile:/etc/caddy/Caddyfile
- caddy_data:/data
- caddy_config:/config
environment:
- CLOUDFLARE_TOKEN=${CLOUDFLARE_API_TOKEN} # Update to match your .env variable name
networks:
- caddy_xray_network

xray:
build:
context: ./xray
dockerfile: Dockerfile
volumes:
- ./xray/config.json:/etc/xray/config.json # Update to ensure this path is correct
environment:
- UUID=${UUID}
networks:
- caddy_xray_network

volumes:
caddy_data:
caddy_config:

networks:
caddy_xray_network:
driver: bridge


───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 File: Caddyfile
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 # Set the domain name
 proxy.tonmastery.xyz {  # Updated to match DOMAIN from .env
     # Enable automatic HTTPS with Let's Encrypt using Cloudflare DNS
     tls {
         dns cloudflare {
             api_token ${CLOUDFLARE_API_TOKEN}  # Matches CLOUDFLARE_API_TOKEN from .env
         }
     }

     # Reverse proxy to Xray service using WebSocket for VLESS
     reverse_proxy xray:10000 {
         # Define the path for WebSocket connections
         header_up Host {http.request.host}
         header_up X-Real-IP {remote.host}
         header_up X-Forwarded-For {remote.host}
         header_up X-Forwarded-Proto {scheme}

         # Ensure to route traffic to the WebSocket path
         uri /ws  # WebSocket path
     }

     # Optional: Add logging for debugging
     log {
         output file /var/log/caddy/access.log
         level info
     }

     # Optional: Enable gzip compression
     encode gzip

     # Optional: Handle static file serving
     # root * /path/to/static/files
     # file_server
 }



Dockerfile
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

 # Stage 1: Build Caddy with Cloudflare DNS plugin
 FROM caddy:builder AS builder

 # Install the Cloudflare DNS provider plugin
 RUN xcaddy build --with github.com/caddy-dns/cloudflare

 # Stage 2: Final image
 FROM caddy:latest

 # Copy the Caddy binary from the builder stage
 COPY --from=builder /usr/bin/caddy /usr/bin/caddy

 # Copy Caddyfile configuration
 COPY Caddyfile /etc/caddy/Caddyfile

 # Expose ports (80 for HTTP and 443 for HTTPS)
 EXPOSE 80
 EXPOSE 443

 # Set the working directory
 WORKDIR /etc/caddy

 # Start Caddy with the specified configuration




: config.json
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 {
   "outbounds": [{
     "protocol": "freedom",
     "settings": {}
   }],
   "inbounds": [{
     "port": 10000,  // Make sure this matches XRAY_PORT from .env
     "protocol": "vless",
     "settings": {
       "clients": [{
         "id": "${UUID}",  // Use UUID from .env
         "alterId": 0
       }],
       "decryption": "none"  // Set to "none" for VLESS
     },
     "streamSettings": {
       "network": "ws",  // Using WebSocket
       "wsSettings": {
         "path": "/ws"  // WebSocket path
       }
     }
   }],
   "log": {
     "loglevel": "info"
   }
 }

Dockerfile
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 # Use the official teddysun/xray image as the base
 FROM teddysun/xray:latest

 # Set environment variables (if any)
 # ENV XRAY_ENV=value  # Uncomment and set any environment variables you need

 # Add any additional dependencies or tools if needed
 # RUN apt-get update && apt-get install -y \
 #     some-package \
 #     && rm -rf /var/lib/apt/lists/*

 # Copy any local files (if required)
 # COPY ./local-file /path/in/container/

 # Expose the necessary ports (if applicable)
 EXPOSE 10000  # Change this based on your configuration

 # Set the command to run the Xray service


