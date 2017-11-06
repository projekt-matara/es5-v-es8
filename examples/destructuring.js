// let's say that we have an object...
let obj = {
  valueOne: 'hello!',
  valueTwo: 'hello again!'
}

// now if we want to extract any values and store them in variables...
 const valueOne = obj.valueOne
 const valueTwo = obj.valueTwo

 // that's no fun... let's use destructuring to tidy this up
const {valueOne, valueTwo} = obj
console.log(valueOne) // --> 'hello!'
console.log(valueTwo) // --> 'hello again!'

// we can also give our destructured values aliases
const {valueOne: x, valueTwo} = obj
console.log(x) // --> 'hello!'
console.log(valueTwo) // --> 'hello again!'

// we also can destructure arrays...
const [a, b, c] = [1, 2, 3]
console.log(a) // --> 1
console.log(b) // --> 2
console.log(c) // --> 3

// and we can swap variables around without an auxiliary variable
let x = 0
let y = 1
const [x, y] = [y, x]
console.log(x) // --> 1
console.log(y) // --> 0 

// we also get object literals which come in handy when passing values into functions.
User.findOne({username: username}) // --> old way
User.findOne({username}) // -- ES8 way