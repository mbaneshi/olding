To build a **modular dashboard** that can execute any command (e.g., Playwright commands) and dynamically compose commands from user input before sending them to `subprocess`, we'll need to:

1. **Create a modular system** for adding commands with flexible options and flags.
2. **Use a dynamic command builder** that generates the final command string from components.
3. **Leverage the `subprocess` module** for secure execution of the dynamically built command.
4. **Design the FastAPI and Streamlit interaction** such that users can input and compose commands easily from the dashboard.

### High-Level Design

1. **Backend (FastAPI)**:
   - Handle command composition requests.
   - Store commands, options, and flags in the database.
   - Provide an API to trigger command execution.
2. **Frontend (Streamlit)**:
   - Provide an interactive form to dynamically build commands.
   - Allow users to select command components (e.g., executable, options, flags).
   - Trigger the composed command execution.

### 1. **Modular Command Builder (`command_builder.py`)**

This module will handle the construction of commands based on user input. It will combine the base command (like `npx playwright test`) with options and flags provided dynamically.

```python
# simple_project/command_builder.py

class CommandBuilder:
    def __init__(self, base_command: str):
        self.base_command = base_command
        self.options = []
        self.flags = []

    def add_option(self, option: str):
        """Add an option (key-value pair)."""
        self.options.append(option)

    def add_flag(self, flag: str):
        """Add a flag (boolean switch)."""
        self.flags.append(flag)

    def build(self):
        """Compose the final command by combining base, options, and flags."""
        command = [self.base_command]
        command += self.options
        command += self.flags
        return command

    def __str__(self):
        """String representation of the final command."""
        return " ".join(self.build())
```

### 2. **Execute Composed Command (`cli.py`)**

The `cli.py` will use the `CommandBuilder` to dynamically construct and execute the command using `subprocess`.

```python
# simple_project/cli.py

import subprocess
from .command_builder import CommandBuilder

def run_composed_command(base_command: str, options: list, flags: list):
    """Build and execute a command using CommandBuilder."""
    builder = CommandBuilder(base_command)

    for option in options:
        builder.add_option(option)

    for flag in flags:
        builder.add_flag(flag)

    final_command = builder.build()

    print(f"Running command: {final_command}")

    try:
        subprocess.run(final_command, check=True)
        return "Command executed successfully"
    except subprocess.CalledProcessError as e:
        return f"Error executing command: {e}"
```

### 3. **Backend for Command Management (FastAPI - `api.py`)**

The FastAPI backend will expose endpoints for adding, composing, and running commands. It will interact with the `cli.py` to execute composed commands.

```python
# simple_project/api.py

from fastapi import FastAPI
from pydantic import BaseModel
from .database import insert_command, get_commands
from .cli import run_composed_command

app = FastAPI()

class CommandModel(BaseModel):
    base_command: str
    options: list
    flags: list

@app.post("/commands/")
def create_command(command: CommandModel):
    # Store command in the database for future use
    insert_command(command.base_command, " ".join(command.options), " ".join(command.flags))
    return {"message": "Command added successfully"}

@app.post("/commands/execute/")
def execute_command(command: CommandModel):
    result = run_composed_command(command.base_command, command.options, command.flags)
    return {"result": result}

@app.get("/commands/")
def read_commands():
    commands = get_commands()
    return {"commands": commands}
```

### 4. **Interactive Dashboard (Streamlit - `app.py`)**

The Streamlit app will provide a form to dynamically build and execute commands from the frontend.

```python
# simple_project/app.py

import streamlit as st
import requests

API_URL = "http://localhost:8000"

st.title("Modular Command Execution Dashboard")

# Base command input
st.header("Build Your Command")
base_command = st.text_input("Base Command (e.g., 'npx playwright test')", "npx playwright test")

# Options (key-value pairs)
st.subheader("Options (e.g., --browser=chromium)")
options = []
if st.button("Add Option"):
    option_key = st.text_input("Option Key", "")
    option_value = st.text_input("Option Value", "")
    if option_key and option_value:
        options.append(f"{option_key}={option_value}")
        st.success(f"Added Option: {option_key}={option_value}")

# Flags (boolean flags like --headed)
st.subheader("Flags (e.g., --headed)")
flags = []
if st.button("Add Flag"):
    flag = st.text_input("Flag", "")
    if flag:
        flags.append(flag)
        st.success(f"Added Flag: {flag}")

# Execute the command
if st.button("Execute Command"):
    command_data = {"base_command": base_command, "options": options, "flags": flags}
    response = requests.post(f"{API_URL}/commands/execute/", json=command_data)
    st.write(response.json().get("result"))

# List previous commands
st.header("Previously Added Commands")
response = requests.get(f"{API_URL}/commands/")
if response.status_code == 200:
    commands = response.json().get("commands", [])
    for cmd in commands:
        st.write(f"ID: {cmd[0]}, Command: {cmd[1]}, Options: {cmd[2]}, Flags: {cmd[3]}")
```

### 5. **Enhancing the Database to Support Modular Commands (`database.py`)**

We’ll store modular commands and their components in the SQLite database, as shown in previous examples.

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
                              base_command TEXT NOT NULL,
                              options TEXT,
                              flags TEXT)''')
            conn.commit()

def insert_command(base_command: str, options: str, flags: str):
    with closing(sqlite3.connect(DB_NAME)) as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute("INSERT INTO commands (base_command, options, flags) VALUES (?, ?, ?)",
                           (base_command, options, flags))
            conn.commit()

def get_commands():
    with closing(sqlite3.connect(DB_NAME)) as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute("SELECT * FROM commands")
            return cursor.fetchall()
```

### 6. **Running the Dashboard**

1. **Start FastAPI**:

   ```bash
   poetry run uvicorn simple_project.api:app --reload
   ```

2. **Run Streamlit**:
   ```bash
   poetry run streamlit run simple_project/app.py
   ```

### 7. **User Workflow**

- **Step 1**: Users can input the base command (like `npx playwright test`).
- **Step 2**: Users can dynamically add options and flags through the interface.
- **Step 3**: Users can run the composed command, which will be executed by the FastAPI backend using `subprocess`.
- **Step 4**: The system will also persist the composed commands in the database for future reference or reuse.

### Conclusion

This setup allows for a **modular, flexible dashboard** where users can dynamically compose commands and execute them. The commands and their components (base command, options, flags) are stored in the database, making them reusable and easily modifiable.

```bash
nvim modular_command_execution_dashboard.md
```
