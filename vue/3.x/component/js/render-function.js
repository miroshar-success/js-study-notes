const render_app = Vue.createApp({});

render_app.component("anchored-heading",{
  render(){
    return Vue.h(
      'h' + this.level,
      this.$slots.default()
    )
  },
  props:{
    level:{
      type:Number,
      required:true
    }
  }
}).mount("#render-function");