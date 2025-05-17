from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from booking_system.state_manager import ConversationManager

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.websocket("/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    manager = ConversationManager()
    while True:
        try:
            user_input = await websocket.receive_text()
            response = manager.handle_input(user_input)
            await websocket.send_text(response)
        except Exception as e:
            await websocket.send_text("Sorry, an error occurred: " + str(e))
            break
