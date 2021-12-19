const MUTATION_DECREASE = 'mutations/decrease'

const mutation_store = Vuex.createStore({
  state(){
    return {
      count:0
    }
  },
  mutations:{
    increase(state, payload){
      state.count += 1;
    },
    [MUTATION_DECREASE](state, payload){
      state.count -= payload.amount
    }
  }
})

Vue.createApp({
  computed:{
    ...Vuex.mapState(['count']),
  },
  methods:{
    ...Vuex.mapMutations(['increase',MUTATION_DECREASE]),
    decrease(){
      this[MUTATION_DECREASE]({
        amount:2
      })
    }
  }
}).use(mutation_store).mount('#mutation-demo')
