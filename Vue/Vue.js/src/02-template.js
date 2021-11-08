// ----------------------- 渲染文本和 html -----------------------
Vue.createApp({
  data() {
    return {
      rawHtml:'<span style="color:red;">hello world</span>'
    }
  }
}).mount('#mustaches')

//  -----------------------  attribute  -----------------------
Vue.createApp({
  data() {
    return {
      dynamicId:123,
      // null 和 undefined将不会包含在渲染的元素上
      undefinedClass:undefined,
      nullClass:null,
      emptyClass:""
    }
  }
}).mount('#dynamicId')

//----------------------- 布尔attribute -----------------------
Vue.createApp({
  data() {
    return {
      isButtonDisabled:false,
      empty:"",
      isDisabled1:true,
      isDisabled2:'123',
      isDisabled3:123,
      isDisabled4:null,
      isDisabled5:undefined
    }
  }
}).mount('#truthy-app')

//  --------------------------- javascript表达式  -----------------------------
Vue.createApp({
  data() {
    return {
      number:1,
      ok:true,
      message:'hello world'
    }
  }
}).mount('#js-expression')


//  -------------------------------- 指令  -----------------------
Vue.createApp({
  data(){
    return {
      seen:true,
      name:'click'  // 需要使用小写,浏览器会把attribute名全部强制转为小写。
    }
  },
  methods:{
    emitHandler() {
      window.alert('我触发了')
    },
    changeHandler(type){
      this.name = type;
    }
  }
}).mount('#directive-app')
