const lists = document.querySelectorAll(".list");
const tasks = document.querySelectorAll(".task");
const form = document.querySelector("#add");
const input = document.querySelector("#todo-input");
const doList = document.querySelector("#do");



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

lists.forEach((list) => {
  list.addEventListener("dragover", (event) => {
    event.preventDefault();

    const cursorTask = document.querySelector(".is-dragging");
    list.appendChild(cursorTask);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTask = input.value;
  console.log(newTask);

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
  doList.appendChild(newTaskEl);
  input.value = "";
});
