
// ------------ 组件的computed -------------
Vue.component('computed-component', {
  template:`<div>{{message}}</div>`,
  computed:{
    message() {
      return 'hello,我是组件的 computed'
    }
  }
})

// ---------- computed getter/setter -----------
const computed_instance = new Vue({
  el:'#computed-element',
  data() {
    return {
      firstName: '',
      lastName: '',
      hello:""
    }
  },
  computed:{
    fullName:{
      get(){
        console.log('computed-getter')
        return this.firstName + ' ' + this.lastName
      },
      set(newValue){
        console.log('setter:', newValue)
        const [f, l] = newValue.split(' ')
        this.firstName = f;
        this.lastName = l
      }
    },
    message(){
      return 'hello, 我是父组件的computed'
    }
  },
  methods:{
    change_message(){
      this.hello = {
        hello:'hello'
      }
    }
  }
})


console.log('computed_instance:' ,computed_instance)
