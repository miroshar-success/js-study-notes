/*
封装1个运动框架,参数有 运动的元素,初始值,结束值,时间,回调函数
1. 初始值与结束值均为obj对象,有不同的属性值,有些属性带单位,有些属性不带单位,保证所有属性都能够正常显示
2. 获取运动开始时的时间 t1,
3. 在运动时通过requestAnimation 函数获取每时每刻的时间 t2， t2-t1即为运动的时间差值.
4. 遍历结束的运动状态和开始时的运动状态,将每个属性的差值相减并除以时间即为每个属性的运动速度.
5. 先封装一个函数,参数三个参数,初始状态,结束状态,和一个回调函数,并声明一个空对象作为返回值
6. 遍历初始对象,并把初始对象的值和结束对象的值作为参数传入回调函数,把回调函数赋值给声明的空对象
*/ 
let oBox = document.querySelector('.box');
let path = {
    transform:{
        rotateX:"rotateX($deg)",
        rotateY:"rotateY($deg)",
        rotateZ:"rotateZ($deg)",
        scale:"scale($)",
    }
};
function getStyle(el){
    if(window.getComputedStyle){
        return window.getComputedStyle(el);
    }else{
        return el.currentStyle;
    }
}
function calc(startobj,endobj,cb){
    let obj = {};
    for(let key in startobj){
        if(typeof startobj[key] === 'object'){
            obj[key] = calc(startobj[key],endobj[key],cb);            
        }else{
            obj[key] = cb(startobj[key],endobj[key]);
        }
    }
    return obj;
};
function move(el,startobj,endobj,time,callback){
    var t1 = new Date();
    function run(){
        var t2 = new Date();
        var speedobj = calc(startobj,endobj,(i,j)=>(j-i)/time);
        // 渲染dom,当前元素的位置 等于 初始值+运动速度*时间
        let currentobj = calc(startobj,speedobj,(a,b)=>a+b*(t2-t1));
        if(t2-t1>=time){
            cancelAnimationFrame(run);
            currentobj = endobj;
            callback && callback();
        }else{
            window.requestAnimationFrame(run);
        }
        // 渲染el
        render(el,path,currentobj);
    }
    run();
};

function render(el,unit,json){
    for(let i in json){
        // 如果键值不是对象是数值的话,直接赋值给元素的样式
        if(typeof json[i] != 'object'){
            el.style[i] = getStyle(el)[i].replace(parseFloat(getStyle(el)[i]),json[i] );
        }else{
            let str = '';
            for(let j in json[i]){
                str += unit[i][j].replace('$',json[i][j]) + ' ';
            }
            el.style[i] = str;
        }
    }
} 
/*
1. 假定每行20个方块,每列20个方块, 一共生成600个div,设置为绝对定位,并在container范围内排列好
2. row = 20,col = 20,分别表示每行每列各20个div,
3. 可以计算出每个方块的宽高分别为 oContainer.clientWidth/row, oContainer.clientHeight/col
4. 设置每个li为绝对定位,并按顺序排列满父级
5. 每个方块li的left值为 序号 i%每行li的个数 * 图片的宽度
6. 每个方块li的top值为 序号i/每列li的个数 取整 再 * 图片的高度
*/
let oContainer = document.querySelector('.container');
let [row,col] = [15,10],
oWidth = oContainer.clientWidth/row,oHeight = oContainer.clientHeight/col,
temp = '',aLi = '';
let count = 1;
function init(){
    for(let i = 0,sum = row*col;i < sum; i++){
        temp += `<li></li>`;
    };
    oContainer.innerHTML = temp;    // 先生成所有的li再一起添加进oContainer可提升性能,比生成一个Li添加一次oContainer要好
    aLi = [...document.querySelectorAll('li')]; // 扩展运算符使NodeList类数组变成一个真正的数组
    aLi.forEach(function(item,index){
        item.style.width = oWidth + 'px';
        item.style.height = oHeight + 'px';
        item.style.left = (index%row) * (oWidth) + 'px';
        item.style.top = parseInt(index/row) * oHeight + 'px';
        item.style.background = `url(./imgs/${count}.jpg) no-repeat ${-(index%row)*oWidth}px ${-parseInt(index/row)*oHeight}px`;
        item.start = {
            width:oWidth,
            height:oHeight,
            left:(index%row)*oWidth,
            top:parseInt(index/row)*oHeight,
            opacity:1,
            transform:{
                rotateX:0,
                rotateY:0,
                rotateZ:0,
                scale:1
            }
        }
    })
}
init();

function next(){
    count++;
    count = count > 5 ? 1:count;
    aLi.forEach(item=>{
        item.target = {
            left:(Math.random()-.35)*2500,
            top:(Math.random()-.5)*1500,
            opacity:0.2,
            transform:{
                rotateX:Math.random()*300,
                rotateY:Math.random()*300,
                rotateZ:Math.random()*300,
                scale:(1.5)
            }
        };
        move(
            item,
            item.start,
            item.target,
            1000,
            function(){
                item.style.backgroundImage = `url(./imgs/${count}.jpg)`;
                move(item,item.target,item.start,1000);
            }
        )
    });
};
var Timer = setInterval(next,5000);