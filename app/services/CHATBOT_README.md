# Enhanced AI Chatbot with RAG (Retrieval Augmented Generation)

## Overview

The chatbot has been enhanced with:
1. **RAG System**: Retrieves relevant agriculture information from a comprehensive knowledge base
2. **Better AI Models**: Supports both DialoGPT (local) and OpenAI GPT (optional, better quality)
3. **Agriculture-Specific Context**: Uses crop database, pest knowledge, and farming best practices

## Features

### 1. RAG-Enhanced Responses
- Automatically retrieves relevant crop information, pest data, and farming practices
- Provides context-aware responses based on agriculture knowledge base
- Covers: crops, fertilizers, irrigation, soil management, pest control, post-harvest

### 2. Dual AI Model Support

#### Option A: DialoGPT-medium (Default - Free, Local)
- Runs locally, no API costs
- Good for basic conversations
- Requires ~500MB RAM for model

#### Option B: OpenAI GPT (Optional - Better Quality)
- Significantly better responses
- More accurate agriculture advice
- Requires OpenAI API key
- Small API costs (~$0.002 per conversation)

## Setup

### Basic Setup (DialoGPT - Default)
No additional setup needed. The chatbot will use DialoGPT-medium automatically.

### Enhanced Setup (OpenAI GPT - Recommended)

1. **Get OpenAI API Key**
   - Sign up at https://platform.openai.com
   - Create an API key

2. **Set Environment Variable**
   ```bash
   # Windows PowerShell
   $env:OPENAI_API_KEY="your-api-key-here"
   
   # Linux/Mac
   export OPENAI_API_KEY="your-api-key-here"
   
   # Or create a .env file
   echo "OPENAI_API_KEY=your-api-key-here" > .env
   ```

3. **Install OpenAI Library** (if not already installed)
   ```bash
   pip install openai>=1.0.0
   ```

4. **Restart the Backend**
   The chatbot will automatically detect the API key and use GPT instead of DialoGPT.

## Knowledge Base

The RAG system includes:

### Crop Database
- Tomato, Wheat, Rice, Potato, Corn/Maize
- Climate requirements, soil needs, irrigation, yields
- Fertilizer schedules, best practices, pest management

### Pest & Disease Database
- Common diseases (Late Blight, Early Blight, etc.)
- Treatment options (chemical & organic)
- Prevention strategies

### General Agriculture Knowledge
- Fertilizer recommendations (NPK ratios, application timing)
- Irrigation best practices
- Soil management techniques
- Post-harvest handling

## Usage

The chatbot automatically:
1. Analyzes user questions
2. Retrieves relevant agriculture information
3. Generates context-aware AI responses
4. Falls back to knowledge base if AI fails

### Example Queries

**Crop Questions:**
- "What should I plant after harvesting wheat?"
- "How to grow tomatoes?"
- "Best crop for pH 6.5 soil?"

**Fertilizer Questions:**
- "What fertilizer for tomato?"
- "NPK ratio for wheat?"
- "When to apply urea?"

**Disease Questions:**
- "Tomato has brown spots on leaves"
- "How to treat late blight?"
- "Organic pest control methods"

**Post-Harvest:**
- "What to do after farming?"
- "How to store harvested crops?"
- "Preparing land for next season"

## API Endpoints

### Health Check
```
GET /api/chatbot/health
```
Returns:
```json
{
  "status": "healthy",
  "service": "chatbot-ai",
  "model": "OpenAI GPT" or "DialoGPT-medium",
  "model_loaded": true,
  "rag_enabled": true,
  "openai_enabled": true/false
}
```

### Send Message
```
POST /api/chatbot/message
Body: {
  "message": "What should I do after farming?",
  "user_id": "optional-user-id"
}
```

## Performance Comparison

| Feature | DialoGPT | OpenAI GPT |
|---------|----------|------------|
| Response Quality | Good | Excellent |
| Agriculture Accuracy | Moderate | High |
| Context Understanding | Basic | Advanced |
| Cost | Free | ~$0.002/chat |
| Speed | Fast (local) | Fast (API) |
| Setup | Automatic | Requires API key |

## Troubleshooting

### Model Not Loading
- Check if transformers and torch are installed
- Ensure sufficient RAM (2GB+ recommended)
- Check console for error messages

### OpenAI Not Working
- Verify API key is set correctly
- Check internet connection
- Ensure openai library is installed: `pip install openai`
- Check API key has credits

### Poor Responses
- Enable OpenAI for better quality
- Check if agriculture context is being retrieved (see logs)
- Verify knowledge base is loaded

## Future Enhancements

- [ ] Fine-tune DialoGPT on agriculture data
- [ ] Add more crops to knowledge base
- [ ] Integrate with weather APIs
- [ ] Add image-based crop/disease queries
- [ ] Multi-language support
- [ ] Voice input/output

