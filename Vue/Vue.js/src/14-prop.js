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


const Comp = Vue.extend({
  props:{
    msg:{
      type:String,
      default:''
    }
  },
  template:`<div>{{msg}}</div>`
})

const p_instance = new Comp({
  el:"#prop-el",
  propsData:{
    msg:'hello world123'
  }
})
console.log('p_instance:',p_instance)




const Child_Component = Vue.component('child-component',{
  props:{
    message:{
      type:String,
      default:''
    },
    msg:{
      type:String
    }
  },
  data(){
    return {}
  },
  template:`<div>hello, 我是子组件 {{message}}</div>`,
  methods:{
    hello(){
      console.log('hello')
    },
    _hello(){
      console.log('hello')
    },
    $hello(){
      console.log('hello')
    },
  }
})

const c_instance = new Vue({
  el:'#prop-element',
  data(){
    return {
      message:'hello,我来自父组件',
      msg:''
    }
  },
  created(){
    console.log('created--------', this.message)
  },
  // methods:{
  //   message(){
  //     console.log('我是一个方法')
  //   }
  // }
})

console.log('c:' ,c_instance)


function Player(name){
  this.name = name;
}
Player.prototype.message = 'hello';
const kyrie = new Player('kyrie')
console.log(kyrie, kyrie.name, kyrie.message)
