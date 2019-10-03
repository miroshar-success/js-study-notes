function getDom(str,bool){
    if(bool == false){
        return document.querySelector(str);
    }else{
        return document.querySelectorAll(str);
    }
}

function _$(str,bool=false){
    if(bool){
        return document.querySelectorAll(str);
    }else{
        return document.querySelector(str);
    }
}

function _$(str,bool=false){
    // return (bool==false)?document.querySelector(str):document.querySelectorAll(str);
    return document['querySelector' + (bool==false?"":'All')](str);
}
_$('.container .info',false);

var aSpan = _$('.container span',true),
    oInfo = _$('.container .info',false),
    oContent = _$('.content',false),
    len = aSpan.length;
    num = 0;

for(let i = 0;i < len;i++){
    aSpan[i].addEventListener('click',function(event){
        event = event || window.event;
        // for(let i = 0; i < len; i++){
        //     aSpan[i].classList.remove('active');
        // }
        aSpan[num].classList.remove('active');
        aSpan[i].classList.add('active');
        num = i;
        this.classList.add('active');
        oInfo.style.left = i * (-oContent.offsetWidth) + 'px';
    },false);   
}
