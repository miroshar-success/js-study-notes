const hash_btn = document.querySelector('.hash_btn')

hash_btn.addEventListener('click', () => {
  console.log(window.location.hash)
}, false)


/* window.addEventListener('hashchange', () => {
  console.log('hashchange')
  const hash = window.location.hash.slice(1)
  const body = document.querySelector('body')
  if(hash) {
    body.style.background = hash;
  }
})
 */

class HashRouter {
  constructor() {
    this.router = {};
    this.refresh = this.refresh.bind(this)
    window.addEventListener('load', this.refresh,false)
    window.addEventListener('hashchange', this.refresh, false);
  }
  route(path,callback) {
    this.router[path] = callback || function(){}
  }
  refresh () {
    const path = window.location.hash.slice(1)
    if(!path) return
    console.log(path, this.router, this)
    this.router[path]()
  }
}

function change_body_color(color) {
  const body = document.querySelector('body')
  body.style.background = color;
}

const hash_router = new HashRouter()
hash_router.route('gray', () => {
  change_body_color('gray')
})

hash_router.route('blue', () => {
  change_body_color('blue')
})

hash_router.route('green', () => {
  change_body_color('green')
})

console.log(hash_router)



class Point{
  constructor(x,y) {
    this.x = x;
    this.y = y
  }
  toString() {
    return this.x + this.y
  }
}

const p = new Point(1, 2)
console.log('p', p)
console.log(p.toString())
