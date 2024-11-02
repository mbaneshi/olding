#!/bin/bash

# Function to handle errors
handle_error() {
  echo "Error on line $1"
  rollback
  exit 1
}

# Function to rollback changes
rollback() {
  echo "Rolling back changes..."
  if [[ -d "$PROJECT_NAME" ]]; then
    rm -rf "$PROJECT_NAME" # Remove the project directory if it exists
  fi
  echo "Rollback complete. No changes have been made."
}

# Function to check for required commands
check_commands() {
  local commands=("docker" "docker-compose" "git" "gh" "jq")
  for cmd in "${commands[@]}"; do
    if ! command -v "$cmd" &>/dev/null; then
      echo "$cmd is not installed. Please install it to continue."
      return 1
    fi
  done
  return 0
}

# Function to check for Ngrok
check_ngrok() {
  if ! command -v ngrok &>/dev/null; then
    echo "Ngrok is not installed. Please install Ngrok to continue."
    return 1
  fi
  return 0
}

# Function to check for .env file and required keys
check_env_file() {
  if [[ ! -f ".env" ]]; then
    echo "The .env file does not exist. Please create one with the required variables."
    return 1
  else
    echo ".env file found."
  fi

  # Load the .env file
  source .env

  # Define required keys
  REQUIRED_KEYS=("MY_SECRET" "ANOTHER_KEY" "TELEGRAM_TOKEN" "GH_ORG"
    "PROJECT_NAME" "DJANGO_APP" "POSTGRES_DB" "POSTGRES_USER"
    "POSTGRES_PASSWORD" "DJANGO_PORT" "NGROK_PORT")

  # Check for required keys and their values
  for KEY in "${REQUIRED_KEYS[@]}"; do
    if [[ -z "${!KEY}" ]]; then
      echo "The key '$KEY' is missing or has an empty value in the .env file."
      return 1
    else
      echo "Key '$KEY' is set with value: ${!KEY}"
    fi
  done

  return 0
}

# Function to create project files
create_project_files() {
  echo "Creating project directory..."
  mkdir -p "$PROJECT_NAME" || handle_error $LINENO
  cd "$PROJECT_NAME" || handle_error $LINENO

  # Initialize a Git repository
  echo "Initializing Git repository..."
  git init || handle_error $LINENO

  # Create necessary files
  create_gitignore
  create_readme
  create_dockerfile
  create_docker_compose
  create_requirements
}

# Function to create .gitignore
create_gitignore() {
  echo "Creating .gitignore..."
  cat <<EOF >.gitignore
__pycache__/
*.pyc
*.pyo
*.db
.env
postgres_data/
EOF
}

# Function to create README.md
create_readme() {
  echo "Creating README.md..."
  cat <<EOF >README.md
# $PROJECT_NAME

## Overview
This project is a Dockerized Django REST API for a Telegram bot, using PostgreSQL as the database and Ngrok for public webhooks.

## Setup Instructions

1. Clone the repository.
2. Run \`docker compose up --build\` to start the project.
3. Set your Telegram bot webhook using the public Ngrok URL.

## Environment Variables

This project uses the following environment variables, stored in the \`.env\` file:
- \`MY_SECRET\`
- \`ANOTHER_KEY\`
- \`TELEGRAM_TOKEN\`
- \`GH_ORG\`
- \`PROJECT_NAME\`
- \`DJANGO_APP\`
- \`POSTGRES_DB\`
- \`POSTGRES_USER\`
- \`POSTGRES_PASSWORD\`
- \`DJANGO_PORT\`
- \`NGROK_PORT\`

## License
MIT License
EOF
}

# Function to create Dockerfile
create_dockerfile() {
  echo "Creating Dockerfile..."
  cat <<EOF >Dockerfile
FROM python:3.11-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY . /app/

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
EOF
}

# Function to create docker-compose.yml
create_docker_compose() {
  echo "Creating docker-compose.yml..."
  cat <<EOF >docker-compose.yml
version: '3'

services:
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: \${POSTGRES_DB}
      POSTGRES_USER: \${POSTGRES_USER}
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  web:
    build: .
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/app
    ports:
      - "\${DJANGO_PORT}:8000"
    depends_on:
      - db
    environment:
      - POSTGRES_DB=\${POSTGRES_DB}
      - POSTGRES_USER=\${POSTGRES_USER}
      - POSTGRES_PASSWORD=\${POSTGRES_PASSWORD}

volumes:
  postgres_data:
EOF
}

# Function to create requirements.txt
create_requirements() {
  echo "Creating requirements.txt..."
  cat <<EOF >requirements.txt
django
djangorestframework
psycopg2
python-telegram-bot
EOF
}

# Function to build Docker containers
build_docker_containers() {
  echo "Building Docker containers..."
  if ! docker compose up -d --build; then # Changed to docker compose
    echo "Failed to build Docker containers."
    rollback
    exit 1
  fi
}

# Function to create Django project and app
create_django_project_and_app() {
  echo "Creating Django project and app..."
  docker compose exec web django-admin startproject "$PROJECT_NAME" . || handle_error $LINENO
  docker compose exec web python manage.py startapp "$DJANGO_APP" || handle_error $LINENO
}

# Function to configure Django settings for PostgreSQL
configure_django_settings() {
  echo "Configuring Django settings..."
  sed -i "/DATABASES =/a\\
DATABASES = {\\
    'default': {\\
        'ENGINE': 'django.db.backends.postgresql',\\
        'NAME': '\$POSTGRES_DB',\\
        'USER': '\$POSTGRES_USER',\\
        'PASSWORD': '\$POSTGRES_PASSWORD',\\
        'HOST': 'db',\\
        'PORT': '5432',\\
    }\\
}" "$PROJECT_NAME/settings.py" || handle_error $LINENO

  # Add DRF and bot app to installed apps
  sed -i "/INSTALLED_APPS =/a\\
    'rest_framework',\\
    '$DJANGO_APP'," "$PROJECT_NAME/settings.py" || handle_error $LINENO
}

# Function to create basic webhook API in views.py
create_webhook_api() {
  echo "Creating basic webhook API..."
  cat <<EOF >"$DJANGO_APP/views.py"
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def telegram_webhook(request):
    data = request.data
    print(data)  # Log incoming data for now
    return Response({"status": "ok"})
EOF
}

# Function to configure URLs for the webhook
configure_urls() {
  echo "Configuring URLs..."
  cat <<EOF >"$DJANGO_APP/urls.py"
from django.urls import path
from .views import telegram_webhook

urlpatterns = [
    path('webhook/', telegram_webhook, name='telegram_webhook'),
]
EOF

  # Update main Django URLs
  sed -i "/urlpatterns =/a\\
    path('$DJANGO_APP/', include('$DJANGO_APP.urls'))," "$PROJECT_NAME/urls.py" || handle_error $LINENO
}

# Function to run Django migrations
run_migrations() {
  echo "Running migrations..."
  docker compose exec web python manage.py migrate || handle_error $LINENO
}

# Function to start ngrok
start_ngrok() {
  echo "Starting ngrok..."
  if ! curl --silent --show-error http://127.0.0.1:$NGROK_PORT/api/tunnels; then
    echo "Ngrok API is not responding. Starting ngrok..."
    if ! docker run -d --name ngrok -e NGROK_AUTHTOKEN=\$NGROK_AUTHTOKEN -p $NGROK_PORT:$NGROK_PORT ngrok/ngrok http $NGROK_PORT; then
      echo "Failed to start ngrok."
      rollback
      exit 1
    fi
  fi

  # Get ngrok public URL
  local ngrok_url
  ngrok_url=$(curl -s http://127.0.0.1:$NGROK_PORT/api/tunnels | jq -r '.tunnels[0].public_url')
  echo "Ngrok URL: $ngrok_url"
}

# Main execution flow
main() {
  # Check for required commands
  if ! check_commands; then
    exit 1
  fi

  # Check for Ngrok
  if ! check_ngrok; then
    exit 1
  fi

  # Check for .env file and required variables
  if ! check_env_file; then
    exit 1
  fi

  # Create project files
  create_project_files

  # Build Docker containers
  build_docker_containers

  # Create Django project and app
  create_django_project_and_app

  # Configure Django settings
  configure_django_settings

  # Create webhook API
  create_webhook_api

  # Configure URLs
  configure_urls

  # Run migrations
  run_migrations

  # Start ngrok
  start_ngrok

  echo "Setup complete! Your Django REST API is ready."
}

# Trap errors and call handle_error
trap 'handle_error $LINENO' ERR

# Call the main function
main
