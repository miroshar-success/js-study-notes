import App from './App.jsx'
import ReactDOM from 'react-dom/client'
console.log(ReactDOM)

const sum = (a, b) => a + b
// 箭头函数
console.log(sum(1, 5))

console.log([1,2,3].map(n => n + 1))

class Player {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
  fullName() {
    return this.firstName + this.lastName
  }
}
// class
const player = new Player('kyrie', 'irving')
console.log(player)
// 结构赋值
const singer = ['周杰伦', '王力宏']
const [a, b] = singer;
console.log(a, b)

const element = document.createElement('div')
ReactDOM.createRoot(element).render(<App/>)

document.body.appendChild(element)