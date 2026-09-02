from fastapi import FastAPI

app = FastAPI(title="Agent Guard - Runtime Security MVP")

@app.get("/")
def home():
    return {"message": "Agent Guard is alive", "version": "0.1.0"}
