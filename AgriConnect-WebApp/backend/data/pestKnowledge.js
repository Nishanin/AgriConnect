export const pestKnowledgeBase = {
  "tomato___late_blight": {
    displayName: "Tomato Late Blight",
    category: "fungal disease",
    severity: "high",
    crop: "Tomato",
    summary:
      "Late blight spreads rapidly under humid/wet conditions and can wipe out tomato foliage within days if untreated.",
    immediate: [
      "Isolate infected plots and destroy heavily infected plants/leaves.",
      "Avoid overhead irrigation to reduce leaf wetness.",
      "Improve ventilation and drainage in the plot.",
    ],
    treatment: [
      "Spray Copper Oxychloride 50% WP @ 2.5 g/litre or Mancozeb 75% WP @ 2 g/litre every 7 days.",
      "Rotate fungicides with different FRAC codes to delay resistance.",
      "Use systemic options like Metalaxyl + Mancozeb for severe outbreaks.",
    ],
    prevention: [
      "Plant certified disease-free seed/seedlings.",
      "Maintain 45-60 cm spacing for airflow.",
      "Adopt drip irrigation and mulch to reduce humidity.",
    ],
    pesticides: [
      {
        name: "Copper Oxychloride 50% WP",
        type: "Fungicide (contact)",
        dosage: "2.5 g / litre",
        reEntryInterval: "48h",
      },
      {
        name: "Metalaxyl 8% + Mancozeb 64% WP",
        type: "Fungicide (systemic + contact)",
        dosage: "2 g / litre",
        reEntryInterval: "72h",
      },
    ],
    organicAlternatives: [
      "5% Neem seed kernel extract spray every 5 days.",
      "Bio-fungicide containing Trichoderma harzianum @ 5 g/litre.",
    ],
    affectedAreaRange: [30, 60],
  },
  "tomato___early_blight": {
    displayName: "Tomato Early Blight",
    category: "fungal disease",
    severity: "medium",
    crop: "Tomato",
    summary:
      "Early blight causes characteristic concentric rings on leaves and leads to defoliation when unchecked.",
    immediate: [
      "Remove and burn the first infected leaves.",
      "Avoid working in fields when foliage is wet.",
    ],
    treatment: [
      "Apply Chlorothalonil 75% WP @ 2 g/litre or Azoxystrobin 23% SC @ 0.5 ml/litre.",
      "Repeat sprays in 7-10 day intervals depending on pressure.",
    ],
    prevention: [
      "Follow crop rotation with cereals.",
      "Use resistant cultivars and ensure balanced nutrition.",
      "Stake plants to avoid soil splash.",
    ],
    pesticides: [
      {
        name: "Azoxystrobin 23% SC",
        type: "Fungicide (systemic)",
        dosage: "0.5 ml / litre",
        reEntryInterval: "24h",
      },
      {
        name: "Chlorothalonil 75% WP",
        type: "Fungicide (contact)",
        dosage: "2 g / litre",
        reEntryInterval: "48h",
      },
    ],
    organicAlternatives: [
      "Bacillus subtilis based bio-fungicide sprays.",
      "1% Bordeaux mixture every 10 days.",
    ],
    affectedAreaRange: [15, 35],
  },
  "pepper__bell___bacterial_spot": {
    displayName: "Pepper Bacterial Spot",
    category: "bacterial disease",
    severity: "medium",
    crop: "Capsicum",
    summary:
      "Bacterial spot leads to water-soaked lesions and fruit blemishes, thriving in warm humid weather.",
    immediate: [
      "Destroy infected debris and avoid sprinkler irrigation.",
      "Disinfect tools between fields.",
    ],
    treatment: [
      "Spray fixed copper formulations (Copper Hydroxide 53.8% DF @ 2 g/litre).",
      "Tank-mix with Streptomycin Sulphate 9% + Tetracycline 1% @ 0.5 g/litre for serious infection.",
    ],
    prevention: [
      "Use certified pathogen-free seed treated with hot water (50°C for 25 min).",
      "Implement raised beds and mulching to limit splashing.",
    ],
    pesticides: [
      {
        name: "Copper Hydroxide 53.8% DF",
        type: "Bactericide",
        dosage: "2 g / litre",
        reEntryInterval: "48h",
      },
      {
        name: "Streptomycin Sulphate 9% + Tetracycline 1%",
        type: "Antibiotic combo",
        dosage: "0.5 g / litre",
        reEntryInterval: "72h",
      },
    ],
    organicAlternatives: [
      "0.3% Neem oil + 0.5% soap solution spray.",
      "Beneficial microbes like Pseudomonas fluorescens @ 10 g/litre.",
    ],
    affectedAreaRange: [10, 25],
  },
  "apple___black_rot": {
    displayName: "Apple Black Rot",
    category: "fungal disease",
    severity: "medium",
    crop: "Apple",
    summary:
      "Black rot affects apples during warm months causing cankers on limbs and concentric fruit rot.",
    immediate: [
      "Prune infected twigs during dormancy and destroy prunings.",
      "Apply wound dressing after pruning.",
    ],
    treatment: [
      "Spray Captan 50% WP @ 2 g/litre or Thiophanate Methyl 70% WP @ 1 g/litre.",
      "Ensure thorough coverage of canopy and fruit.",
    ],
    prevention: [
      "Maintain orchard sanitation and remove mummified fruits.",
      "Adopt balanced fertilization to avoid excessive vegetative growth.",
    ],
    pesticides: [
      {
        name: "Captan 50% WP",
        type: "Fungicide (contact)",
        dosage: "2 g / litre",
        reEntryInterval: "72h",
      },
      {
        name: "Thiophanate Methyl 70% WP",
        type: "Fungicide (systemic)",
        dosage: "1 g / litre",
        reEntryInterval: "48h",
      },
    ],
    organicAlternatives: [
      "Lime-sulphur sprays during dormant season.",
      "Trichoderma viride @ 5 g/litre applied to pruning wounds.",
    ],
    affectedAreaRange: [20, 40],
  },
  "grape___black_rot": {
    displayName: "Grape Black Rot",
    category: "fungal disease",
    severity: "high",
    crop: "Grapes",
    summary:
      "Black rot rapidly destroys grape clusters during humid summers. Early detection is key.",
    immediate: [
      "Remove mummified berries and infected tendrils.",
      "Open up canopy through pruning.",
    ],
    treatment: [
      "Initiate protective sprays with Mancozeb 75% WP @ 2 g/litre.",
      "Follow up with systemic fungicides like Myclobutanil 10% WP @ 0.4 g/litre.",
    ],
    prevention: [
      "Maintain trellis ventilation, timely pruning, and weed control.",
      "Adopt drip irrigation to keep foliage dry.",
    ],
    pesticides: [
      {
        name: "Mancozeb 75% WP",
        type: "Fungicide (contact)",
        dosage: "2 g / litre",
        reEntryInterval: "48h",
      },
      {
        name: "Myclobutanil 10% WP",
        type: "Fungicide (systemic)",
        dosage: "0.4 g / litre",
        reEntryInterval: "24h",
      },
    ],
    organicAlternatives: [
      "Compost tea (aerated) sprayed weekly during wet periods.",
      "Bio-fungicide containing Bacillus amyloliquefaciens.",
    ],
    affectedAreaRange: [25, 45],
  },
  default: {
    displayName: "Suspected Pest/Disease",
    category: "unknown",
    severity: "medium",
    crop: "Crop",
    summary:
      "Image indicates possible stress. Review the suggested cultural practices while the model is refined.",
    immediate: [
      "Isolate the affected plants to prevent spread.",
      "Inspect both sides of the leaves with a magnifier.",
    ],
    treatment: [
      "Use a broad-spectrum bio-pesticide (Neem oil 3%) as a first response.",
      "Consult local agronomist with additional images if symptoms persist.",
    ],
    prevention: [
      "Maintain crop rotation and field hygiene.",
      "Ensure balanced nutrition and avoid over-irrigation.",
    ],
    pesticides: [
      {
        name: "Neem oil 3% EC",
        type: "Botanical",
        dosage: "3 ml / litre",
        reEntryInterval: "12h",
      },
    ],
    organicAlternatives: [
      "Fermented buttermilk spray (1:10 dilution).",
    ],
    affectedAreaRange: [10, 30],
  },
};

export function enrichWithKnowledge(label) {
  const normalized = label?.toLowerCase();
  return pestKnowledgeBase[normalized] || pestKnowledgeBase.default;
}

