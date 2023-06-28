// ----------------- 工厂方法 --------------------
const Factory = function(type, content) {
  // 安全模式
  if (new.target !== Factory) {
    return new Factory(type, content)
  }
  // type是一个对象, 返回对象上方法的结果
  return new this[type](content)
}
Factory.prototype = {
  JavaScript: function(content) {
    this.content = content
    return `JavaScript ${content}`
  },
  PHP: function(content) {
    return `PHP ${content}`
  },
  Java: function(content) {
    return `Java ${content}`
  }
}
// Object.assign({}, Factory.prototype, languages)

const data = [
  { type: 'JavaScript', content: 'Vue.js React.js Angular.js' },
  { type: 'PHP', content: 'ThinkPHP' },
  { type: 'Java', content: 'Springboot' }
]
for (const item of data) {
  const { type, content } = item
  // const result = Factory(type, content) // 因为new Factory 返回的不是一个对象, return的是一个object,原型指向构造函数的prototype
  // console.log(result, result.__proto__)
  Factory(type, content)
}