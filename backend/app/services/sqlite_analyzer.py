import sqlite3
import os



def analyze_sqlite(file_path):

    result = {

        "database_name": os.path.basename(file_path),

        "tables": [],

        "table_count": 0,

        "database_size_kb": round(
            os.path.getsize(file_path) / 1024,
            2
        ),

        "error": None

    }


    try:

        connection = sqlite3.connect(
            file_path
        )

        cursor = connection.cursor()



        # SQLite version

        cursor.execute(
            "SELECT sqlite_version();"
        )

        result["sqlite_version"] = (
            cursor.fetchone()[0]
        )



        # Get tables

        cursor.execute(
            """
            SELECT name 
            FROM sqlite_master
            WHERE type='table';
            """
        )


        tables = cursor.fetchall()



        for table in tables:

            table_name = table[0]


            table_info = {

                "name": table_name,

                "columns": [],

                "row_count": 0

            }



            # Columns

            cursor.execute(
                f"PRAGMA table_info({table_name})"
            )


            columns = cursor.fetchall()


            table_info["columns"] = [

                column[1]

                for column in columns

            ]



            # Row count

            cursor.execute(
                f"SELECT COUNT(*) FROM {table_name}"
            )


            table_info["row_count"] = (
                cursor.fetchone()[0]
            )



            result["tables"].append(
                table_info
            )



        result["table_count"] = len(
            result["tables"]
        )


        connection.close()



    except Exception as e:

        result["error"] = str(e)



    return result