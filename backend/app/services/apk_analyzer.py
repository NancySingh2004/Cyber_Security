from androguard.core.apk import APK



DANGEROUS_PERMISSIONS = [

    "READ_SMS",
    "SEND_SMS",
    "RECORD_AUDIO",
    "CAMERA",
    "ACCESS_FINE_LOCATION",
    "ACCESS_COARSE_LOCATION",
    "READ_CONTACTS",
    "WRITE_CONTACTS",
    "READ_CALL_LOG",
    "READ_EXTERNAL_STORAGE"

]



def analyze_apk(file_path):

    result = {

        "app_name": None,

        "package_name": None,

        "version": None,

        "permissions": [],

        "dangerous_permissions": []

    }


    try:

        apk = APK(file_path)


        result["app_name"] = (
            apk.get_app_name()
        )


        result["package_name"] = (
            apk.get_package()
        )


        result["version"] = (
            apk.get_androidversion_name()
        )


        permissions = []


        for permission in apk.get_permissions():

            clean_permission = (
                permission.split(".")[-1]
            )

            permissions.append(
                clean_permission
            )


        result["permissions"] = permissions



        result["dangerous_permissions"] = [

            p for p in permissions

            if p in DANGEROUS_PERMISSIONS

        ]



    except Exception as e:

        result["error"] = str(e)



    return result