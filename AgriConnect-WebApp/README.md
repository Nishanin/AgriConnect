# AgriConnect-WebApp
AgriConnect is a multilingual digital farming platform connecting farmers with retailers and buyers. It offers a marketplace, AI-based disease detection, smart farming tools, crop calendar, government schemes access, and chatbot support — all within a modern, responsive, and farmer-friendly interface.

## Pest & Disease AI Scanner

1. Sign up for a free Hugging Face account and create an access token with the **Inference** scope.
2. In `backend/.env` add:
   ```
   HF_API_KEY=hf_xxxxxxxxx
   HF_PEST_MODEL=nateraw/plant-disease
   ```
   The default model is the PlantVillage-trained `nateraw/plant-disease` ResNet classifier (38 crop disease classes). You can swap in any image-classification model that accepts raw image bytes.
3. Start the backend (`npm run dev` inside `backend/`) and the Vite app (`npm run dev` inside the root). The Disease & Pest Management screen will now upload the captured leaf image, stream it through the Hugging Face model, and surface curated chemical + organic treatment plans pulled from our agronomy knowledge base.

Without an API key the feature still works locally using the Late Blight mock response so the UI remains testable.