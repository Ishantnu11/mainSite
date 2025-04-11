FROM ubuntu:22.04

# Set up timezone and avoid prompts
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC

# Install essential system packages and Node.js
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    vim \
    nano \
    openssh-server \
    sudo \
    net-tools \
    iputils-ping \
    htop \
    ufw \
    nginx \
    && mkdir /run/sshd \
    && echo 'root:vpsadmin' | chpasswd \
    && sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config \
    && sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

# Set up working directory
WORKDIR /app

# Copy configuration files
COPY nginx.conf /etc/nginx/nginx.conf
COPY package*.json ./

# Create directory structure
RUN mkdir -p /app/frontend /app/backend /app/logs

# Set up Nginx logs
RUN mkdir -p /var/log/nginx && \
    touch /var/log/nginx/access.log && \
    touch /var/log/nginx/error.log

# Expose ports
EXPOSE 22 80 443 3000 3001

# Copy startup script
COPY <<EOF /app/start.sh
#!/bin/bash
service ssh start
service nginx start
tail -f /var/log/nginx/access.log /var/log/nginx/error.log
EOF

RUN chmod +x /app/start.sh

# Set working directory to root for admin access
WORKDIR /root

# Start services
CMD ["/app/start.sh"] 