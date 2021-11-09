// ------------------------------ class/style ------------------------------------
const class_app = Vue.createApp({
  data() {
    return {
      isActive:true,
      hasError:true,
      classObject:{ // 绑定一个class对象
        active:true,
        'text-danger':true
      },
      activeClass:'active',
      errorClass:'error'
    }
  },
  computed:{
    classMap() {
      return {
        active:this.isActive,
        hasError:this.hasError
      }
    }
  },
  created(){
    console.log('root-created')
  },
  mounted(){
    console.log('root-mounted')
  }
})
// --------------------------- 组件添加class  ---------------------------
class_app.component('player-component',{
  template:`<div class='hello'>{{message}}</div>`,
  data() {
    return {
      message:'hello world'
    }
  }
})

// ------------------ 组件有多个根元素,使用组件的 $attrs属性 ---------------
class_app.component('my-component',{
  template:`
    <div :class='$attrs.class'>{{message}}</div>
    <div>{{msg}}</div>
  `,
  data(){
    return {
      message:'hello',
      msg:'word'
    }
  },
  created(){
    console.log('children-created')
  },
  mounted(){
    console.log('children-mounted')
  }
})

class_app.mount('#class-app')

// --------------------------------- style ------------------------------
Vue.createApp({
  data() {
    return {
      activeColor:'red',
      fontSize:'20',
      baseStyles:{
        fontSize:'20px'
      },
      overridingStyles:{
        color:'green'
      }
    }
  }
}).mount('#style-app')
