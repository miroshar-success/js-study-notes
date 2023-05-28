const sum = (a, b) => a + b
const multiple = (a, b) => a * b

let player = 'kyrie'
// ES Module 是静态引用
window.setTimeout(() => {
  player = 'durant'
  console.log('player has changed')
},4000)

export {
  sum,
  multiple,
  player
}