const singer = {
  namespaced:true,
  state(){
    return {
      firstName:'jay',
      lastName:'chou',
      age:42
    }
  },
  mutations:{
    change(state,payload){
      state.age += 1
    }
  },
  getters:{
    fullName(state){
      return state.firstName + ',' + state.lastName
    },
    // getters中访问根节点 state, getters
    todoLength(state, getters, rootState, rootGetters){
      console.log('state', state,)
      console.log('getters', getters, rootGetters, rootState)
      return rootState.todos.length
    }
  },
  actions:{
    // 根节点数据在 rootState中暴露出来
    add_todo({state, commit, rootState}){
      console.log('state:', state)  // 当前模块的数据
      console.log('rootState', rootState)
    }
  }
}


const player = {
  namespaced:true,
  state(){
    return {
      firstName:'lebron',
      lastName:'james',
      age:30
    }
  },
  mutations:{
    change(state, payload){
      state.age += 1
    },
  },
  getters:{
    fullName(state){
      return state.firstName + ',' + state.lastName
    }
  },
  actions:{
    add_todo({commit}){ // 提交父级的 mutation
      commit('add', null, {
        root:true
      })
    }
  }
}

const module_store = Vuex.createStore({
  state(){
    return {
      todos:[
        {
          text:'hello world',
          completed:false,
          id:1
        },
        {
          text:'hello vue.js',
          completed:true,
          id:2
        }
      ]
    }
  },
  mutations:{
    add(state){
      state.todos.push({
        text:'hello, vuex.js',
        completed:true,
        id:3
      })
    }
  },
  modules:{
    singer,
    player
  }
})

console.log('module_store:',module_store)

Vue.createApp({
  computed:{
    ...Vuex.mapGetters({
      singer_fullName:'singer/fullName',
      player_fullName:'player/fullName',
      todoLength:'singer/todoLength'
    }),
    ...Vuex.mapState(['singer','player','todos']),
  },
  methods:{
    ...Vuex.mapMutations({
      change_player_age:'player/change',
      change_singer_age:'singer/change',
    }),
    ...Vuex.mapActions('singer',['add_todo']),
    ...Vuex.mapActions('player',['add_todo'])
  }
}).use(module_store).mount('#module-demo')
