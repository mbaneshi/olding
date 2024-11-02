To create an **admin panel** using **FastAPI** and **Streamlit**, where you can manage and run commands for your **Node.js Playwright project**, we need to store the commands, options, and flags in a database (SQLite for simplicity) and execute them using Python’s `subprocess` from the web interface. Here's how you can structure the project:

### Key Components:

1. **FastAPI**: Backend to handle command storage and execution.
2. **Streamlit**: Frontend to provide a user-friendly admin panel.
3. **SQLite**: Database to store command configurations.
4. **Subprocess**: Execute commands from the web panel.

### Updated Project Structure

```bash
simple_project/
│
├── simple_project/
│   ├── __init__.py
│   ├── api.py           # FastAPI backend
│   ├── cli.py           # Command execution logic using subprocess
│   ├── database.py      # SQLite DB logic to persist commands
│   └── app.py           # Streamlit web interface
│
├── tests/
│   └── test_main.py
│
└── pyproject.toml       # Poetry dependencies
```

### 1. **Database for Command Persistence (`database.py`)**

We’ll modify the database to store commands, options, and flags.

```python
# simple_project/database.py

import sqlite3
from contextlib import closing

DB_NAME = "commands.db"

def init_db():
    with closing(sqlite3.connect(DB_NAME)) as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute('''CREATE TABLE IF NOT EXISTS commands (
                              id INTEGER PRIMARY KEY AUTOINCREMENT,
                              command TEXT NOT NULL,
                              options TEXT,
                              flags TEXT)''')
            conn.commit()

def insert_command(command: str, options: str, flags: str):
    with closing(sqlite3.connect(DB_NAME)) as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute("INSERT INTO commands (command, options, flags) VALUES (?, ?, ?)",
                           (command, options, flags))
            conn.commit()

def get_commands():
    with closing(sqlite3.connect(DB_NAME)) as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute("SELECT * FROM commands")
            return cursor.fetchall()
```

### 2. **Subprocess and CLI Execution Logic (`cli.py`)**

This handles running stored commands from the database using `subprocess`.

```python
# simple_project/cli.py

import subprocess
from .database import get_commands

def run_command(command_id: int):
    """Run a command by its ID from the database."""
    commands = get_commands()
    selected_command = None
    for command in commands:
        if command[0] == command_id:
            selected_command = command
            break

    if selected_command:
        command_str = selected_command[1]
        options = selected_command[2].split() if selected_command[2] else []
        flags = selected_command[3].split() if selected_command[3] else []

        args = [command_str] + options + flags
        print(f"Running command: {args}")

        try:
            subprocess.run(args, check=True)
            return f"Command {command_str} executed successfully."
        except subprocess.CalledProcessError as e:
            return f"Command failed: {e}"
    else:
        return f"Command with ID {command_id} not found."
```

### 3. **FastAPI Backend to Manage Commands (`api.py`)**

This will expose APIs to add, list, and run commands.

```python
# simple_project/api.py

from fastapi import FastAPI
from pydantic import BaseModel
from .database import insert_command, get_commands
from .cli import run_command

app = FastAPI()

class CommandModel(BaseModel):
    command: str
    options: str
    flags: str

@app.post("/commands/")
def create_command(command: CommandModel):
    insert_command(command.command, command.options, command.flags)
    return {"message": "Command added successfully"}

@app.get("/commands/")
def read_commands():
    commands = get_commands()
    return {"commands": commands}

@app.post("/commands/{command_id}/run/")
def execute_command(command_id: int):
    result = run_command(command_id)
    return {"result": result}
```

### 4. **Streamlit Frontend to Manage Commands (`app.py`)**

This creates a simple Streamlit interface to interact with the API and manage commands.

```python
# simple_project/app.py

import streamlit as st
import requests

API_URL = "http://localhost:8000"

st.title("Admin Panel for Playwright Commands")

# Add a new command
st.header("Add a New Command")
command = st.text_input("Command")
options = st.text_input("Options (separate by space)")
flags = st.text_input("Flags (separate by space)")
if st.button("Add Command"):
    response = requests.post(f"{API_URL}/commands/", json={"command": command, "options": options, "flags": flags})
    if response.status_code == 200:
        st.success("Command added successfully")
    else:
        st.error("Failed to add command")

# List existing commands
st.header("Existing Commands")
response = requests.get(f"{API_URL}/commands/")
if response.status_code == 200:
    commands = response.json().get("commands", [])
    for cmd in commands:
        st.write(f"ID: {cmd[0]}, Command: {cmd[1]}, Options: {cmd[2]}, Flags: {cmd[3]}")
        if st.button(f"Run Command {cmd[0]}"):
            run_response = requests.post(f"{API_URL}/commands/{cmd[0]}/run/")
            st.write(run_response.json().get("result"))
else:
    st.error("Failed to load commands")
```

### 5. **Running the Admin Panel**

1. **Start FastAPI**:

   ```bash
   poetry run uvicorn simple_project.api:app --reload
   ```

2. **Run Streamlit**:
   ```bash
   poetry run streamlit run simple_project/app.py
   ```

### 6. **Playwright Setup for Node.js**

Make sure your Playwright project is set up in Node.js. You should have a separate Node.js project for Playwright, and in your database, commands would look something like:

- **Command**: `npx playwright test`
- **Options**: `--browser=chromium`
- **Flags**: `--headed`

This structure allows you to manage your Playwright commands through the web interface and run them on demand.

### Conclusion

You now have an admin panel that:

- Stores command configurations in a database.
- Executes Playwright commands with options and flags.
- Provides a web interface using FastAPI and Streamlit to manage and execute commands.

```bash
nvim admin_panel_fastapi_streamlit.md
```
