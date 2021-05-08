const my_app = Vue.createApp({
  template:`<div>
    <button @click="add">{{state}}</button>
    <button @click="add_1">{{state1}}</button>
  </div>`,
  created(){
    console.log("component-created");
  },
  setup(){
    const obj = {count:3};
    const state = Vue.ref(obj.count);
    const state1 = Vue.toRef(obj,'count');
    function add(){
      state.value += 1;
      console.log("原始数据:",obj);
      console.log("响应式数据:",state);
    }
    function add_1(){
      state1.value += 1;
      console.log("原始数据:",obj);
      console.log("响应式数据:",state1);
    }
    Vue.onMounted(() => {
      console.log('mounted');
    })
    return {state,add,add_1,state1}
  }
}).mount("#ref-and-toref-app");