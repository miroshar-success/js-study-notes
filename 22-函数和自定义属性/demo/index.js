// 通过修改三张图片的透明度来控制图片显示
var oNext = document.querySelectorAll('.next');
var aLi = document.getElementsByTagName('li');
var index = 0;

oNext[0].addEventListener('click',function(event){
    event = event || window.event;
    index++;
    index = index > 2 ? 0 : index;
    for(let i = 0; i < aLi.length; i++){
        aLi[i].className = '';
    }
    aLi[index].className = 'current';
},false);

// 通过修改背景图片控制图片
var oPic = document.querySelector('.pic');
var num = 0;
var res;
oNext[1].addEventListener('click',function(event){
    event = event || window.event;
    num++;
    res = num%3;
    console.log(res);
    switch(res){
        case 1:
        oPic.style.backgroundImage = "url('./images/building-2.png')"
        break;
        case 2:
        oPic.style.backgroundImage = "url('./images/building-3.png')"
        break;
        case 0:
        oPic.style.backgroundImage = "url('./images/building-1.png')"
        break;
    }
},false);