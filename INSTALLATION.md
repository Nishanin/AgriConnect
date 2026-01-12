# Installation & Setup Guide

Complete guide to set up and run AgriConnect locally.

## Prerequisites

- **Python:** 3.8 or higher
- **Node.js:** 14 or higher (for frontend)
- **npm:** 6 or higher
- **Git**

## Backend Setup (FastAPI + Python)

### Step 1: Create Virtual Environment
```powershell
python -m venv .venv
```

### Step 2: Activate Virtual Environment

**Windows (PowerShell):**
```powershell
.\.venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**
```cmd
.venv\Scripts\activate.bat
```

**macOS/Linux:**
```bash
source .venv/bin/activate
```

### Step 3: Install Python Dependencies
```powershell
pip install -r requirements.txt
```

### Step 4: Run FastAPI Server
```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

**Access API Documentation:** http://localhost:8000/docs

---

## Frontend Setup (React + Vite)

Open a **new terminal** and follow these steps:

### Step 1: Navigate to Frontend Directory
```powershell
cd AgriConnect-WebApp
```

### Step 2: Install Dependencies
```powershell
npm install
```

### Step 3: Run Development Server
```powershell
npm run dev
```

**Expected Output:**
```
VITE v... dev server running at:
  ➜  Local:   http://127.0.0.1:5173/
```

**Frontend URL:** http://localhost:5173

---

## Backend Node.js Server (Optional)

For the Node.js backend services, open **another terminal**:

### Step 1: Navigate to Backend Directory
```powershell
cd AgriConnect-WebApp/backend
```

### Step 2: Install Dependencies
```powershell
npm install
```

### Step 3: Create `.env` File
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Step 4: Run Backend Server
```powershell
npm run dev
```

---

## Complete Setup Summary

You should now have **3 servers running**:

| Server | URL | Purpose |
|--------|-----|---------|
| FastAPI | http://localhost:8000 | ML API (Disease Detection) |
| React Frontend | http://localhost:5173 | Web Interface |
| Node.js Backend | http://localhost:5000 | Business Logic (optional) |

---

## Troubleshooting

### Port Already in Use

**For FastAPI:**
```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
```

**For React:**
```powershell
npm run dev -- --port 3001
```

### Virtual Environment Not Activating

```powershell
# Delete and recreate
Remove-Item -Recurse -Force .venv
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Module Not Found Errors

```powershell
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### npm Install Issues

```powershell
# Clear cache and reinstall
npm cache clean --force
npm install
```

### ML Model Download Issues

The model downloads automatically on first run (~500MB, ~5-10 minutes). If it fails:

```powershell
# Clear cache
Remove-Item -Recurse -Force .cache
# Restart the server
```

---

## Environment Variables

Create `.env` files as needed:

**Root `.env` (Python):**
```
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

**AgriConnect-WebApp/.env (React):**
```
VITE_API_URL=http://localhost:8000
VITE_BACKEND_URL=http://localhost:5000
```

**AgriConnect-WebApp/backend/.env (Node.js):**
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
FASTAPI_URL=http://localhost:8000
```

---

## Next Steps

- Read [README.md](README.md) for project overview
- Check [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
- Explore API docs at http://localhost:8000/docs

## Need Help?

- Create an issue on GitHub
- Check existing issues for solutions
- Join discussions for questions

Happy coding! 🚀
