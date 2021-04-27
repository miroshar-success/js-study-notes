const app = Vue.createApp({
  data(){
    return {
      counter:0,
    }
  },
  methods:{
    change(){
      this.counter += 1;
    }
  }
});

app.component("my-component",{
  template:`<div>{{counter}}</div>`,
  props:{
    counter:{
      type:Number,
      required:true
    },
    title:{
      type:String,
      default:""
    }
  },
  setup(props){
    /* props是响应式的,不能使用ES6解构赋值, 可以使用toRefs()解构prop */ 
    // const {counter,title} = Vue.toRefs(props);
    // console.log('counter-value:',counter.value);

    // console.log(props.title,title.value);
    let title = Vue.toRef(props,'title');
    console.log(title.value);
  },
}).mount("#introduce_setup");



// context
const context_app = Vue.createApp({});

context_app.component("my-component",{
  template:`<div>{{message}}</div>`,
  data(){
    return {
      message:"hello world"
    }
  },
  setup(props,context){
    console.log(props);
    console.log(context);
  }
}).mount("#context_app")