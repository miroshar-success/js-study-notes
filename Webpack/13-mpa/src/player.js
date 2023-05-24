import { sum, multiple } from './sum.js'

const players = ['kyrie', 'durant', 'james']
const button = document.createElement('button')

button.addEventListener('click', () => {
  players.forEach(player => {
    console.log(player)
  })
  console.log('sum:', sum(3, 5))
  console.log('multiple:', multiple(3, 5))
})

button.textContent = 'get player'

document.body.appendChild(button)