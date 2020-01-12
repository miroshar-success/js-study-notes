var oPallet = document.getElementsByClassName('pallet')[0];
for(let r = 0; r < 256; r+=10){
    for(let g = 0; g < 256; g+=10){
        for(let b = 0; b < 256; b+=10){
            var card = document.createElement('div');
            var oColor = 'rgb(' + r + ',' + g + ',' + b +')';
            card.style.cssText = 'width:5px;height:5px;float:left;';
            card.style.backgroundColor = oColor;
            oPallet.appendChild(card);
        }
    }
}

//  求水仙花数 (水仙花数是指一个 3 位数，它的每个位上的数字的 3次幂之和等于它本身)
// a 为百位数 b 为十位数, c为个位数

for(let i = 100; i < 999; i++){
    var a = parseInt(i / 100);
    var c = i % 10;
    var b = ((i - c ) / 10 )%10;
    if(Math.pow(a,3) + Math.pow(b,3) + Math.pow(c,3) == i){
        console.log(i);
    }
}
// 水仙花数为 153 370 371 407