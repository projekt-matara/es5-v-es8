// JS is infamous for its control flow issues
// stemming from the consistent issue of 
// hard to read callback code

// Promises were first introduced as an alternate way 
// to provide efficient asynchronous control flow 
// as well as error handling to prevent callback hell

// importing the Bluebird promise library so we can 
// promisify other callback based modules. We don't 
// need it to be able to use promises themselves. 
var Promise = require('bluebird')
// grab a module for our example.
var fs = Promise.promisifyAll(require('fs'))

// how normal callback code flow looks
function readLotsOfFiles (x, y, z) {
  fs.readFile(x, function (err, file) {
    if (err) {
      console.log(err)
    } else {
      fs.readFile(y, function (err, newFile) {
        if (err) {
          console.log(err)
        } else {
          fs.readFile(z, function (err, newerFile) {
            if (err) {
              console.log(err)
            } else {
              var list = [file, newFile, newerFile]
              return list
            }
          })
        }
      })
    }
  })
} 

// now let's see the same thing with Promises ES6 style
function readLotsOfFiles (x, y, z) {
  let fileOne, fileTwo, fileThree
  fs.readFileAsync(x)
  .then(file => {
    fileOne = file
    return fs.readFileAsync(y) // return a Promise which shows up as the parameter "newFile"
  })
  .then(newFile => {
    fileTwo = newFile
    return fs.readFileAsync(z)
  })
  .then(newerFile => {
    fileThree = newerFile
    return [fileOne, fileTwo, fileThree]
  })
  .catch(err => console.log(err))
}

// that's all well and good, however, this is ES8
// we can do better. Promises are integral to 
// understanding Async/Await functions which are 
// a major add on for ES8
// let's see how this same operation looks in an
// Async/Await function

async function readLotsOfFiles (x, y, z) {
  try {
    const fileOne = await fs.readFileAsync(x)
    const fileTwo = await fs.readFileAsync(y)
    const fileThree = await fs.readFileAsync(z)
    if (!fileOne || !fileTwo || !fileThree) {
      throw new Error('file read failed!')
    } else {return [fileOne, fileTwo, fileThree]}
  } catch (err) {
    console.log(err)
  }
}

// that's nice but now let's run the same operation concurrently
async function readLotsOfFilesConcurrently (x, y, z) {
  try {
    const fileOne = fs.readFileAsync(x) // remember this function call is returning a Promise
    const fileTwo = fs.readFileAsync(y)
    const fileThree = fs.readFileAsync(z)
    // use ES8 destructuring and Promise.all to run the operations concurrently
    const [file, newFile, newerFile] = await Promise.all([fileOne, fileTwo, fileThree])
    if (!file || !newFile || !newerFile) {throw new Error('files failed to read!')}
    return [file, newFile, newerFile]
  } catch (err) {
    console.log(err)
  }
}