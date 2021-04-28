const myMixin = {
  data(){
    return {
      message:"hello,I am from mixin",
      foo:"abc, I am from mixin"
    }
  },
  created(){
    this.hello();
    console.log("created---mixin");
  },
  methods:{
    hello(){
      console.log('hello from mixins');
    }
  }
}
const mixin_app = Vue.createApp({
  mixins:[myMixin],
  data(){
    return {
      message:"hello world,"
    }
  },
  created(){
    console.log("created--app");
  },
  methods:{
    hello(){
      console.log("invoked from app");
    }
  },
  template:`<div>
    <p>{{message}}</p>
    <p>{{foo}}</p>
  </div>`,
}).mount("#mixin-app")