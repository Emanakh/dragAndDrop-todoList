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
displayTasks();

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

doing.addEventListener("dragover", function (event) {
  drop(event, doing, "doing");
});
done.addEventListener("dragover", function (event) {
  drop(event, done, "done");
});
todo.addEventListener("dragover", function (event) {
  drop(event, todo, "do");
});

function drop(e, el, state) {
  e.preventDefault();

  updateTask(el, state);
}

function updateTask(el, state) {
  const cursorTask = document.querySelector(".is-dragging");
  console.log(cursorTask);

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

function reset() {
  // Clear local storage
  taskList = [];
  localStorage.setItem("taskList", JSON.stringify(taskList));
  console.log("removed");

  console.log(taskList);

  // Clear content of HTML elements
  clearContent(document.getElementById("do"));
  clearContent(document.getElementById("doing"));
  clearContent(document.getElementById("done"));

  // Display tasks
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTask = input.value;

  if (!newTask) return;

  const newTaskEl = document.createElement("div");
  newTaskEl.classList.add("task");
  newTaskEl.draggable = true;

  const spanElement = document.createElement("span");
  spanElement.textContent = newTask;
  newTaskEl.appendChild(spanElement);

  const deleteButton = document.createElement("img");
  deleteButton.src = "icons8-x-48.png";
  deleteButton.alt = "Close";
  deleteButton.classList.add("close-btn");
  deleteButton.onclick = function () {
    deleteTask(this);
  };
  newTaskEl.appendChild(deleteButton);

  newTaskEl.addEventListener("dragstart", () => {
    newTaskEl.classList.add("is-dragging");
  });
  newTaskEl.addEventListener("dragend", () => {
    newTaskEl.classList.remove("is-dragging");
  });

  let random = generateRandomId();
  // add to local storage
  let newTaskItem = {
    taskName: newTask,
    status: "do",
    id: random,
  };
  newTaskEl.setAttribute("id", random);
  console.log(newTaskEl);

  todo.appendChild(newTaskEl);

  taskList.push(newTaskItem);
  console.log(taskList);
  localStorage.setItem("taskList", JSON.stringify(taskList));
  console.log(taskList);

  input.value = "";
});

function generateRandomId() {
  // Generate a random number and convert it to a hexadecimal string
  const randomHex = Math.floor(Math.random() * 0xfffffffffffff).toString(16);

  // Add a prefix to ensure it starts with a letter
  const randomId = "id" + randomHex;

  return randomId;
}

function displayTasks() {
  const storedTasksString = localStorage.getItem("taskList");

  if (storedTasksString) {
    const tasks = JSON.parse(storedTasksString);
    clearContent(todo);
    clearContent(done);
    clearContent(doing);

    tasks.forEach((task) => {
      const taskEl = document.createElement("div");
      taskEl.classList.add("task");
      taskEl.draggable = true;

      const spanElement = document.createElement("span");
      spanElement.textContent = task.taskName;
      taskEl.appendChild(spanElement);

      const deleteButton = document.createElement("img");
      deleteButton.src = "icons8-x-48.png";
      deleteButton.alt = "Close";
      deleteButton.classList.add("close-btn");
      deleteButton.onclick = function () {
        deleteTask(this);
      };
      taskEl.appendChild(deleteButton);

      taskEl.setAttribute("id", task.id);
      taskEl.addEventListener("dragstart", () => {
        taskEl.classList.add("is-dragging");
      });
      taskEl.addEventListener("dragend", () => {
        taskEl.classList.remove("is-dragging");
      });

      if (task.status === "done") {
        done.appendChild(taskEl);
      } else if (task.status === "doing") {
        doing.appendChild(taskEl);
      } else if (task.status === "do") {
        todo.appendChild(taskEl);
      }
    });
  } else {
    console.log("No tasks found");
  }
}

// ////

function deleteTask(buttonElement) {
  const taskElement = buttonElement.parentNode;
  const taskText = taskElement.querySelector("span").textContent;
  let iid = buttonElement.parentNode.getAttribute("id");
  console.log(iid);

  removeFromLocalStorage(iid);

  taskElement.remove();
}

function removeFromLocalStorage(iid) {
  console.log(taskList);

  taskList = JSON.parse(localStorage.getItem("taskList")) || [];
  taskList = taskList.filter((task) => task.id !== iid);
  localStorage.setItem("taskList", JSON.stringify(taskList));
  console.log(taskList);
}

function reset() {
  // Clear local storage
  taskList = [];
  localStorage.setItem("taskList", JSON.stringify(taskList));
  console.log("removed");

  console.log(taskList);

  // Clear content of HTML elements
  clearContent(document.getElementById("do"));
  clearContent(document.getElementById("doing"));
  clearContent(document.getElementById("done"));

  // Display tasks
}

function clearContent(element) {
  if (element) {
    while (element.childNodes.length > 2) {
      element.removeChild(element.lastChild);
    }
  }
}
