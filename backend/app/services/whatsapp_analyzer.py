import sqlite3
from datetime import datetime


def analyze_whatsapp(db_path):

    result = {}

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    # -----------------------------
    # Statistics
    # -----------------------------

    try:
        cursor.execute("SELECT COUNT(*) FROM chat")
        total_chats = cursor.fetchone()[0]
    except:
        total_chats = 0

    try:
        cursor.execute("SELECT COUNT(*) FROM jid")
        total_contacts = cursor.fetchone()[0]
    except:
        total_contacts = 0

    try:
        cursor.execute("SELECT COUNT(*) FROM message")
        total_messages = cursor.fetchone()[0]
    except:
        total_messages = 0

    result["total_chats"] = total_chats
    result["total_contacts"] = total_contacts
    result["total_messages"] = total_messages
    

    # -----------------------------
    # Chat List
    # -----------------------------

    chat_list = []

    try:

        cursor.execute("""

            SELECT
                chat._id,
                jid.raw_string

            FROM chat

            JOIN jid

            ON chat.jid_row_id = jid._id

        """)

        for row in cursor.fetchall():

            chat_list.append({

                "chat_id": row["_id"],
                "jid": row["raw_string"]

            })

    except:
        pass

    result["chat_list"] = chat_list

    # -----------------------------
    # Messages
    # -----------------------------

    messages = []

    try:

        cursor.execute("""

            SELECT

                chat_row_id,
                from_me,
                text_data,
                timestamp

            FROM message

            ORDER BY timestamp ASC

            LIMIT 200

        """)

        rows = cursor.fetchall()

        for row in rows:

            ts = row["timestamp"]

            if ts:

                try:

                    if ts > 1000000000000:
                        dt = datetime.fromtimestamp(ts / 1000)

                    else:
                        dt = datetime.fromtimestamp(ts)

                    formatted = dt.strftime("%d-%m-%Y %H:%M")

                except:

                    formatted = ""

            else:

                formatted = ""

            messages.append({

                "chat_id": row["chat_row_id"],

                "from_me": bool(row["from_me"]),

                "text": row["text_data"] or "",

                "timestamp": formatted

            })

    except Exception as e:

        print(e)

    result["messages"] = messages
    # -----------------------------
    # Contact Extraction
    # -----------------------------

    contacts = []

    # wa.db (dummy database)
    try:

        cursor.execute("""

            SELECT
                display_name,
                phone_number,
                jid,
                status

            FROM wa_contacts

            ORDER BY display_name

        """)

        rows = cursor.fetchall()

        for row in rows:

            contacts.append({

                "name": row["display_name"],

                "phone": row["phone_number"],

                "jid": row["jid"],

                "status": row["status"]

            })

    except:

        pass



    # Real WhatsApp Database

    if len(contacts) == 0:

        try:

            cursor.execute("""

                SELECT
                    raw_string

                FROM jid

                ORDER BY raw_string

            """)

            rows = cursor.fetchall()

            for row in rows:

                number = (
                    row["raw_string"]
                    .replace("@s.whatsapp.net", "")
                )

                contacts.append({

                    "name": "",

                    "phone": number,

                    "jid": row["raw_string"],

                    "status": ""

                })

        except:

            pass



    result["contacts"] = contacts

    conn.close()

    return result