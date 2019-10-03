var aLi = document.querySelectorAll('li');
console.time('start');

for(let i = 0; i < aLi.length; i++){
    console.log(aLi[i]);
}

for(let i = 0, l = aLi.length; i < l; i++){
    console.log(aLi[i]);
}

for(let i in aLi){
    console.log(aLi[i]);
}
for(let item,i = 0; item = aLi[i++];){
    console.log(item);
}
// 遍历:遍历(Traversal)，是指沿着某条搜索路线，依次对树中每个结点均做一次且仅做一次访问
var player = {
    name:'kyrie',
    age:'26',
    position:'guard'
}
for(let i in player){
    console.log(i,player[i]);
}
for(let i of aLi){
    console.log(i);
}
console.timeEnd('start');   

for(let item of aLi){
    item.addEventListener('click',function(){
        console.log(item.innerText);
    },false);
}


function foo(){
    var a = 1;
    console.log(a);
}
foo();  // 1

var c = 1; 
function f2(){
    var c;
    function f1(){
        console.log(c);
    };
    c = 2;
    f1();
}
f2();