import sqlite3
from datetime import datetime
from urllib.parse import urlparse


def analyze_browser(file_path):

    conn = sqlite3.connect(file_path)
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    history = []
    domains = {}

    try:

        cursor.execute("""

            SELECT
                url,
                title,
                visit_time,
                visit_count

            FROM browser_history

            ORDER BY visit_time DESC

        """)

        rows = cursor.fetchall()

        for row in rows:

            url = row["url"] or ""
            title = row["title"] or ""
            timestamp = row["visit_time"] or 0
            count = row["visit_count"] or 0

            try:

                date = datetime.fromtimestamp(
                    timestamp / 1000
                ).strftime("%d-%m-%Y %H:%M:%S")

            except:

                date = str(timestamp)

            try:

                domain = urlparse(url).netloc

                if domain:

                    domains[domain] = domains.get(domain, 0) + count

            except:
                pass

            history.append({

                "url": url,

                "title": title,

                "visit_time": date,

                "visit_count": count

            })

    except Exception as e:

        conn.close()

        return {

            "error": str(e),

            "total_visits": 0,

            "unique_domains": 0,

            "top_sites": [],

            "history": []

        }

    conn.close()

    top_sites = sorted(

        domains.items(),

        key=lambda x: x[1],

        reverse=True

    )[:10]

    return {

        "total_visits": len(history),

        "unique_domains": len(domains),

        "top_sites": [

            {

                "domain": domain,

                "visits": visits

            }

            for domain, visits in top_sites

        ],

        "history": history

    }