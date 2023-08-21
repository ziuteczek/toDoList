"use strict";

const toDoList = [];

const toDoListEl = document.querySelector(".to-do-list");
const subBtn = document.querySelector(".submit");
const deleteTaskBtn = document.querySelector(".task__delete-btn");

const taskTitle = document.querySelector(".event-title");
const taskDesc = document.querySelector(".description-input");
const taskDate = document.querySelector(".task-date");
const allInputs = document.querySelectorAll(".task__input");

const GenerateID = function (existingIDs = []) {
  let sameId = true;
  let id;
  while (sameId == true) {
    sameId = false;
    id = String(Math.round(Math.random() * 9999)).padStart(4, "0");
    for (const existingID of existingIDs) {
      if (existingID == id) {
        sameId = true;
        break;
      }
    }
  }
  return id;
};
const refreshList = function () {
  toDoListEl.innerHTML = "";
  toDoList.forEach(function (task) {
    const taskTemplate = `
    <div class="task" id="${task.id}">
      <h3 class="task__title" >${task.name}</h3>
      <p class="task__date" >${task.date}</p>
      <button class="task__delete-btn" id="delBtn-${task.id}">
      <i class="fa-solid fa-trash task__delete" style="color: #cc0000"></i>
      </button>
      <p class="task__description">
       ${task.description}
      </p>
    </div>
    `;
    toDoListEl.insertAdjacentHTML("afterbegin", taskTemplate);

    const thisTaskID = document.getElementById(task.id);
    const delButton = document.getElementById(`delBtn-${task.id}`);

    delButton.addEventListener("click", function () {
      const taskIndex = toDoList.findIndex(sTask => sTask.id === task.id);
      toDoList.splice(taskIndex,1);
      thisTaskID.remove();
    });
  });
};

const addToList = function () {
  toDoList.push({
    name: taskTitle.value,
    description: taskDesc.value,
    date: taskDate.value ?? "",
    id: GenerateID(),
  });

  allInputs.forEach(function (input) {
    input.value = "";
  });
  refreshList();
};
refreshList();
const removeTask = function () {};

subBtn.addEventListener("click", addToList);
