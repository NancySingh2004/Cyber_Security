import os
import hashlib

from PIL import Image

from app.services.zip_analyzer import analyze_zip
from app.services.apk_analyzer import analyze_apk
from app.services.exif_analyzer import analyze_exif
from app.services.sqlite_analyzer import analyze_sqlite



# -------------------------
# SHA256 HASH
# -------------------------

def calculate_hash(file_path):

    sha256 = hashlib.sha256()

    with open(file_path, "rb") as f:

        for chunk in iter(
            lambda: f.read(4096),
            b""
        ):
            sha256.update(chunk)

    return sha256.hexdigest()





# -------------------------
# MAIN FILE ANALYZER
# -------------------------

def analyze_file(file_path):

    extension = os.path.splitext(
        file_path
    )[1].lower()



    result = {

        "file_name":
            os.path.basename(file_path),

        "file_type":
            "Unknown",

        "analysis": {}

    }



    # -------------------------
    # COMMON FORENSIC DATA
    # -------------------------

    result["analysis"]["file_size_kb"] = round(
        os.path.getsize(file_path) / 1024,
        2
    )


    result["analysis"]["sha256"] = (
        calculate_hash(file_path)
    )


    result["analysis"]["created_time"] = (
        os.path.getctime(file_path)
    )


    result["analysis"]["modified_time"] = (
        os.path.getmtime(file_path)
    )





    # -------------------------
    # IMAGE ANALYSIS
    # -------------------------

    if extension in [

        ".jpg",
        ".jpeg",
        ".png",
        ".webp"

    ]:


        image = Image.open(file_path)


        result["file_type"] = "Image"



        result["analysis"].update({

            "format":
                image.format,


            "width":
                image.width,


            "height":
                image.height,


            "mode":
                image.mode,


            "resolution":
                f"{image.width} x {image.height}",


            "exif_metadata":
                analyze_exif(file_path)

        })





    # -------------------------
    # SQLITE DATABASE
    # -------------------------

    elif extension in [".db",".sqlite", ".sqlite3"]:
        result["file_type"] = "SQLite Database"

        result["analysis"]["database"] = (
            analyze_sqlite(file_path)
        )


    # -------------------------
    # ANDROID APK
    # -------------------------

    elif extension == ".apk":


        result["file_type"] = (
            "Android APK"
        )


        result["analysis"]["apk_details"] = (
            analyze_apk(file_path)
        )





    # -------------------------
    # ZIP ARCHIVE
    # -------------------------

    elif extension == ".zip":


        result["file_type"] = "ZIP Archive"

        result["analysis"]["zip_details"] = (
            analyze_zip(file_path)
        )





    return result