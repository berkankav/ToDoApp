let form = document.querySelector("#form");
let input = document.querySelector("#input");
let todosUL = document.querySelector("#todos");

let todos = JSON.parse(localStorage.getItem("todos"));

if(todos) {
    todos.forEach(todo => addToDo(todo))
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    addToDo();
})

function addToDo(todo) {
    let todoText = input.value;

    if(todo) {
        todoText = todo.text;
    }

    if(todoText) {
        let todoEl = document.createElement("li");
        if(todo && todo.completed) {
            todoEl.classList.add("completed");
        }

        todoEl.innerText = todoText;

        // todoEl.addEventListener("click", function () {
        //     todoEl.classList.toggle("completed");
        // })

        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed")
            updateLS();
        })
        
        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            todoEl.remove();
            updateLS();
        })

        todosUL.appendChild(todoEl);

        input.value = "";

        updateLS()
    }

}

function updateLS() {
    todosEl = document.querySelectorAll("li");

    let todos = [];

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed")
        });
    })

    localStorage.setItem("todos", JSON.stringify(todos));
}