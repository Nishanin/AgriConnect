from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import disease_detection, fertilizer, chatbot

# Create FastAPI app
app = FastAPI(
    title="AgriConnect Disease Detection API",
    description="API for plant disease detection using machine learning",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers
app.include_router(disease_detection.router)
app.include_router(fertilizer.router)
app.include_router(chatbot.router)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "AgriConnect Disease Detection API",
        "docs": "/docs",
        "services": {
            "disease_detection": "/api/disease-detection/health",
            "fertilizer": "/api/fertilizer/health",
            "chatbot": "/api/chatbot/health"
        }
    }

@app.get("/health")
async def health():
    """Global health check"""
    return {"status": "running"}