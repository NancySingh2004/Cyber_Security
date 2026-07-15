from pydantic import BaseModel


class CaseCreate(BaseModel):
    title: str
    investigator: str
    case_type: str
    priority: str
    description: str


class CaseResponse(CaseCreate):
    id: int
    status: str

    class Config:
        from_attributes = True