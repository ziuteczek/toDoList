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

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const calculateDateDiff = function (date1, date2 = new Date()) {
  const dateObj1 = {
    year: date1.getFullYear(),
    month: date1.getMonth(),
    day: date1.getDate(),
  };
  const dateObj2 = {
    year: date2.getFullYear(),
    month: date2.getMonth(),
    day: date2.getDate(),
  };
  const dateDiff = {
    years: Math.abs(dateObj1.year - dateObj2.year),
    months: Math.abs(dateObj1.month - dateObj2.month),
  };
  if (dateObj1.year === dateObj2.year && dateObj1.month === dateObj2.month) {
    dateDiff.days = Math.abs(dateObj1.day - dateObj2.day);
  } else {
    dateDiff.days =
      daysInMonth(dateObj1.year, dateObj1.month) -
      Math.abs(dateObj1.day - dateObj2.day);
  }
  dateDiff.past =
    dateDiff.days + dateDiff.months + dateDiff.years &&
    date1.getTime() < date2.getTime();
  return dateDiff;
};

const dateString = function (dateDiff, date) {
  if (dateDiff.years + dateDiff.months + dateDiff.days === 0) {
    return "Today";
  } else if (
    dateDiff.years <= 1 &&
    dateDiff.months <= 1 &&
    dateDiff.days <= 30
  ) {
    return `${dateDiff.days} ${dateDiff.days > 1 ? "days" : "day"}`;
  } else if (dateDiff.years <= 1 && dateDiff.days === 0) {
    return `${dateDiff.months} ${dateDiff.months > 1 ? "months" : "month"}`;
  } else {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }
};
const refreshList = function () {
  toDoListEl.innerHTML = "";
  toDoList.forEach(function (task) {
    const dateDiff = task.date && calculateDateDiff(task.date);

    // !(Object.values(dateDiff).reduce((dateNumSum,dateNum) => dateNumSum+dateNum));
    const taskTemplate = `
    <div class="task" id="${task.id}">
      <h3 class="task__title" >${task.name}</h3>
      <p class="task__date ${dateDiff.past ? "task__date--past" : ""}" >${
      task.date && dateString(dateDiff, task.date)
    } ${dateDiff.past ? "ago" : ""}</p>
      <button class="task__delete-btn" id="delBtn-${task.id}">
      <i class="fa-solid fa-trash task__delete" style="color: #cc0000"></i>
      </button>
      <p class="task__description">
       ${task.description}
      </p>
      <i class="fa-solid fa-pen-to-square task__edit"></i>
    </div>
    `;
    toDoListEl.insertAdjacentHTML("afterbegin", taskTemplate);

    const thisTaskID = document.getElementById(task.id);

    const delButton = document.getElementById(`delBtn-${task.id}`);
    const editBtn = thisTaskID.querySelector(".task__edit");

    const descritpionEl = thisTaskID.querySelector(".task__description");

    if (descritpionEl.scrollHeight > descritpionEl.clientHeight) {
      const expandBtnTmpl =
        '<i class="task__arrow fa-solid fa-chevron-down"></i>';
      thisTaskID.insertAdjacentHTML("beforeend", expandBtnTmpl);
      const expandBtnEl = thisTaskID.querySelector(".task__arrow");
      expandBtnEl.addEventListener("click", function () {
        thisTaskID.classList.toggle("task--expanded");
        expandBtnEl.classList.toggle("task__arrow--rotate");
      });
    }

    editBtn.addEventListener("click", function () {
      editBtn.classList.toggle("task__edit--active");
      const editableElements = {
        title: thisTaskID.querySelector(".task__title"),
        description: thisTaskID.querySelector(".task__description"),
        date: thisTaskID.querySelector(".task__date"),
      };
      const editableElementsEl = [];
      Object.values(editableElements).forEach(function (element, i) {
        const elementClasses = element.classList;
        const elementData = element.textContent;

        element.remove();

        let elementTemplate;

        switch (i) {
          case 0:
            elementTemplate = `<input class="${elementClasses}" type="text" maxlength="9">`;
            break;
          case 1:
            elementTemplate = `<textarea class="${elementClasses}"></textarea>`;
            break;
          case 2:
            elementTemplate = `<input class="${elementClasses}" type="date">`;
            break;
        }
        thisTaskID.insertAdjacentHTML("beforeend", elementTemplate);
        const taskInput = thisTaskID.querySelector(`.${elementClasses[0]}`);
        taskInput.value = elementData.trim();
        editableElementsEl.push(taskInput);
      });
      editBtn.remove();

      const saveEditBtn = '<i class="fa-solid fa-floppy-disk task__edit"></i>';
      const notSaveEditBtn = `<i class="fa-solid fa-x task__edit"></i>`;
      thisTaskID.insertAdjacentHTML("beforeend", saveEditBtn);
      thisTaskID.insertAdjacentHTML("beforeend", notSaveEditBtn);
      const saveEditBtnEl = thisTaskID.querySelector(".fa-floppy-disk");
      const notSaveEditBtnEl = thisTaskID.querySelector(".fa-x");

      notSaveEditBtnEl.addEventListener("click", function () {
        refreshList();
      });
      saveEditBtnEl.addEventListener("click", function () {
        const indexOfTask = toDoList.findIndex(
          (element) => element.id === task.id
        );

        toDoList[indexOfTask] = {
          name: thisTaskID.querySelector(".task__title").value.trim(),
          description: thisTaskID
            .querySelector(".task__description")
            .value.trim(),
          date:
            thisTaskID.querySelector(".task__date").value &&
            new Date(thisTaskID.querySelector(".task__date").value),
          id: GenerateID(),
        };
        refreshList();
      });
    });

    delButton.addEventListener("click", function () {
      const taskIndex = toDoList.findIndex((sTask) => sTask.id === task.id);
      toDoList.splice(taskIndex, 1);
      thisTaskID.remove();
    });
  });
};

const checkIfEmpty = function (inputsToCheck) {
  const emptyInputs = inputsToCheck.filter((ololo) => ololo.value.length === 0);
  return emptyInputs.length === 0 ? false : emptyInputs;
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
  return checkLength();
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
    date: taskDate.value && new Date(taskDate.value),
    id: GenerateID(),
  });

  allInputs.forEach(function (input) {
    input.value = "";
  });
  refreshList();
};
refreshList();

subBtn.addEventListener("click", addToList);
