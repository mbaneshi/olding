# backend/main.py

from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.get("/", response_class=HTMLResponse)
async def read_root():
    return "<h1>Welcome to FastAPI!</h1>"

# Placeholder for Telegram bot logic
@app.post("/webhook/{token}")
async def telegram_webhook(token: str, update: dict):
    # Here you will handle incoming messages from the Telegram bot
    print(update)
    return {"status": "success"}

