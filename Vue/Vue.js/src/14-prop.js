const Child = {
  template:`<div>{{message}}</div>`,
  props:{
    message:{
      type: String,
      default:''
    }
  }
}

const prop_instance = new Vue({
  el:"#prop-el",
  data(){
    return {
      msg:'123'
    }
  },
  propsData:{
    message:'hello,我是来自根组件'
  },
  components:{
    Child
  }
})

console.log(prop_instance)
