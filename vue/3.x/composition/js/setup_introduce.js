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
}).mount("#context_app");

const book_app = Vue.createApp({});

book_app.component("my-component",{
  template:`<div>{{readersNumber}} {{book.title}}</div>`,
  setup(){
    const readersNumber = Vue.ref(0); // Vue 3.0可以通过一个新的ref函数使任何响应式变量在任何地方起作用
    const book = Vue.reactive({
      title:"Vue3 Guide"
    })
    return {readersNumber,book}
  }
}).mount("#my-book");


const lifecycle_app = Vue.createApp({});
lifecycle_app.component("my-component",{
  template:`<div>
    <p>The counter is {{counter}}, double is {{double}}</p>
    <button @click.stop="add">click</button>
  </div>`,
  setup(props){
    let counter = Vue.ref(0);
    function add(){
      counter.value += 1
    }
    const double = Vue.computed(() => counter.value * 2)
    Vue.onMounted(() => {
      console.log("setup mounter")
    })
    Vue.watch(counter,(newValue,oldValue) => {
      console.log('The new counter value is :' + counter.value);
      console.log('newValue:',newValue,'oldValue:',oldValue);
    })
    return {
      counter,
      add,
      double
    }
  }
}).mount("#lifecycle");

// setup生命周期函数
const lifecycle = Vue.createApp({});
lifecycle.component("my-component",{
  template:`<div></div>`,
  setup(){
    Vue.onBeforeMount(() => {
      console.log('before-mount');
    })
    Vue.onMounted(() => {
      console.log("mounted");
    })
    Vue.onBeforeUpdate(() => {
      console.log("before update");
    })
    Vue.onUpdated(() => {
      console.log("updated");
    })
  }
}).mount("#lifecyle-function")