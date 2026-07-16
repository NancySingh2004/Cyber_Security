from sqlalchemy import Column, Integer, Boolean, String
from app.database.database import Base


class Settings(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)

    auto_hash = Column(Boolean, default=True)
    auto_analyze = Column(Boolean, default=True)
    verify_integrity = Column(Boolean, default=True)
    preserve_original = Column(Boolean, default=True)

    whatsapp = Column(Boolean, default=True)
    sqlite = Column(Boolean, default=True)
    apk = Column(Boolean, default=True)
    zip = Column(Boolean, default=True)
    exif = Column(Boolean, default=True)

    ai_summary = Column(Boolean, default=False)
    scam_detection = Column(Boolean, default=False)
    timeline = Column(Boolean, default=False)

    report_format = Column(String, default="PDF")
    theme = Column(String, default="Dark")