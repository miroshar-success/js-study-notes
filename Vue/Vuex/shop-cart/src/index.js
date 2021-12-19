const product_list = [
  {
    url:'https://img13.360buyimg.com/n1/s450x450_jfs/t1/204223/34/6673/167372/61412010E3d30dcdb/44aa8bb341929330.jpg',
    name:'Apple iPad mini',
    price:'4999.00',
    id:1
  },
  {
    url:'https://img14.360buyimg.com/n1/s450x450_jfs/t1/201121/25/8033/204268/614bdebeE017c1ac8/4bb245036d972c80.jpg',
    name:'Apple iPhone 13 Pro',
    price:'7999.00',
    id:2
  },
  {
    url:'https://img14.360buyimg.com/n1/s450x450_jfs/t1/141480/8/14039/48663/5fab0686E7d32b85f/bb2489ac5d2b4ed5.jpg',
    name:'Apple MacBook Air',
    price:'7999.00',
    id:3
  },
  {
    url:'https://img14.360buyimg.com/n1/jfs/t1/85760/20/16211/53424/61414dfeE6aae955f/59ac1d6d7984bfd8.jpg',
    name:' Apple Watch Series 7',
    price:'2999.00',
    id:4
  }
]

const product = { // 产品列表数据
  namespaced:true,
  state(){
    return {
      product_list
    }
  }
}
// -------------------- 购物车vuex ------------------
const ADD_CART = 'cart/add', DELETE_CART = 'cart/delete', TOGGLE_CART = 'cart/toggle', TOGGLE_GOOD = 'good/toggle';
const ADD_GOOD = 'good/add';

const INCREASE = 'good/increase', DECREASE = 'good/decrease'

const CART_GOOD  = 'cart/good'; // 本地存储的数据

const cart_plugin = store => {
  store.subscribe(({type}, state) => {
    if(type.includes('cart/')){
      window.localStorage.setItem(CART_GOOD, JSON.stringify(state.cart.cart_list))
    }
  })
}

const cart = {
  namespaced: true,
  state(){
    return {
      cart_list:JSON.parse(window.localStorage.getItem(CART_GOOD)) || []
    }
  },
  getters:{ // 购物车数量总和和小记
    cartGoodLength(state){
      return state.cart_list.reduce((prev,next) => prev + next.number*1, 0)
    },
    cartGoodTotal(state){
      return state.cart_list.reduce((prev,next) => prev + next.total*1, 0)
    },
    checkedGoodLength(state){
      return state.cart_list.filter(item => item.checked).reduce((prev,next) => prev + next.number*1,0)
    },
    checkedGoodTotal(state){
      return state.cart_list.filter(item => item.checked).reduce((prev,next) => prev + next.total*1,0)
    }
  },
  mutations:{
    [ADD_CART](state, payload){  // 添加商品到购物车
      const { id } = payload;
      const prod = state.cart_list.find(g => g.id === id)
      if(!prod){
        state.cart_list.push(
          {
            ...payload,
            number:1,
            checked:true,
            total: payload.price*1
          }
        )
      }else{
        prod.checked = true;
        prod.number += 1;
        prod.total = prod.number * prod.price
      }
    },
    [DELETE_CART](state,payload){ // 删除购物车商品
      const index = state.cart_list.findIndex(item => item.id === payload)
      index !== -1 && state.cart_list.splice(index,1)
    },
    [TOGGLE_CART](state, payload) {
      state.cart_list.forEach(item => item.checked = payload) // 切换所有商品
    },
    [TOGGLE_GOOD](state, {id,checked}){
      const prod = state.cart_list.find(item => item.id === id)
      if(prod){
        prod.checked = checked;
      }
    },
    [ADD_GOOD](state, {id,type}){ // 添加或减少商品
      const prod = state.cart_list.find(item => item.id === id)
      if(!prod) return;
      switch(type){
        case INCREASE:
          prod.number += 1;
          break;
        case DECREASE:
          prod.number -= 1;
          break;
      }
      prod.total = prod.number * prod.price;
    }
  }
}

const store = Vuex.createStore({
  modules:{
    product,
    cart
  },
  plugins:[cart_plugin]
})

const instance = Vue.createApp({
  computed:{
    ...Vuex.mapState('product',['product_list']),
    ...Vuex.mapState('cart', ['cart_list']),
    ...Vuex.mapGetters('cart',['cartGoodLength','cartGoodTotal','checkedGoodLength','checkedGoodTotal']),
    toggle_cart:{  // 切换整个商品选中
      get(){
        return this.cart_list.every(item => item.checked)
      },
      set(v) {
        this[TOGGLE_CART](v)
      }
    }
  },
  methods:{
    ...Vuex.mapMutations('cart',[ADD_CART,DELETE_CART,TOGGLE_CART,TOGGLE_GOOD,ADD_GOOD]),
    add_card(product){  // 添加商品到购物车
      this[ADD_CART](product)
    },
    del_cart_good(product){
      this[DELETE_CART](product.id)
    },
    toggle_good(good, event){  // 切换单个商品
      this[TOGGLE_GOOD]({
        checked:event.target.checked,
        id:good.id
      })
    },
    add_good(id){ // 新增商品
      this[ADD_GOOD]({
        id,
        type:INCREASE
      })
    },
    reduce_good(good){  // 减少商品
      if(good.number === 1) return;
      this[ADD_GOOD]({
        id:good.id,
        type:DECREASE
      })
    }
  }
}).use(store).mount('#cart-demo')

