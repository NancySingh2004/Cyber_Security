import sqlite3
from datetime import datetime


def convert_timestamp(ts):

    if not ts:
        return ""

    try:

        if ts > 1000000000000:
            dt = datetime.fromtimestamp(ts / 1000)

        else:
            dt = datetime.fromtimestamp(ts)

        return dt.strftime("%d-%m-%Y %H:%M")

    except:

        return ""


def analyze_whatsapp(db_path):

    result = {}

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()


    # -----------------------------
    # Statistics
    # -----------------------------

    def count_table(table):

        try:
            cursor.execute(
                f"SELECT COUNT(*) FROM {table}"
            )

            return cursor.fetchone()[0]

        except:

            return 0



    result["total_chats"] = count_table("chat")

    result["total_messages"] = count_table("message")



    # Contacts count only personal numbers

    try:

        cursor.execute("""
            SELECT COUNT(*)
            FROM jid
            WHERE raw_string LIKE '%@s.whatsapp.net'
        """)

        result["total_contacts"] = cursor.fetchone()[0]


    except:

        result["total_contacts"] = 0



    # -----------------------------
    # Chat List
    # -----------------------------

    chat_list=[]


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


    except Exception as e:

        print("Chat Error:",e)



    result["chat_list"]=chat_list



    # -----------------------------
    # Messages
    # -----------------------------

    messages=[]


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



        for row in cursor.fetchall():

            messages.append({

                "chat_id":
                    row["chat_row_id"],

                "from_me":
                    bool(row["from_me"]),

                "text":
                    row["text_data"] or "",

                "timestamp":
                    convert_timestamp(
                        row["timestamp"]
                    )

            })


    except Exception as e:

        print("Message Error:",e)



    result["messages"]=messages



    # -----------------------------
    # Contacts
    # -----------------------------

    contacts=[]



    # For wa.db

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


        for row in cursor.fetchall():

            contacts.append({

                "name":
                    row["display_name"],

                "phone":
                    row["phone_number"],

                "jid":
                    row["jid"],

                "status":
                    row["status"]

            })


    except:

        pass



    # msgstore.db

    if len(contacts)==0:


        try:

            cursor.execute("""
                SELECT

                raw_string

                FROM jid

                WHERE raw_string LIKE '%@s.whatsapp.net'

                ORDER BY raw_string

            """)



            for row in cursor.fetchall():

                jid=row["raw_string"]


                number = jid.replace(
                    "@s.whatsapp.net",
                    ""
                )


                contacts.append({

                    "name":
                        number,

                    "phone":
                        number,

                    "jid":
                        jid,

                    "status":
                        ""

                })


        except Exception as e:

            print("Contact Error:",e)



    result["contacts"]=contacts



    conn.close()


    return result