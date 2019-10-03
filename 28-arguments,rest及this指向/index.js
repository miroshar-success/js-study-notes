function f1(){
    var a = 'Hello World';
    function f2(){
        console.log(a);
    }
    window.$ = f2;
}
f1();
$();

function foo(){
    var o = {
        'name':'Kyrie'
    }
    setTimeout(function(){
        o.name = '我被改变了';
    },3000);
    return o;
}

var b = foo();
console.log(b);

function create(){
    var jk = {
        'money':100
    };
    console.log('你的钱是' + jk.money);
    return{
        add:function(){
            jk.money += 10;
            console.log('你的钱是'+jk.money);
        },
        reduce:function(){
            jk.money -= 5;
            console.log('你的钱是'+jk.money);
        },
        get:function(){
            return jk.money;
        }
    }
}

var now = create();
now.add();
now.reduce();
now.add();
now.add();
var d = now.get();
console.log(d);

function Foo(){
    console.log(arguments);
    console.log(arguments.callee);
    console.log(arguments.callee.name);
    console.log(arguments.callee === Foo );
}
Foo(1,2,3,4);
console.dir(Foo);

function m1(a,b,c,d){
    for(let i = 0, len = arguments.length; i < len; i++){
        console.log(arguments[i]);
    }
    console.log(a,b,c,d);
}
// m1(1,2,3,4);
// m1('a','b','c','d')
m1();

function player(a,b,c,d,e){
    console.log(arguments);
    for(let i in arguments){
        console.log(i);
    }
    for(item of arguments){
        console.log(item);
    }
}
player('kyrie','james','durant','curry','wade');

function count(...value){
    var sum = 0;
    for(let item of value){
        sum += item;
    }
    return sum;
}
var a = count(1,2,3,4,5);
console.log(a);

// 改写数组的Push方法

function push(arry,...items){
    for(item of items){
        arry.push(item);
    }
    return arry;
}
var arr = push([],1,2,3,4,5);
console.log(arr);

function push(array,...items){
    items.forEach(function(item){
        array.push(item);
    });
    console.log(array);
}
push([],'kyrie','irving','james','durant','curry');

function sum(num1,num2){
    return num1 + num2;
}

function foo(){
    console.log(this);
}
foo();
console.log(foo === window.foo);

var obj = {
    foo:function(){
        console.log(this);
    }
}
obj.foo();

function fun1(){
    let a = 'f1';
    function fun2(){
        console.log(a,this);
    }
    return fun2;
}
var aa = fun1();
aa();

var obj = {
    'name':'this object',
    'getThis':function(){
        console.log(this === obj,this.name);
    }
}
obj.getThis();  // true 'this object'

var obj = {
    'name':'this object',
    'getThis':function(){
        console.log(this === obj,this.name);
    }
}
var name = 'window name';
var fn = obj.getThis;
fn();   // false ' window name'