// 计算圆的面积
function calcCircle(r){
    console.log(Math.pow(r,2)*Math.PI);
}
calcCircle(10);

console.log(Math.abs(-3));

function abs(a){
    if (a < 0){
        return -a;
    }else{
        return a;
    }
}

console.log( Math.sqrt(2) );

console.log( Math.pow(2,5) );
console.log(Math.pow(2,-1));

// function pow(x,y){
//     var sum = 1;    // 返回值
//     var a = 1;  // 中间值
//     if(y > 0){
//         for(var i = 0; i < y; i++){
//             sum *= x;
//         }
//     }else if(y = 0){
//         sum = 1;
//     }else{
//         for(var i = 0;i > y; i--){
//             a *= x;
//             sum = 1/a;
//         }
//     }
//     return sum;
// }

console.log( Math.ceil(-3.0001) );
console.log( Math.floor(-3.001) );
console.log(Math.ceil(-3.9999999));
console.log(Math.floor(-3.9999999));
console.log(Math.round(-3.9999));
console.log(Math.round(-3.0001));
console.log(Math.E);
console.log(Math.trunc(3.221));
console.log(Math.trunc(-3.221));
console.log(Math.trunc(3.999));
console.log(Math.trunc(-3.999));
console.log(Math.sin(Math.PI/6));

// 求一个大于min,小于max之间的随机数
function getNumber(min,max){
    return Math.random()*(max-min) + min;
}

// 大于min,小于max之间的随机整数
function getNum(min,max){
    return Math.ceil( Math.random()*(max-min)+min );
}

// 求最大值
function max(a,b){
    return a>b?a:b;
}

function min(a,b){
    return a>b?b:a;
}

var arr = [2,5,7,1,22,13,8,4,31,19];
console.log( Math.max.apply(null,arr));
console.log( Math.min.apply(null,arr));
console.log( Math.max.call(null,...arr));
console.log( Math.min.call(null,...arr));

// parseInt() parseFloat()
console.log( Number(false) );   // 0
console.log( Number(true) );    // 1
console.log( Number('') );  // 0
console.log( Number('1') ); // 1
console.log( Number('1a') );    // NaN
console.log( Number(undefined) );   // NaN
console.log( Number(null) ); // 0
console.log( Number('1.11') );  // 1.11
console.log( Number(NaN) ); // NaN
console.log( Number('Hello World') ); // NaN

console.log(parseInt(false));   // NaN
console.log(parseInt(true));    // NaN
console.log(parseInt(''));      // NaN
console.log(parseInt('1'));     // 1
console.log(parseInt('1a'));    // a
console.log(parseInt(undefined));// NaN
console.log(parseInt(null));    // NaN
console.log(parseInt('1.11'));  // 1
console.log(parseInt(NaN)); // NaN
console.log(parseInt('Hello World')); // NaN
console.log(parseInt('1234blue'));  // 1234
console.log(parseInt('0xA'));   // 10
console.log(parseInt(22.5));    // 22
console.log(parseInt(70));//    70
console.log(parseInt('10%'));   //10
console.log(parseInt('0xf'));   //15
console.log(parseInt('AF'));    // NaN
console.log(parseInt('AF',16)); // 175;


// 得到一个两个数之间的随机数
function getRandomArbitrary(min,max){
    return Math.random()* (max-min) + min;
}

// 得到一个两个数之间的随机整数
function getRandomInt(min,max){     
    min = Math.ceil(min);           
    max = Math.floor(max);          
    return Math.floor( Math.random()*(max-min) ) + min; 
}

// 得到一个数个书之间的随机整数,包括两个数在内
function getRandomIntInclusive(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor( Math.random( max-min+1 ) ) + min;
}

var oBox = document.querySelector('.box');
// setTimeout(function(){
//     oBox.style.left = '200px';
// },3000);

function move(x,y){
    oBox.style.left = x + y + 'px';
}
// setTimeout(move,3000,200);
setTimeout(move.bind(null,200,200),3000);