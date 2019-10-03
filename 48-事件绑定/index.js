let oBox = document.querySelector('.box');
oBox.onclick = function(){
    oBox.style.backgroundColor = 'skyblue';
}

/*
如果先点击了第一个盒子,再点击第二个盒子时会返回2,先点击第二个盒子时不会返回。
*/ 
let oDiv = document.querySelectorAll('.item');
oDiv[0].onclick = function(){
    console.log(1);
    oDiv[1].onclick = function(){
        console.log(2);
    }
}
window.onload = function(){
    console.log('代码加载完成');
}
console.log('JS代码执行中');

let oPlayer = document.querySelector('.player');
// oPlayer.onmousemove = function(){
//     console.log('鼠标移动中');
// }

// setInterval(function(){
//     oPlayer.onmousemove = function(){
//         console.log('鼠标再次移动');
//     }
// },3000);

// 事件监听,同一元素绑定同一类型的事件,同时触发
oPlayer.addEventListener('click',function(){
    console.log('事件监听');
},false);

oPlayer.addEventListener('click',function(){
    console.log('点击事件');
});

function modifyText(){
    let t2 = document.getElementById('t2');
    if(t2.firstChild.nodeValue == 'three'){
        t2.firstChild.nodeValue = 'two';
    }else{
        t2.firstChild.nodeValue = 'three';
    }
}

let el = document.getElementById('outside');
el.addEventListener('click',modifyText,false);


let table = document.getElementById('inside');

function myFucntion(new_text){
    let two = document.getElementById('two');
    two.firstChild.nodeValue = new_text;
}

// table.addEventListener('click',function(){
//     myFucntion('four');
// },false);

table.addEventListener('click',()=>{myFucntion('five')},false);


let foo = document.querySelector('.foo');

// foo.attachEvent('onclick',function(){
//     console.log('IE下的点击事件');
// });

EventListener = {
    addEvent:function(ele,type,fn){
        if(ele.addEventListener){
            ele.addEventListener(type,fn,false);
        }else if(ele.attachEvent){
            ele.attachEvent('on'+type,fn);
        }else{
            ele['on'+type] = fn;
        }
    },
    removeEvent:function(ele,type,fn){
        if(ele.removeEventListener){
            ele.removeEventListener(type,fn);
        }else if(ele.detachEvent){
            ele.detachEvent(type,fn);
        }else{
            ele['on'+type] = null;
        }
    }
}

function bar(){
    console.log('函数绑定完成');
}

EventListener.addEvent(foo,'click',bar);

setInterval(function(){
    EventListener.removeEvent(foo,'click',bar);
},2000);


let oList = document.querySelector('.list');
console.log(oList);

oList.addEventListener('click',function(event){
    console.log(event.target);
    console.log(event.currentTarget);
},false);