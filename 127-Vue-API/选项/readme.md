
# methods

    tips:
    1. 不应该使用箭头函数来定义method函数.箭头函数绑定了父级作用域的上下文,所以this将不会按照期望指向vue示例
    此时this指向window
```js
const vm = new Vue({
    el:'#app',
    data:{
        count:0
    },
    methods:{
        add:() => {
            console.log(this);  // window
        }
    }
})
```

## 事件修饰符

    .stop       阻止事件冒泡
    .prevent    阻止浏览器默认事件
    .once       只能点击一次
    .self       只有当event.target是当前元素自身时触发处理函数