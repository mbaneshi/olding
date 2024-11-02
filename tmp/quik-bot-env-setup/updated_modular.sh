#!/bin/bash

# Constants
CHECKPOINT_FILE=".script_status"
MAX_RETRIES=5
BACKOFF_DELAY=1

# Function to handle errors
handle_error() {
  echo "Error on line $1"
  rollback
  exit 1
}

# Function to update checkpoint status
update_checkpoint() {
  echo "$1" >"$CHECKPOINT_FILE"
}

# Function to read current checkpoint
get_checkpoint() {
  if [[ -f "$CHECKPOINT_FILE" ]]; then
    cat "$CHECKPOINT_FILE"
  else
    echo "START"
  fi
}

# Function to retry a command with exponential backoff
retry() {
  local max_attempts=$1
  shift
  local delay=$BACKOFF_DELAY

  for ((attempt = 1; attempt <= max_attempts; attempt++)); do
    "$@" && return 0 # If the command succeeds, return

    echo "Attempt $attempt failed. Retrying in $delay seconds..."
    sleep $delay

    # Exponential backoff
    delay=$((delay * 2))
  done

  echo "All attempts failed. Exiting..."
  return 1
}

# Function to rollback changes
rollback() {
  echo "Rolling back changes..."
  if [[ -d "$PROJECT_NAME" ]]; then
    rm -rf "$PROJECT_NAME"
  fi
  echo "Rollback complete."
}

# Function to check required commands
check_commands() {
  local commands=("docker" "docker compose" "git" "gh")
  for cmd in "${commands[@]}"; do
    if ! command -v $cmd &>/dev/null; then
      echo "$cmd is not installed. Please install it to continue."
      return 1
    fi
  done
  return 0
}

# Function to check if Ngrok is installed
check_ngrok() {
  if ! command -v ngrok &>/dev/null; then
    echo "Ngrok is not installed. Please install Ngrok to continue."
    return 1
  fi
  return 0
}

# Function to check .env file and required variables
check_env_file() {
  if [[ ! -f ".env" ]]; then
    echo ".env file does not exist. Please create it."
    return 1
  fi
  source .env

  REQUIRED_KEYS=("MY_SECRET" "ANOTHER_KEY" "TELEGRAM_TOKEN" "GH_ORG"
    "PROJECT_NAME" "DJANGO_APP" "POSTGRES_DB" "POSTGRES_USER"
    "POSTGRES_PASSWORD" "DJANGO_PORT" "NGROK_PORT")

  for KEY in "${REQUIRED_KEYS[@]}"; do
    if [[ -z "${!KEY}" ]]; then
      echo "The key '$KEY' is missing or has an empty value in the .env file."
      return 1
    fi
  done
  return 0
}

# Function to create project files
create_project_files() {
  echo "Creating project directory and files..."
  mkdir -p "$PROJECT_NAME"
  cd "$PROJECT_NAME" || handle_error $LINENO
  git init || handle_error $LINENO

  cat <<EOF >.gitignore
__pycache__/
*.pyc
*.pyo
*.db
.env
postgres_data/
EOF

  cat <<EOF >README.md
# $PROJECT_NAME

## Overview
This project is a Dockerized Django REST API for a Telegram bot, using PostgreSQL and Ngrok.

## Setup Instructions
1. Clone the repository.
2. Run \`docker compose up --build\` to start the project.

## Environment Variables
- Various environment variables for configuration are listed in the .env file.
EOF

  cat <<EOF >Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r requirements.txt
COPY . /app/
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
EOF

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
    ports:
      - "\${DJANGO_PORT}:8000"
    depends_on:
      - db
volumes:
  postgres_data:
EOF

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
  retry $MAX_RETRIES docker compose up -d --build || handle_error $LINENO
}

# Function to create Django project and app
create_django_project_and_app() {
  echo "Creating Django project and app..."
  docker compose exec web django-admin startproject "$PROJECT_NAME" . || handle_error $LINENO
  docker compose exec web python manage.py startapp "$DJANGO_APP" || handle_error $LINENO
}

# Function to configure Django settings for PostgreSQL
configure_django_settings() {
  echo "Configuring Django settings for PostgreSQL..."
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

  sed -i "/INSTALLED_APPS =/a\\
    'rest_framework',\\
    '$DJANGO_APP'," "$PROJECT_NAME/settings.py" || handle_error $LINENO
}

# Function to create webhook API
create_webhook_api() {
  echo "Creating basic webhook API..."
  cat <<EOF >"$DJANGO_APP/views.py"
from rest_framework.decorators import api_view
from rest_framework.response import Response
@api_view(['POST'])
def telegram_webhook(request):
    data = request.data
    return Response({"status": "ok"})
EOF
}

# Function to configure URLs
configure_urls() {
  echo "Configuring URLs..."
  cat <<EOF >"$DJANGO_APP/urls.py"
from django.urls import path
from .views import telegram_webhook
urlpatterns = [
    path('webhook/', telegram_webhook, name='telegram_webhook'),
]
EOF

  sed -i "/urlpatterns =/a\\
    path('$DJANGO_APP/', include('$DJANGO_APP.urls'))," "$PROJECT_NAME/urls.py" || handle_error $LINENO
}

# Function to run Django migrations
run_migrations() {
  echo "Running Django migrations..."
  retry $MAX_RETRIES docker compose exec web python manage.py migrate || handle_error $LINENO
}

# Function to start ngrok and get public URL
start_ngrok() {
  echo "Starting ngrok..."
  if ! curl --silent --show-error http://127.0.0.1:$NGROK_PORT/api/tunnels; then
    echo "Ngrok API is not responding. Starting Ngrok..."
    retry $MAX_RETRIES docker run -d --name ngrok -e NGROK_AUTHTOKEN=\$NGROK_AUTHTOKEN -p $NGROK_PORT:$NGROK_PORT ngrok/ngrok http $NGROK_PORT || handle_error $LINENO
  fi

  NGROK_URL=$(curl --silent http://127.0.0.1:$NGROK_PORT/api/tunnels | jq -r '.tunnels[0].public_url')
  if [[ -z "$NGROK_URL" ]]; then
    echo "Failed to retrieve Ngrok URL."
    rollback
    exit 1
  fi
  echo "Ngrok started at $NGROK_URL"
}

# Function to set Telegram webhook
set_telegram_webhook() {
  echo "Setting Telegram webhook..."
  WEBHOOK_URL="$NGROK_URL/$DJANGO_APP/webhook/"
  retry $MAX_RETRIES curl -X POST "https://api.telegram.org/bot$TELEGRAM_TOKEN/setWebhook" -d "url=$WEBHOOK_URL" || handle_error $LINENO
  echo "Webhook set to $WEBHOOK_URL"
}

# Main script execution flow
main() {
  local checkpoint=$(get_checkpoint)

  # Step 1: Check commands
  if [[ "$checkpoint" == "START" || "$checkpoint" == "CHECK_COMMANDS" ]]; then
    echo "Checking commands..."
    check_commands || handle_error $LINENO
    update_checkpoint "CHECK_COMMANDS"
  fi

  # Step 2: Check for Ngrok
  if [[ "$checkpoint" == "CHECK_COMMANDS" || "$checkpoint" == "CHECK_NGROK" ]]; then
    echo "Checking for Ngrok..."
    check_ngrok || handle_error $LINENO
    update_checkpoint "CHECK_NGROK"
  fi

  # Step 3: Check environment file
  if [[ "$checkpoint" == "CHECK_NGROK" || "$checkpoint" == "CHECK_ENV_FILE" ]]; then
    echo "Checking .env file..."
    check_env_file || handle_error $LINENO
    update_checkpoint "CHECK_ENV_FILE"
  fi

  # Step 4: Create project files
  if [[ "$checkpoint" == "CHECK_ENV_FILE" || "$checkpoint" == "CREATE_PROJECT_FILES" ]]; then
    echo "Creating project files..."
    create_project_files || handle_error $LINENO
    update_checkpoint "CREATE_PROJECT_FILES"
  fi

  # Step 5: Build Docker containers
  if [[ "$checkpoint" == "CREATE_PROJECT_FILES" || "$checkpoint" == "BUILD_DOCKER_CONTAINERS" ]]; then
    echo "Building Docker containers..."
    build_docker_containers || handle_error $LINENO
    update_checkpoint "BUILD_DOCKER_CONTAINERS"
  fi

  # Step 6: Create Django project and app
  if [[ "$checkpoint" == "BUILD_DOCKER_CONTAINERS" || "$checkpoint" == "CREATE_DJANGO_PROJECT" ]]; then
    echo "Creating Django project and app..."
    create_django_project_and_app || handle_error $LINENO
    update_checkpoint "CREATE_DJANGO_PROJECT"
  fi

  # Step 7: Configure Django settings
  if [[ "$checkpoint" == "CREATE_DJANGO_PROJECT" || "$checkpoint" == "CONFIGURE_DJANGO_SETTINGS" ]]; then
    echo "Configuring Django settings..."
    configure_django_settings || handle_error $LINENO
    update_checkpoint "CONFIGURE_DJANGO_SETTINGS"
  fi

  # Step 8: Create webhook API
  if [[ "$checkpoint" == "CONFIGURE_DJANGO_SETTINGS" || "$checkpoint" == "CREATE_WEBHOOK_API" ]]; then
    echo "Creating webhook API..."
    create_webhook_api || handle_error $LINENO
    update_checkpoint "CREATE_WEBHOOK_API"
  fi

  # Step 9: Configure URLs
  if [[ "$checkpoint" == "CREATE_WEBHOOK_API" || "$checkpoint" == "CONFIGURE_URLS" ]]; then
    echo "Configuring URLs..."
    configure_urls || handle_error $LINENO
    update_checkpoint "CONFIGURE_URLS"
  fi

  # Step 10: Run migrations
  if [[ "$checkpoint" == "CONFIGURE_URLS" || "$checkpoint" == "RUN_MIGRATIONS" ]]; then
    echo "Running migrations..."
    run_migrations || handle_error $LINENO
    update_checkpoint "RUN_MIGRATIONS"
  fi

  # Step 11: Start ngrok and get public URL
  if [[ "$checkpoint" == "RUN_MIGRATIONS" || "$checkpoint" == "START_NGROK" ]]; then
    echo "Starting Ngrok..."
    start_ngrok || handle_error $LINENO
    update_checkpoint "START_NGROK"
  fi

  # Step 12: Set Telegram webhook
  if [[ "$checkpoint" == "START_NGROK" || "$checkpoint" == "SET_TELEGRAM_WEBHOOK" ]]; then
    echo "Setting Telegram webhook..."
    set_telegram_webhook || handle_error $LINENO
    update_checkpoint "SET_TELEGRAM_WEBHOOK"
  fi

  echo "Setup complete!"
}

# Run main function
trap 'handle_error $LINENO' ERR
main
