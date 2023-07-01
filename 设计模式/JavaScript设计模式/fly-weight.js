// ------------------ 享元模式 ----------------------

// 适合用于因重复而导致使用无法令人接受的大量内存的大量物件。
const FlyWeight = function() {
  const created = []
  let i = 0
  function create() {
    i += 1
    const dom = document.createElement('div')
    dom.classList.add(`hello-${i}`)
    document.getElementById('container').appendChild(dom)
    created.push(dom)
    return dom
  }
  return {
    getDiv () {
      if (created.length < 5) {
        return create()
      } else {
        const dom = created.shift()
        created.push(dom)
        return dom
      }
    }
  }
}
const create_article = () => {
  const data = []
  for (let i = 0; i < 100; i++) {
    data.push(`我是第 ${i+1} 条新闻`)
  }
  return data
}
const articles = create_article()
let paper = 0, number = 5, length = articles.length;
const flyWeight = FlyWeight()

const initial = () => {
  const btn = document.querySelector('#container .fly-weight-btn')
  for (let i = 0; i < 5; i++) {
    flyWeight.getDiv().textContent = articles[i]
  }
  btn.addEventListener('click', () => {
    paper += 1
    for (let i = paper * 5; i < (paper+1) * 5; i++) {
      flyWeight.getDiv().textContent = articles[i]
    }
  })
}
// initial()


// --------------------------- 另一个demo ------------------------------
/**
 * 移动是重复的
*/
const Move = function() {
}
Move.prototype.moveX = function(x) {
  this.x = x
}
Move.prototype.moveY = function(y) {
  this.y = y
}

const Position = function(x, y) {
  this.x = x
  this.y = y
}

const Player = function(x, y, c) {
  Position.call(this, x, y)
  this.c = c
}
Player.prototype = new Move()

const Sprit = function(x, y, r) {
  Position.call(this, x, y)
  this.r = r
}

const player = new Player(1, 2, 'red')
const sprit = new Player(3, 4, 'hello')
console.log(player, sprit)

player.moveX(10)
sprit.moveY(20)

console.log(player, sprit)