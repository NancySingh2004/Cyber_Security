from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.evidence import Evidence
from app.services.analyzer import analyze_file

router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/file/{evidence_id}")
def analyze_evidence(
    evidence_id: int,
    db: Session = Depends(get_db)
):
    evidence = (
        db.query(Evidence)
        .filter(Evidence.id == evidence_id)
        .first()
    )

    if not evidence:
        raise HTTPException(
            status_code=404,
            detail="Evidence not found"
        )

    result = analyze_file(
        evidence.filepath
    )

    return result