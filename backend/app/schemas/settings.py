from pydantic import BaseModel


class SettingsBase(BaseModel):

    auto_hash: bool
    auto_analyze: bool
    verify_integrity: bool
    preserve_original: bool

    whatsapp: bool
    sqlite: bool
    apk: bool
    zip: bool
    exif: bool

    ai_summary: bool
    scam_detection: bool
    timeline: bool

    report_format: str
    theme: str


class SettingsUpdate(SettingsBase):
    pass


class SettingsResponse(SettingsBase):

    id: int

    class Config:
        from_attributes = True