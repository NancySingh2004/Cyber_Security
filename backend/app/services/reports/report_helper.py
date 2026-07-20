import os

from app.models.settings import Settings


REPORT_FOLDER = "uploads/reports"


os.makedirs(
    REPORT_FOLDER,
    exist_ok=True
)



SUPPORTED_FORMATS = [

    "PDF",
    "JSON",
    "CSV",
    "HTML"

]



# ==============================
# GET REPORT FORMAT FROM SETTINGS
# ==============================

def get_report_format(db):


    settings = (
        db.query(Settings)
        .first()
    )


    if not settings:

        return "PDF"



    report_format = (

        settings.report_format

        or "PDF"

    ).upper()



    if report_format not in SUPPORTED_FORMATS:

        return "PDF"



    return report_format





# ==============================
# CREATE REPORT FILE PATH
# ==============================

def get_report_filename(

    report_id,

    report_format

):


    report_format = (

        report_format

        .upper()

    )



    extension = (

        report_format

        .lower()

    )



    filename = (

        f"ForensiQ_Report_{report_id}.{extension}"

    )



    filepath = os.path.join(

        REPORT_FOLDER,

        filename

    )



    return filename, filepath