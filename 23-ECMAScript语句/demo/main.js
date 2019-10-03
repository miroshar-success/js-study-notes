// 99乘法表
for(row = 1; row < 10; row++){
    for(col = 1; col <= row; col++){
        var oSpan = document.createElement('span');
        oSpan.innerHTML = col + 'x' + row + '=' + row*col + '&nbsp;';
        document.body.appendChild(oSpan);
        if(row == col){
            document.write('<br>');
        }
    }
}

// n的阶乘
function cal(n){
    var sum = 1;
    for(let i = 1; i <= n; i++){
        sum*=i;
    }
    return sum;
}


// 水仙花数
// a,b,c分别表示水仙花数的百位,十位和个位
var a,b,c;

for(let i = 100; i < 999; i++){
    a = parseInt(i / 100);
    c = i % 10;
    b = ( (i - c) / 10 )% 10;
    if(i == Math.pow(a,3) + Math.pow(b,3) + Math.pow(c,3)){
        console.log(i);
    }
}

/*
5文钱买一只公鸡,3文钱买一只母鸡,1文钱买3只雏鸡,100文钱买100只鸡

公鸡: m  母鸡: n 雏鸡: l
*/ 
for(let m = 0; m < 20; m++){
    for(let n = 0; n < 33; n++){
        for(let l = 0; l < 100; l++){
            if ( (m + n + l == 100) && (5*m + 3*n + l/3 == 100) ){
                console.log(m,n,l);
            }
        }
    }
}
// 公鸡  母鸡  雏鸡
/*  0    25   75
    4    18   78
    8    11   81
    12   4   84
*/ 

function m1(x,y){
    for(let i = 0; i < y; i++){
        if( (i % x == 0) || (i % 10 == x)){
            continue;
        }
        console.log(i);
    }
}
m1(3,40)