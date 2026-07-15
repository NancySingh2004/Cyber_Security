from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.evidence import Evidence
from sqlalchemy import func

from app.database.database import SessionLocal
from app.models.case import Case
from app.schemas.case import CaseCreate

router = APIRouter(prefix="/cases", tags=["Cases"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_case(case: CaseCreate, db: Session = Depends(get_db)):
    new_case = Case(
        title=case.title,
        investigator=case.investigator,
        case_type=case.case_type,
        priority=case.priority,
        description=case.description,
        status="Open",
    )

    db.add(new_case)
    db.commit()
    db.refresh(new_case)

    return new_case

@router.get("/")
def get_all_cases(db: Session = Depends(get_db)):
    return db.query(Case).all()


@router.get("/{case_id}/summary")
def get_case_summary(
    case_id: int,
    db: Session = Depends(get_db),
):
    case = (
        db.query(Case)
        .filter(Case.id == case_id)
        .first()
    )

    if not case:
        return {
            "error": "Case not found"
        }

    evidence = (
        db.query(Evidence)
        .filter(Evidence.case_id == case_id)
        .all()
    )

    total = len(evidence)

    images = sum(
        1
        for e in evidence
        if e.filetype and e.filetype.startswith("image/")
    )

    apk = sum(
        1
        for e in evidence
        if e.filename.lower().endswith(".apk")
    )

    databases = sum(
        1
        for e in evidence
        if e.filename.lower().endswith(
            (".db", ".sqlite", ".sqlite3")
        )
    )

    documents = sum(
        1
        for e in evidence
        if e.filename.lower().endswith(
            (
                ".pdf",
                ".doc",
                ".docx",
                ".txt",
                ".csv",
                ".json",
            )
        )
    )

    pending = sum(
        1
        for e in evidence
        if e.status != "Analyzed"
    )

    return {
        "case": case,
        "summary": {
            "total_evidence": total,
            "images": images,
            "apk": apk,
            "databases": databases,
            "documents": documents,
            "pending_analysis": pending,
        },
    }