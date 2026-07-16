import zipfile
import os


IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif"
}

VIDEO_EXTENSIONS = {
    ".mp4",
    ".avi",
    ".mov",
    ".mkv"
}

AUDIO_EXTENSIONS = {
    ".mp3",
    ".wav",
    ".aac"
}

DATABASE_EXTENSIONS = {
    ".db",
    ".sqlite",
    ".sqlite3"
}

DOCUMENT_EXTENSIONS = {
    ".pdf",
    ".doc",
    ".docx",
    ".txt"
}

DATA_EXTENSIONS = {
    ".json",
    ".csv",
    ".xml"
}


def analyze_zip(file_path):

    result = {

        "zip_name": os.path.basename(file_path),

        "total_files": 0,

        "folders": 0,

        "images": 0,

        "videos": 0,

        "audio": 0,

        "sqlite": 0,

        "apk": 0,

        "documents": 0,

        "json": 0,

        "csv": 0,

        "xml": 0,

        "unknown": 0,

        "file_tree": []
    }

    with zipfile.ZipFile(file_path, "r") as zip_ref:

        members = zip_ref.infolist()

        for member in members:

            if member.is_dir():

                result["folders"] += 1

                continue

            result["total_files"] += 1

            filename = member.filename

            extension = os.path.splitext(filename)[1].lower()

            result["file_tree"].append({

                "path": filename,

                "size_kb": round(member.file_size / 1024, 2),

                "extension": extension

            })

            if extension in IMAGE_EXTENSIONS:

                result["images"] += 1

            elif extension in VIDEO_EXTENSIONS:

                result["videos"] += 1

            elif extension in AUDIO_EXTENSIONS:

                result["audio"] += 1

            elif extension in DATABASE_EXTENSIONS:

                result["sqlite"] += 1

            elif extension == ".apk":

                result["apk"] += 1

            elif extension == ".json":

                result["json"] += 1

            elif extension == ".csv":

                result["csv"] += 1

            elif extension == ".xml":

                result["xml"] += 1

            elif extension in DOCUMENT_EXTENSIONS:

                result["documents"] += 1

            else:

                result["unknown"] += 1

    return result