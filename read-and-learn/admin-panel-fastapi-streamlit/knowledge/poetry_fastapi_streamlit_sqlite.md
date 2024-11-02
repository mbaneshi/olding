To start a simple project using **Poetry** with **FastAPI**, **Streamlit**, and **SQLite**, follow these steps:

### 1. **Create a New Poetry Project**

Open your terminal and initialize a new Poetry project.

```bash
poetry new simple_project
cd simple_project
```

This creates a new directory with a basic project structure.

### 2. **Add Dependencies**

Inside your project directory, add **FastAPI**, **Streamlit**, and **SQLite** as dependencies using Poetry:

```bash
poetry add fastapi uvicorn streamlit sqlite
```

- **FastAPI**: For building the backend API.
- **Uvicorn**: ASGI server to run the FastAPI application.
- **Streamlit**: For building simple web interfaces.
- **SQLite**: The database engine (built into Python, so no extra installation).

### 3. **Modify the Project Structure**

Let's assume the following project structure:

```
simple_project/
│
├── simple_project/
│   ├── __init__.py
│   ├── api.py
│   ├── database.py
│   └── app.py
│
├── tests/
│   └── test_main.py
│
└── pyproject.toml
```

### 4. **Setting Up the Database (`database.py`)**

You can create a simple SQLite database using Python’s built-in `sqlite3` module.

```python
# simple_project/database.py

import sqlite3
from contextlib import closing

DB_NAME = "database.db"

def init_db():
    with closing(sqlite3.connect(DB_NAME)) as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute('''CREATE TABLE IF NOT EXISTS items (
                              id INTEGER PRIMARY KEY AUTOINCREMENT,
                              name TEXT NOT NULL,
                              description TEXT)''')
            conn.commit()

def insert_item(name: str, description: str):
    with closing(sqlite3.connect(DB_NAME)) as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute("INSERT INTO items (name, description) VALUES (?, ?)", (name, description))
            conn.commit()

def get_items():
    with closing(sqlite3.connect(DB_NAME)) as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute("SELECT * FROM items")
            return cursor.fetchall()

```

### 5. **Creating the FastAPI Backend (`api.py`)**

This will create a simple API with FastAPI to interact with the SQLite database.

```python
# simple_project/api.py

from fastapi import FastAPI
from .database import insert_item, get_items, init_db

app = FastAPI()

@app.on_event("startup")
async def startup():
    init_db()

@app.post("/items/")
async def create_item(name: str, description: str):
    insert_item(name, description)
    return {"message": "Item added"}

@app.get("/items/")
async def read_items():
    items = get_items()
    return {"items": items}
```

### 6. **Building the Streamlit Frontend (`app.py`)**

Now, create a simple interface to interact with the FastAPI backend.

```python
# simple_project/app.py

import requests
import streamlit as st

API_URL = "http://localhost:8000"

st.title("Simple Item App")

# Form to create a new item
st.header("Create a new item")
name = st.text_input("Name")
description = st.text_area("Description")
if st.button("Add Item"):
    response = requests.post(f"{API_URL}/items/", json={"name": name, "description": description})
    if response.status_code == 200:
        st.success("Item added!")
    else:
        st.error("Failed to add item.")

# Display items
st.header("Item List")
if st.button("Refresh Items"):
    response = requests.get(f"{API_URL}/items/")
    if response.status_code == 200:
        items = response.json()["items"]
        for item in items:
            st.write(f"ID: {item[0]}, Name: {item[1]}, Description: {item[2]}")
    else:
        st.error("Failed to fetch items.")
```

### 7. **Running the Project**

1. **Start FastAPI with Uvicorn:**

```bash
poetry run uvicorn simple_project.api:app --reload
```

2. **Run Streamlit:**

```bash
poetry run streamlit run simple_project/app.py
```

The FastAPI backend should now be running on `http://localhost:8000`, and Streamlit will be available on `http://localhost:8501`.

### 8. **Conclusion**

You now have a simple project set up with **FastAPI** as the backend, **Streamlit** as the frontend, and **SQLite** as the database.

```bash
nvim poetry_fastapi_streamlit_sqlite.md
```
