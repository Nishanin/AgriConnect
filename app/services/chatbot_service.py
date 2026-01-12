from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
import torch
from typing import List, Tuple, Optional
import re
import os
from app.services.agriculture_kb import agriculture_kb

class ChatbotService:
    def __init__(self):
        print("🔄 Loading Chatbot AI Model...")
        
        # Check for OpenAI API key (optional)
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        self.use_openai = self.openai_api_key is not None
        
        try:
            if not self.use_openai:
                # Using DialoGPT-medium for local inference
                self.model_name = "microsoft/DialoGPT-medium"
                self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
                self.model = AutoModelForCausalLM.from_pretrained(self.model_name)
                
                # Add special tokens
                self.tokenizer.pad_token = self.tokenizer.eos_token
                
                # Set device
                self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
                self.model = self.model.to(self.device)
                
                print("✅ Chatbot AI Model (DialoGPT-medium) loaded!")
            else:
                print("✅ OpenAI API configured - will use GPT for better responses!")
                self.model = None
                self.tokenizer = None
            
            # Agriculture knowledge base for RAG
            self.agriculture_kb = agriculture_kb
            
            # Legacy agriculture_qa for backward compatibility
            self.agriculture_qa = self._load_agriculture_kb()
            
            self.model_loaded = True
            
        except Exception as e:
            print(f"❌ Error loading chatbot model: {e}")
            print("⚠️  Falling back to knowledge base only mode")
            self.model_loaded = False
            self.use_openai = False
    
    def _load_agriculture_kb(self) -> dict:
        """Load agriculture knowledge base for context"""
        return {
            "fertilizer": {
                "keywords": ["fertilizer", "npk", "urea", "dap", "nutrient", "soil"],
                "responses": [
                    "For fertilizer recommendations, consider your soil type and crop.",
                    "NPK ratios vary by crop. For wheat, NPK 10:26:26 is common.",
                    "Organic fertilizers improve soil health long-term."
                ]
            },
            "disease": {
                "keywords": ["disease", "pest", "infection", "fungal", "bacterial", "virus"],
                "responses": [
                    "Early detection is key for disease management.",
                    "Consider integrated pest management (IPM) strategies.",
                    "Use our disease detection tool to identify plant diseases."
                ]
            },
            "crop": {
                "keywords": ["crop", "wheat", "rice", "corn", "tomato", "apple", "yield"],
                "responses": [
                    "Crop selection depends on climate, soil, and market demand.",
                    "Crop rotation improves soil health and reduces pests.",
                    "Proper irrigation and drainage are crucial for crop health."
                ]
            },
            "irrigation": {
                "keywords": ["water", "irrigation", "drainage", "rainfall", "moisture"],
                "responses": [
                    "Water management is critical for crop productivity.",
                    "Drip irrigation is more efficient than flood irrigation.",
                    "Monitor soil moisture to optimize irrigation schedules."
                ]
            },
            "weather": {
                "keywords": ["weather", "temperature", "rain", "frost", "drought", "climate"],
                "responses": [
                    "Weather patterns significantly affect crop growth.",
                    "Plan planting schedules based on seasonal forecasts.",
                    "Extreme weather can damage crops; plan accordingly."
                ]
            }
        }
    
    def _get_context_response(self, user_message: str) -> Tuple[str, float]:
        """Get response from agriculture knowledge base"""
        user_lower = user_message.lower()
        
        for category, data in self.agriculture_qa.items():
            for keyword in data["keywords"]:
                if keyword in user_lower:
                    response = data["responses"][0]
                    return response, 0.85
        
        return None, 0.0
    
    def _get_agriculture_context(self, user_message: str) -> str:
        """Get agriculture context using RAG (Retrieval Augmented Generation)"""
        # Use the comprehensive knowledge base for better context
        retrieved_info = self.agriculture_kb.retrieve_relevant_info(user_message, max_results=3)
        return retrieved_info
    
    def _generate_ai_response_openai(self, user_message: str, conversation_history: List[dict], agri_context: str) -> Tuple[str, bool]:
        """Generate AI response using OpenAI API (better quality)"""
        try:
            import openai
            
            # Build conversation history for OpenAI
            messages = [
                {
                    "role": "system",
                    "content": "You are an expert agricultural assistant helping farmers with crop management, disease control, irrigation, fertilization, and farming best practices. Provide practical, actionable advice based on the agriculture knowledge provided."
                }
            ]
            
            # Add agriculture context as system message
            if agri_context:
                messages.append({
                    "role": "system",
                    "content": f"Relevant agriculture information:\n{agri_context}\n\nUse this information to provide accurate, helpful responses."
                })
            
            # Add conversation history
            if conversation_history:
                for msg in conversation_history[-5:]:  # Last 5 messages
                    messages.append({"role": "user", "content": msg.get('user_message', '')})
                    messages.append({"role": "assistant", "content": msg.get('bot_response', '')})
            
            # Add current message
            messages.append({"role": "user", "content": user_message})
            
            # Call OpenAI API
            client = openai.OpenAI(api_key=self.openai_api_key)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",  # or "gpt-4" for better quality
                messages=messages,
                temperature=0.7,
                max_tokens=300
            )
            
            ai_response = response.choices[0].message.content.strip()
            return ai_response, True
            
        except ImportError:
            print("⚠️  OpenAI library not installed. Install with: pip install openai")
            return self._get_fallback_response(user_message), False
        except Exception as e:
            print(f"❌ Error calling OpenAI API: {e}")
            return self._get_fallback_response(user_message), False
    
    def _generate_ai_response(self, user_message: str, conversation_history: List[dict]) -> Tuple[str, bool]:
        """Generate AI response using DialoGPT or OpenAI with RAG-enhanced agriculture context
        Returns: (response, is_ai_generated) where is_ai_generated is True if AI succeeded
        """
        try:
            # Get agriculture context using RAG
            agri_context = self._get_agriculture_context(user_message)
            
            # Use OpenAI if available (better quality)
            if self.use_openai and self.openai_api_key:
                return self._generate_ai_response_openai(user_message, conversation_history, agri_context)
            
            # Fall back to DialoGPT for local inference
            if not self.model or not self.tokenizer:
                fallback = self._get_fallback_response(user_message)
                return fallback, False
            
            # Build conversation context
            conversation_text = ""
            if conversation_history:
                for msg in conversation_history[-5:]:  # Last 5 messages for context
                    conversation_text += f"User: {msg.get('user_message', '')}\n"
                    conversation_text += f"Bot: {msg.get('bot_response', '')}\n"
            
            # Build enhanced prompt with RAG-retrieved agriculture context
            if agri_context:
                context_prompt = f"""You are an expert agricultural assistant. Use the following agriculture knowledge to answer accurately:

{agri_context}

Based on this information, provide helpful, practical advice to the farmer."""
            else:
                context_prompt = "You are a helpful agricultural assistant. Provide practical farming advice."
            
            # Combine context with current message
            full_input = f"{context_prompt}\n\n{conversation_text}User: {user_message}\nBot:"
            
            # Tokenize
            input_ids = self.tokenizer.encode(
                full_input,
                return_tensors='pt',
                max_length=512,
                truncation=True
            ).to(self.device)
            
            # Generate response
            with torch.no_grad():
                output = self.model.generate(
                    input_ids,
                    max_length=input_ids.shape[1] + 100,  # Generate up to 100 new tokens
                    num_beams=5,
                    no_repeat_ngram_size=3,
                    top_p=0.9,
                    temperature=0.8,
                    do_sample=True,
                    pad_token_id=self.tokenizer.eos_token_id,
                    eos_token_id=self.tokenizer.eos_token_id
                )
            
            # Decode response
            response = self.tokenizer.decode(output[0], skip_special_tokens=True)
            
            # Extract only the new generated part (after the input)
            if "Bot:" in response:
                response = response.split("Bot:")[-1].strip()
            else:
                # If no Bot: marker, remove the input part
                response = response.replace(full_input, "").strip()
            
            # Clean response
            response = response.replace("User:", "").replace("Bot:", "").strip()
            
            # Remove any remaining input text
            if user_message.lower() in response.lower():
                # Try to get only the part after the user message
                parts = response.split(user_message)
                if len(parts) > 1:
                    response = parts[-1].strip()
            
            # If response is too short, empty, or similar to input, use fallback
            if len(response) < 10 or response.lower() == user_message.lower() or not response:
                fallback = self._get_fallback_response(user_message)
                return fallback, False
            
            # Limit response length
            if len(response) > 500:
                response = response[:500] + "..."
            
            return response, True
            
        except Exception as e:
            print(f"❌ Error generating AI response: {e}")
            import traceback
            traceback.print_exc()
            fallback = self._get_fallback_response(user_message)
            return fallback, False
    
    def _get_fallback_response(self, user_message: str) -> str:
        """Fallback response using RAG knowledge base"""
        # Use RAG to get relevant agriculture information
        agri_info = self._get_agriculture_context(user_message)
        
        if agri_info:
            # Format the retrieved information as a helpful response
            user_lower = user_message.lower()
            
            # Check for specific crop questions
            for crop_key, crop_data in self.agriculture_kb.crop_database.items():
                if crop_key in user_lower or crop_data["name"].lower() in user_lower:
                    response = f"Here's information about growing {crop_data['name']}:\n\n"
                    response += f"**Season:** {crop_data['season']} (Cycle: {crop_data['cycle_length']} days)\n"
                    response += f"**Soil:** pH {crop_data['soil']['ph_min']}-{crop_data['soil']['ph_max']}, {', '.join(crop_data['soil']['type'])}\n"
                    response += f"**Water:** {crop_data['water']['requirement']} - {crop_data['water']['irrigation_cycle']}\n"
                    response += f"**Expected Yield:** {crop_data['yield']}\n\n"
                    response += f"**Key Practices:**\n"
                    for practice in crop_data['practices'][:4]:
                        response += f"• {practice}\n"
                    if 'fertilizer' in crop_data:
                        response += f"\n**Fertilizer Schedule:**\n"
                        for fert in crop_data['fertilizer'][:3]:
                            response += f"• {fert['stage']}: {fert['type']} {fert['quantity']}\n"
                    return response
            
            # Check for pest/disease questions
            if any(word in user_lower for word in ["disease", "pest", "infection", "blight"]):
                for pest_key, pest_data in self.agriculture_kb.pest_database.items():
                    if pest_data["crop"].lower() in user_lower or any(word in pest_key for word in user_lower.split()):
                        response = f"**{pest_key.replace('_', ' ').title()}** ({pest_data['crop']})\n\n"
                        response += f"{pest_data['summary']}\n\n"
                        if 'treatment' in pest_data:
                            response += f"**Treatment:**\n"
                            for treatment in pest_data['treatment'][:2]:
                                response += f"• {treatment}\n"
                        if 'prevention' in pest_data:
                            response += f"\n**Prevention:**\n"
                            for prevention in pest_data['prevention'][:2]:
                                response += f"• {prevention}\n"
                        return response
            
            # Use retrieved info as context
            return f"Based on agriculture best practices:\n\n{agri_info}\n\nWould you like more specific information about any aspect?"
        
        # Generic helpful responses if no specific info found
        generic_responses = [
            "That's a great question! Could you provide more details about your farm or crop?",
            "I'd be happy to help! Are you asking about disease management, fertilization, or crop planning?",
            "For more specific advice, tell me about your crops and current challenges.",
            "What specific agricultural aspect would you like to know more about?",
            "I'm here to help with farming questions. What's your main concern?"
        ]
        
        import random
        return random.choice(generic_responses)
    
    def get_response(
        self, 
        user_message: str, 
        conversation_history: List[dict] = None
    ) -> dict:
        """Get chatbot response - ALWAYS use AI first, RAG knowledge base as fallback"""
        if not self.model_loaded:
            # If model not loaded, use RAG-enhanced knowledge base
            fallback_response = self._get_fallback_response(user_message)
            return {
                "success": True,
                "user_message": user_message,
                "bot_response": fallback_response,
                "confidence": 0.7
            }
        
        if not conversation_history:
            conversation_history = []
        
        try:
            # ALWAYS try AI first for natural, contextual responses
            response, is_ai_generated = self._generate_ai_response(user_message, conversation_history)
            
            # Set confidence based on whether AI generated the response
            confidence = 0.85 if is_ai_generated else 0.7
            
            return {
                "success": True,
                "user_message": user_message,
                "bot_response": response,
                "confidence": confidence
            }
            
        except Exception as e:
            print(f"❌ Error in get_response: {e}")
            import traceback
            traceback.print_exc()
            # Fallback to RAG-enhanced knowledge base on error
            fallback_response = self._get_fallback_response(user_message)
            return {
                "success": True,
                "user_message": user_message,
                "bot_response": fallback_response,
                "confidence": 0.7
            }

# Initialize chatbot service
chatbot_service = ChatbotService()