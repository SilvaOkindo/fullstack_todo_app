import "./style.css";

const searchBtn = document.querySelector("#btn");
const closeSearchBtn = document.querySelector("#btn2");
const searchInput = document.querySelector("#search-input");
const todoContainer = document.querySelector("#todo-container");
const checkbox = document.querySelector("#checkbox");
const todoInput = document.querySelector("#todo-input");
const addTodoBtn = document.querySelector("#btn3");

let todos = []

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

    todoText.textContent = todo.todo_title;
    isCompletedInput.checked = todo.is_completed;
    todoDiv.append(todoText, isCompletedInput);
    todoContainer.append(todoDiv);
}

function getTodos() {
  fetch("http://127.0.0.1:8000/todos")
    .then((response) => response.json())
    .then((data) => {
      todos = [...data]
      todos.forEach((todo) => {
        renderTodo(todo)
      })
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
  }).then((response) => response.json())
    .then((data) =>{
      console.log(data);
      //todos.push(data)
      renderTodos(data);
    })
    .catch((err) => console.log(err));

}

getTodos();
