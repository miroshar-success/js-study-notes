const class_app = Vue.createApp({
  template:`<div>
    <p>Push this button to do something you should not be doing:</p>
    <div :class="{shake:noActivated}">
      <button @click="noActivated = true">Click me</button>
      <span v-if="noActivated">Oh no!</span>
    </div>
  </div>`,
  data(){
    return {
      noActivated:false
    }
  }
}).mount("#class-app");


Vue.createApp({
  data(){
    return {
      message:'Hover Me'
    }
  },
  template:`<button class="button">{{message}}</button>`
}).mount("#my-button");


const transition_app = Vue.createApp({
  template:`<div>
    <button @click.stop="toggle">toggle</button>
    <div :class="{active:visible ? true : false}" class="box"></div>
  </div>`,
  data(){
    return {
      visible:false
    }
  },
  methods:{
    toggle(){
      this.visible = true;
    }
  }
}).mount("#my-transition");