const template_app = Vue.createApp({});

template_app.component("my-component",{
  template:`<div ref="root">
    This is a root element.
    <button @click.stop="add">{{counter}}</button>
  </div>`,
  setup(){
    const root = Vue.ref(null);
    Vue.onMounted(() => {
      console.log(root.value);
    })
    const counter = Vue.ref(0);
    function add(){
      counter.value += 1;
    }
    // Vue.watch('counter',(newValue,oldValue) => {
    //   console.log(newValue,oldValue);
    // })
    return {root,counter,add}
  }
}).mount("#template-app");

const watch_app = Vue.createApp({});
watch_app.component("my-component",{
  template:`<div ref="root">This is a root element</div>`,
  setup(){
    let root = Vue.ref(null);
    // watch和watchEffect()副作用是在DOM被挂载或更新之前运行的。
    Vue.watchEffect(() => {
      console.log('watch-root:',root.value);  // null
    })
    return {root}
  }
}).mount("#watch-effect");


// watchEffect()
const watch_effect_app = Vue.createApp({});

watch_effect_app.component("my-component",{
  template:`<div ref="root">This is a root element</div>`,
  setup(){
    let root = Vue.ref(null);
    Vue.watchEffect(() => {
      console.log('flush.post:',root.value);
    },{
      flush:'post'
    })
    return {root}
  }
}).mount("#watch-effect-app");
