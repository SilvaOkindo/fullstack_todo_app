from pydantic import BaseModel


class TodoBase(BaseModel):
    todo_title: str
    is_completed: bool


class TodoCreate(TodoBase):
    pass
