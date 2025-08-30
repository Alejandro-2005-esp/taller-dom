const tarea = document.getElementById("task-input");
const botonAgrega = document.getElementById("add-task-btn");
const listaTarea = document.getElementById("task-list");

function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task-item").forEach(li => {
        tasks.push(li.firstChild.textContent); 
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.className = "task-item";
    li.textContent = taskText;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks(); 
    });

    li.appendChild(deleteBtn);
    listaTarea.appendChild(li);

    saveTasks(); 
}
botonAgrega.addEventListener("click", () => {
    const taskText = tarea.value;

    if (taskText !== "") {
        createTaskElement(taskText);
        tarea.value = ""; 
    }
});
tarea.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        botonAgrega.click();
    }
});
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        JSON.parse(savedTasks).forEach(task => {
            createTaskElement(task);
        });
    }
}
loadTasks();