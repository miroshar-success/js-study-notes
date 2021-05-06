const setup_app = Vue.createApp({
  template:`<div>
    <p>{{message}}</p>
    <p>count is {{state.count}}  ---- {{readerNumber}} -- {{book.title}}</p>
    <button @click.stop="add">click</button>
    <button @click.stop="changeTitle">change title</button>
  </div>`,
  data(){
    return {
      message:"hello world"
    }
  },
  beforeCreate(){
    console.log("beforeCreate");
  },
  created(){
    console.log('created');
  },
  setup(props,context){
    console.log("setup");
    const state = Vue.ref({count:3});
    const readerNumber = Vue.ref(0);
    const book = Vue.reactive({title:"Vue 3 Guide"})
    console.log('readerNumber:',readerNumber);
    console.log('book:',book);
    function add(){
      state.value.count += 1;
    }
    function changeTitle(){
      book.title = 'hello world'
    }
    return {state,readerNumber,book,add,changeTitle}  // expose to template
  }
})
setup_app.mount("#setup-app")