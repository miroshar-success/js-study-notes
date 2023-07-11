// --------------------- 策略模式 ---------------------------
const PriceStrategy = function(strategy) {
  const strategys = {
    discount: function(price, percent) {
      return price * (( 100 - percent) / 100)
    },
    max_out: function(price, type) {
      switch (type) {
        case '100/30':
          return price > 100 ? price - 30 : price;
        case '100/50':
          return price > 100 ? price - 50 : price;
      }
    }
  }
  return function(price, discount_strategy) {
    return strategys[strategy] && strategys[strategy](price, discount_strategy)
  }
};

const discount_price = PriceStrategy('discount')
const max_out_price = PriceStrategy('max_out')

const discount_50_percent = discount_price(100, 50)
const discount_30_percent = discount_price(100, 30)

const max_out_price_30 = max_out_price(120, '100/30')
const max_out_price_50 = max_out_price(150, '100/50')

console.log(discount_50_percent, discount_30_percent) // 50  70
console.log(max_out_price_30, max_out_price_50) // 90 100


// ----------------- 表单验证 ------------------
const FormValidateStragegy = (function() {
  const strategys = {
    is_string: function(v) {
      return typeof v === 'string'
    },
    is_number: function(v) {
      return typeof v === 'number'
    }
  }
  return {
    check: function(type, value) {
      return strategys[type] && strategys[type](value)
    },
    add_strategy: function(type, validator) {
      if (typeof validator !== 'function') {
        throw new Error('validator expected function')
      }
      if (strategys[type]) {
        throw new Error('validator' + type + 'has already exist')
      }
      strategys[type] = validator
    }
  }
})()

const is_number = FormValidateStragegy.check('is_number', 123)
const is_num = FormValidateStragegy.check('is_number', '123')
const is_string = FormValidateStragegy.check('is_string', '123')
const is_str = FormValidateStragegy.check('is_string', 123)

console.log(is_number, is_num, is_string, is_str) // true false true false

const is_arr = FormValidateStragegy.check('is_array', [])
console.log(is_arr)

// 添加策略
FormValidateStragegy.add_strategy('is_array', (v) => {
  return Array.isArray(v)
})
const is_array_1 = FormValidateStragegy.check('is_array', [])
const is_array_2 = FormValidateStragegy.check('is_array', {})
console.log(is_array_1, is_array_2) // true  false