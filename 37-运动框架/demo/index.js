/*
先封装碎片化轮播的运动框架,假定运动为匀速运动
1. 运动函数move()需要传入的参数为 运动的元素,初始状态,结束状态,运动时间,回调函数
2. 初始状态与结束状态都为对象格式,传入的属性值无需加单位,只传入数值就可以了

3. 先封装好两个函数,为方便后面使用,一个是获取元素的计算样式,另一个是传入两个参数的计算函数.
4. 分别遍历初始状态的属性值和结束状态的属性值,将对应的属性值相减再除以运动时间,为每项属性的运动速率.
5. 再将当前运动的时间*运动速率,则为元素此时的运动状态的值,
6. 将运动状态的值赋值给此时元素对应的属性,将元素的运动状态渲染出来.
*/
// 获取元素的计算属性
let colorArr = ['#eec68b','#feaf00','#7d70da','#ad2e28','#1e1e1e','#000000'],
oContainer = document.querySelector('.container'),
oPoint = document.querySelector('.point');
let path = {
    transform:{
        rotateX:'rotateX($deg)',
        rotateY:'rotateY($deg)',
        rotateZ:'rotateZ($deg)',
        scale:'scale($)'
    }
}

function getStyle(el){
    if(window.getComputedStyle){
        return window.getComputedStyle(el);
    }else{
        return el.currentStyle;
    }
}
// 计算函数,回调函数传入两个参数,
function calc(startobj,endobj,cb){
    let obj = {};
    for(let key in startobj){
        if( typeof startobj[key] == 'object' ){
            obj[key] = calc(startobj[key],endobj[key],cb);
        }else{
            obj[key] = cb(startobj[key],endobj[key]);
        }
    }
    return obj;
}
let newObj = calc({left:100,top:100},{left:300,top:300},( (i,j)=>(j-i)));

function move(el,startobj,endobj,time,callback){
    let t1 = new Date();
    function run(){
        let t2 = new Date();
        let speedobj = calc(startobj,endobj,(i,j)=>(j-i)/time);
        let currentobj = calc(startobj,speedobj,(a,b)=>a+b*(t2-t1));
        if(t2-t1>=time){
            cancelAnimationFrame(run);
            currentobj = endobj;
            callback && callback();
        }else{
            window.requestAnimationFrame(run);
        }
        render(el,path,currentobj);
    }
    run();
}
function render(el,unit,json){
    for(let key in json){
        if(typeof json[key] != 'object'){
            el.style[key] = getStyle(el)[key].replace( parseFloat(getStyle(el)[key]),json[key] );
        }else{
            let str = '';
            for(let i in json[key]){
                str += unit[key][i].replace('$',json[key][i]) + ' ';
            }
            el.style[key] = str;
        }
    }
}
let oList = document.querySelector('.list');
// 用es6的数组解构赋值,分别表示x和y轴切割的小方块的个数
let [row,col] = [10,8];
// 获取每个小方块的宽,高.
let oWidth = oList.clientWidth/row,oHeight = oList.clientHeight/col,
temp='',aLi='';
// 图片序号
let count=1;
let flag = true;

function create(){
    for(let i = 0,sum=row*col;i<sum;i++){
        temp += `<li></li>`;
    }
    oList.innerHTML = temp;
    aLi = document.querySelectorAll('.list>li');
    aLi.forEach( function(item,index){
        item.style.width = oWidth + 'px';
        item.style.height = oHeight + 'px';
        item.style.left = (index%row)*oWidth + 'px';
        item.style.top = parseInt(index/row) * oHeight + 'px';
        item.style.backgroundImage = `url('./imgs/${count}.jpg')`;
        item.style.backgroundPosition = `${-(index%row)*oWidth}px ${-parseInt(index/row)*oHeight}px`;
        // 注意此时的背景图片位置为负数
    })
}
create();

function next(){
    oContainer.style.background = colorArr[count-1];
    aLi.forEach(function(item,index){
        item.start = {
            left:(index%row)*oWidth,
            top:parseInt(index/row)*oHeight,
            opacity:1,
            transform:{
                rotateX:0,
                rotateY:0,
                rotateZ:0,
                scale:1
            }
        },
        item.target = {
            left:(Math.random()-.2)*1500,
            top:(Math.random()-.5)*1500,
            opacity:0.1,
            transform:{
                rotateX:(Math.random()-.5)*360,
                rotateY:(Math.random()-.5)*360,
                rotateZ:(Math.random()-.5)*360,
                scale:1.5
            }
        },
        move(item,item.start,item.target,1200,function(){
            item.style.backgroundImage = `url('./imgs/${count}.jpg')`;
            move(item,item.target,item.start,1200,function(){
                flag = true;
            });
        })
    })
};
oPoint.addEventListener('click',function(e){
    e = e || window.e;
    let direction = e.target.className;
    if(!flag) return;
    flag = false;
    switch(direction){
        case 'right':
        count++;
        count = (count>6)?1:count;
        next();
        break;
        case 'left':
        count--;
        count = (count<1)?6:count;
        next();
        break;
    }
},false);