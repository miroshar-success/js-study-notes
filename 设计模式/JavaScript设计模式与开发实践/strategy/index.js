// ---------------------- 策略模式 ------------------------
// 计算奖金
const PerformanceB = function() {}
PerformanceB.prototype.calculate = function(salary) {
  return salary * 3
}
const PerformanceA = function() {}
PerformanceA.prototype.calculate = function(salary) {
  return salary * 2
}
// -------- 设置奖金金额和策略 类 ---------
const Bonus = function() {
  this.salary = null
  this.strategy = null
}
Bonus.prototype.setSalary = function(salary) {
  this.salary = salary
}
Bonus.prototype.setStrategy = function(strategy) {
  this.strategy = strategy
}
Bonus.prototype.getBonus = function() {
  return this.strategy.calculate(this.salary)
}

const bonus = new Bonus()
bonus.setSalary(10000)
bonus.setStrategy(new PerformanceA())
console.log(bonus.getBonus())   // 20000

bonus.setStrategy(new PerformanceB())
console.log(bonus.getBonus())   // 30000


// ---------------JavaScript版本的策略模式 (键名为对应的等级, 键值为计算奖金的函数)----------------------
const strategies = {
  A: function (salary) {
    return salary * 3
  },
  B: function (salary) {
    return salary * 2
  }
}
const calculateBonus = function(level, salary) { // 根据对应等级 计算传入薪资所对应的奖金
  return strategies[level](salary)
}
console.log(calculateBonus('A', 300))   // 900
console.log(calculateBonus('B', 400))   // 800

// ----------------------- 动画 --------------------------
const tween = {
  linear: function (t, b, c, d) {
    return c * t/d + b
  },
  easeIn: function (t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  sineaseOut: function (t, b, c, d) { 
    return c * ( ( t = t / d - 1) * t * t + 1 ) + b
  }
  //...
}
const Animate = function(dom) {
  this.dom = dom          // 运动的DOM节点
  this.startTime = 0      //  动画开始时间
  this.endPosition = 0    //  动画结束位置
  this.startPosition = 0  //  动画开始位置
  this.propertyName = null  // 变更的动画属性
  this.ease = null        // 缓动函数
  this.duration = null    // 动画运行的时间
}
Animate.prototype.start = function(propertyName, endPosition, duration, easing) {
  this.startTime = Date.now()
  this.startPosition = this.dom.getBoundingClientRect()[propertyName]
  this.propertyName = propertyName
  this.endPosition = endPosition
  this.duration = duration
  this.ease = tween[easing]
  const that = this
  let id = null
  function move() {
    if (that.step() === false) {
      window.cancelAnimationFrame(id) // 书中使用的是setInterval, 这里我替换成window.requestAnimationFrame
    } else {
      id = window.requestAnimationFrame(move)
    }
  }
  move()
}
Animate.prototype.step = function() {
  const t = Date.now()
  // 如果运动结束(当前时间戳 >= 开始时间戳+动画设置的运行时间)
  if (t >= this.startTime + this.duration) {
    this.update(this.endPosition)
    return false
  }
  const position = this.ease(t - this.startTime, this.startPosition, this.endPosition - this.startPosition, this.duration)
  this.update(position)
}
Animate.prototype.update = function(position) {
  this.dom.style.transform = `translate3d(${position}px, 0, 0)`;
}

const ball = document.querySelector('.ball')
const animate = new Animate(ball)

animate.start('left', 500, 3000, 'linear')