const AsyncComp = Vue.defineAsyncComponent( () => {
  return new Promise((resolve) => {
    resolve({
      template:`<div>I am async</div>`
    })
  })
})

const async_app = Vue.createApp({
  template:`<div>
    <button @click.stop="show_component">click</button>
  </div>`,
  data(){
    return {
      show:false
    }
  },
  components:{AsyncComp},
  methods:{
    show_component(){
      console.log("111");
      this.show = true;
    }
  }
}).mount("#async-component");
