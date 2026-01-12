# AgriConnect - Plant Disease Detection API

AgriConnect is a FastAPI-based web application for detecting plant diseases using machine learning. It provides both a backend API and a frontend interface for uploading plant images and receiving disease predictions.

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Git (optional, for cloning the repository)

## 🚀 Installation & Setup

### 1. Create Virtual Environment

```powershell
python -m venv .venv
```

### 2. Activate Virtual Environment

**On Windows (PowerShell):**
```powershell
.\.venv\Scripts\Activate.ps1
```

**On Windows (Command Prompt):**
```cmd
.venv\Scripts\activate.bat
```

**On macOS/Linux:**
```bash
source .venv/bin/activate
```
### To run the ML MOdel
 uvicorn app.main:app --reload --host 0.0.0.0 --port 8000  
### 3. Install Dependencies

```powershell
pip install -r requirements.txt
```

## 📦 Dependencies

The project requires the following packages (automatically installed via `requirements.txt`):

- **fastapi** - Web framework
- **uvicorn** - ASGI server
- **transformers** - HuggingFace ML models
- **torch** - PyTorch (deep learning framework)
- **pillow** - Image processing
- **python-multipart** - File upload handling
- **pydantic** - Data validation
- **cors** - Cross-Origin Resource Sharing

> **Note:** The machine learning model (`disease-detection-model`) is downloaded automatically on first run. This is ~500MB and requires internet connection.

## 🎯 Running the Project

### Backend API Server

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Expected output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

Access the API documentation at: **http://localhost:8000/docs**

### Frontend (React)

In a new terminal window:

```powershell
cd AgriConnect-WebApp
npm run dev
```
## Backend (React)

In a new terminal window:

```powershell
cd AgriConnect-WebApp
cd backend
npm run dev
```

The frontend will open at: **http://localhost:3000**

## 📁 Project Structure

```
AgriConnect/
├── app/
│   ├── main.py                 # FastAPI application entry point
│   ├── api/
│   │   └── disease_detection.py # Disease detection endpoints
│   └── __init__.py
├── frontend/                    # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── disease-detection-model/    # ML model (auto-downloaded)
├── requirements.txt            # Python dependencies
└── README.md                   # This file
```

## 🔌 API Endpoints

### 1. Upload Image for Disease Detection
**POST** `/api/disease-detection/upload`

Upload a plant image and get disease prediction.

**Request:**
- Content-Type: `multipart/form-data`
- File: Image file (JPEG/PNG)

**Response:**
```json
{
  "success": true,
  "disease": "Apple___Apple_scab",
  "confidence": 95.32,
  "all_predictions": [
    {
      "disease": "Apple___Apple_scab",
      "confidence": 95.32
    },
    {
      "disease": "Apple___healthy",
      "confidence": 4.20
    }
  ]
}
```

### 2. Health Check
**GET** `/api/disease-detection/health`

Check if the API and model are running.

**Response:**
```json
{
  "status": "healthy",
  "model": "disease-detection-model",
  "model_loaded": true
}
```

### 3. Get All Disease Labels
**GET** `/api/disease-detection/labels`

Get list of all detectable diseases.

### 4. Global Health Check
**GET** `/health`

Check overall API health.

## 🤖 Machine Learning Model

- **Model Type:** Image Classification
- **Framework:** Hugging Face Transformers
- **Model Size:** ~500MB
- **First Run:** Model downloads automatically (~5-10 minutes on first run)
- **Subsequent Runs:** Model is cached locally, no re-download needed

### Supported Diseases

The model can detect:
- Apple scab
- Apple black rot
- Apple cedar apple rust
- Blueberry (healthy)
- Cherry powdery mildew
- Corn cercospora leaf spot
- And more...

## 🔧 Troubleshooting

### Error: "Model not found"
```powershell
# Delete cache and let it re-download
Remove-Item -Recurse -Force .cache
python app/main.py
```

### Error: "python-multipart not installed"
```powershell
pip install python-multipart
```

### Port 8000 already in use
```powershell
# Use different port
uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
```

### Virtual environment not activating
```powershell
# Recreate virtual environment
Remove-Item -Recurse -Force .venv
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## 📝 Creating requirements.txt (if needed)

```powershell
pip freeze > requirements.txt
```

## 🌐 Accessing the Application

- **API Docs:** http://localhost:8000/docs
- **Frontend:** http://localhost:3000
- **API Base:** http://localhost:8000

## 🚫 Disable Model Auto-Download

If you want to use a pre-downloaded model:

1. Place model in `./disease-detection-model` directory
2. Update `disease_detection.py` with your model path

## 📚 Development

### Adding New Endpoints

Edit `app/api/disease_detection.py` and add new routes:

```python
@router.get("/new-endpoint")
async def new_endpoint():
    return {"message": "New endpoint"}
```

### Running Tests

```powershell
pip install pytest
pytest
```

## 🔒 Production Deployment

Before deploying:

1. Set `CORS allow_origins` to specific domains in `main.py`
2. Use environment variables for sensitive data
3. Deploy with a production ASGI server (Gunicorn, etc.)

```powershell
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
```

## 📄 License

Your project license here

## 👥 Contributing

Contributions welcome! Please submit pull requests or report issues.

## 📧 Support

For issues or questions, contact your team.

---

**Last Updated:** December 5, 2025