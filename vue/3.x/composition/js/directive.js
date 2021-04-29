const directive_app = Vue.createApp({});
directive_app.directive("focus",{ // 全局指令
  mounted(el){  
    el.focus()
  }
})

directive_app.component("my-component",{  // 局部指令
  template:`<div>
    <input type="text" v-a>
  </div>`,
  directives:{
    a:{
      mounted(el){
        el.focus()
      }
    }
  }
})

directive_app.mount("#directive-app");


const directive_lifecycle_app = Vue.createApp({});
directive_lifecycle_app.component("my-component",{
  template:`<div>
    <input type="text" v-focus:msg>
  </div>`,
  directives:{
    focus:{
      created(){
        console.log('directive-created');
      },
      beforeMount(){
        console.log('directive-beforeMount');
      },
      mounted(el,binding){
        console.log('directive-mounted');
        console.log(el,binding);
      },
      beforeUpdate(){
        console.log('directive-beforeUpdate');
      },
      updated(){
        console.log('directive-updated');
      }
    }
  }
}).mount("#directive-lifecycle");


const dynamic_argument_example = Vue.createApp({});

dynamic_argument_example.component("my-component",{
  template:`<div v-pin:left="200" style="color:red;">pin 200px;</div>`,
  directives:{
    pin:{
      created(){
        console.log('created');
      },
      mounted(el,binding){
        console.log(el,binding);
        el.style.position = 'fixed';
        el.style.top = '100px';
        el.style[binding.arg] = binding.value + 'px';
        console.log(binding.instance);
      }
    }
  }
}).mount("#dynamic-argument-example")



const example_app = Vue.createApp({});

example_app.component("my-component",{
  template:`<div>
    <p v-pin:[direction]="200" style="color:green;">Hello World!!!</p>
    <button @click.stop="add">{{counter}}</button>
  </div>`,
  data(){
    return {
      direction:'right',
    }
  },
  directives:{
    pin:{
      mounted(el,binding){
        el.style.position = 'fixed';
        el.style[binding.arg] = binding.value + 'px';
        el.style.top = '500px';
      },
      beforeUpdate(){
        console.log('beforeUpdate');
      },
      updated(){
        console.log('updated')
      }
    }
  },
  setup(){
    let counter = Vue.ref(0);
    function add(){
      counter.value += 1;
    }
    return {counter,add}
  }
}).mount("#dynamicexample");


//  指令绑定多个值
const multiple_app = Vue.createApp({
  template:`<div v-demo="{color:'blue',text:'hello!'}"></div>`,
  directives:{
    demo:{
      mounted(el,binding){
        el.textContent = binding.value.text;
        el.style.color = binding.value.color;
      }
    }
  }
}).mount("#directive-multiple");

