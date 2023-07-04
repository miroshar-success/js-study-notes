// ------------------- 状态模式 -----------------------
const state = (function() {
  const states = {
    state_1: function() {
      console.log('第一种情况')
    },
    state_2: function() {
      console.log('第二种情况')
    },
    state_3: function() {
      console.log('第三种情况')
    },
    state_4: function() {
      console.log('第四种情况')
    }
  }
  const show = function(level) {
    const key = `state_${level}`
    states[key] && states[key]() 
  }
  return {
    show
  }
})()

state.show(2)
state.show(1)
