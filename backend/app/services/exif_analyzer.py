import exifread


def analyze_exif(file_path):

    exif_data = {}

    try:

        with open(
            file_path,
            "rb"
        ) as image:

            tags = exifread.process_file(
                image
            )


        for tag, value in tags.items():

            if tag not in [
                "JPEGThumbnail",
                "TIFFThumbnail"
            ]:

                exif_data[tag] = str(value)


    except Exception as e:

        exif_data["error"] = str(e)


    return exif_data