1. 下述有关border:none 以及border:0 的叙述错误的是:

        A border:none 表示边框样式无
        B border:0 表示边框宽度为0
        C 当定义了border:none，即隐藏了边框的显示,实际就是边框宽度为0
        D 当定义边框时,仅设置边框宽度也可以达到显示的效果
        
   tips:
    1. border:0 浏览器对border-width border-color进行渲染,占用内存。
        border:none 浏览器不进行渲染,不占用内存
    2. 请始终把border-style属性声明到border-color属性之前,元素必须在改变颜色之前获得边框。
    
2. 下面的js程序输出的是什么?
```js
function Foo() {
    var i = 0;
    return function() {
        console.log(i++);
    }
}
 
var f1 = Foo(),
    f2 = Foo();
f1();   // 0
f1();   // 1
f2();   // 0
``` 
    i++ 整体表达式的值 是 i+1 之前的值
    
3. 找出元素item在给定数组arr中的位置
    
   输出描述: 如果数组中存在item,则返回元素在数组中的位置,否则返回-1
```js
function indexOf(arr, item) {
    if(!Array.isArray(arr)) return -1;
    if(Array.prototype.indexOf){
        return arr.indexOf(item);
    }
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === item){
            return i
        }
    }
    return -1;
}
```

4. 计算给定数组arr中所有元素的总和
    
    输入描述: 数组中的元素均为Number类型
```js
// 1. for循环
function sum(arr) {
   let sum = 0;
    for(let i = 0; i < arr.length; i++){
        sum += arr[i];        
    }
    return sum;
}

// reduce方法
function sum(arr) {
    return arr.reduce((initialValue,currentValue) => {
        return initialValue + currentValue;
    },0)
}
```

5. 移除数组arr中所有值与item相等的元素。不要直接修改数组arr,结果返回新的数组
```js
// 1. 不相等的时候 添加进数组
function remove(arr, item) {
    let [temp,len] = [[],arr.length];
    for(let i = 0; i < len; i++){
        if(arr[i] !== item){
            temp.push(arr[i]);
        }
    }
    return temp;
}

// 2. 相等的时候跳出循环
function remove(arr,item){
    let temp = [];
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === item){
            continue;
        }
        temp.push(arr[i])
    }
    return temp;
}

// 3. filter方法
function remove(arr,item){
    return arr.filter((ele,index,array) => {
        return ele !== item
    })
}

// 4. splice方法
function remove(arr,item){
    let temp = [...arr];
    for(let i = 0; i < temp.length; i++){
        if( temp[i] === item ){
            temp.splice(i,1);
            i--;
        }
    }
    return temp;
}
```