import sqlite3
from datetime import datetime



def analyze_sms(file_path):

    conn = sqlite3.connect(file_path)

    cursor = conn.cursor()


    messages = []

    sent = 0
    received = 0


    try:


        cursor.execute(
            """
            SELECT

            address,
            body,
            date,
            type,
            read

            FROM sms

            """
        )


        rows = cursor.fetchall()



        for row in rows:


            address = row[0]

            body = row[1]

            timestamp = row[2]

            sms_type = row[3]

            read = row[4]



            if sms_type == 1:

                type_name = "Received"

                received += 1


            elif sms_type == 2:

                type_name = "Sent"

                sent += 1


            else:

                type_name = "Unknown"



            try:

                date = datetime.fromtimestamp(
                    int(timestamp)/1000
                ).strftime(
                    "%Y-%m-%d %H:%M:%S"
                )

            except:

                date = str(timestamp)



            messages.append({

                "address":address,

                "type":type_name,

                "body":body,

                "date":date,

                "read":read

            })



    except Exception as e:


        return {

            "error":str(e)

        }


    finally:

        conn.close()



    return {


        "total_messages":len(messages),


        "sent_messages":sent,


        "received_messages":received,


        "messages":messages


    }