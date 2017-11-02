// let's say we have a function that will call for a lot of parameters...
function sum() {
  for (var _len = arguments.length, numbers = Array(_len), _key = 0; _key < _len; _key++) {
    numbers[_key] = arguments[_key]
  }

  return numbers.reduce(function (accumulator, num) {
    return accumulator += num
  }, 0)
}
sum(1, 4, 12, 19) // --> 36

// not too bad, but we can do better now...
// unleashing ES6
const newSum = (...numbers) => numbers.reduce((accumulator, num) => accumulator += num, 0)
newSum(1, 4, 12, 19) // --> 36

// ...numbers turns the parameters into an array that can be worked with. However, we can do even better...
const makeBigNumbers = (x, y, ...numbers) => {
  const z = x + y 
  return numbers.map(num => num * z)
}