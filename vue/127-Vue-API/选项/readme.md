
# methods

    tips:
    1. 不应该使用箭头函数来定义method函数.箭头函数绑定了父级作用域的上下文,所以this将不会按照期望指向vue示例
    此时this指向window
```js
const vm = new Vue({
    el:'#server',
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
    
# watch

    当watch监听data的数据时,如果是修改一个数组的对象属性值,不会触发watch监听的该数组
```vue
watch:{
    msg(newValue,oldValue){
        console.log(newValue,oldValue)
    },
    /* player(){
         console.log("数组被修改了")
    }*/
    player:{
        handler:function(newValue,oldValue){
            console.log(newValue,oldValue);
            console.log("数组被修改了");
        },
        deep:true
    }
}
```
    下面一种方法 可以在watch中可以监听到深层次的数据改变
    
    tips:
    计算属性在大多数情况下更合适,当需要在数据变化时执行异步或开销较大的操作时,watch是最有用的！
    
# computed

```vue
const vm = new Vue({
    el:'#server',
    data:{
        msg:'hello world',
        a:1
    },
    computed:{
        reverseMsg(){
            console.log('computed重新计算了')
            return this.msg.split('').reverse().join("");
        }
    },
    methods:{
        reversedMsg(){
            console.log("methods重新计算了");
            return this.msg.split('').reverse().join("");
        },
        add(){
            this.a+=1;
        },
        fn(){
            this.msg = "dlrow olleh";
        }
    }
})
```
    上述computed和methods都可以将字符串反转过来,但每次执行add函数时,变量自增时 reversedMsg也会重新计算
    而计算属性是基于它们的响应式依赖进行缓存的.只在相关响应式依赖发生改变时他们才会重新求值！
    
    计算属性默认只有getter,不过在需要时也可以提供一个setter:
```vue
computed:{
    fullName(){
        return this.firstName + '-' this.lastName;
    },
    fullName:{
        get:function(){
            return this.firstName + '-' + this.lastName;
        },
        set:function(value){
            console.log('触发了computed的setter');
            let names = value.split('-');
            this.firstName = names[0];
            this.lastName = names[names.length - 1];
        }
    }
}
```
    
    