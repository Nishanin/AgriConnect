from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from transformers import pipeline
from PIL import Image
import io
import os

router = APIRouter(prefix="/api/disease-detection", tags=["disease-detection"])

# Load model once on startup
print("🔄 Loading disease detection model...")
try:
    classifier = pipeline(
        "image-classification",
        model="./disease-detection-model"
    )
    print("✅ Disease detection model loaded!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    classifier = None

# Map labels to disease names
LABEL_MAP = {
    "LABEL_0": "Apple___Apple_scab",
    "LABEL_1": "Apple___Black_rot",
    "LABEL_2": "Apple___Cedar_apple_rust",
    "LABEL_3": "Apple___healthy",
    "LABEL_4": "Blueberry___healthy",
    "LABEL_5": "Cherry_(including_sour)___Powdery_mildew",
    "LABEL_6": "Cherry_(including_sour)___healthy",
    "LABEL_7": "Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot"
}

@router.post("/upload")
async def detect_disease_upload(file: UploadFile = File(...)):
    """
    Upload image and detect plant disease
    
    Returns:
        - disease: Name of detected disease
        - confidence: Confidence percentage
        - all_predictions: Top 3 predictions
    """
    try:
        if classifier is None:
            raise HTTPException(
                status_code=500, 
                detail="Model not loaded. Please restart the server."
            )
        
        # Validate file type
        if file.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
            raise HTTPException(
                status_code=400, 
                detail="File must be JPEG or PNG image"
            )
        
        # Read image file
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Convert to RGB if needed
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Run inference
        results = classifier(image)
        
        # Format response
        predicted_label = results[0]['label']
        disease_name = LABEL_MAP.get(predicted_label, predicted_label)
        
        return JSONResponse({
            "success": True,
            "disease": disease_name,
            "label": predicted_label,
            "confidence": round(results[0]['score'] * 100, 2),
            "all_predictions": [
                {
                    "disease": LABEL_MAP.get(r['label'], r['label']),
                    "label": r['label'],
                    "confidence": round(r['score'] * 100, 2)
                }
                for r in results
            ]
        })
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=400, 
            detail=f"Error processing image: {str(e)}"
        )

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model": "disease-detection-model",
        "model_loaded": classifier is not None
    }

@router.get("/labels")
async def get_labels():
    """Get all disease labels"""
    return {"labels": LABEL_MAP}