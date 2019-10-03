let oBtn = document.querySelector('.btn');

window.onscroll = function(){
    if(document.documentElement.scrollTop > 200){
        oBtn.style.display = 'block';
    }else{
        oBtn.style.display = 'none';
    }
}

// function scrollTop(){
//     function move(){
//         if(document.documentElement.scrollTop > 0){
//             document.documentElement.scrollTop *= 0.85;
//             window.requestAnimationFrame(move);
//         }
//     }
//     move();
// }

function scrollTop(){
    let Timer = setInterval(function move(){
        if(document.documentElement.scrollTop > 0){
            document.documentElement.scrollTop *= 0.8;
        }
    },1000/60);
    if(document.documentElement.scrollTop == 0){
        clearInterval(Timer);
    }
}

// function scrollTop(){
//     if(document.documentElement.scrollTop > 0){
//         document.documentElement.scrollTop = 0;
//     }
// }

oBtn.addEventListener('click',scrollTop,false);
