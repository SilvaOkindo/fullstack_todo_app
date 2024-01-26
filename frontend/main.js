import "./style.css";

const searchBtn = document.querySelector("#btn");
const closeSearchBtn = document.querySelector("#btn2");
const searchInput = document.querySelector("#search-input");
const todoContainer = document.querySelector("#todo-container");
const checkbox = document.querySelector("#checkbox");
const todoInput = document.querySelector("#todo-input");
const addTodoBtn = document.querySelector("#btn3");

let todos = [];

searchBtn.addEventListener("click", () => {
  searchInput.classList.remove("hidden");
  searchBtn.classList.add("hidden");
});

closeSearchBtn.addEventListener("click", () => {
  searchInput.classList.add("hidden");
  searchBtn.classList.remove("hidden");
});

addTodoBtn.addEventListener("click", postTodo);

function renderTodo(todo) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add(
    "flex",
    "items-center",
    "justify-between",
    "bg-cyan-800",
    "p-3",
    "rounded"
  );

  let todoText = document.createElement("h3");
  todoText.classList.add("text-xl", "text-slate-300");
  let isCompletedInput = document.createElement("input");
  isCompletedInput.setAttribute("type", "checkbox");

  const deleteBtn = document.createElement("p");
  deleteBtn.classList.add(
    "text-sm",
    "text-red-500",
    "cursor-pointer",
    "hover:text-red-600",
    "duration-1"
  );
  deleteBtn.textContent = "Delete";

  // Attach click event to the delete button
  deleteBtn.addEventListener("click", () => {
    deleteTodo(todo.id); 
    todoDiv.remove(); 
  });

  todoText.textContent = todo.todo_title;
  isCompletedInput.checked = todo.is_completed;

  if (isCompletedInput.checked === true) {
    todoText.classList.add("line-through");
  }

  todoDiv.append(todoText, isCompletedInput, deleteBtn);
  todoContainer.append(todoDiv);
}

function getTodos() {
  fetch("http://127.0.0.1:8000/todos")
    .then((response) => response.json())
    .then((data) => {
      todos = [...data];
      todos.forEach((todo) => {
        renderTodo(todo);
      });
    })
    .catch((err) => console.log(err));
}

function postTodo() {
  const todo = {
    todo_title: todoInput.value,
    is_completed: checkbox.checked,
  };

  fetch("http://127.0.0.1:8000/create-todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderTodo(data);
    })
    .catch((err) => console.log(err));
}

function deleteTodo(id) {
  fetch(`http://127.0.0.1:8000/delete-todo/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to delete todo with ID ${id}`);
      }
      console.log(`Todo with ID ${id} deleted successfully`);
    })
    .catch((error) => {
      console.error("Error deleting todo:", error.message);
    });
}

getTodos();
