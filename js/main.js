"use strict";

const toDoList = [];

const toDoListEl = document.querySelector(".to-do-list");

const ololo = {
  name: "Walka",
  description: "Ustawka z Jagielonią pod sklepem",
  date: new Date(),
};
const refreshList = function () {};
const addToList = function (event) {
  
  const taskTemplate = `
<div class="task">
  <h3 class="task__title">${taskTitle}</h3>
  <p class="task__date">${taskDate}</p>
  <i class="fa-solid fa-trash task__delete" style="color: #cc0000"></i>
  <p class="task__description">
   ${taksDescription}
  </p>
</div>
`;
  toDoList.push(event);
};
// addToList(ololo);
