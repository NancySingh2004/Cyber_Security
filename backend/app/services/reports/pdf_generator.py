from datetime import datetime

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import (
    getSampleStyleSheet,
    ParagraphStyle
)

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)



styles = getSampleStyleSheet()



# ==========================
# CUSTOM STYLES
# ==========================


normal_style = ParagraphStyle(

    "NormalCustom",

    parent=styles["BodyText"],

    fontSize=10,

    leading=16,

    spaceAfter=8

)



heading_style = ParagraphStyle(

    "HeadingCustom",

    parent=styles["Heading2"],

    fontSize=14,

    leading=18,

    spaceBefore=20,

    spaceAfter=12

)



sub_heading_style = ParagraphStyle(

    "SubHeadingCustom",

    parent=styles["Heading3"],

    fontSize=12,

    leading=16,

    spaceBefore=15,

    spaceAfter=10

)





# ==========================
# TEXT WRAPPER
# ==========================


def make_paragraph(text):

    if text is None:

        text = "N/A"


    return Paragraph(

        str(text)
        .replace(
            "\n",
            "<br/>"
        ),

        normal_style

    )







# ==========================
# TABLE CREATOR
# ==========================


def create_table(data):


    table = Table(

        data,

        colWidths=[

            130,

            230

        ],

        repeatRows=1

    )



    table.setStyle(

        TableStyle([


            (
                "GRID",
                (0,0),
                (-1,-1),
                0.5,
                colors.grey
            ),



            (
                "BACKGROUND",
                (0,0),
                (-1,0),
                colors.lightgrey
            ),



            (
                "VALIGN",
                (0,0),
                (-1,-1),
                "TOP"
            ),



            (
                "LEFTPADDING",
                (0,0),
                (-1,-1),
                10
            ),



            (
                "RIGHTPADDING",
                (0,0),
                (-1,-1),
                10
            ),



            (
                "TOPPADDING",
                (0,0),
                (-1,-1),
                10
            ),



            (
                "BOTTOMPADDING",
                (0,0),
                (-1,-1),
                10
            )


        ])

    )


    return table







# ==========================
# GENERATE PDF
# ==========================


def generate_pdf(

    filepath,

    case,

    evidence,

    report,

    analysis_result

):


    doc = SimpleDocTemplate(

        filepath,

        pagesize=A4,

        leftMargin=50,

        rightMargin=50,

        topMargin=50,

        bottomMargin=50

    )



    story=[]




    # ======================
    # TITLE
    # ======================


    story.append(

        Paragraph(

            "ForensiQ Digital Forensics Investigation Report",

            styles["Title"]

        )

    )


    story.append(

        Spacer(
            1,
            25
        )

    )





    # ======================
    # CASE
    # ======================


    story.append(

        Paragraph(

            "CASE INFORMATION",

            heading_style

        )

    )



    story.append(

        create_table([


            [

                make_paragraph("Field"),

                make_paragraph("Value")

            ],


            [

                make_paragraph("Case Name"),

                make_paragraph(
                    case.title if case else "N/A"
                )

            ],


            [

                make_paragraph("Investigator"),

                make_paragraph(
                    case.investigator if case else "N/A"
                )

            ],


            [

                make_paragraph("Case Type"),

                make_paragraph(
                    case.case_type if case else "N/A"
                )

            ],


            [

                make_paragraph("Priority"),

                make_paragraph(
                    case.priority if case else "N/A"
                )

            ],


            [

                make_paragraph("Status"),

                make_paragraph(
                    case.status if case else "N/A"
                )

            ]


        ])

    )



    story.append(
        Spacer(1,25)
    )






    # ======================
    # EVIDENCE
    # ======================


    story.append(

        Paragraph(

            "EVIDENCE INFORMATION",

            heading_style

        )

    )



    story.append(

        create_table([


            [

                make_paragraph("Field"),

                make_paragraph("Value")

            ],



            [

                make_paragraph("Filename"),

                make_paragraph(
                    evidence.filename
                    if evidence else "N/A"
                )

            ],



            [

                make_paragraph("File Type"),

                make_paragraph(
                    evidence.filetype
                    if evidence else "N/A"
                )

            ],



            [

                make_paragraph("File Size"),

                make_paragraph(
                    evidence.filesize
                    if evidence else "N/A"
                )

            ],



            [

                make_paragraph("SHA-256"),

                make_paragraph(
                    evidence.sha256
                    if evidence else "N/A"
                )

            ],



            [

                make_paragraph("Integrity"),

                make_paragraph(
                    "VERIFIED"
                )

            ]


        ])

    )



    story.append(
        Spacer(1,25)
    )







    # ======================
    # ANALYSIS DETAIL
    # ======================


    story.append(

        Paragraph(

            "FORENSIC ANALYSIS DETAIL",

            heading_style

        )

    )



    if analysis_result:


        for key,value in analysis_result.items():


            story.append(

                Paragraph(

                    str(key).upper(),

                    sub_heading_style

                )

            )



            if isinstance(value,dict):


                for k,v in value.items():


                    story.append(

                        make_paragraph(

                            f"<b>{k}</b>"

                        )

                    )



                    if isinstance(v,list):


                        for i,item in enumerate(v[:20]):


                            story.append(

                                make_paragraph(

                                    f"{i+1}. {item}"

                                )

                            )


                            story.append(

                                Spacer(
                                    1,
                                    8
                                )

                            )



                    elif isinstance(v,dict):


                        for nk,nv in v.items():


                            story.append(

                                make_paragraph(

                                    f"{nk}: {nv}"

                                )

                            )



                    else:


                        story.append(

                            make_paragraph(v)

                        )



                    story.append(

                        Spacer(
                            1,
                            12
                        )

                    )



            elif isinstance(value,list):


                for item in value[:20]:


                    story.append(

                        make_paragraph(item)

                    )


                    story.append(

                        Spacer(
                            1,
                            8
                        )

                    )



            else:


                story.append(

                    make_paragraph(value)

                )



            story.append(

                Spacer(
                    1,
                    20
                )

            )



    else:


        story.append(

            make_paragraph(

                "No analysis data available"

            )

        )








    # ======================
    # REPORT INFO
    # ======================


    story.append(

        Paragraph(

            "REPORT INFORMATION",

            heading_style

        )

    )



    story.append(

        create_table([


            [

                make_paragraph("Field"),

                make_paragraph("Value")

            ],


            [

                make_paragraph("Report ID"),

                make_paragraph(
                    report.id
                )

            ],


            [

                make_paragraph("Generated"),

                make_paragraph(
                    datetime.now()
                )

            ],


            [

                make_paragraph("Generated By"),

                make_paragraph(

                    "ForensiQ Digital Forensics Platform"

                )

            ],


            [

                make_paragraph("Report Format"),

                make_paragraph(
                    report.report_type
                )

            ]


        ])

    )



    doc.build(story)