from fastapi import APIRouter, HTTPException
from app.models.chatbot import ChatRequest, ChatResponse, Message
from app.services.chatbot_service import chatbot_service
from datetime import datetime
import uuid

router = APIRouter(prefix="/api/chatbot", tags=["chatbot"])

# Store conversations (in production, use database)
conversations = {}

@router.post("/message", response_model=ChatResponse)
async def send_message(chat_request: ChatRequest):
    """Send message to AI chatbot and get response"""
    
    if not chat_request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    try:
        # Get conversation history
        user_id = chat_request.user_id or "default"
        history = conversations.get(user_id, [])
        
        # Get chatbot response
        result = chatbot_service.get_response(
            chat_request.message,
            history
        )
        
        if not result["success"]:
            raise HTTPException(status_code=500, detail=result.get("message", "Error generating response"))
        
        # Create response object
        response = ChatResponse(
            user_message=result["user_message"],
            bot_response=result["bot_response"],
            timestamp=datetime.now(),
            confidence=result.get("confidence", 0.75)
        )
        
        # Store conversation
        conversations[user_id] = history + [{
            "user_message": chat_request.message,
            "bot_response": result["bot_response"],
            "timestamp": datetime.now().isoformat()
        }]
        
        return response
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing message: {str(e)}"
        )

@router.get("/conversation/{user_id}")
async def get_conversation(user_id: str):
    """Get conversation history for a user"""
    
    history = conversations.get(user_id, [])
    
    return {
        "user_id": user_id,
        "message_count": len(history),
        "messages": history
    }

@router.delete("/conversation/{user_id}")
async def clear_conversation(user_id: str):
    """Clear conversation history"""
    
    if user_id in conversations:
        del conversations[user_id]
        return {"message": "Conversation cleared", "user_id": user_id}
    
    raise HTTPException(status_code=404, detail="Conversation not found")

@router.get("/health")
async def health_check():
    """Health check for chatbot service"""
    return {
        "status": "healthy" if chatbot_service.model_loaded else "model_not_loaded",
        "service": "chatbot-ai",
        "model": "OpenAI GPT" if chatbot_service.use_openai else "DialoGPT-medium",
        "model_loaded": chatbot_service.model_loaded,
        "rag_enabled": True,
        "openai_enabled": chatbot_service.use_openai
    }

@router.get("/topics")
async def get_topics():
    """Get available agriculture topics the chatbot handles"""
    return {
        "topics": list(chatbot_service.agriculture_qa.keys()),
        "description": "Ask about: fertilizer, disease, crop, irrigation, weather"
    }