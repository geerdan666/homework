"use strict"; 

let tasks = [];

const TASK_KEYS = {
  ID: "id",
  TEXT: "task",
  IS_COMPLETED: "isCompleted",
};

const getNextId = (() => {
  let id = 0;

  return () => {
    const currentId = id;
    id += 1;
    return currentId;
  };
})();

function addTask(text) {
  if (typeof text !== "string") {
    return {
      success: false,
      message: "Ошибка: текст задачи должен быть строкой",
      tasks: [...tasks],
    };
  }

  if (text.trim() === "") {
    return {
      success: false,
      message: "Ошибка: текст задачи не должен быть пустым",
      tasks: [...tasks],
    };
  }

  tasks.push({
    [TASK_KEYS.ID]: getNextId(),
    [TASK_KEYS.TEXT]: text.trim(),
    [TASK_KEYS.IS_COMPLETED]: false,
  });

  return {
    success: true,
    message: "Задача успешно добавлена",
    tasks: [...tasks],
  };
}

function toggleTaskStatus(id) {
  if (!Number.isInteger(id)) {
    return {
      success: false,
      message: "Ошибка: нужно ввести число",
      tasks: [...tasks],
    };
  }

  const target = tasks.find((task) => task[TASK_KEYS.ID] === id);

  if (!target) {
    return {
      success: false,
      message: "Ошибка: задача не найдена",
      tasks: [...tasks],
    };
  }

  target[TASK_KEYS.IS_COMPLETED] = !target[TASK_KEYS.IS_COMPLETED];

  return {
    success: true,
    message: "Статус задачи изменен",
    tasks: [...tasks],
  };
}

function delTask(id) {
  if (!Number.isInteger(id)) {
    return {
      success: false,
      message: "Ошибка: нужно ввести число",
      tasks: [...tasks],
    };
  }

  const index = tasks.findIndex((task) => task[TASK_KEYS.ID] === id);

  if (index === -1) {
    return {
      success: false,
      message: "Ошибка: задача не найдена",
      tasks: [...tasks],
    };
  }

  tasks.splice(index, 1);

  return {
    success: true,
    message: "Задача удалена",
    tasks: [...tasks],
  };
}

const taskInputEl = document.querySelector(".todo__input");
const addTaskButtonEl = document.querySelector(".todo__button");
const tasksListEl = document.querySelector(".todo__tasks-list");

function renderTasks() {
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
  renderTasks();
}

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

    renderTasks();
  });
}
