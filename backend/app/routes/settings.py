from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.settings import SettingsResponse, SettingsUpdate
from app.crud.settings import get_settings, update_settings

router = APIRouter(
    prefix="/settings",
    tags=["Settings"]
)


# -------------------------------
# GET SETTINGS
# -------------------------------

@router.get(
    "/",
    response_model=SettingsResponse
)
def read_settings(
    db: Session = Depends(get_db)
):

    return get_settings(db)


# -------------------------------
# UPDATE SETTINGS
# -------------------------------

@router.put(
    "/",
    response_model=SettingsResponse
)
def save_settings(
    settings: SettingsUpdate,
    db: Session = Depends(get_db)
):

    return update_settings(
        db,
        settings.model_dump()
    )