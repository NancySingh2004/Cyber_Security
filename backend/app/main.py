from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


from app.routes.cases import router as case_router
from app.routes.evidence import router as evidence_router
from app.routes.analysis import router as analysis_router
from app.routes.reports import router as reports_router
from app.routes.settings import router as settings_router


from app.database.database import Base, engine


from app.models.case import Case
from app.models.evidence import Evidence
from app.models.settings import Settings
from app.models.report import Report
from app.models.analysis import Analysis



app = FastAPI(
    title="ForensiQ API",
    version="1.0"
)



# Database Tables Create

Base.metadata.create_all(
    bind=engine
)



# CORS

app.add_middleware(

    CORSMiddleware,

    allow_origins=[

        "http://localhost:5173",

        "http://127.0.0.1:5173"

    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)




# Static Files

app.mount(

    "/uploads",

    StaticFiles(directory="uploads"),

    name="uploads"

)




# Routes

app.include_router(case_router)

app.include_router(evidence_router)

app.include_router(analysis_router)

app.include_router(settings_router)

app.include_router(reports_router)




@app.get("/")
def root():

    return {

        "message":
        "ForensiQ API Running"

    }