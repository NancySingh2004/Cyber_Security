from fastapi import APIRouter, UploadFile, File, Depends, Form
from sqlalchemy.orm import Session
import os
import shutil
import hashlib

from app.database.database import SessionLocal
from app.models.evidence import Evidence

router = APIRouter(
    prefix="/evidence",
    tags=["Evidence"]
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_evidence(db: Session = Depends(get_db)):
    return db.query(Evidence).all()

@router.get("/case/{case_id}")
def get_case_evidence(
    case_id: int,
    db: Session = Depends(get_db)
):
    return (
        db.query(Evidence)
        .filter(Evidence.case_id == case_id)
        .all()
    )

@router.post("/upload")
async def upload_evidence(
    file: UploadFile = File(...),
    case_id: int = Form(...),
    db: Session = Depends(get_db),
):
    # Save uploaded file
    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Generate SHA-256
    sha256_hash = hashlib.sha256()

    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            sha256_hash.update(chunk)

    file_hash = sha256_hash.hexdigest()

    # Save metadata
    evidence = Evidence(
        filename=file.filename,
        filepath=file_path,
        filesize=str(os.path.getsize(file_path)),
        filetype=file.content_type,
        sha256=file_hash,
        status="Uploaded",
        case_id=case_id,
    )

    db.add(evidence)
    db.commit()
    db.refresh(evidence)

    return evidence