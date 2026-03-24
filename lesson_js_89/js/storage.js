import { STORAGE_KEYS, TASK_KEYS } from "./constants.js";

function isValidStoredTask(task) {
  return (
    task &&
    Number.isInteger(task[TASK_KEYS.ID]) &&
    typeof task[TASK_KEYS.TEXT] === "string" &&
    task[TASK_KEYS.TEXT].trim() !== ""
  );
}

export function saveActiveTasksToStorage(tasks) {
  try {
    const activeTasks = tasks
      .filter((task) => !task[TASK_KEYS.IS_COMPLETED])
      .map((task) => ({
        [TASK_KEYS.ID]: task[TASK_KEYS.ID],
        [TASK_KEYS.TEXT]: task[TASK_KEYS.TEXT],
      }));

    localStorage.setItem(STORAGE_KEYS.ACTIVE_TASKS, JSON.stringify(activeTasks));
  } catch (error) {
    console.error("Не удалось сохранить активные задачи в localStorage", error);
  }
}

export function loadActiveTasksFromStorage() {
  try {
    const rawValue = localStorage.getItem(STORAGE_KEYS.ACTIVE_TASKS);

    if (!rawValue) {
      return [];
    }

    const parsedTasks = JSON.parse(rawValue);

    if (!Array.isArray(parsedTasks)) {
      return [];
    }

    return parsedTasks.filter(isValidStoredTask).map((task) => ({
      [TASK_KEYS.ID]: task[TASK_KEYS.ID],
      [TASK_KEYS.TEXT]: task[TASK_KEYS.TEXT].trim(),
      [TASK_KEYS.IS_COMPLETED]: false,
    }));
  } catch (error) {
    console.error("Не удалось загрузить активные задачи из localStorage", error);
    return [];
  }
}
