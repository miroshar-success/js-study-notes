
Vue.config.optionMergeStrategies._my_option = function (parent, child, vm) {
  // 返回合并后的值
  console.log('vm:', parent, child, vm)
  return child + 1
}
const Profile = Vue.extend({
  _my_option: 1
})

console.log(Profile.options._my_option)

/* Vue.component('my-component-1',{
  count:1,
  template:`<div>component-1</div>`
})

Vue.component('my-component-2',{
  count:2,
  template:`<div>component-2</div>`
}) */

new Vue({
  el:'#proxy-instance',
  count:3,
  data: {
    count:3
  },
  created(){
    console.log(this.$options, this.$options.count)
  }
})
