let oContainer = document.querySelector('.container');
/*
整屏滚动:1. 结构:父级包裹子级,让子级的宽高设置为浏览器宽高的百分百.
2. 设置body为相对定位,滚动的元素为绝对定位,初始位置为top:0,给大盒子设置overflow:hidden;
仅显示一个屏幕可见内容.
3. 鼠标滚轮滚动事件,当向下滚动时, 将大盒子的定位向上移动整个屏幕的高度
4. 定义一个全局变量,表示现在显示的是第几张图片.
*/ 
let index = 0;
let flag = true;

document.addEventListener('mousewheel',function(event){
    event = event || window.event;
    target = event.target || event.srcElement;
    console.log(event.deltaY);
    if(!flag) return;
    flag = false;
    if(event.deltaY > 0){
        index++;
    }else{
        index--;
    }
    index = index > 2 ? 2 : index;
    index = index < 0 ? 0 : index;
    oContainer.style.top = -index * 100 + '%';
    flag = true;
},false);