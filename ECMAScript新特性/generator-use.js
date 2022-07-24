const path = require('path')
const fs = require('fs')

function readFile(url) {
  return new Promise(resolve => {
    fs.readFile(url, 'utf-8', (err, data) => {
      if(err) resolve('')
      resolve(data)
    })
  })
}

function* generatorReadFile() {
  const f1 = yield readFile('./function.js')
  const f2 = yield readFile('./for-of.js')
  console.log(f1.toString())
  console.log(f2.toString())
}

const fileNext = generatorReadFile()
console.log(fileNext.next())
console.log(fileNext.next())
console.log(fileNext.next())

