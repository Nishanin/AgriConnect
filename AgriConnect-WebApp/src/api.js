// API utility for authentication
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

async function handleResponse(res) {
  if (!res.ok) {
    const errorText = await res.text();
    let errorMessage;
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.message || "Request failed";
    } catch (e) {
      errorMessage = errorText || "Request failed";
    }
    throw new Error(errorMessage);
  }

  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch (err) {
    console.error("Failed to parse response:", text);
    throw new Error("Invalid response from server");
  }
}

export async function register({
  username,
  email,
  password,
  role,
  location,
  phone,
}) {
  try {
    console.log("Registering with:", { username, email, role }); // debug log
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        role,
        location,
        phone,
      }),
    });
    return handleResponse(res);
  } catch (err) {
    console.error("Registration error:", err);
    throw err;
  }
}

export async function login({ email, password, selectedRole }) {
  try {
    console.log("Logging in with:", email, selectedRole); // debug log
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, selectedRole }),
    });
    return handleResponse(res);
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
}

export async function getProfile(token) {
  try {
    const res = await fetch(`${API_URL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(res);
  } catch (err) {
    console.error("Get profile error:", err);
    throw err;
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export async function analyzePestImage({ imageBase64, cropType }) {
  try {
    const res = await fetch(`${API_URL}/diagnostics/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64, cropType }),
    });
    return handleResponse(res);
  } catch (err) {
    console.error("Pest analysis error:", err);
    throw err;
  }
}

export async function getCropRecommendations({ location, climate, soil, resources, userId }) {
  try {
    const res = await fetch(`${API_URL}/crop-recommendation/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location, climate, soil, resources, userId }),
    });
    return handleResponse(res);
  } catch (err) {
    console.error("Crop recommendation error:", err);
    throw err;
  }
}

export async function getCropDetails(cropName) {
  try {
    const res = await fetch(`${API_URL}/crop-recommendation/crop/${encodeURIComponent(cropName)}`);
    return handleResponse(res);
  } catch (err) {
    console.error("Get crop details error:", err);
    throw err;
  }
}

export async function analyzeSoil(soil) {
  try {
    const res = await fetch(`${API_URL}/crop-recommendation/soil-analysis`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ soil }),
    });
    return handleResponse(res);
  } catch (err) {
    console.error("Soil analysis error:", err);
    throw err;
  }
}

export async function getRecommendationHistory(userId, limit = 10) {
  try {
    const res = await fetch(`${API_URL}/crop-recommendation/history/${userId}?limit=${limit}`);
    return handleResponse(res);
  } catch (err) {
    console.error("Get recommendation history error:", err);
    throw err;
  }
}

export async function sendChatbotMessage(message, userId = null) {
  try {
    const CHATBOT_API_URL = import.meta.env.VITE_CHATBOT_API_URL || "http://localhost:8000/api/chatbot";
    const res = await fetch(`${CHATBOT_API_URL}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, user_id: userId }),
    });
    return handleResponse(res);
  } catch (err) {
    console.error("Chatbot message error:", err);
    throw err;
  }
}