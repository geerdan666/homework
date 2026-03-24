import { TASK_KEYS } from "./constants.js";
import { loadActiveTasksFromStorage, saveActiveTasksToStorage } from "./storage.js";

let tasks = [];
let nextId = 0;

function getNextId() {
  const currentId = nextId;
  nextId += 1;
  return currentId;
}

function syncNextIdWithTasks() {
  const maxId = tasks.reduce((maxValue, task) => {
    return Math.max(maxValue, task[TASK_KEYS.ID]);
  }, -1);

  nextId = maxId + 1;
}

export function initTasks() {
  tasks = loadActiveTasksFromStorage();
  syncNextIdWithTasks();
}

export function getTasks() {
  return tasks.map((task) => ({ ...task }));
}

export function addTask(text) {
  if (typeof text !== "string") {
    return {
      success: false,
      message: "Ошибка: текст задачи должен быть строкой",
      tasks: getTasks(),
    };
  }

  if (text.trim() === "") {
    return {
      success: false,
      message: "Ошибка: текст задачи не должен быть пустым",
      tasks: getTasks(),
    };
  }

  tasks.push({
    [TASK_KEYS.ID]: getNextId(),
    [TASK_KEYS.TEXT]: text.trim(),
    [TASK_KEYS.IS_COMPLETED]: false,
  });
  saveActiveTasksToStorage(tasks);

  return {
    success: true,
    message: "Задача успешно добавлена",
    tasks: getTasks(),
  };
}

export function toggleTaskStatus(id) {
  if (!Number.isInteger(id)) {
    return {
      success: false,
      message: "Ошибка: нужно ввести число",
      tasks: getTasks(),
    };
  }

  const target = tasks.find((task) => task[TASK_KEYS.ID] === id);

  if (!target) {
    return {
      success: false,
      message: "Ошибка: задача не найдена",
      tasks: getTasks(),
    };
  }

  target[TASK_KEYS.IS_COMPLETED] = !target[TASK_KEYS.IS_COMPLETED];
  saveActiveTasksToStorage(tasks);

  return {
    success: true,
    message: "Статус задачи изменен",
    tasks: getTasks(),
  };
}

export function delTask(id) {
  if (!Number.isInteger(id)) {
    return {
      success: false,
      message: "Ошибка: нужно ввести число",
      tasks: getTasks(),
    };
  }

  const index = tasks.findIndex((task) => task[TASK_KEYS.ID] === id);

  if (index === -1) {
    return {
      success: false,
      message: "Ошибка: задача не найдена",
      tasks: getTasks(),
    };
  }

  tasks.splice(index, 1);
  saveActiveTasksToStorage(tasks);

  return {
    success: true,
    message: "Задача удалена",
    tasks: getTasks(),
  };
}
