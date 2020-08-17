# 概述

    在ES6之前，社区制定了一些模块加载方案，最主要的有CommonJS和AMD两种.前者主要用于服务器,后者主要用于浏览器。
    CommonJS和AMD模块,都只能在运行时确定这些东西。比如CommonJS模块就是对象,输入时必须查找对象属性。
    
    ES6模块不是对象，而是通过export 命令显示指定输出的代码,再通过import命令输入。
```js
// ES6模块
import {start,exists,readFile} from 'fs';
```
    上面的代码实质是从fs模块加载3个方法，其他方法不加载。这种加载称为'编译时加载'或者静态分析。
    
    tips:
        1. ES6模块自动采用严格模式,不管你有没有在模块头部加上'use strict'
        2. ES6模块之中,顶层的this指向undefined,即不应该在顶层代码使用this.
        
## export命令

    模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口,import命令用于输入其他模块提供的功能。
    
*输出变量*
    
```js
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };
```
*输出函数或类*
```js
class Player{
    constructor(){
        this.firstName = 'kyrie';
        this.lastName = 'irving';
    }
    skill(){
        console.log("crossover");
    }
}
function multiple(x,y){
    return x * y;
}
export {Player,multiple};
```
*输出对象*
```js
const guard = {
    firstName:"kyrie",
    lastName:"irving",
    year:1992
}
export {guard}
```
    tips:
        1. export 语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值！
        CommonJS模块输出的是值的缓存,不存在动态更新。
        2. export 命令可以出现在模块的任何位置,只要处于模块顶层就可以。
        3. export命令规定的是对外接口,必须与模块内部的变量建立一一对应的关系。
```js
export let foo = 'bar';
setTimeout(() => foo = 'bar',500)
```

## import命令

    使用export命令定义了模块的对外接口后,其他JS文件就可以通过import命令加载这个模块。
    
```js
import { firstName, lastName, year } from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```   
    import命令接受一对大括号,里面指定从其他模块导入的变量名。大括号里面的变量名,必须与被导入模块对外接口的
    名称相同。如果想为输入的变量重新取一个名字,import 命令要使用as关键字,将输入的变量重命名。
```js
import {lastname as suname} from './profile.js'
suname // irving
```
    tips:
        1. import命令输入的变量都是只读的，因为它的本质是输入接口。
        2. import 命令具有提升效果,会提升到整个模块的头部, 因为import命令是在编译阶段执行的,在代码运行之前！
        3. 由于import是静态执行,所以不能使用表达式和变量,这些只有在运行时才能得到结果的语法结构！
        
## 模块的整体加载

    可以使用整体加载,使用星号(*)指定一个对象,所有输出值都加载在这个对象上面。
```js
// circle.js
export function area(radius){
    return Math.PI * radius * radius;
}
export function circumference(radius){
    return 2 * Math.PI * radius;
}

// main.js
import {area,circumference} from './circle.js'
console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));


import * as circle from './circle.js'
console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

## export default命令 
    
    可以使用export default命令为模块指定默认输出。其他模块加载该模块时,import命令可以为该匿名函数
    指定任意名字。
    
    export default命令用于指定模块的默认输出. 一个模块只能有一个默认输出,因此export default命令只能使用一次。
    因为 export default命令是输出一个叫做default的变量,所以它后面不能跟变量声明语句。
```js
// export-default.js
export default function foo() {
  console.log('foo');
}

// 或者写成
function foo() {
  console.log('foo');
}

export default foo;
```

## export 与 import的复合写法
    
```js
export {foo,bar} from 'my_module';

可以理解为
import {foo,bar} from 'my_moddle';
export {foo,bar}
```
    export 和 import 语句可以结合在一起，写成一行。但是写成一行后,foo和bar实际上并没有被导入当前模块。
    只是相当于对外转发了两个接口,导致当前模块不能直接使用foo和bar。
    
## 跨模块常量

    const声明的常量只在当前代码块有效。如果想要设置跨模块的常量(即跨多个文件)，或者说一个值要被多个模块共享,
    可以采用下面的方法:
```js
// constants.js
export const A = "A";
export const B = "B";
export const C = "C";

// test1.js
import {A,B,C} from 'constants.js';
console.log(A,B,C); // A B C

// test2.js
import * as letter from 'constants.js';
console.log(letter.A);  // A
console.log(letter.B);  // B
console.log(letter.C);  // C
```
# Module的加载实现

    默认情况下,浏览器是同步加载JavaScript脚本，即渲染引擎遇到script标签就会停下来，等到执行完脚本再继续向下渲染。
    如果是外部脚本,还必须加入脚本下载的时间。
    
    
    异步加载脚本的语法:
        <script src="" defer></script>
        <script src="" async></script>
    <script>标签打开defer和async属性,脚本就会异步加载。渲染引擎遇到这一命令，就会开始下载外部脚本但是不会等它下载和执行，
    而是直接执行后面的命令
    
    defer和async区别:
        1. defer要等到整个页面在内存中正常渲染结束(DOM结构完全生产)才会执行。
        2. async一旦下载完,渲染引擎就会中断渲染,执行整个脚本以后再继续渲染。
    defer是渲染完再执行,async是下载完就执行。多个async脚本是不能保证加载顺序的！
    
## 加载规则

    浏览器加载ES6模块，也使用<script>标签，但是要加入type='module'属性！
    
    浏览器对于带有type="module"的<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，
    再执行模块脚本，等同于打开了<script>标签的defer属性。    
    
    
    ES6模块与CommonJS模块的区别:
        1. CommonJS模块输出的是一个值的拷贝,ES6模块输出的是值的引用。
        2. CommonJS模块是运行时加载,ES6模块是编译时输出接口。
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    