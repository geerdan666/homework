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