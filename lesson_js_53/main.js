// Задание 1.
// Дан массив пользователей:
const users = [
  { name: "Alex", age: 24, isAdmin: false },
  { name: "Bob", age: 13, isAdmin: false },
  { name: "John", age: 31, isAdmin: true },
  { name: "Jane", age: 20, isAdmin: false },
];
users.push(
  { name: "Ann", age: 19, isAdmin: false },
  { name: "Jack", age: 43, isAdmin: true },
);

console.log(users);

// Задание 2.
// Используя массив пользователей users из предыдущего задания, напишите функцию getUserAverageAge(users), которая возвращает средний возраст пользователей.

function getUserAverageAge(users) {
  let sum = 0;
  users.forEach((user) => {
    sum += user.age;
  });
  return sum / users.length;
}

console.log(`Средний возраст ${getUserAverageAge(users)}`);

// Задание 3.
// Используя массив пользователей users из предыдущего задания, напишите функцию getAllAdmins(users), которая возвращает массив всех администраторов.

function getAllAdmins(users) {
  let allAdmins = [];
  users.forEach((user) => {
    user.isAdmin ? allAdmins.push(user) : null;
  });
  return allAdmins;
}

console.log("Все администраторы:\n", getAllAdmins(users));

// Задание 4.
// Напишите функцию first(arr, n), которая возвращает первые n элементов массива. Если n == 0, возвращается пустой массив [], если n == undefined, то возвращается массив с первым элементом.

function first(arr, n) {
  let result = [];
  if (n === 0 || arr.length === 0) {
    return result;
  } else if (typeof n === "undefined") {
    result.push(arr[0]);
    return result;
  }
  for (let i = 0; i < n && i < arr.length; i++) {
    result.push(arr[i]);
  }
  return result;
}
