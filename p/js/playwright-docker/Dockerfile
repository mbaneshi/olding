
FROM mcr.microsoft.com/playwright:v1.43.0-focal

# Set the working directory
WORKDIR /app

# Copy the Playwright script to the container
COPY script.js .

# Set up npm proxy using the host machine IP or host.docker.internal
ENV HTTP_PROXY=http://host.docker.internal:8118
ENV HTTPS_PROXY=http://host.docker.internal:8118
ENV NO_PROXY=localhost,127.0.0.1

# Install necessary dependencies (e.g., Playwright)
RUN  --network=host npm install playwright

# Set environment variable for debugging Playwright (optional)
ENV DEBUG=pw:browser,pw:protocol

# Set environment variable for verbose logging in Node.js (optional)
ENV NODE_DEBUG=net,http,fs,tls,module,timers

# Set environment variable for verbose logging in npm (optional)
ENV NPM_CONFIG_LOGLEVEL=verbose

# Run the Playwright script
CMD ["node", "script.js"]

