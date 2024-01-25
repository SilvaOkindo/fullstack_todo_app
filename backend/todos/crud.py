from sqlalchemy.orm import Session
import models
import scheme


def get_todos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Todo).offset(skip).limit(limit).all()


def create_todo(db: Session, todo: scheme.TodoCreate):
    db_todo = models.Todo(todo_title=todo.todo_title, is_completed=todo.is_completed)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo
