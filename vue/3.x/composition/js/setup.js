const todo_app = Vue.createApp({});
import mixin from './mixin.js';

todo_app.component("todo-component",{
  template:`<div>
    <input type="text" v-model="todo" @keyup.enter="add_todo">
    <ul>
      <li v-for="(todo,index) in todo_list" :key="'todo-'+index">
        {{todo['text']}}
      </li>
    </ul>
    <p>The counter is {{counter}}, double is {{double}}</p>
    <button @click.stop="add">{{counter}}</button>
  </div>`,
  data(){
    return {
      // counter:0,
      todo_list:[
        {
          id:1,
          text:"vue",
          done:false
        },
        {
          id:2,
          text:"vue-router",
          done:false
        },
        {
          id:3,
          text:"vuex",
          done:false
        }
      ],
      todo:""
    }
  },
  mixins:[mixin],
  methods:{
    add_todo(){
      this.todo_list.push({
        id:this.todo_list.length+1,
        text:this.todo,
        done:false
      })
    },
    // add(){
    //   this.counter += 1;
    // }
  }
}).mount("#todo_app");


import useCounter from './setup_mixin.js';

const setup_app = Vue.createApp({});
setup_app.component("my-component",{
  template:`<div>
    <input type="text" v-model.trim="todo" @keyup.enter="add_todo">
    <ul>
      <li v-for="(todo,index) in todo_list" :key="'todo-'+index">{{todo['text']}}</li>
    </ul>
    <p>The counter is {{counter}}, double is {{double}}</p>
    <button @click.stop="add">{{counter}}</button>
  </div>`,
  setup(){
    let todo = Vue.ref("");
    let todo_list = Vue.reactive([
      {id:0,text:"vue",done:false},
      {id:1,text:"vue-router",done:false},
      {id:2,text:"vuex",done:false},
    ]);
    let {counter,add,double} = useCounter();
    function add_todo(){
      todo_list.push({
        id:todo_list.length + 1,
        text:todo.value,
        done:false
      })
    }
    return {
      todo,todo_list,add_todo,
      counter,double,add
    }
  }
}).mount("#setup_app")