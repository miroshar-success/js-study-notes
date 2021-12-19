const state_store = Vuex.createStore({
  state(){
    return {
      count:0,
      message:'hello,我来自vuex'
    }
  }
})

const state_app = Vue.createApp({
  computed:{
    ...Vuex.mapState(['count', 'message'])
  }
})
state_app.use(state_store).mount('#state-demo')

console.log(state_store)
