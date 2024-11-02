#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Step 1: Create the project root directory and subdirectories
echo "Creating project directories..."
mkdir -p project-root/caddy-with-cloudflare
mkdir -p project-root/xray-with-ws
cd project-root

# Step 2: Initialize Git repository
echo "Initializing Git repository..."
git init

# Step 3: Create .env file
echo "Creating .env file..."
cat <<EOL >.env
CLOUDFLARE_API_TOKEN=DSJj4nEkxmt4KtPc5qlGY5T5tXnLEHrDvO_jtRsx
SERVER_NAME=yourdomain.com  # Replace with your actual server name
EMAIL=your-email@example.com  # Your email for Let's Encrypt notifications
UUID=your-uuid-here         # Placeholder for UUID (will be generated)
EOL

# Step 4: Create .gitignore and .dockerignore
echo "Creating .gitignore and .dockerignore..."
cat <<EOL >.gitignore
# Ignore data directory for Caddy
caddy-with-cloudflare/data

# Ignore Xray config (if you want to keep it secret)
xray-with-ws/config.json

# Ignore environment variable files
.env
EOL

cat <<EOL >.dockerignore
# Ignore data directory for Caddy
caddy-with-cloudflare/data

# Ignore environment variable files
.env

# Ignore Git files
.git
.gitignore
EOL

# Step 5: Create Caddyfile in Caddy directory
echo "Creating Caddyfile..."
cat <<EOL >caddy-with-cloudflare/Caddyfile
{
    email {env.EMAIL}  # Use the email from the .env file
}

{\$SERVER_NAME} {
    reverse_proxy localhost:8080
    tls {
        dns cloudflare {env.CLOUDFLARE_API_TOKEN}
    }
}
EOL

# Step 6: Create Dockerfile for Caddy
echo "Creating Dockerfile for Caddy..."
cat <<EOL >caddy-with-cloudflare/Dockerfile
FROM caddy:latest

# Copy the Caddyfile into the container
COPY Caddyfile /etc/caddy/Caddyfile
EOL

# Step 7: Create Xray configuration in config.json
echo "Creating Xray configuration..."
cat <<EOL >xray-with-ws/config.json
{
  "outbounds": [{
    "protocol": "freedom",
    "settings": {}
  }],
  "inbounds": [{
    "port": 443,
    "protocol": "vmess",
    "settings": {
      "clients": [{
        "id": "{UUID}",  // Use a placeholder for UUID
        "alterId": 64
      }]
    },
    "streamSettings": {
      "network": "ws",
      "wsSettings": {
        "path": "/xray"
      }
    }
  }]
}
EOL

# Step 8: Create Dockerfile for Xray
echo "Creating Dockerfile for Xray..."
cat <<EOL >xray-with-ws/Dockerfile
FROM teddysun/xray:latest

# Copy the Xray configuration file
COPY config.json /etc/xray/config.json

# Copy the startup script
COPY start.sh /start.sh

# Set the startup script as the entrypoint
ENTRYPOINT ["/start.sh"]
EOL

# Step 9: Create startup script for Xray
echo "Creating startup script for Xray..."
cat <<EOL >xray-with-ws/start.sh
#!/bin/sh
sed -i "s/{UUID}/\$UUID/g" /etc/xray/config.json
exec xray run -config /etc/xray/config.json
EOL

# Make the startup script executable
chmod +x xray-with-ws/start.sh

# Step 10: Create UUID generation script
echo "Creating UUID generation script..."
cat <<EOL >generate_uuid.sh
#!/bin/sh
UUID=\$(cat /proc/sys/kernel/random/uuid)
echo "UUID=\$UUID" >> .env
EOL

# Make the UUID generation script executable
chmod +x generate_uuid.sh

# Step 11: Create Docker Compose file
echo "Creating docker-compose.yml file..."
cat <<EOL >docker-compose.yml
version: '3.8'  # Specify the version of the Docker Compose file format

services:
  caddy:
    build:
      context: ./caddy-with-cloudflare  # Use the context of the Caddy directory
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    env_file:
      - .env  # Specify the env file
    volumes:
      - ./caddy-with-cloudflare/data:/data      # For automatic certificate storage
      - ./caddy-with-cloudflare/Caddyfile:/etc/caddy/Caddyfile  # Mount the Caddyfile
    networks:
      - we-proxy

  xray:
    build:
      context: ./xray-with-ws  # Use the context of the Xray directory
    container_name: xray
    restart: unless-stopped
    ports:
      - "443:443"  # Map the Xray WebSocket port
    networks:
      - we-proxy

networks:
  we-proxy:  # Updated network name
    driver: bridge
EOL

# Step 12: Run UUID generation and start Docker Compose
echo "Generating UUID..."
./generate_uuid.sh

echo "Starting Docker Compose setup..."
docker-compose up -d --build

echo "Setup complete!"
