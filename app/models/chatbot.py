from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class Message(BaseModel):
    id: Optional[str] = None
    user_message: str
    bot_response: str
    timestamp: Optional[datetime] = None
    user_id: Optional[str] = None

class ChatRequest(BaseModel):
    message: str
    user_id: Optional[str] = None
    conversation_history: Optional[List[dict]] = None

class ChatResponse(BaseModel):
    user_message: str
    bot_response: str
    timestamp: datetime
    confidence: Optional[float] = None