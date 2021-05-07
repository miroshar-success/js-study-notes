const toRef_app = Vue.createApp({
  template:`<div>
    <p>父组件中的数据:{{counter}} <button @click.stop="add">click</button></p>
    <child-component :counter="counter"></child-component>
  </div>`,
  setup(){
    let counter = Vue.ref(0);
    function add(){
      counter.value += 1;
    }
    return {counter,add}
  }
});

toRef_app.component("child-component",{
  template:`<p>子组件中的数据: {{counter}}  The double is {{double}}</p>`,
  props:{
    counter:{
      type:Number,
      required:true
    }
  },
  setup(props){
    let title = Vue.ref('hello world');
    Vue.watch(title,(newValue,oldValue) => {
      console.log(newValue,oldValue);
    });

    // const {counter} = Vue.toRefs(props);
    // Vue.watch(counter,(newValue,oldValue) => {
    //   console.log(newValue,oldValue);
    // });

    const counter = Vue.toRef(props,'counter');
    Vue.watch(counter,(newValue,oldValue) => {
      console.log(newValue,oldValue);
    })
    const double = Vue.computed(() => {
      return counter.value * 2
    });
    return {double}
  }
});

toRef_app.mount("#toref-app");