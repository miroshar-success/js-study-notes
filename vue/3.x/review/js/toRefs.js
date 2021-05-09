const refs_app = Vue.createApp({
  template:`<div>
    <p>counter is {{counter}}, double counter is {{double}}</p>
    <button @click="add">click</button>
  </div>`,
  setup(){
    const counter = Vue.ref(0);
    const double = Vue.computed(() => counter.value * 2);
    function add(){
      counter.value += 1;
    }
    const obj = {firstname:"kyrie",lastname:"irving"};
    const state = Vue.toRefs(obj);
    console.log(state);
    return {counter,double,add,state}
  }
}).mount("#refs")