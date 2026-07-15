from typing import Optional
from pydantic import BaseModel


class EvidenceResponse(BaseModel):
    id: int
    filename: str
    filepath: str
    filesize: str
    filetype: str
    sha256: str
    status: str
    case_id: Optional[int] = None

    class Config:
        from_attributes = True