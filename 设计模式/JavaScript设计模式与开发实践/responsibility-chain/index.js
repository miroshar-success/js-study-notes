(function () {
  const order = function (type, pay, stock) {
    switch (type) {
      case 1:
        if (pay) {
          console.log('500元定金预购, 获得100元优惠券')
        } else {
          if (stock > 0) {
            console.log('普通购买')
          } else {
            console.log('库存不足')
          }
        }
        break
      case 2:
        if (pay) {
          console.log('200元定金预购, 获得50元优惠券')
        } else {
          if (stock > 0) {
            console.log('普通购买')
          } else {
            console.log('库存不足')
          }
        }
        break
      case 3:
        if (stock > 0) {
          console.log('普通购买, 无优惠券')
        } else {
          console.log('手机库存不足')
        }
        break
    }
  }
  order(1, false, 100)
  order(1, true, 0)
  order(2, false, -10)
  order(3, false, 10)
  order(3, false, -10)
})();

console.log('----------------- 使用职责链模式改写 ---------------------');
(function () {
  const normal_buy = (stock) => {
    if (stock > 0) {
      console.log('普通购买, 无优惠券')
    } else {
      console.log('手机库存不足')
    }
  }
  const vip_buy = function (type, is_paid, stock) {
    if (is_paid && type === 2) {
      console.log('200元预购, 获得50元优惠券')
    } else {
      normal_buy(stock)
    }
  }
  const super_vip_buy = function (type, is_paid, stock) {
    if (is_paid && type === 1) {
      console.log('超级vip购买, 获得200元优惠券')
    } else {
      vip_buy(type, is_paid, stock)
    }
  }
  super_vip_buy(1, true, 300)
  super_vip_buy(1, false, 200)
  super_vip_buy(2, false, 100)
  super_vip_buy(2, true, 100)
  super_vip_buy(3, false, 100)
  super_vip_buy(3, true, 100)
})();

console.log('---------------------- 灵活可拆分的职责链节点 -------------------------');
(function () {
  // 每个参数的参数需要保持一致
  const super_vip_buy = (type, pay, stock) => {
    if (type === 1 && pay) {
      console.log('500元定金已支付, 获取200元优惠券')
    } else {
      // 如果没有匹配 转到下一个函数执行
      return 'nextSuccessor'
    }
  }
  const vip_buy = (type, pay, stock) => {
    if (type === 2 && pay) {
      console.log('200元定金已支付, 获取50元优惠券')
    } else {
      return 'nextSuccessor'
    }
  }
  const normal_buy = (type, pay, stock) => {
    if (stock > 0) {
      console.log('普通购买, 无优惠券')
    } else {
      console.log('手机库存不足')
    }
  }
  const Chain = function (fn) {
    // 当前执行的函数
    this.fn = fn
    // 不满足当前执行条件, 下一个执行对象
    this.successor = null
  }
  Chain.prototype.setNextSuccesor = function (successor) {
    return this.successor = successor
  }
  Chain.prototype.passRequest = function () {
    const ret = this.fn.apply(this, arguments)
    if (ret === 'nextSuccessor') {
      return this.successor && this.successor.passRequest.apply(this.successor, arguments)
    }
  }
  const super_vip_chain = new Chain(super_vip_buy)
  const vip_chain = new Chain(vip_buy)
  const normal_chain = new Chain(normal_buy)
  super_vip_chain.setNextSuccesor(vip_chain)
  vip_chain.setNextSuccesor(normal_chain)

  super_vip_chain.passRequest(1, true, 300)
  super_vip_chain.passRequest(1, false, 200)
  super_vip_chain.passRequest(2, false, 100)
  super_vip_chain.passRequest(2, true, 100)
  super_vip_chain.passRequest(3, false, 200)
  super_vip_chain.passRequest(3, true, 200)
  super_vip_chain.passRequest(3, true, -200)
})();

(function () {
  console.log('------------------- 面向切面编程 -------------------------')
  // 面向切面编程
  const key = Symbol('after')
  Function.prototype[key] = function (fn) {
    const self = this
    return function () {
      const ret = self.apply(this, arguments)
      if (ret === 'nextSuccessor') {
        return fn.apply(this, arguments)
      }
    }
  }
  const super_vip_buy = (type, pay, stock) => {
    if (type === 1 && pay) {
      console.log('500元定金已支付, 获取200元优惠券')
    } else {
      // 如果没有匹配 转到下一个函数执行
      return 'nextSuccessor'
    }
  }
  const vip_buy = (type, pay, stock) => {
    if (type === 2 && pay) {
      console.log('200元定金已支付, 获取50元优惠券')
    } else {
      return 'nextSuccessor'
    }
  }
  const normal_buy = (type, pay, stock) => {
    if (stock > 0) {
      console.log('普通购买, 无优惠券')
    } else {
      console.log('手机库存不足')
    }
  }
  const order = super_vip_buy[key](vip_buy)[key](normal_buy)
  order(1, true, 100)
  order(1, false, 100)
  order(2, true, 100)
  order(2, false, 100)
  order(3, true, 100)
})();