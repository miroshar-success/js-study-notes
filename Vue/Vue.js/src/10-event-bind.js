Vue.createApp({
  data () {
    return {
      counter:0,
      name:'Vue.js'
    }
  },
  methods:{
    greet(event) {
      console.log('Hello' + this.name)
      console.log(event.target.tagName)
    }
  }
}).mount('#basic-event')

// ------------------------------------- 事件传递参数 -------------------------------------
Vue.createApp({
  data() {
    return {

    }
  },
  methods:{
    say(message) {
      console.log('message:', message)
    },
    get_event(message,event){
      console.log('event:',event)
    }
  }
}).mount('#inline-handler')


// ------------------------------------- 绑定多个点击事件 -------------------------------------
Vue.createApp({
  data() {
    return {

    }
  },
  methods:{
    one() {
      console.log('click one')
    },
    two() {
      console.log('click two')
    }
  }
}).mount('#multiple-event')


// -------------------------------------事件修饰符 -------------------------------------
Vue.createApp({
  data() {
    return {
      username:''
    }
  },
  methods:{
    click_box1() {
      console.log('box1')
    },
    click_box2(){
      console.log('box2')
    },
    onSubmit() {
      console.log('提交了')
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener('click', () => {
        console.log('document clicked')
      },false)
      window.addEventListener('click', () => {
        console.log('window clicked')
      },false)
    })
  }
}).mount('#capture-event')
