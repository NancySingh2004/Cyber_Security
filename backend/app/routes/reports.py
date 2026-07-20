from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

import os

from app.database.database import SessionLocal

from app.models.report import Report
from app.models.case import Case
from app.models.evidence import Evidence

from app.services.analyzer import analyze_file

from app.services.reports.report_helper import (
    get_report_format,
    get_report_filename
)

from app.services.reports.pdf_generator import generate_pdf
from app.services.reports.json_generator import generate_json
from app.services.reports.csv_generator import generate_csv
from app.services.reports.html_generator import generate_html


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



# ==============================
# GET ALL REPORTS
# ==============================

@router.get("/")
def get_reports(
    db: Session = Depends(get_db)
):

    return db.query(Report).all()



# ==============================
# CREATE REPORT
# ==============================

@router.post("/")
def create_report(
    data: dict,
    db: Session = Depends(get_db)
):


    case_name = data.get(
        "case_name",
        "Unknown Case"
    )


    evidence_name = data.get(
        "evidence_name",
        "Unknown Evidence"
    )



    # Find Case

    case = (
        db.query(Case)
        .filter(
            Case.title == case_name
        )
        .first()
    )



    # Find Evidence

    evidence = (
        db.query(Evidence)
        .filter(
            Evidence.filename == evidence_name
        )
        .first()
    )



    if not evidence:

        return {
            "error":"Evidence not found"
        }



    # Run Analysis

    analysis_result = analyze_file(
        evidence.filepath
    )



    # Get format from Settings

    report_format = get_report_format(
        db
    )



    # Create report entry

    report = Report(

        case_name=case_name,

        evidence_name=evidence_name,

        report_type=report_format,

        status="Generated"

    )



    db.add(report)

    db.commit()

    db.refresh(report)



    # File path

    filename, filepath = get_report_filename(

        report.id,

        report_format

    )



    # Generate Report


    if report_format == "PDF":


        generate_pdf(

            filepath,

            case,

            evidence,

            report,

            analysis_result

        )



    elif report_format == "JSON":


        generate_json(

            filepath,

            case,

            evidence,

            report,

            analysis_result

        )



    elif report_format == "CSV":


        generate_csv(

            filepath,

            case,

            evidence,

            report,

            analysis_result

        )



    elif report_format == "HTML":


        generate_html(

            filepath,

            case,

            evidence,

            report,

            analysis_result

        )


    else:

        raise Exception(
            "Unsupported report format"
        )



    # Save path

    report.file_path = filepath


    db.commit()

    db.refresh(report)



    return report





# ==============================
# VIEW REPORT
# ==============================

@router.get("/view/{report_id}")
def view_report(

    report_id:int,

    db:Session = Depends(get_db)

):


    report = (

        db.query(Report)

        .filter(
            Report.id == report_id
        )

        .first()

    )



    if not report:

        return {
            "error":"Report not found"
        }



    extension = (

        report.file_path

        .split(".")[-1]

        .lower()

    )



    media_types = {


        "pdf":
        "application/pdf",


        "json":
        "application/json",


        "csv":
        "text/csv",


        "html":
        "text/html"

    }



    return FileResponse(

        path=report.file_path,

        media_type=media_types.get(

            extension,

            "application/octet-stream"

        )

    )





# ==============================
# DOWNLOAD REPORT
# ==============================

@router.get("/download/{report_id}")
def download_report(

    report_id:int,

    db:Session = Depends(get_db)

):


    report = (

        db.query(Report)

        .filter(
            Report.id == report_id
        )

        .first()

    )



    if not report:

        return {
            "error":"Report not found"
        }



    return FileResponse(

        path=report.file_path,

        filename=os.path.basename(
            report.file_path
        )

    )





# ==============================
# DELETE REPORT
# ==============================

@router.delete("/{report_id}")
def delete_report(

    report_id:int,

    db:Session = Depends(get_db)

):


    report = (

        db.query(Report)

        .filter(
            Report.id == report_id
        )

        .first()

    )



    if not report:

        return {
            "message":"Report not found"
        }



    if report.file_path and os.path.exists(
        report.file_path
    ):

        os.remove(
            report.file_path
        )



    db.delete(report)

    db.commit()



    return {

        "message":"Report deleted"

    }

