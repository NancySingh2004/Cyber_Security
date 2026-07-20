from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from datetime import datetime

from app.database.database import Base


class Analysis(Base):

    __tablename__ = "analysis"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    evidence_id = Column(
        Integer,
        ForeignKey("evidence.id"),
        nullable=False
    )


    analysis_type = Column(
        String,
        default="General"
    )


    result = Column(
        Text,
        nullable=True
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )