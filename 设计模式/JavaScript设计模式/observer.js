// ---------------------- 观察者模式 ------------------------
const Observer = (function() {
  const _messages = {}
  return {
    register: function(type, callback) {
      if (!_messages[type]) {
        _messages[type] = []
      }
      if (typeof callback !== 'function') return
      _messages[type].push(callback)
    },
    fire: function(type, ...args) {
      if (!_messages[type]) return
      const cbs = _messages[type]
      for (const callback of cbs) {
        callback(...args)
      }
    },
    remove: function(type, fn) {
      if (!_messages[type]) return
      const cbs = _messages[type]
      if (typeof fn !== 'function') return
      const idx = cbs.findIndex(callback => callback === fn);
      (idx > 0) && cbs.splice(idx, 1)
      _messages[type] = cbs;
    }
  }
})();

Observer.register('update', function(m, n) {
  console.log('data:', m, n)
})

Observer.fire('update', 'hello', 'world')

// ------------------- demo ---------------------
const Student = function(message) {
  this.message = message
  this.say = function(data) {
    console.log(message, data)
  }
}
Student.prototype.answer = function(question) {
  Observer.register(question,  this.say)
}
Student.prototype.sleep = function(question) {
  Observer.remove(question, this.say)
}

const Teacher = function() {}
Teacher.prototype.ask = function(question, message) {
  Observer.fire(question, message)
}

const student1 = new Student('学生1回答问题')
const student2 = new Student('学生2回答问题')
const student3 = new Student('学生3回答问题')

// 回答的问题类型
student1.answer('observer')
student2.answer('observer')
student3.answer('observer')

student2.sleep('observer')

const teacher = new Teacher()
teacher.ask('observer', '请回答什么是观察者模式')

