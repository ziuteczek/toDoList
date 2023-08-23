"use strict";

const toDoList = [];

const toDoListEl = document.querySelector(".to-do-list");
const subBtn = document.querySelector(".submit");
const deleteTaskBtn = document.querySelector(".task__delete-btn");

const taskTitle = document.querySelector(".event-title");
const taskDesc = document.querySelector(".description-input");
const taskDate = document.querySelector(".task-date");
const allInputs = document.querySelectorAll(".task__input");

const titleWarning = document.querySelector(".title-warning-text");
const descWarning = document.querySelector(".description-warning-text");

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
      const taskIndex = toDoList.findIndex((sTask) => sTask.id === task.id);
      toDoList.splice(taskIndex, 1);
      thisTaskID.remove();
    });
  });
};


const checkIfEmpty = function (inputsToCheck) {
  const emptyInputs = inputsToCheck.filter((ololo) => ololo.value.length === 0);
  if (emptyInputs.length === 0) {
    return false;
  } else {
    return emptyInputs;
  }
};
const checkLength = function () {
  const maxTitleLength = 9;
  if (taskTitle.value.length >= maxTitleLength) {
    taskTitle.insertAdjacentHTML(
      "beforebegin",
      `<div class="event-warning"><i class="fa-solid fa-triangle-exclamation" style="color: #a51d2d;"></i> <span class="description-warning-text warning-text">Max title length is ${maxTitleLength}</span></div>`
    );
    return false;
  }
  return true;
};
const checkInputCorrectness = function (...tocheck) {
  const emptyInputs = checkIfEmpty(tocheck);
  if (emptyInputs) {
    emptyInputs.forEach(function (input) {
      input.insertAdjacentHTML(
        "beforebegin",
        `<div class="event-warning"><i class="fa-solid fa-triangle-exclamation" style="color: #a51d2d;"></i> <span class="description-warning-text warning-text">Wporwadź dane</span></div>`
      );
    });
    return false;
  }
  const isLengthCorrect = checkLength();
  if (!isLengthCorrect) {
    return false;
  }
  return true;
};
const removeAllWarnings = function () {
  document
    .querySelectorAll(".event-warning")
    ?.forEach((warning) => warning.remove());
};
const addToList = function () {
  removeAllWarnings();
  const isInputCorrect = checkInputCorrectness(taskTitle, taskDesc);
  if (!isInputCorrect) {
    return;
  }
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
