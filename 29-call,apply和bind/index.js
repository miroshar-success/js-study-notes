var fn = () => console.log(this);
var f1 = function(){
    console.log(this);
}

var obj = {
    name:'kyrie',
    fn:fn,
    f1:f1,
}
obj.fn();
obj.f1();

var o = {
    name:'kyrie',
    fn:function(){
        console.log(this,this.name);
    }
}
o.fn();

var m1 = () => console.log(arguments);
// m1();   // 报错

var _$ = document.querySelector.bind(document);
console.log( _$('body') );
console.log(_$('ul'));

var player = {
    guard:'kyrie',
    say:()=>{
        console.log(this.guard);
    }
}
player.say();
// call 和 apply bind 不能改变箭头函数的指向
player.say.call(player);
player.say.apply(player);

let p = player.say.bind(player);
p();

// 求一个数组的最大值和最小值
var numbers = [5,6,2,3,7];
var max = Math.max.apply(null,numbers);
console.log(max);

var min = Math.min.apply(null,numbers);
console.log(min);

// 将一个数组添加到另一个数组,concat方法会创建一个新数组
var arr1 = ['a','b','c'];
var arr2 = [1,2,3];

console.info( arr1.concat(arr2),arr1,arr2 );

// arr1.push.apply(arr1,arr2);
// console.info(arr1,arr2);

arr1.push.call(arr1,...arr2);
console.info(arr1,arr2);

function add(a,b){
    console.log(a+b);
}
function sub(a,b){
    console.log(a-b);
}
add.call(sub,3,1);
sub.call(add,1,2);


function Animal(){
    this.name = 'Animal';
    this.showName = function(){
        console.log(this.name);
    }
}
function Cat(){
    this.name = 'cat';
}
var animal = new Animal();
var cat = new Cat();

animal.showName.call(cat,',');

function Player(name){
    this.name = name;
    this.showName = function(){
        console.log(this.name);
    }
}

function Kyrie(name){
    Player.call(this,name);
}

var kyrie = new Kyrie('kyrie');
kyrie.showName();

// apply()接受参数数组,而call()接受参数列表. bind()方法会返回执行上下文被改变的函数而不会立即执行.

var num = [5,6,2,3,7];

var max = Math.max.apply(null,num);
var min = Math.min.apply(null,num);

var ma = Math.max(...num);
var mi = Math.min(...num);
console.log(max,min);
console.log(ma,mi);

function sortNumber(a,b){
    return a - b;
}
function getNumber(array){
    return array.sort(sortNumber);
}
var newArr = getNumber(num);
console.log(newArr[0]); // 2
console.log(newArr[num.length-1]);  // 7


var numbers = [5,6,10,7,21,3];
var max = -Infinity;
var min = +Infinity;

for(let i = 0, len = numbers.length; i < len; i++){
    if(numbers[i] > max){
        max = numbers[i];
    }
    if(numbers[i] < min){
        min = numbers[i];
    }
}
console.log(min,max);

void function(){
    console.log('Hello World');
}()

function add(n){
    let sum = n;
    let tfo = function(m){
        sum += m;
        return tfo;
    }
    tfo.toString = function(){
        return sum;
    }
    return tfo;
}

var o = {
    name:'james'
}
function fun(str){
    console.log(this.name+str);
}

fun.call(o,[1,2,3]);    // james1,2,3
fun.apply(o,[1,2,3]);   // james1