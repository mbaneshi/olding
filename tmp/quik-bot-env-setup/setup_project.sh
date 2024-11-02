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

# Check for required commands
check_commands() {
  if ! command -v docker &>/dev/null; then
    echo "Docker is not installed. Please install Docker to continue."
    return 1
  fi

  if ! command -v docker compose &>/dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose to continue."
    return 1
  fi

  if ! command -v git &>/dev/null; then
    echo "Git is not installed. Please install Git to continue."
    return 1
  fi

  if ! command -v gh &>/dev/null; then
    echo "GitHub CLI (gh) is not installed. Please install GitHub CLI to continue."
    return 1
  fi

  return 0
}

# Check for .env file and required keys
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

# Check for commands
if ! check_commands; then
  echo "Please install the missing prerequisites before running the script."
  exit 1
fi

# Check for .env file and validate
if ! check_env_file; then
  echo "Please ensure that the .env file is set up correctly before proceeding."
  exit 1
fi

# Prompt user to confirm readiness
echo "All prerequisites are in place. Do you want to proceed with the setup? (yes/no)"
read -r response

if [[ "$response" != "yes" ]]; then
  echo "Exiting setup. Please ensure you are ready before running the script."
  exit 0
fi

# Create project directory
echo "Creating project directory..."
mkdir -p "$PROJECT_NAME" || handle_error $LINENO
cd "$PROJECT_NAME" || handle_error $LINENO

# Initialize a Git repository
echo "Initializing Git repository..."
git init || handle_error $LINENO

# Create .gitignore file
echo "Creating .gitignore..."
cat <<EOF >.gitignore
__pycache__/
*.pyc
*.pyo
*.db
.env
postgres_data/
EOF

# Create README.md
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

# Create Dockerfile
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

# Create docker-compose.yml
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

# Create requirements.txt
echo "Creating requirements.txt..."
cat <<EOF >requirements.txt
django
djangorestframework
psycopg2
python-telegram-bot
EOF

# Build the Docker containers
echo "Building Docker containers..."
if ! docker compose up -d --build; then # Changed to docker compose
  echo "Failed to build Docker containers."
  rollback
  exit 1
fi

# Create the Django project and app
echo "Creating Django project and app..."
docker compose exec web django-admin startproject "$PROJECT_NAME" . || handle_error $LINENO
docker compose exec web python manage.py startapp "$DJANGO_APP" || handle_error $LINENO

# Configure Django settings for PostgreSQL
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

# Create basic webhook API in views.py
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

# Create URLs for the webhook
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

# Run Django migrations
echo "Running migrations..."
docker compose exec web python manage.py migrate || handle_error $LINENO

# Start ngrok for port 8000
echo "Starting ngrok..."
if ! curl --silent --show-error http://127.0.0.1:$NGROK_PORT/api/tunnels; then
  echo "Ngrok API is not responding. Starting ngrok..."
  if ! docker run -d -p $NGROK_PORT:4040 -p $DJANGO_PORT:8000 --network="host" wernight/ngrok ngrok http $DJANGO_PORT; then
    echo "Failed to start Ngrok."
    rollback
    exit 1
  fi
  sleep 2 # Give ngrok time to start
fi

NGROK_URL=$(curl --silent http://127.0.0.1:$NGROK_PORT/api/tunnels | jq -r '.tunnels[0].public_url')
if [[ -z "$NGROK_URL" ]]; then
  echo "Failed to retrieve Ngrok URL."
  rollback
  exit 1
else
  echo "Ngrok started at $NGROK_URL"
fi

# Set the Telegram bot webhook
echo "Setting Telegram webhook..."
WEBHOOK_URL="$NGROK_URL/$DJANGO_APP/webhook/"
if ! curl -X POST "https://api.telegram.org/bot$TELEGRAM_TOKEN/setWebhook" -d "url=$WEBHOOK_URL"; then
  echo "Failed to set Telegram webhook."
  rollback
  exit 1
fi

echo "Webhook set to $WEBHOOK_URL"

# Initialize GitHub repository
echo "Creating GitHub repository..."
if ! gh repo create "$GH_ORG/$REPO_NAME" --public --source=. --remote=origin --push; then
  echo "Failed to create GitHub repository."
  rollback
  exit 1
fi

echo "Pushing changes to GitHub..."
git add . || handle_error $LINENO
git commit -m "Initial commit with Django bot setup" || handle_error $LINENO
git branch -M main || handle_error $LINENO
git push -u origin main || handle_error $LINENO

# Done
echo "Setup complete! Your bot is running."
