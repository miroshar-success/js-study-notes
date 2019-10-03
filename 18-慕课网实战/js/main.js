var searchText = document.querySelector(".search-text");
var oSearchBox = document.querySelector(".search-box");
searchText.addEventListener('focus',function(){
    oSearchBox.style.borderBottomColor = "#f9a1a1";
},false);
searchText.addEventListener('blur',function(){
    oSearchBox.style.borderBottomColor = "#d9dde1";
},false);

// 轮播图
/*
业务逻辑：
1. 图片通过缓慢改变透明度显示图片,先设置所有图片的透明度为0,设置需要显示的图片透明度为1
可通过添加类名实现
2. 点击左右按钮可实现图片的切换
3. 点击下方的小圆点按钮可显示对应的图片
4. 图片在自动轮播的过程中,下方对应的小圆点按钮颜色也要相应改变
*/ 
var oCarousel = document.querySelector(".carousel");
var oBannerImg = document.querySelector(".banner-img");
var aLi = oBannerImg.getElementsByTagName("li");
var oPrev = document.querySelector(".btn-prev");
var oNext = document.querySelector(".btn-next");
var oBtnDot = document.querySelector(".btn-dot");
var aDot = oBtnDot.getElementsByTagName("li");
var Timer = null;
var index = 0;
var len = aLi.length;
console.log(len);

autoPlay();
function autoPlay(){
    clearInterval(Timer);
    Timer = setInterval(changeImg,2500);
}
function changeImg(){
    index++;
    index = index > 5 ? 0 : index;
    for(let i = 0; i < len; i++){
        aLi[i].className = '';
        aLi[i].style.transition = "opacity 1s";
        aLi[i].style.webkitTransition = 'opacity 1s';
    }
    aLi[index].className = 'active';
    colorChange();
}
// 点击右按钮切换图片
oNext.addEventListener('click',function(){
    changeImg();
    colorChange();
},false);
oPrev.addEventListener('click',function(){
    index--;
    index = index < 0 ? 5 : index;
    for(let i = 0; i < len; i++){
        aLi[i].className = '';
        aLi[i].style.transition = "opacity 1s";
        aLi[i].style.webkitTransition = 'opacity 1s';
    }
    aLi[index].className = 'active';
    colorChange();
},false);   

oCarousel.addEventListener('mouseover',function(){
    clearInterval(Timer);
},false);
oCarousel.addEventListener('mouseout',function(){
    Timer = setInterval(changeImg,2000);
},false);

function colorChange(){
    for(let i = 0; i < len; i++){
        aDot[i].className = '';
    }
    aDot[index].className = 'current';
}

for(let i = 0; i < len; i++){
    aDot[i].index = i;
    aDot[i].addEventListener('click',function(event){
        event = event || window.event;
        for(let j = 0; j < len; j++){
            aLi[j].className = '';
        }
        aLi[this.index].className = 'active';
        index = this.index;
        colorChange();
    },false);
}

// 慕课精英名师
/*需要实现的功能:1. 从右向左自动轮播 
2. 点击左右按钮可分别向左 和 向右 切换图片
3. 点击图片下方的小按钮可以切换到对应的图片

主要通过修改.list的left值来切换图片
*/
var oteacherBox = document.querySelector(".teacher-box");
var oTeacherList = oteacherBox.querySelector('.list'); 
var oBtnLeft = oteacherBox.querySelector('.btn-left');
var oBtnRight = oteacherBox.querySelector('.btn-right');
var oDot = oteacherBox.querySelector('.dot');
var aDotBtn = oDot.getElementsByTagName('li'); 
console.log(aDotBtn);
var idx = 1;
var timer = null;
// 鼠标在盒子上清除定时器
oteacherBox.addEventListener('mouseover',function(){
    clearInterval(timer);
},false);
// 鼠标离开恢复定时器
oteacherBox.addEventListener('mouseout',function(){
    timer = setInterval(changeList,8000);
},false);
// 定义一个函数,图片从右向左轮播
function changeList(){
    idx++;
    if(idx == 5){
        oTeacherList.style.left = '-1170px';
        oTeacherList.style.transition = 'left 0s';
        oTeacherList.style.webkitTransition = 'left 0s';
        idx = 2;
    }
    setTimeout(function(){
        oTeacherList.style.left = idx * -1170 + 'px';
        oTeacherList.style.transition = 'left .6s';
        oTeacherList.style.webkitTransition = 'left .6s';
    },0);
    changeDotColor();
}
// 点击右按钮时,图片从右向左轮播
oBtnRight.addEventListener('click',changeList,false);
// 图片自动从右向左轮播
function autoImg(){
    timer = setInterval(changeList,5000);
}
autoImg();
// 定义一个函数,图片下方的小圆点切换颜色
function changeDotColor(){
    for(let i = 0; i < aDotBtn.length; i++){
        aDotBtn[i].className = '';
    }
    if(idx == 4){
        aDotBtn[0].className = 'active';
    }else{
        aDotBtn[idx-1].className = 'active';
    }
}
// 点击左按钮，图片向右轮播
oBtnLeft.addEventListener('click',function(event){
    event = event || window.event;
    idx--;
    if(idx == 0){
        oTeacherList.style.left = '-4680px';
        oTeacherList.style.transition = 'left 0s';
        oTeacherList.style.webkitTransition = 'left 0s';
        idx = 3;
    }
    setTimeout(function(){
        oTeacherList.style.left = idx * -1170 + 'px';
        oTeacherList.style.transition = 'left .6s';
        oTeacherList.style.webkitTransition = 'left .6s';
    },0)
    changeDotColor();
},false);