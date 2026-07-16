import sqlite3
from datetime import datetime


# -----------------------
# Format Timestamp
# -----------------------

def format_timestamp(timestamp):

    try:

        if timestamp is None:
            return ""

        # WhatsApp usually stores timestamps in milliseconds
        if timestamp > 9999999999:
            timestamp = timestamp / 1000

        return datetime.fromtimestamp(
            timestamp
        ).strftime("%d-%m-%Y %H:%M:%S")

    except Exception:

        return str(timestamp)


# -----------------------
# WhatsApp Analyzer
# -----------------------

def analyze_whatsapp(db_path):

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    result = {

        "total_chats": 0,

        "total_contacts": 0,

        "total_messages": 0,

        "chat_list": [],

        "message_columns": [],

        "messages": []

    }

    # -----------------------
    # Total Chats
    # -----------------------

    try:

        cursor.execute(
            "SELECT COUNT(*) FROM chat"
        )

        result["total_chats"] = cursor.fetchone()[0]

    except Exception as e:

        result["chat_count_error"] = str(e)

    # -----------------------
    # Total Contacts
    # -----------------------

    try:

        cursor.execute(
            "SELECT COUNT(*) FROM jid"
        )

        result["total_contacts"] = cursor.fetchone()[0]

    except Exception as e:

        result["contact_count_error"] = str(e)

    # -----------------------
    # Total Messages
    # -----------------------

    try:

        cursor.execute(
            "SELECT COUNT(*) FROM message"
        )

        result["total_messages"] = cursor.fetchone()[0]

    except Exception as e:

        result["message_count_error"] = str(e)

    # -----------------------
    # Chat List
    # -----------------------

    try:

        cursor.execute("""

            SELECT

                chat._id,

                jid.raw_string

            FROM chat

            LEFT JOIN jid

                ON chat.jid_row_id = jid._id

        """)

        rows = cursor.fetchall()

        for row in rows:

            result["chat_list"].append({

                "chat_id": row["_id"],

                "jid": row["raw_string"]

            })

    except Exception as e:

        result["chat_error"] = str(e)

    # -----------------------
    # Message Table Schema
    # -----------------------

    try:

        cursor.execute(
            "PRAGMA table_info(message)"
        )

        columns = cursor.fetchall()

        for col in columns:

            result["message_columns"].append({

                "cid": col["cid"],

                "name": col["name"],

                "type": col["type"]

            })

    except Exception as e:

        result["message_column_error"] = str(e)

    # -----------------------
    # Extract Messages
    # -----------------------

    try:

        cursor.execute("""

            SELECT

                message._id,

                message.chat_row_id,

                message.from_me,

                message.text_data,

                message.timestamp,

                jid.raw_string

            FROM message

            LEFT JOIN chat

                ON message.chat_row_id = chat._id

            LEFT JOIN jid

                ON chat.jid_row_id = jid._id

            ORDER BY message.timestamp

        """)

        rows = cursor.fetchall()

        for row in rows:

            result["messages"].append({

                "message_id": row["_id"],

                "chat_id": row["chat_row_id"],

                "jid": row["raw_string"],

                "from_me": bool(
                    row["from_me"]
                ),

                "text": row["text_data"],

                "timestamp": row["timestamp"],

                "date_time": format_timestamp(
                    row["timestamp"]
                )

            })

    except Exception as e:

        result["message_error"] = str(e)

    conn.close()

    return result