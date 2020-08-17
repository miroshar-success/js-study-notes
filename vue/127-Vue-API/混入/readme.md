# Mixin

    混入提供了一种非常灵活的方式，来分发Vue组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，
    所有混入对象的选项将被'混合'进入该组件本身的选项.
```js
// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})
```

## 选项合并
    
    当组件和混入对象有同名选项时,这项选项将以恰当的方式进行'合并'。并在发生冲突时以组件数据优先
```js
let mixin = {
    data(){
        return {
            message:'hello',
            foo:'abc'
        }
    }   
}
const vm = new Vue({
    mixins:[mixin],
    data:{
        message:'goodbye',
        bar:'def'
    },
    created(){
        console.log(this.$data)
        // => { message: "goodbye", foo: "abc", bar: "def" }
    }
})
```
   同名钩子函数将合并为一个数组,因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。
```js
var mixin = {
  created: function () {
    console.log('混入对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  created: function () {
    console.log('组件钩子被调用')
  }
})
// => "混入对象的钩子被调用"
// => "组件钩子被调用"
```
    
    值为对象的选项,例如methods,components和directives,将被合并为同一个对象。两个对象键名冲突时,
    取组件对象的键值对。
```js
var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})
```
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    