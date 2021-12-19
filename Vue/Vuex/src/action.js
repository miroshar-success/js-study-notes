// -------------- action 通过dispatch 派发 ----------------
const action_store = Vuex.createStore({
  state(){
    return {
      count: 0
    }
  },
  mutations:{
    increment(state){
      state.count += 1
    }
  },
  actions:{
    incrementAsync({commit, state}){
      console.log('action-state', state)
      setTimeout(() => {
        commit('increment')
      },2000)
    }
  }
})

Vue.createApp({
  computed:{
    ...Vuex.mapState(['count'])
  },
  methods:{
    ...Vuex.mapActions(['incrementAsync']),
    increment_by_store(){
      action_store.dispatch('incrementAsync')
    }
  }
}).use(action_store).mount('#action-demo')
