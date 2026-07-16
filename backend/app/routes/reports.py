from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.report import Report


router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



# Get all reports

@router.get("/")
def get_reports(
    db: Session = Depends(get_db)
):

    reports = db.query(Report).all()

    return reports



# Create report

@router.post("/")
def create_report(
    data: dict,
    db: Session = Depends(get_db)
):

    report = Report(

        case_name=data["case_name"],

        evidence_name=data["evidence_name"],

        report_type=data.get(
            "report_type",
            "PDF"
        ),

        status="Generated"

    )


    db.add(report)

    db.commit()

    db.refresh(report)


    return report



# Delete report

@router.delete("/{report_id}")
def delete_report(
    report_id:int,
    db:Session = Depends(get_db)
):

    report = db.query(Report).filter(
        Report.id == report_id
    ).first()


    if not report:
        return {
            "message":"Report not found"
        }


    db.delete(report)

    db.commit()


    return {
        "message":"Report deleted"
    }