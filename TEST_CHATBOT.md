# Testing the Enhanced Chatbot

## Quick Test Steps

1. **Start the Backend** (if not running):
   ```bash
   cd app
   python -m uvicorn main:app --reload --port 8000
   ```

2. **Check Health Endpoint**:
   Visit: http://localhost:8000/api/chatbot/health
   
   Should show:
   ```json
   {
     "status": "healthy",
     "service": "chatbot-ai",
     "model": "DialoGPT-medium" or "OpenAI GPT",
     "model_loaded": true,
     "rag_enabled": true,
     "openai_enabled": true/false
   }
   ```

3. **Test with a Query**:
   ```bash
   curl -X POST http://localhost:8000/api/chatbot/message \
     -H "Content-Type: application/json" \
     -d '{"message": "How to grow tomatoes?", "user_id": "test"}'
   ```

## Expected Behavior

### For "How to grow tomatoes?":

**Before (Old System):**
- Response: "Crop selection depends on climate, soil, and market demand." ❌

**After (RAG + AI):**
- Should provide detailed tomato growing information:
  - Season, cycle length
  - Soil requirements (pH, type)
  - Water requirements
  - Key practices
  - Fertilizer schedule
  - Expected yield ✅

## Troubleshooting

### If you still see generic responses:

1. **Check if backend is running**:
   - Visit http://localhost:8000/api/chatbot/health
   - Should return status "healthy"

2. **Check browser console**:
   - Open DevTools (F12)
   - Look for errors in Console tab
   - Check Network tab for API calls

3. **Check backend logs**:
   - Look for "✅ Chatbot AI Model loaded!" message
   - Check for any error messages

4. **Verify API URL**:
   - Frontend should call: `http://localhost:8000/api/chatbot/message`
   - Check `AgriConnect-WebApp/src/api.js` line 151

5. **Test API directly**:
   ```bash
   # PowerShell
   Invoke-RestMethod -Uri "http://localhost:8000/api/chatbot/message" `
     -Method POST `
     -Headers @{"Content-Type"="application/json"} `
     -Body '{"message":"How to grow tomatoes?","user_id":"test"}' | ConvertTo-Json
   ```

## Enable OpenAI (Optional - Better Quality)

1. Set environment variable:
   ```powershell
   $env:OPENAI_API_KEY="your-api-key-here"
   ```

2. Install OpenAI library:
   ```bash
   pip install openai
   ```

3. Restart backend

4. Check health endpoint - should show `"model": "OpenAI GPT"`

