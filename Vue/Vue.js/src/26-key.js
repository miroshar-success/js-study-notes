// 2.x
/* new Vue({
  el:'#app',
  data() {
    return {
      player_list:[
        {firstName:'kyrie', lastName:'irving'},
        {firstName:'lebron', lastName:'james'},
        {firstName:'kevin', lastName:'durant'}
      ],
      array:[0,1,2]
    }
  },
  methods: {
    delete_player() {
      this.player_list.splice(0,1)
      this.array.splice(0,1)
    }
  },
  components: {
    test: {
      template:`<span>{{Math.random()}}</span>`
    }
  }
}) */


// 3.x
const app = Vue.createApp({
  data() {
    return {
      player_list:[
        {firstName:'kyrie', lastName:'irving'},
        {firstName:'lebron', lastName:'james'},
        {firstName:'kevin', lastName:'durant'}
      ],
      array:[0,1,1]
    }
  },
  methods:{
    delete_player() {
      this.player_list.splice(0,1)
      this.array.splice(0,1)
    },
  },
})
app.component('test', {
  template:`<span>{{Math.random()}}</span>`
})
app.mount('#root')


// 在vue2.x中, 以index作为key 或者没有key的时候 会触发子节点全部遍历更新
// 在vue3.x中, 以index作为key的时候 会触发子节点全部遍历更新, 没有key的时候会自动创建key，仅更新指定的节点
