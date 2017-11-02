// normal prototypal object creation

function Dog (x, y) {
  this.color = x
  this.breed = y
  this.hungerLevel = 0
}

Dog.prototype.changeBreed = function (x) {
  this.breed = x
}

Dog.prototype.increaseHunger = function () {
  if (this.hungerLevel < 5) {
    this.hungerLevel = 7
  } else {
    this.hungerLevel = 10
  }
}

var myDog = new Dog('brown', 'Great Dane')
myDog.changeBreed('Mastiff')
myDog.increaseHunger()

// now with ES6 Classes

class Dog {
  constructor(color, breed) {
    this.color = color
    this.breed = breed
    this.hungerLevel = 0
  }
  changeBreed (x) {
    this.breed = x
  }
  increaseHunger () {
    if (this.hungerLevel < 5) {
      this.hungerLevel = 7
    } else {
      this.hungerLevel = 10
    }
  }
  static incrementHunger () {
    if (this.hunger > 10) {this.hunger++}
  }
}