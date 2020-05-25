// 获取页面两个元素
var oBox1 = document.getElementsByClassName('box')[0];
var oBox2 = document.getElementsByClassName('box')[1];

oBox1.addEventListener('click',function(){
    oBox1.style.backgroundColor = 'skyblue';
    oBox2.style.backgroundColor = 'pink';
},false);

oBox2.addEventListener('click',function(){
    oBox1.style.backgroundColor = 'pink';
    oBox2.style.backgroundColor = 'skyblue';
},false);

/*
先获取两个元素,然后对要修改的样式进行初始化
*/
var aItem = document.querySelectorAll('.item');
window.onload = function(){
    aItem[0].style.backgroundColor = 'pink';
    aItem[1].style.backgroundColor = 'skyblue';

    aItem[0].onclick = function(){
        this.style.backgroundColor = 'skyblue';
        aItem[1].style.backgroundColor = 'pink';
    }
    aItem[1].onclick = function(){
        this.style.backgroundColor = 'skyblue';
        aItem[0].style.backgroundColor = 'pink';
    }
}

/*
 通过修改类名来控制盒子的样式
 不要用JS样式直接修改CSS样式,推荐第三种用法
*/
var aCard = document.querySelectorAll('.card');
window.onload = function(){
    aCard[0].onclick = function(){
        this.className = 'card blue';
        aCard[1].className = 'card pink';
    }
    aCard[1].onclick = function(){
        this.className = 'card blue';
        aCard[0].className = 'card pink';
    }
}

var oBox = document.getElementById('box');
oBox.onclick = function(){
    oBox.innerHTML = '<span>Hello World!</span>';
    oBox.style.cssText = 'line-height:150px;text-align:center;color:#fff;';
}

