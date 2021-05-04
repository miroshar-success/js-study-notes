// 正常使用插槽的方法
const blog_app = Vue.createApp({});

blog_app.component("blog-post",{
  template:`<div>
    <slot name="header"></slot>
    <slot name="main"></slot>
    <slot name="footer"></slot>
  </div>`
}).mount("#blog-app");


// 使用render-function 使用插槽
const render_post = Vue.createApp({});

render_post.component("blog-post",{
  render(){
    return Vue.h('div',[
      Vue.h('header',this.$slots.header()),
      Vue.h("main",this.$slots.main()),
      Vue.h("footer",this.$slots.footer())
    ])
  },
  created(){
    console.log('created-header:',this.$slots.header());
    console.log('created-main:',this.$slots.main());
    console.log('created-footer',this.$slots.footer());
  }
}).mount("#blog-render");