from sqlalchemy import Column, Integer, String

from app.database.database import Base


class Case(Base):
    __tablename__ = "cases"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(String)

    investigator = Column(String)

    case_type = Column(String)

    priority = Column(String)

    description = Column(String)

    status = Column(String)