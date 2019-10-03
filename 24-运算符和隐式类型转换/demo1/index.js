// 分别获取页面所有的元素
let aMode = document.querySelectorAll('.mode')
    aLi = document.querySelectorAll('.list li'),
    oNext = document.querySelector('.next'),
    oPrev = document.querySelector('.prev'),
    aSpan = document.querySelectorAll('.dots span');
    index = 0;

for(let i = 0,l = aMode.length; i < l; i++){
    aMode[i].addEventListener('click',function(event){
        event = event || window.event;
        for(let j = 0,l = aMode.length; j < l; j++){
            aMode[j].classList.remove('active');
        }
        this.classList.add('active');
    },false);
}

oNext.addEventListener('click',function(event){
    event = event || window.event;
    index++;
    var flag = aMode[0].classList.contains('active');
    switch(flag){
        case true:
        index = index > 4 ? 4 : index;
        imgChange(index);
        break;
        case false:
        index = index > 4 ? 0 : index;
        imgChange(index);
        break;
    }
},false);
oPrev.addEventListener('click',function(event){
    event = event || window.event;
    index--;
    var flag = aMode[0].classList.contains('active');
    switch(flag){
        case true:
        index = index < 0 ? 0 : index;
        imgChange(index);
        break;
        case false:
        index = index < 0 ? 4 : index;
        imgChange(index);
        break;
    }
})
function imgChange(index){
    for(let i = 0,l = aLi.length; i < l; i++){
        aLi[i].className = '';
        aSpan[i].className = '';
    }
    aSpan[index].className = 'check';
    aLi[index].className = 'current';
}
