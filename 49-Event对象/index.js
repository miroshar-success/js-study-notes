let oBox1 = document.querySelector('.box1');
let oBox2 = document.querySelector('.box2');
let oBox3 = document.querySelector('.box3');

// document.addEventListener('click',function(event){
//     let type = event.target.className;
//     switch(type){
//         case 'box1':
//         console.log('box1');
//         break;
//         case 'box2':
//         console.log('box2');
//         break;
//         case 'box3':
//         console.log('box3');
//         break;
//     }
// },false);

oBox1.addEventListener('click',function(e){
    e.stopPropagation();
    console.log('box1');
});
oBox2.addEventListener('click',function(e){
    e.stopPropagation();
    console.log('box2');
});
oBox3.addEventListener('click',function(e){
    e.stopPropagation();
    console.log('box3');
});

let bai = document.querySelector('.baidu');
console.log(bai);
bai.addEventListener('click',function(event){
    event = event || window.event;
    event.preventDefault();
    console.log(1);
},false);

// document.addEventListener('contextmenu',function(e){
//     e.preventDefault();
//     console.log('就不给你看');
// },false);

// document.addEventListener('contextmenu',function(event){
//     event = event || window.event;
//     event.preventDefault();
//     var menu = document.createElement('div');
//     menu.style.width = 120 + 'px';
//     menu.style.height = 140 + 'px';
//     menu.style.border = '1px solid gray';
//     menu.style.position = 'absolute';
//     var mLeft = event.clientX;
//     var mTop = event.clientY;
//     menu.style.left = mLeft + 'px';
//     menu.style.top = mTop + 'px';
//     document.body.appendChild(menu);            
//     document.addEventListener('contextmenu',function(event){
//         let newLeft = event.clientX;
//         let newTop = event.clientY;
//         menu.style.left = newLeft + 'px';
//         menu.style.left = newTop + 'px';
//     },false);
// },false);

// document.onmousewheel = function(e){
//     console.log(e.deltaX);
//     console.log(e.deltaY);
// }

let oBtn = document.querySelector('.btn');
// oBtn.addEventListener('click',function(e){
//     e = e || window.e;
//     e.preventDefault();
//     console.log(e);
//     console.log(e.defaultPrevented);    // true
//     console.log(e.eventPhase);   // 2
// },false);

oBtn.onclick = function(event){
    console.log(event);
    console.log(event.eventPhase);  // 3
    console.log(this === event.target && this === event.currentTarget && event.target ===
    event.currentTarget );   // true
};

document.body.addEventListener('click',function(){
    console.log(event.eventPhase);  // 1
},true);

document.body.addEventListener('click',function(){
    console.log(event.eventPhase);  // 3
});

let EventUtil = {
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent('on'+type,handler);
        }else{
            element['on'+type] = handler;
        }
    },
    getRelatedTarget:function(event){
        if(event.relatedTarget){
            return event.relatedTarget;
        }else if(event.toElement){
            return event.toElement;
        }else if(event.fromElement){
            return event.fromElement;
        }else {
            return null;
        }
    }
}

let oBox = document.querySelector('.box');
EventUtil.addHandler(oBox,'mouseout',function(event){
    event = event || window.event;
    target = event.target || event.srcElement;
    let relatedTarget = EventUtil.getRelatedTarget(event);
    console.log(target.tagName);    // DIV
    console.log(relatedTarget.tagName); //BODY
},false);

let oItem1 = document.querySelector('.item1');
let oItem2 = document.querySelector('.item2');
console.log(oItem1,oItem2);

oItem1.addEventListener('mouseover',function(e){
    e = e || window.e;
    target = e.target || e.srcElement;
    console.log(target.tagName);
    // console.log(target.fromElement);
    // console.log(target.toElement);
    console.log(e.relatedTarget);   // 
},false);

oItem2.addEventListener('mouseout',function(event){
    event = event || window.event;
    target = event.target || event.srcElement;
    console.log(target.tagName);
    // console.log(target.fromElement);
    // console.log(target.toElement);
    console.log(event.relatedTarget);
},false);