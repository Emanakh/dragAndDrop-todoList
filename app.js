const lists = document.querySelectorAll(".list");
const tasks = document.querySelectorAll(".task");
const form = document.querySelector("#add");
const input = document.querySelector("#todo-input");
const todo = document.querySelector("#do");
const doing = document.querySelector("#doing");
const done = document.querySelector("#done");

//initialize local storege
let taskList;
if (localStorage.taskList != null) {
  taskList = JSON.parse(localStorage.taskList);
} else {
  taskList = [];
}

//dragging and droping logic
tasks.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
});

tasks.forEach((task) => {
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});




doing.addEventListener("dragover", function(event) {
    drop(event, doing, "doing")} );
done.addEventListener("dragover",  function(event) {
    drop(event, done, "done")});
todo.addEventListener("dragover",  function(event) {
    drop(event, todo, "do")});

function drop(e, el, state) {
  e.preventDefault();


  updateTask(el, state)
}

function updateTask(el, state){
    const cursorTask = document.querySelector(".is-dragging");
    el.appendChild(cursorTask);
    const taskToUpdate = taskList.find(
      (task) => task.id === cursorTask.getAttribute("id")
    );
    if (taskToUpdate) {
      taskToUpdate.status = state;
      localStorage.setItem("taskList", JSON.stringify(taskList));
    }
}
//////

//add logic to the do list and to the local storege
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTask = input.value;

  if (!newTask) return;

  const newTaskEl = document.createElement("p");
  newTaskEl.classList.add("task");

  newTaskEl.setAttribute("draggable", "true");
  newTaskEl.innerHTML = newTask;
  newTaskEl.addEventListener("dragstart", () => {
    newTaskEl.classList.add("is-dragging");
  });
  newTaskEl.addEventListener("dragend", () => {
    newTaskEl.classList.remove("is-dragging");
  });
  let random = generateRandomId();
  //add to local storege
  let newTaskItem = {
    taskName: newTask,
    status: "do",
    id: random,
  };
  newTaskEl.setAttribute("id", random);
  todo.appendChild(newTaskEl);
  taskList.push(newTaskItem);
  localStorage.setItem("taskList", JSON.stringify(taskList));
  input.value = "";
});

function generateRandomId() {
  // Generate a random number and convert it to a hexadecimal string
  const randomHex = Math.floor(Math.random() * 0xfffffffffffff).toString(16);

  // Add a prefix to ensure it starts with a letter
  const randomId = "id" + randomHex;

  return randomId;
}
////
