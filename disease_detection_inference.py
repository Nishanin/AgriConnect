from transformers import pipeline
from PIL import Image
import os

print("🔄 Loading trained model...")
try:
    classifier = pipeline(
        "image-classification",
        model="./disease-detection-model"
    )
    print("✅ Model loaded!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    exit()

# Test on dataset images
dataset_path = "./datasets/New Plant Diseases Dataset(Augmented)"

print("\n🔍 Testing on dataset images...\n")

if os.path.exists(dataset_path):
    disease_folders = os.listdir(dataset_path)
    print(f"📂 Found {len(disease_folders)} disease folders\n")
    
    tested = 0
    for idx, disease_folder in enumerate(disease_folders[:5]):  # Test first 5
        folder_path = os.path.join(dataset_path, disease_folder)
        
        if os.path.isdir(folder_path):
            # Check for both .jpg and .JPG extensions
            images = [f for f in os.listdir(folder_path) if f.lower().endswith(('.jpg', '.png', '.jpeg'))]
            print(f"[{idx+1}] 📸 Disease: {disease_folder}")
            print(f"    📊 Images found: {len(images)}")
            
            if images:
                image_path = os.path.join(folder_path, images[0])
                
                try:
                    print(f"    🔄 Processing: {images[0]}")
                    image = Image.open(image_path)
                    results = classifier(image)
                    
                    print(f"    ✅ Predicted: {results[0]['label']}")
                    print(f"    📊 Confidence: {results[0]['score']*100:.2f}%")
                    print(f"    🎯 Actual: {disease_folder}")
                    
                    # Show top 3 predictions
                    print(f"    🔝 Top 3 predictions:")
                    for i, result in enumerate(results[:3], 1):
                        print(f"       {i}. {result['label']}: {result['score']*100:.2f}%")
                    
                    tested += 1
                    
                except Exception as e:
                    print(f"    ❌ Error: {e}")
                    import traceback
                    traceback.print_exc()
            
            print()  # Blank line for readability
    
    print(f"✅ Tested {tested} images successfully!")
    
else:
    print(f"❌ Dataset not found at: {dataset_path}")

print("✅ Testing complete!")