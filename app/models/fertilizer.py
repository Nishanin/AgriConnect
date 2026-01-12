from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class FertilizerSchedule(BaseModel):
    id: Optional[str] = None
    fertilizer_type: str
    amount: str
    target_field: str
    scheduled_date: datetime
    status: str  # PENDING, SCHEDULED, COMPLETED, CANCELLED
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class FertilizerScheduleCreate(BaseModel):
    fertilizer_type: str
    amount: str
    target_field: str
    scheduled_date: datetime

class FertilizerScheduleUpdate(BaseModel):
    fertilizer_type: Optional[str] = None
    amount: Optional[str] = None
    target_field: Optional[str] = None
    scheduled_date: Optional[datetime] = None
    status: Optional[str] = None