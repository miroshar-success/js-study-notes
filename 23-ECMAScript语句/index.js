// if语句
if(3 > 2){
    console.log('答案是正确的');
}

// switch语句
var month = prompt('请输入月份');
month*=1;
switch(month){
    case 1:
    console.log(month + '月有31天');
    break;
    case 2:
    console.log(month + '月有28天');
    break;
    case 3:
    console.log(month + '月有31天');
    break;
    case 4:
    console.log(month + '月有30天');
    break;
    default:
    console.log('哈哈哈');
}

// 三目运算
var num1 = 10,
    num2 = 5;
var max = (num1 > num2) ? num1 : num2;
console.log(max);

var aLi = document.querySelectorAll('li');
for(var i = 0; i < aLi.length; i++){
    console.log(aLi[i]);
}
console.log(aLi[i]);


function sum(num){
    for(var i = 0; i < 10; i++){
        if(i === num){
            console.log(i);
            return;
        }
        console.log(i);
    }
}
sum(4);

const age = prompt("Please tell me your age");
console.log(age);

var x = 3;
console.log(x++);   // 3
console.log(x);     // 4

var y = 3;
console.log(++y);   // 4
console.log(y);     // 4

console.log('- 操作符', -'3',typeof -'3');
console.log('+操作符', +'3', typeof +'3');

var x = [0,1,2,3,4,5,6,7,8,9];
var a = [                       // i js
    [0,1,2,3,4,5,6,7,8,9],      // 0 9
    [0,1,2,3,4,5,6,7,8,9],      // 1 8
    [0,1,2,3,4,5,6,7,8,9],      // 2 7
    [0,1,2,3,4,5,6,7,8,9],      // 3 6
    [0,1,2,3,4,5,6,7,8,9],      // 4 5
    [0,1,2,3,4,5,6,7,8,9],      // 5 4
]

for(var i = 0, j = 9; i <= j; i++,j--){
    console.log( 'a['+i+']['+j + ']=' ,a[i][j] );
}