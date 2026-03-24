import { addTask, delTask, getTasks, initTasks, toggleTaskStatus } from "./task-manager.js";
import { renderTasks } from "./ui.js";

const taskInputEl = document.querySelector(".todo__input");
const addTaskButtonEl = document.querySelector(".todo__button");
const tasksListEl = document.querySelector(".todo__tasks-list");

function rerender() {
  renderTasks(getTasks(), tasksListEl);
}

function handleAddTask() {
  if (!taskInputEl) {
    return;
  }

  const result = addTask(taskInputEl.value);

  if (!result.success) {
    alert(result.message);
    return;
  }

  taskInputEl.value = "";
  taskInputEl.focus();
  rerender();
}

initTasks();
rerender();

if (addTaskButtonEl) {
  addTaskButtonEl.addEventListener("click", handleAddTask);
}

if (taskInputEl) {
  taskInputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  });
}

if (tasksListEl) {
  tasksListEl.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const actionButton = target.closest("button[data-action][data-id]");

    if (!actionButton) {
      return;
    }

    const id = Number(actionButton.dataset.id);
    const action = actionButton.dataset.action;
    let result = null;

    if (action === "toggle") {
      result = toggleTaskStatus(id);
    } else if (action === "delete") {
      result = delTask(id);
    }

    if (!result) {
      return;
    }

    if (!result.success) {
      alert(result.message);
      return;
    }

    rerender();
  });
}
