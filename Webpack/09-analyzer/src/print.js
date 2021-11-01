function hello (message) {
  console.log('hello', message)
}

function hi(message){
  console.log('hi', message)
}


function print(message){
  console.log(message)
}

function say(message) {
  console.log('say:', message)
}

export {
  print,
  hello,
  hi
}

export default say;
