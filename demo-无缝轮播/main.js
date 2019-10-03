    /*
        功能: 1. 图片会自动切换
              2. 点击左右按钮的时候能够切换图片,并且自动轮播停止
    */
function getDom(ele,bool){
    if(bool){
        return document.querySelectorAll(ele);
    }else{
        return document.querySelector(ele);
    }
}
getDom('.l-btn',false);
getDom('.carousel .list li',true);

let oList = getDom('.carousel .list',false),
    aLi = getDom('.carousel .list li',true),
    oLbtn = getDom('.carousel .l-btn',false),
    oRbtn = getDom('.carousel .r-btn',false),
    oCarousel = getDom('.carousel'),
    index = 1,
    imgWidth = aLi[0].offsetWidth,
    len = aLi.length,
    Timer = null;

oList.style.width = imgWidth * len + 'px';
oList.style.left = -imgWidth + 'px';

oCarousel.addEventListener('mouseover',change,false);
oCarousel.addEventListener('mouseout',change,false);

function change(event){
    event = event || window.event;
    let type = event.type;
    switch(type){
        case 'mouseover':
        clearInterval(Timer);
        break;
        case 'mouseout':
        autoMove();
        break;
    }
}
function autoMove(){
    Timer = setInterval(changeMove,2500);
}
autoMove();

oRbtn.addEventListener('click',function(e){
    e = e || window.e;
    changeMove();
},false);

oLbtn.addEventListener('click',function(e){
    e = e || window.e;
    index--;
    if(index == -1){
        oList.style.left = -imgWidth * 5 + 'px';
        oList.style.transition = '0s';
        index = 4;
    }
    setTimeout(function(){
        oList.style.left = -imgWidth * index + 'px';
        oList.style.transition = '.5s linear';
    },0)
})
function changeMove(){
    index++;
    if(index == 7){
        oList.style.left = -imgWidth + 'px';
        oList.style.transition = '0s';
        index = 2;
    }
    console.log(index);
    setTimeout(function(){
        oList.style.left = -imgWidth * index + 'px';
        oList.style.transition = '.6s linear';
    },0);
}

