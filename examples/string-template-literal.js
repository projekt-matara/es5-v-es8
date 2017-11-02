// normal string templating
var name = 'Mark'
var myString = "hello " + name

// new literal string templating indicated with backticks
var age = 29
var anAge = `my age is #{age}` 

// we can also go to multiple lines with string template literals
var statement = `
  Hello everybody! I'm #{name} and I'm #{age}
  years old! How are you doing today?
`