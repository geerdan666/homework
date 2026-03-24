import { TASK_KEYS } from "./constants.js";

export function renderTasks(tasks, tasksListEl) {
  if (!tasksListEl) {
    return;
  }

  tasksListEl.innerHTML = "";

  const fragment = document.createDocumentFragment();

  tasks.forEach((task) => {
    const itemEl = document.createElement("li");
    itemEl.className = "todo__task";

    if (task[TASK_KEYS.IS_COMPLETED]) {
      itemEl.classList.add("todo__task--completed");
    }

    const textEl = document.createElement("span");
    textEl.className = "todo__task-text";
    textEl.textContent = task[TASK_KEYS.TEXT];

    const actionsEl = document.createElement("div");
    actionsEl.className = "todo__task-actions";

    const toggleButtonEl = document.createElement("button");
    toggleButtonEl.type = "button";
    toggleButtonEl.className = "todo__task-action todo__task-action--toggle";
    toggleButtonEl.dataset.action = "toggle";
    toggleButtonEl.dataset.id = String(task[TASK_KEYS.ID]);
    toggleButtonEl.textContent = task[TASK_KEYS.IS_COMPLETED] ? "Вернуть" : "Готово";

    const deleteButtonEl = document.createElement("button");
    deleteButtonEl.type = "button";
    deleteButtonEl.className = "todo__task-action todo__task-action--delete";
    deleteButtonEl.dataset.action = "delete";
    deleteButtonEl.dataset.id = String(task[TASK_KEYS.ID]);
    deleteButtonEl.textContent = "Удалить";

    actionsEl.append(toggleButtonEl, deleteButtonEl);
    itemEl.append(textEl, actionsEl);
    fragment.append(itemEl);
  });

  tasksListEl.append(fragment);
}
