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

