const ChildComponent = {
  created(){
    console.log('child-component',this.$options.parent)
  },
  template:`<div></div>`
}
new Vue({
  el:"#init-demo",
  components:{
    ChildComponent
  }
})
