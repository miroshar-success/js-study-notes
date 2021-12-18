// ------------ 事件车 --------------
const bus = new Vue({})

const ComponentA = Vue.component('component-a', {
  data(){
    return {
      message:'我是组件A'
    }
  },
  template:`<div>{{message}}</div>`,
  created(){
    bus.$on('click', function(value){
      console.log('我监测到了数据', value)
    })
  }
})


const ComponentB = Vue.component('component-b',{
  data(){
    return {
      count:0
    }
  },
  template:`<button @click='click'>click</button>`,
  methods:{
    click(){
      this.count += 1;
      bus.$emit('click', this.count)
    }
  }
})

new Vue({
  el:'#event-bus-demo'
})
