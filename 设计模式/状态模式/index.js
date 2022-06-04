class Color {
  constructor(color) {
    this.color = color
  }
  handle(context) {
    console.log(`turn to ${this.color} state`)
    context.setState(this)
  }
}

class Context {
  constructor(state) {
    this.state = null
  }
  setState(state) {
    this.state = state
  }
  getState() {
    if(!this.state) return
    return this.state
  }
}

const context = new Context()
const red = new Color('red')
const yellow = new Color('yellow')
const green = new Color('green')

red.handle(context)
console.log( context.getState() )

yellow.handle(context)
console.log( context.getState() )

green.handle(context)
console.log( context.getState() )
