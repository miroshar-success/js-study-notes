// if语句
if(3 > 2){
    console.log('答案是正确的');
}

// switch语句
var month = prompt('请输入月份');1
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