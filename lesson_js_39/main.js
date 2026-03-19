// Задача 1.
// Создайте объект person с несколькими свойствами, содержащими информацию о вас. Затем выведите значения этих свойств в консоль.

const person = {
  name: "Виталий",
  age: 54,
  city: "Москва",
  job: "Доставка",
  "favorite drink": "Кофе из автомата за 30р",
};

console.log(
  `Меня зовут ${person.name}, мне ${person.age} годика, вчера в ${person.city} я опять попробовал свой любимый ${person["favorite drink"].toLowerCase()}.`,
);

// Задача 2.
// Создайте функцию isEmpty, которая проверяет является ли переданный объект пустым. Если объект пуст - верните true, в противном случае false.

function isEmpty(object) {
  return Object.keys(object).length === 0;
}

console.log(isEmpty(person));

// Задача 3.
// Создайте объект task с несколькими свойствами: title, description, isCompleted.
// Напишите функцию cloneAndModify(object, modifications), которая с помощью оператора spread создает копию объекта и применяет изменения из объекта modifications.
// Затем с помощью цикла for in выведите все свойства полученного объекта.

const task = {
  title: "Взять заказ на бирже",
  description: "Написать 30 откликов и найти первый заказ",
  isCompleted: false,
};

function cloneAndModify(object, modifications) {
  return { ...object, ...modifications };
}

const update = cloneAndModify(task, { isCompleted: true });

let result = "";
for (const key in update) {
  result += key + ": " + update[key] + "\n";
}

console.log(result);

// Задача 4.
// Создайте функцию callAllMethods, которая принимает объект и вызывает все его методы.

function callAllMethods(object) {
  for (const key in object) {
    if (typeof object[key] === "function") {
      object[key]();
    }
  }
}

// Пример использования:
const myObject = {
    method1() {
        console.log('Метод 1 вызван');
    },
    method2() {
        console.log('Метод 2 вызван');
    },
    property: 'Это не метод'
};
callAllMethods(myObject);
