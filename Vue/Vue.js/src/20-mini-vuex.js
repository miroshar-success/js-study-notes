const store_state = {
  state:{
    player:{
      firstName:'kyrie',
      lastName:'irving',
    }
  },
  change(name){
    this.state.player.lastName = name;
  }
}

Vue.component('component-a',{
  template:`<div>
    <div>我是组件A : {{share.player.firstName}} - {{share.player.lastName}}</div>
    <div>私有数据---{{private.age}}</div>
    <button @click='click'>click</button>
  </div>`,
  data(){
    return {
      private:{
        age:30
      },
      share:store_state.state
    }
  },
  methods:{
    click(){
      store_state.change('james')
    }
  }
})


Vue.component('component-b', {
  template:`<div>
    <div>我是组件B: {{share.player.firstName}} - {{share.player.lastName}}</div>
    <div>私有数据 --- {{private.age}}</div>
    <button @click='click'>click</button>
  </div>`,
  data(){
    return {
      private:{
        age:31
      },
      share:store_state.state
    }
  },
  methods:{
    click(){
      store_state.change('lebron')
    }
  }
})

new Vue({
  el:'#mini-vuex'
})
