import { sum, player } from './math'
console.log(sum(3, 6))

console.log(player)

window.setTimeout(() => {
  console.log('player', player)
}, 6000)