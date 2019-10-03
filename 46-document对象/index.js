console.log( document.all );

let oBox = document.getElementById('box');
console.log(oBox);

let aLi = document.getElementsByTagName('li');
console.log(aLi);
console.log(aLi.item(0));
console.log(aLi.item(1));

let oList = document.querySelector('.list');
let list1 = document.getElementsByTagName('li');
let list2 = document.querySelectorAll('.list>li');

oList.innerHTML += `<li class='item'>我是新增的元素</li>`;
console.log(list1); // HTMLCollection(4)
console.log(list2); // NodeList(3)

console.log( list1[0] == list2[0] );    // false

for( let item of list2.entries() ){
    console.log(item);
};

list2.forEach(function(item,index,array){
    console.log(item,index,array);
});

for(let key of list2.keys()){
    console.log(key);   // 0 1 2
};

list1[0].onclick = function(){
    console.log('get');     // 输出get
}
list2[0].onclick = function(){
    console.log('query');
}

console.log( oList.childNodes );
console.log( oList.children );

let oImg = document.createElement('img');
oBox.appendChild(oImg);
let oSpan = document.createElement('span');
oBox.replaceChild(oSpan,oImg);

let myList = document.querySelector('.mylist');
let myLi = document.querySelectorAll('.mylist>li');

let newLi = document.createElement('li');
newLi.innerHTML = 'Water';
myList.insertBefore(newLi,myLi[0]);

let baidu = document.querySelector('a');
console.log( baidu.getAttribute('target') );    // _blank
console.log( baidu.getAttribute('href'));       // http://www.baidu.com

let Img = document.querySelector('.img');

Img.setAttribute('src','http://b-ssl.duitang.com/uploads/item/201607/19/20160719064142_NLihM.jpeg');

console.log(Img.nodeName);  // IMG

console.log(document.documentElement);
console.log(document.body);

let item1 = document.querySelector('.item1');
console.log(item1);
console.log(item1.nextElementSibling);  // <li class='item2'>2</li>
console.log(item1.nextSibling); // 文本节点

let item3 = document.querySelector('.item3');

console.log(item3.previousSibling); // 文本节点
console.log(item3.previousElementSibling);  // <li class='item2'></li>

let bList = document.getElementById('b-list');
let browers = ['Firefox','Chrome','Opera','Safari','Internet Explorer']
let fragment = document.createDocumentFragment();

browers.forEach(function(item){
    let oLi = document.createElement('li');
    oLi.textContent = item;
    fragment.appendChild(oLi);
});
bList.appendChild(fragment);

let attr = document.createAttribute('class');
attr.value = 'democlass';
let h1 = document.getElementsByClassName('title')[0];
h1.setAttributeNode(attr);

let oBox1 = document.querySelector('.box1');
console.log( oBox1.classList );
oBox1.classList.add('box2');
oBox1.classList.remove('box1');
oBox1.classList.replace('box2','item1');
console.log( oBox1.classList.contains('item1') );   // true
console.log( oBox1.classList.contains('box1')); // false

oBox1.classList.toggle('abc');
oBox1.classList.add('item1','item2','item3','item4');
console.log( oBox1.classList.item(0) );

let oChild = document.getElementsByClassName('children')[0];
console.log( oChild.childElementCount );    // 3
console.log( oChild.children);      // 元素节点
console.log( oChild.childNodes);    // 包括文本节点
console.log( oChild.hasChildNodes() );  // true 包括文本节点
console.log( oChild.firstChild );   // 文本节点
console.log( oChild.firstElementChild );    // 返回第一个子元素
console.log( oChild.lastChild );            // 文本节点
console.log( oChild.lastElementChild );  // 返回第三个子元素

let son = document.querySelector('.son');
let parent = document.querySelector('.parent');

console.log(son.getBoundingClientRect() );

console.log(son.offsetLeft);    // 150
console.log(son.offsetTop); // 50

let elem1 = document.forms[0];
let elem2 = document.forms.item(0);
let elem3 = document.forms[1];
console.log(elem3);
console.log(elem1 === elem2);
console.log(elem1);

console.log(elem1.elements[0]);

let oBig = document.getElementsByClassName('big')[0];
let Li = oBig.getElementsByTagName('li');
let qLi = document.querySelectorAll('.big>li');
console.log(oBig);
console.log(Li);

let nLi = document.createElement('li');
oBig.appendChild(nLi);
console.log(Li);
console.log(qLi);

for(let item in qLi){
    console.log(item);
    console.log(qLi[item]);
}
for(let key of qLi){
    console.log(key);
}
console.log(typeof qLi);    // object

let li_array = Array.prototype.slice.call(qLi);
console.log(li_array);

let li_array1 = [...qLi];
console.log(li_array1);

let li_array2 = Array.from(qLi);
console.log(li_array2);

let father = document.getElementById('father');
let child_nodes = father.childNodes;
console.log(child_nodes.length);    // 1
console.log(child_nodes);
father.appendChild( document.createElement('div') );
console.log(child_nodes.length);    // 2
console.log(child_nodes);
let child_ele = father.children;
console.log(child_ele); // HTMLCollection[div]