"""
Comprehensive Agriculture Knowledge Base for RAG-enhanced chatbot
"""
from typing import List, Dict, Any
import re

class AgricultureKnowledgeBase:
    """Agriculture knowledge base for retrieval-augmented generation"""
    
    def __init__(self):
        self.crop_database = self._load_crop_database()
        self.pest_database = self._load_pest_database()
        self.general_knowledge = self._load_general_knowledge()
    
    def _load_crop_database(self) -> Dict[str, Any]:
        """Load comprehensive crop information"""
        return {
            "tomato": {
                "name": "Tomato",
                "season": "Summer/Monsoon",
                "planting_months": [3, 4, 5, 9, 10],
                "harvest_months": [6, 7, 8, 12, 1],
                "cycle_length": 90,
                "climate": {
                    "temp_min": 20, "temp_max": 30,
                    "rain_min": 600, "rain_max": 1000,
                    "humidity_min": 50, "humidity_max": 80
                },
                "soil": {
                    "type": ["Loamy", "Sandy Loam"],
                    "ph_min": 6.0, "ph_max": 7.0,
                    "drainage_required": True,
                    "organic_matter": "High"
                },
                "water": {"requirement": "High", "irrigation_cycle": "Every 2-3 days"},
                "yield": "40-50 tons/hectare",
                "profitability": "Very High",
                "practices": [
                    "Use drip irrigation", "Stake plants for support",
                    "Mulch to retain moisture", "Regular pruning for better air circulation",
                    "Rotate crops annually"
                ],
                "pest_management": [
                    "Install insect nets", "Use neem oil spray",
                    "Yellow sticky traps for whiteflies", "Remove infected plants immediately"
                ],
                "fertilizer": [
                    {"stage": "Pre-planting", "type": "FYM", "quantity": "25-30 t/ha"},
                    {"stage": "Planting", "type": "NPK 12:32:16", "quantity": "500 kg/ha"},
                    {"stage": "Flowering", "type": "Urea", "quantity": "250 kg/ha"},
                    {"stage": "Fruiting", "type": "Potassium", "quantity": "200 kg/ha"}
                ]
            },
            "wheat": {
                "name": "Wheat",
                "season": "Winter/Rabi",
                "planting_months": [10, 11, 12],
                "harvest_months": [3, 4, 5],
                "cycle_length": 120,
                "climate": {
                    "temp_min": 15, "temp_max": 25,
                    "rain_min": 400, "rain_max": 800,
                    "humidity_min": 40, "humidity_max": 70
                },
                "soil": {
                    "type": ["Loam", "Clay Loam"],
                    "ph_min": 6.0, "ph_max": 7.5,
                    "drainage_required": True,
                    "organic_matter": "Medium to High"
                },
                "water": {"requirement": "Medium", "irrigation_cycle": "Every 10-15 days"},
                "yield": "4-5 tons/hectare",
                "profitability": "High",
                "practices": [
                    "Timely sowing is crucial", "Use certified seeds",
                    "Proper weed management", "Crop rotation with legumes"
                ],
                "fertilizer": [
                    {"stage": "Pre-planting", "type": "FYM", "quantity": "10-15 t/ha"},
                    {"stage": "Planting", "type": "NPK 10:26:26", "quantity": "150 kg/ha"},
                    {"stage": "Tillering", "type": "Urea", "quantity": "100 kg/ha"}
                ]
            },
            "rice": {
                "name": "Rice",
                "season": "Kharif/Monsoon",
                "planting_months": [6, 7, 8],
                "harvest_months": [10, 11, 12],
                "cycle_length": 120,
                "climate": {
                    "temp_min": 20, "temp_max": 35,
                    "rain_min": 1000, "rain_max": 2000,
                    "humidity_min": 70, "humidity_max": 90
                },
                "soil": {
                    "type": ["Clay", "Clay Loam"],
                    "ph_min": 5.5, "ph_max": 7.0,
                    "drainage_required": False,
                    "organic_matter": "High"
                },
                "water": {"requirement": "Very High", "irrigation_cycle": "Continuous flooding"},
                "yield": "5-6 tons/hectare",
                "profitability": "High",
                "practices": [
                    "Transplanting method", "Proper water management",
                    "Integrated pest management", "Use of bio-fertilizers"
                ],
                "fertilizer": [
                    {"stage": "Pre-planting", "type": "FYM", "quantity": "10-12 t/ha"},
                    {"stage": "Planting", "type": "NPK 10:26:26", "quantity": "100 kg/ha"},
                    {"stage": "Tillering", "type": "Urea", "quantity": "50 kg/ha"},
                    {"stage": "Panicle initiation", "type": "Urea", "quantity": "50 kg/ha"}
                ]
            },
            "potato": {
                "name": "Potato",
                "season": "Winter/Rabi",
                "planting_months": [9, 10, 11],
                "harvest_months": [1, 2, 3],
                "cycle_length": 120,
                "climate": {
                    "temp_min": 10, "temp_max": 20,
                    "rain_min": 500, "rain_max": 800,
                    "humidity_min": 60, "humidity_max": 90
                },
                "soil": {
                    "type": ["Sandy Loam", "Loam"],
                    "ph_min": 5.5, "ph_max": 7.0,
                    "drainage_required": True,
                    "organic_matter": "Medium to High"
                },
                "water": {"requirement": "Medium", "irrigation_cycle": "Every 7-10 days"},
                "yield": "20-25 tons/hectare",
                "profitability": "High",
                "practices": [
                    "Ridge and furrow method", "Use certified seed potatoes",
                    "Earthing up during growth", "Mulching reduces disease"
                ],
                "fertilizer": [
                    {"stage": "Pre-planting", "type": "FYM", "quantity": "20-25 t/ha"},
                    {"stage": "Planting", "type": "NPK 10:26:26", "quantity": "500 kg/ha"},
                    {"stage": "Growth", "type": "Urea", "quantity": "200 kg/ha"}
                ]
            },
            "corn": {
                "name": "Corn/Maize",
                "season": "Kharif/Summer",
                "planting_months": [5, 6, 7],
                "harvest_months": [9, 10, 11],
                "cycle_length": 90,
                "climate": {
                    "temp_min": 18, "temp_max": 27,
                    "rain_min": 500, "rain_max": 1000,
                    "humidity_min": 50, "humidity_max": 80
                },
                "soil": {
                    "type": ["Loam", "Sandy Loam"],
                    "ph_min": 5.8, "ph_max": 7.0,
                    "drainage_required": True,
                    "organic_matter": "Medium"
                },
                "water": {"requirement": "Medium to High", "irrigation_cycle": "Every 5-7 days"},
                "yield": "6-8 tons/hectare",
                "profitability": "Medium to High",
                "practices": [
                    "Proper spacing (60-75 cm)", "Timely weeding",
                    "Earthing up", "Crop rotation"
                ],
                "fertilizer": [
                    {"stage": "Pre-planting", "type": "FYM", "quantity": "10-15 t/ha"},
                    {"stage": "Planting", "type": "NPK 10:26:26", "quantity": "120 kg/ha"},
                    {"stage": "Knee high", "type": "Urea", "quantity": "100 kg/ha"}
                ]
            }
        }
    
    def _load_pest_database(self) -> Dict[str, Any]:
        """Load pest and disease information"""
        return {
            "tomato_late_blight": {
                "crop": "Tomato",
                "category": "fungal disease",
                "severity": "high",
                "summary": "Late blight spreads rapidly under humid/wet conditions and can wipe out tomato foliage within days if untreated.",
                "immediate": [
                    "Isolate infected plots and destroy heavily infected plants/leaves.",
                    "Avoid overhead irrigation to reduce leaf wetness.",
                    "Improve ventilation and drainage in the plot."
                ],
                "treatment": [
                    "Spray Copper Oxychloride 50% WP @ 2.5 g/litre or Mancozeb 75% WP @ 2 g/litre every 7 days.",
                    "Rotate fungicides with different FRAC codes to delay resistance.",
                    "Use systemic options like Metalaxyl + Mancozeb for severe outbreaks."
                ],
                "prevention": [
                    "Plant certified disease-free seed/seedlings.",
                    "Maintain 45-60 cm spacing for airflow.",
                    "Adopt drip irrigation and mulch to reduce humidity."
                ],
                "organic_alternatives": [
                    "5% Neem seed kernel extract spray every 5 days.",
                    "Bio-fungicide containing Trichoderma harzianum @ 5 g/litre."
                ]
            },
            "tomato_early_blight": {
                "crop": "Tomato",
                "category": "fungal disease",
                "severity": "medium",
                "summary": "Early blight causes characteristic concentric rings on leaves and leads to defoliation when unchecked.",
                "treatment": [
                    "Spray Mancozeb 75% WP @ 2.5 g/litre every 7-10 days.",
                    "Copper-based fungicides as preventive measure."
                ],
                "prevention": [
                    "Remove infected leaves early",
                    "Maintain proper plant spacing",
                    "Avoid overhead irrigation"
                ]
            }
        }
    
    def _load_general_knowledge(self) -> Dict[str, List[str]]:
        """Load general agriculture knowledge"""
        return {
            "fertilizer": [
                "NPK ratios vary by crop. For wheat, NPK 10:26:26 is common. For tomatoes, NPK 12:32:16 is recommended.",
                "Organic fertilizers (FYM, compost) improve soil health long-term and should be applied before planting.",
                "Urea is a nitrogen source applied during growth stages. Apply 50-100 kg/ha depending on crop.",
                "Phosphorus is crucial for root development. Apply during planting stage.",
                "Potassium improves fruit quality and disease resistance. Apply during flowering/fruiting stage."
            ],
            "irrigation": [
                "Drip irrigation is 30-50% more efficient than flood irrigation and reduces disease spread.",
                "Water requirements vary: Rice needs continuous flooding, while wheat needs periodic irrigation every 10-15 days.",
                "Monitor soil moisture using tensiometers or simple finger test. Water when top 2-3 cm is dry.",
                "Early morning irrigation reduces evaporation and disease risk.",
                "Mulching reduces water requirement by 30-40% and controls weeds."
            ],
            "soil_management": [
                "Soil pH between 6.0-7.5 is ideal for most crops. Test soil every 2-3 years.",
                "Crop rotation with legumes improves soil nitrogen naturally.",
                "Organic matter (FYM, compost) should be 2-3% of soil for optimal crop growth.",
                "Proper drainage prevents waterlogging which causes root rot.",
                "Soil testing before each season helps determine exact fertilizer requirements."
            ],
            "pest_management": [
                "Integrated Pest Management (IPM) combines biological, cultural, and chemical methods.",
                "Early detection is key - inspect crops weekly for signs of pests or diseases.",
                "Neem oil is an effective organic pesticide. Use 5ml per liter of water.",
                "Crop rotation breaks pest cycles. Don't plant same crop in same field consecutively.",
                "Beneficial insects like ladybugs and spiders help control pests naturally."
            ],
            "post_harvest": [
                "After harvesting, prepare land for next crop by removing crop residues and plowing.",
                "Store harvested crops in cool, dry places to prevent spoilage.",
                "Proper drying is essential for grains - moisture content should be below 14%.",
                "Crop residues can be composted or used as mulch for next season.",
                "Plan next crop based on season, market demand, and soil health."
            ]
        }
    
    def retrieve_relevant_info(self, user_message: str, max_results: int = 5) -> str:
        """Retrieve relevant agriculture information for RAG"""
        user_lower = user_message.lower()
        relevant_info = []
        
        # Check for crop mentions
        for crop_key, crop_data in self.crop_database.items():
            if crop_key in user_lower or crop_data["name"].lower() in user_lower:
                info = f"Crop: {crop_data['name']}\n"
                info += f"Season: {crop_data['season']}, Cycle: {crop_data['cycle_length']} days\n"
                info += f"Yield: {crop_data['yield']}, Profitability: {crop_data['profitability']}\n"
                info += f"Soil: pH {crop_data['soil']['ph_min']}-{crop_data['soil']['ph_max']}, {', '.join(crop_data['soil']['type'])}\n"
                info += f"Water: {crop_data['water']['requirement']}, Irrigation: {crop_data['water']['irrigation_cycle']}\n"
                info += f"Key Practices: {', '.join(crop_data['practices'][:3])}\n"
                if 'fertilizer' in crop_data:
                    fert_info = "; ".join([f"{f['stage']}: {f['type']} {f['quantity']}" for f in crop_data['fertilizer'][:2]])
                    info += f"Fertilizer: {fert_info}\n"
                relevant_info.append(info)
                if len(relevant_info) >= max_results:
                    break
        
        # Check for pest/disease mentions
        if any(word in user_lower for word in ["disease", "pest", "infection", "blight", "rot"]):
            for pest_key, pest_data in self.pest_database.items():
                if pest_data["crop"].lower() in user_lower or any(word in pest_key for word in user_lower.split()):
                    info = f"Disease: {pest_key.replace('_', ' ').title()}\n"
                    info += f"Crop: {pest_data['crop']}, Severity: {pest_data['severity']}\n"
                    info += f"Summary: {pest_data['summary']}\n"
                    if 'treatment' in pest_data:
                        info += f"Treatment: {pest_data['treatment'][0]}\n"
                    if 'prevention' in pest_data:
                        info += f"Prevention: {pest_data['prevention'][0]}\n"
                    relevant_info.append(info)
                    if len(relevant_info) >= max_results:
                        break
        
        # Check for general topics
        topic_keywords = {
            "fertilizer": ["fertilizer", "npk", "urea", "nutrient", "fertilization"],
            "irrigation": ["water", "irrigation", "drainage", "moisture", "watering"],
            "soil_management": ["soil", "ph", "organic", "compost", "fym"],
            "pest_management": ["pest", "insect", "spray", "pesticide", "ipm"],
            "post_harvest": ["harvest", "after farming", "post harvest", "storage", "drying"]
        }
        
        for topic, keywords in topic_keywords.items():
            if any(keyword in user_lower for keyword in keywords):
                if topic in self.general_knowledge:
                    for fact in self.general_knowledge[topic][:2]:
                        relevant_info.append(f"{topic.replace('_', ' ').title()}: {fact}")
                    if len(relevant_info) >= max_results:
                        break
        
        return "\n\n".join(relevant_info[:max_results]) if relevant_info else ""

# Global instance
agriculture_kb = AgricultureKnowledgeBase()

