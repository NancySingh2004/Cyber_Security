from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routes.cases import router as case_router
from app.routes.evidence import router as evidence_router
from app.routes.analysis import router as analysis_router

from app.database.database import Base, engine
from app.models.case import Case
from app.models.evidence import Evidence

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ForensiQ API",
    version="1.0"
)

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routes
app.include_router(case_router)
app.include_router(evidence_router)
app.include_router(analysis_router)


@app.get("/")
def root():
    return {
        "message": "ForensiQ API Running"
    }