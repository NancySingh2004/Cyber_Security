import sqlite3
from datetime import datetime



def analyze_calllog(file_path):

    connection = sqlite3.connect(file_path)

    cursor = connection.cursor()


    calls = []

    incoming = 0
    outgoing = 0
    missed = 0
    rejected = 0



    try:

        cursor.execute(
            """
            SELECT 
                number,
                type,
                duration,
                date,
                name
            FROM calls
            """
        )


        rows = cursor.fetchall()



        for row in rows:


            number = row[0]

            call_type = row[1]

            duration = row[2]

            timestamp = row[3]

            name = row[4]



            if call_type == 1:
                type_name = "Incoming"
                incoming += 1


            elif call_type == 2:
                type_name = "Outgoing"
                outgoing += 1


            elif call_type == 3:
                type_name = "Missed"
                missed += 1


            elif call_type == 4:
                type_name = "Rejected"
                rejected += 1


            else:
                type_name = "Unknown"



            try:

                date = datetime.fromtimestamp(
                    int(timestamp) / 1000
                ).strftime(
                    "%Y-%m-%d %H:%M:%S"
                )


            except:

                date = str(timestamp)



            calls.append({

                "name": name,

                "number": number,

                "type": type_name,

                "duration": duration,

                "date": date

            })



    except Exception as e:


        return {

            "error": str(e)

        }



    finally:

        connection.close()



    return {


        "total_calls": len(calls),


        "incoming_calls": incoming,


        "outgoing_calls": outgoing,


        "missed_calls": missed,


        "rejected_calls": rejected,


        "calls": calls

    }