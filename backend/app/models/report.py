from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database.database import Base


class Report(Base):

    __tablename__ = "reports"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    case_name = Column(
        String,
        nullable=False
    )


    evidence_name = Column(
        String,
        nullable=False
    )


    report_type = Column(
        String,
        default="PDF"
    )


    status = Column(
        String,
        default="Generated"
    )


    file_path = Column(
        String,
        nullable=True
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )