import sqlite3
import os


def analyze_sqlite(file_path):

    result = {
        "database_name": os.path.basename(file_path),
        "sqlite_version": "",
        "total_tables": 0,
        "tables": []
    }

    try:

        conn = sqlite3.connect(file_path)
        cursor = conn.cursor()

        # SQLite Version
        cursor.execute("SELECT sqlite_version();")
        result["sqlite_version"] = cursor.fetchone()[0]

        # All Tables
        cursor.execute("""
            SELECT name
            FROM sqlite_master
            WHERE type='table'
            ORDER BY name;
        """)

        tables = cursor.fetchall()

        result["total_tables"] = len(tables)

        for table in tables:

            table_name = table[0]

            try:

                cursor.execute(
                    f"SELECT COUNT(*) FROM '{table_name}'"
                )

                rows = cursor.fetchone()[0]

            except Exception:

                rows = "Unknown"

            result["tables"].append({

                "table_name": table_name,
                "rows": rows

            })

        conn.close()

    except Exception as e:

        result["error"] = str(e)

    return result