from fastapi import APIRouter, HTTPException, Query
from datetime import datetime
from typing import List
import uuid
from app.models.fertilizer import (
    FertilizerSchedule, 
    FertilizerScheduleCreate, 
    FertilizerScheduleUpdate
)

router = APIRouter(prefix="/api/fertilizer", tags=["fertilizer"])

# In-memory database (replace with real database later)
fertilizer_db = {
    "1": {
        "id": "1",
        "fertilizer_type": "NPK 10:26:26",
        "amount": "50kg/acre",
        "target_field": "Field A - Wheat",
        "scheduled_date": datetime(2025, 12, 3, 6, 0),
        "status": "PENDING",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    "2": {
        "id": "2",
        "fertilizer_type": "Urea",
        "amount": "30kg/acre",
        "target_field": "Field B - Tomatoes",
        "scheduled_date": datetime(2025, 12, 10, 7, 0),
        "status": "SCHEDULED",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    "3": {
        "id": "3",
        "fertilizer_type": "Organic Compost",
        "amount": "100kg/acre",
        "target_field": "Field C - Rice",
        "scheduled_date": datetime(2026, 1, 3, 6, 30),
        "status": "SCHEDULED",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
}

@router.get("/schedules", response_model=List[FertilizerSchedule])
async def get_all_schedules(status: str = Query(None)):
    """Get all fertilizer schedules, optionally filtered by status"""
    schedules = list(fertilizer_db.values())
    
    if status:
        schedules = [s for s in schedules if s["status"] == status.upper()]
    
    # Sort by scheduled_date
    schedules.sort(key=lambda x: x["scheduled_date"])
    return schedules

@router.get("/schedules/{schedule_id}", response_model=FertilizerSchedule)
async def get_schedule(schedule_id: str):
    """Get a specific fertilizer schedule"""
    if schedule_id not in fertilizer_db:
        raise HTTPException(status_code=404, detail="Schedule not found")
    
    return fertilizer_db[schedule_id]

@router.post("/schedules", response_model=FertilizerSchedule)
async def create_schedule(schedule: FertilizerScheduleCreate):
    """Create a new fertilizer schedule"""
    schedule_id = str(uuid.uuid4())
    
    new_schedule = {
        "id": schedule_id,
        "fertilizer_type": schedule.fertilizer_type,
        "amount": schedule.amount,
        "target_field": schedule.target_field,
        "scheduled_date": schedule.scheduled_date,
        "status": "SCHEDULED",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
    
    fertilizer_db[schedule_id] = new_schedule
    return new_schedule

@router.put("/schedules/{schedule_id}", response_model=FertilizerSchedule)
async def update_schedule(schedule_id: str, schedule: FertilizerScheduleUpdate):
    """Update an existing fertilizer schedule"""
    if schedule_id not in fertilizer_db:
        raise HTTPException(status_code=404, detail="Schedule not found")
    
    existing = fertilizer_db[schedule_id]
    
    if schedule.fertilizer_type is not None:
        existing["fertilizer_type"] = schedule.fertilizer_type
    if schedule.amount is not None:
        existing["amount"] = schedule.amount
    if schedule.target_field is not None:
        existing["target_field"] = schedule.target_field
    if schedule.scheduled_date is not None:
        existing["scheduled_date"] = schedule.scheduled_date
    if schedule.status is not None:
        existing["status"] = schedule.status.upper()
    
    existing["updated_at"] = datetime.now()
    fertilizer_db[schedule_id] = existing
    
    return existing

@router.delete("/schedules/{schedule_id}")
async def delete_schedule(schedule_id: str):
    """Delete a fertilizer schedule"""
    if schedule_id not in fertilizer_db:
        raise HTTPException(status_code=404, detail="Schedule not found")
    
    del fertilizer_db[schedule_id]
    return {"message": "Schedule deleted successfully", "id": schedule_id}

@router.patch("/schedules/{schedule_id}/status")
async def update_status(schedule_id: str, status: str):
    """Update schedule status (PENDING, SCHEDULED, COMPLETED, CANCELLED)"""
    if schedule_id not in fertilizer_db:
        raise HTTPException(status_code=404, detail="Schedule not found")
    
    valid_statuses = ["PENDING", "SCHEDULED", "COMPLETED", "CANCELLED"]
    if status.upper() not in valid_statuses:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
        )
    
    fertilizer_db[schedule_id]["status"] = status.upper()
    fertilizer_db[schedule_id]["updated_at"] = datetime.now()
    
    return fertilizer_db[schedule_id]

@router.post("/schedules/{schedule_id}/apply")
async def apply_schedule(schedule_id: str):
    """Mark a schedule as applied/completed"""
    if schedule_id not in fertilizer_db:
        raise HTTPException(status_code=404, detail="Schedule not found")
    
    fertilizer_db[schedule_id]["status"] = "COMPLETED"
    fertilizer_db[schedule_id]["updated_at"] = datetime.now()
    
    return {
        "message": "Schedule marked as completed",
        "schedule": fertilizer_db[schedule_id]
    }

@router.get("/health")
async def health_check():
    """Health check for fertilizer service"""
    return {
        "status": "healthy",
        "service": "fertilizer-management",
        "total_schedules": len(fertilizer_db)
    }