from sqlalchemy.orm import Session
from app.models.settings import Settings


# ---------------------------------
# GET SETTINGS
# ---------------------------------

def get_settings(db: Session):

    settings = db.query(Settings).first()

    if not settings:

        settings = Settings()

        db.add(settings)
        db.commit()
        db.refresh(settings)

    return settings


# ---------------------------------
# UPDATE SETTINGS
# ---------------------------------

def update_settings(db: Session, data: dict):

    settings = db.query(Settings).first()

    if not settings:

        settings = Settings()

        db.add(settings)
        db.commit()
        db.refresh(settings)

    for key, value in data.items():

        setattr(settings, key, value)

    db.commit()
    db.refresh(settings)

    return settings