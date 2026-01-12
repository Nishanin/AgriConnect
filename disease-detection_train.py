import os
import torch
from torchvision import datasets, transforms
from torch.utils.data import DataLoader, random_split
from transformers import AutoImageProcessor, AutoModelForImageClassification
from torch import optim
from tqdm import tqdm

# Dataset path
DATASET_PATH = "./datasets/New Plant Diseases Dataset(Augmented)"

# Training settings
EPOCHS = 5
BATCH_SIZE = 32
LEARNING_RATE = 1e-4

# Check if dataset exists
if not os.path.exists(DATASET_PATH):
    print(f"❌ Dataset not found at {DATASET_PATH}")
else:
    print(f"✅ Dataset found!")
    
    print("🔄 Loading dataset...")
    
    # Image preprocessing
    processor = AutoImageProcessor.from_pretrained("google/vit-base-patch16-224-in21k")
    
    # Load dataset
    dataset = datasets.ImageFolder(
        DATASET_PATH,
        transform=transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])
    )
    
    print(f"✅ Loaded {len(dataset)} images")
    print(f"✅ Found {len(dataset.classes)} classes")
    
    # Split dataset (80% train, 20% val)
    train_size = int(0.8 * len(dataset))
    val_size = len(dataset) - train_size
    train_dataset, val_dataset = random_split(dataset, [train_size, val_size])
    
    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE)
    
    print(f"\n📊 Training samples: {len(train_dataset)}")
    print(f"📊 Validation samples: {len(val_dataset)}")
    
    # Load model
    print("\n🔄 Loading model...")
    model = AutoModelForImageClassification.from_pretrained(
        "google/vit-base-patch16-224-in21k",
        num_labels=len(dataset.classes)
    )
    
    # Use GPU if available
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)
    print(f"✅ Using device: {device}")
    
    # Optimizer
    optimizer = optim.Adam(model.parameters(), lr=LEARNING_RATE)
    loss_fn = torch.nn.CrossEntropyLoss()
    
    # Training loop
    print(f"\n🚀 Starting training for {EPOCHS} epochs...\n")
    
    for epoch in range(EPOCHS):
        print(f"Epoch {epoch+1}/{EPOCHS}")
        
        # Train
        model.train()
        train_loss = 0
        for images, labels in tqdm(train_loader, desc="Training"):
            images = images.to(device)
            labels = labels.to(device)
            
            optimizer.zero_grad()
            outputs = model(images)
            loss = loss_fn(outputs.logits, labels)
            loss.backward()
            optimizer.step()
            
            train_loss += loss.item()
        
        # Validation
        model.eval()
        val_loss = 0
        correct = 0
        total = 0
        
        with torch.no_grad():
            for images, labels in tqdm(val_loader, desc="Validation"):
                images = images.to(device)
                labels = labels.to(device)
                
                outputs = model(images)
                loss = loss_fn(outputs.logits, labels)
                val_loss += loss.item()
                
                _, predicted = torch.max(outputs.logits, 1)
                total += labels.size(0)
                correct += (predicted == labels).sum().item()
        
        avg_train_loss = train_loss / len(train_loader)
        avg_val_loss = val_loss / len(val_loader)
        accuracy = 100 * correct / total
        
        print(f"Train Loss: {avg_train_loss:.4f}")
        print(f"Val Loss: {avg_val_loss:.4f}")
        print(f"Val Accuracy: {accuracy:.2f}%\n")
    
    # Save model
    print("💾 Saving model...")
    model.save_pretrained("./disease-detection-model")
    processor.save_pretrained("./disease-detection-model")
    print("✅ Model saved to ./disease-detection-model/")