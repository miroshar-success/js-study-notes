// --------------------- 策略模式 表单校验 ---------------------
const strategies = {
  isNonEmpty: function(value, errorMessage) {
    if (value === '') return errorMessage
  },
  minLength: function(value, length, errorMessage) {
    if (value.length < Number(length)) return errorMessage
  },
  isMobile: function(value, errorMessage) {
    if (!(/^1[3,5,7,8,9][0-9]{9}$/.test(value))) return errorMessage
  },
  maxLength: function(value, length, errorMessage) {
    if (value.length > Number(length)) return errorMessage
  }
}
// 定义当前表单的校验类
const Validator = function() {
  this.cache = [] // 存储所有的校验函数
}
// 添加校验规则
Validator.prototype.add = function(dom, rule, errorMessage) {
  let rule_list = []
  // rule 可能是一个数组, 包含多条验证规则
  if (typeof rule === 'string') {
    rule_list = [{
      strategy: rule,
      errorMessage
    }]
  } else {
    rule_list = [...rule]
  }
  for (const rule of rule_list) {
    const { strategy, errorMessage } = rule
    const array = strategy.split(':') // 目前定义的规则为 校验函数:限定的数值
    this.cache.push(function() {
      const str = array.shift() // 提取校验函数
      array.unshift(dom.value)  // 进行校验的表单元素的值
      array.push(errorMessage)  // 提示信息
      return strategies[str].apply(dom, array) // 添加校验函数到数组
    })
  }
}
// 执行验证逻辑
Validator.prototype.validate = function() {
  for (let i = 0, length = this.cache.length; i < length; i++) {
    const msg = this.cache[i]()
    if (msg) return msg
  }
}

const validateFunction = function(form) {
  const validator = new Validator()
  validator.add(form.username, [
    {
      strategy: 'isNonEmpty',
      errorMessage: '用户名不得为空'
    },
    {
      strategy: 'minLength: 6',
      errorMessage: '用户名不得少于6个字符'
    },
    {
      strategy: 'maxLength: 20',
      errorMessage: '用户名不得超过20个字符'
    }
  ])
  validator.add(form.password, 'minLength:6', '密码长度不能少于6位')
  validator.add(form.phone, 'isMobile', '手机号码格式不正确')
  return validator.validate()
}

const form = document.querySelector('#form')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log(validateFunction(form))
}, false)