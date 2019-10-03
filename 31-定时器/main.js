// JavaScript是单线程的,先执行同步代码,再执行异步
// setTimeout(function(){
//     console.log('我是异步执行的');
// },0)

// for(let i = 0; i < 900000000; i++){}
// console.log('Hello World');

// setTimeout(function(){
//     console.log('异步操作2');
// },1000);

// setTimeout(function(){
//     console.log('异步操作1');
// },0)

setTimeout(function(){
    console.log('end 2');
},2000);

setTimeout(function(){
    console.log('end 1');
},100);

console.log('end');

var oLi = document.querySelectorAll('li')[1];
var newLi = document.createElement('li');
newLi.innerText = '我是新的li元素';
oLi.parentNode.insertBefore(newLi,oLi);

setTimeout(function(){
    console.log('Hello World');
},1000);


/*JavaScript 是单线程执行的，也就是无法同时执行多段代码，当某一段代码正在执行的时候，所有后续的任务都必须等待，形成一个队列，
一旦当前任务执行完毕，再从队列中取出下一个任务。这也常被称为 “阻塞式执行”。所以一次鼠标点击，或是计时器到达时间点，
或是 Ajax 请求完成触发了回调函数，这些事件处理程序或回调函数都不会立即运行，而是立即排队，一旦线程有空闲就执行。
假如当前 JavaScript 进程正在执行一段很耗时的代码，此时发生了一次鼠标点击，那么事件处理程序就被阻塞，用户也无法立即看到
反馈，事件处理程序会被放入任务队列，直到前面的代码结束以后才会开始执行。如果代码中设定了一个 setTimeout，那么浏览器便会在
合适的时间，将代码插入任务队列，如果这个时间设为 0，就代表立即插入队列，但不是立即执行，仍然要等待前面代码执行完毕。
所以 setTimeout 并不能保证执行的时间，是否及时执行取决于 JavaScript 线程是拥挤还是空闲。*/

function a(){
    setTimeout(function(){
        console.log(1);
    },0);
    console.log(2);
}
a();    // 先输出2,再输出1;


var oInput = document.querySelector('.txt');
var oBox = document.querySelector('.box');
oInput.addEventListener('input',function(e){
    e = e || window.e;
    setTimeout(function(){
        oBox.innerHTML = oInput.value;
    },0);
},false);

var num = 10;
// console.log( 10.toString() );    // 报错
console.log(10..toString());
console.log(10 .toString());
console.log(10.0.toString());
console.log(num.toString());

for(let i = 1; i < 6; i++){
    setTimeout(function(){
        console.log(i);
    },i*1000);
}