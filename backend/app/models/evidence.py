from sqlalchemy import Column, Integer, String, ForeignKey

from app.database.database import Base


class Evidence(Base):
    __tablename__ = "evidence"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    filename = Column(
        String,
        nullable=False
    )

    filepath = Column(
        String,
        nullable=False
    )

    filesize = Column(String)

    filetype = Column(String)

    sha256 = Column(
        String,
        unique=True,
        nullable=False
    )

    status = Column(
        String,
        default="Uploaded"
    )

    case_id = Column(
        Integer,
        ForeignKey("cases.id")
    )