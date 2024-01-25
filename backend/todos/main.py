from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models
import scheme
import crud
from database import sessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()


origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/todos")
async def get_todos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    todos = crud.get_todos(db, skip, limit)
    return todos


@app.post("/create-todo", response_model=scheme.TodoCreate)
async def create_todo(todo: scheme.TodoCreate, db: Session = Depends(get_db)):
    return crud.create_todo(db=db, todo=todo)
