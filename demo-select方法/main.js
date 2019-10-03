var oInput = document.querySelector('.psd');
var oBtn = document.querySelector('.btn');

function selectText(field,start,end){
    if(field.createTextRange){
        var selRange = field.createTextRange();
        selRange.moveStart('character',start);
        selRange.moveEnd('character',end);
        selRange.select();
    }else if(field.setSelectionRange){
        field.setSelectionRange(start,end);
    }
}
oBtn.addEventListener('click',function(e){
    e = e || window.e;
    var val = oInput.value,len = val.length;
    selectText(oInput,0,len);
    oInput.focus();
},false);


// (function(){
//     var url = ['baidu.com','google.com','sogou.com'];
//     function getText(field,start,end){
//         if(field.createTextRange){
//             var rng = field.createTextRange();
//             rng.collapse(true);
//             rng.moveStart('character',start);
//             rng.moveEnd('character',end);
//         }else if(field.setSelectionRange){
//             field.setSelectionRange(start,end);
//         }
//         field.focus();
//     }
//     var oInput = document.getElementById('ipt');
//     oInput.addEventListener('keydown',function(e){
//         e = e || window.e;
//         if(e.keyCode !== 8){
//             setTimeout(function(){
//                 var val = oInput.value,len=val.length;
//                 if(val){
//                     for(let i = 0,l = url.length; i < l; i++){
//                         if( url[i].indexOf(val) === 0 ){
//                             oInput.value = url[i];
//                             getText(oInput,len,url[i].length);
//                             break;
//                         }
//                     }
//                 }
//             },0)
//         }
//     },false);
// })();

// 自动补全[baidu.com,google.com,sohou.com],当输入了其中的一个字母时,自动补全剩下的字母并且选中
/*
1. 先封装好选择的函数,兼容IE,需要传入3个参数，目标,开始位置,结束位置.
2. 键盘按下事件,非Backspace键, 
3. 如果输入了字母,则判断输入的第一个字母,是否和数组里的字符串的首字母是否相等
4. 如果相等,则把相等的字符串赋值给文本框的value
5. 调用封装好的函数,分别输入参数,获取的文本框,开始的位置(即输入的文本内容的长度),结束位置(匹配的字符串长度)
*/

(function(){
    var url = ['baidu.com','qq.com','google.com','sina.com','sogou.com'];
    function selectText(field,start,end){
        if(field.createTextRange){
            var selRange = field.createTextRange();
            selRange.collapse();
            selRange.moveStart('character',start);
            selRange.moveEnd('character',end);
        }else if(field.setSelectionRange){
            field.setSelectionRange(start,end);
        }
        field.focus();
    }
    var oInput = document.getElementById('ipt');
    oInput.addEventListener('keydown',function(e){
        e = e || window.e;
        if(e.keyCode !== 8){
            setTimeout(function(){
                var val = oInput.value;
                if(val){
                    for(let i = 0,len = url.length; i < len; i++){
                        if(url[i].indexOf(val) === 0){
                            oInput.value = url[i];
                            selectText(oInput,val.length,url[i].length);
                            break;
                        }
                    }
                }
            },0);
        }
    },false);
})();