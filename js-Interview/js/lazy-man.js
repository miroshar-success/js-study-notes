class SleepMan {
  constructor(name) {
    this.name = name
    this.tasks = []
    // 一定要异步调用next 开始任务
    Promise.resolve().then(() => {
      this.next()
    })
  }
  next () {
    const task = this.tasks.shift()
    task && task()
  }
  eat(food) {
    const fn = () => {
      console.log(`${this.name} eat ${food}`)
      this.next()
    }
    this.tasks.push(fn)
    return this
  }
  sleep(timeout) {
    const task = () => {
      console.log(`${this.name} start sleep!`)
      setTimeout(() => {
        console.log(`${this.name} sleep ${timeout} s!`)
        this.next()
      }, timeout * 1000)
    }
    this.tasks.push(task)
    return this
  }
}
const kyrie = new SleepMan('kyrie')
kyrie.eat('apple').sleep(3).eat('banana').sleep(2).eat('grape')
/**
 *  kyrie eat apple ------>   kyrie start sleep! ---->(等待3s)  kyrie sleep 3 s!
    kyrie eat banana -----> kyrie start sleep! ----->(等待2s) kyrie sleep 2 s!
    kyrie eat grape
 * 
*/