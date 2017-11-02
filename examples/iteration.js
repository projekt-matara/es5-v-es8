// let's say we have an array...
var x = [1, 2, 3, 4, 5]

// now let's iterate through it the normal js way and do stuff with the values...
var y = []
for (var i = 0; i < x.length; i++) {
  var number = x[i]
  y.push(number * 2)
}

// now let's iterate through this ES6 style
let z = []
for (let num of x) {
  z.push(num * 2)
}

// not bad, but ES6 also provides the ability to do this functionally
const a = x.map(num => num * 2) 
// it also provides filter and reduce methods
const sumOfX = x.reduce((acc, num) => acc += num, 0)
const evenNumbers = x.filter(num => num % 2)