# AgriConnect Backend Authentication API

## Setup

1. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
2. Create a `.env` file (already scaffolded):

   - `MONGO_URI` — MongoDB connection string
   - `JWT_SECRET` — strong secret for JWT signing
   - `HF_API_KEY` — (optional but recommended) Hugging Face Inference API token. Required for live pest/disease analysis. When omitted the API falls back to a deterministic mock for local testing.
   - `HF_PEST_MODEL` — (optional) override for the Hugging Face model id. Defaults to `nateraw/plant-disease`.

3. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT
- `GET /api/user/me` — Get current user profile (requires Bearer token)
- `POST /api/diagnostics/predict` — Accepts a base64 encoded crop image and returns the predicted pest/disease class along with curated chemical/organic treatment plans.

## Folder Structure

- `models/` — Mongoose models
- `routes/` — Express route handlers
- `middleware/` — Custom middleware (JWT auth)

---

You can now connect your React frontend to these endpoints for authentication.
