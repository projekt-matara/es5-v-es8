// normal function
function add (x, y) {
  return x + y
}

// basic arrow function
const multiply = (x, y) => {
  return x * y
}

// when you have one parameter, you don't need parenthesis
const increment = x => {
  return x++
}

// and when you can fit your function in one line, you don't need brackets and return is implied
const incrementAgain = x => x++

// works for async functions too
const subtract = async (x, y) => {
  const value = await Promise.resolve(x + y)
  return value
}