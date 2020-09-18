let getDom = document.querySelector.bind(document);
let log = window.console.log.bind(console);

log('hello world');
log(getDom('.box'));

function m1(){};
var a = m1();
log(a);         // 函数的默认返回值是undefined.

var oBox = getDom('.box');
log(oBox.smile);    // undefined
log(oBox);

var b = oBox.getAttribute('smile');
console.log(b); // haha
log(oBox.className);
log(oBox.id);

var oItem = document.querySelector('.item');
log(oItem);
log(oItem.dataset.smile);
oItem.dataset.smile = 'hahaha';

log(oItem.getAttribute('data-smile'));

// 点击按钮改变字体大小写及颜色
var aBtn = document.querySelectorAll('.btn');
var txt = document.getElementsByTagName('p')[0];

aBtn[0].addEventListener('click',function(event){
    event = event || window.event;
    var attr = document.createAttribute('class');
    attr.nodeValue = 'democlass';
    txt.setAttributeNode(attr);
},false);

aBtn[1].addEventListener('click',function(event){
    event = event || window.event;
    // txt.setAttribute('class','box');
    txt.classList.add('box');
},false);


// 属性的增删改查 getAttribute()   setAttribute()  removeAttribute() createAttribute();
oItem.removeAttribute('data-smile');
oItem.removeAttribute('class');
oBox.removeAttribute('id');
log(oBox.getAttribute('id'));   // null

var attr = document.createAttribute('align');
attr.nodeValue = 'left';
oBox.setAttributeNode(attr);    // 设置属性名

// oBox.setAttribute('title','hello');
var attr1 = document.createAttribute('title');
attr1.nodeValue = 'hello';
oBox.setAttributeNode(attr1);

/*function m1(obj){
    obj.name = "kyrie";
}
const obj = {
    name:"lebron"
}
console.log(obj.name);
m1(obj);
console.log(obj.name);*/

/*
在函数执行时,this关键字并不会指向正在运行的函数本身,而是指向调用该函数的对象。
如果想在函数内部获取函数自身的引用,只能使用函数名或者使用arguments.callee属性。
*/
function m2(){
    console.log(m2);
    console.log(arguments.callee);
}
m2();
// 匿名函数
(function(){
    console.log(arguments.callee);
})();

/*
每个新定义的函数都有自己的this值（在构造函数的情况下是一个新对象,在严格模式的函数调用中则为Undefined）
*/
var a = 10;
function f1(){
    "use strict"
    console.log(this);	// undefined
}
function f2(){
    console.log(this.a);	// 10
}
f1();
f2();

foo1();
foo2();
function foo1(){
    console.log('foo1');
}

(function foo2(){
    console.log('foo2')
})