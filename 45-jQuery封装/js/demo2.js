$('.list').append('<li>item4</li>');
$('.list').append(`<li class='item5'>item5</li>`);

$('.list').prepend('<li>我是第一个元素</li>');
$('<p>秋风词</p>').prependTo('.box');
$('.box').prepend('<p>李白</p>');
$('<p>相思相见知何日此时,此时此夜难为情</p>').appendTo('.box');

$('.box').after(`<div class='after'>我是after</div>`);
$('.box').before(`<div class='before'>我是before</div>`);

// console.log( $('p').insertAfter('#foo') );

// $('button').click(function(){
//     $('<span>在div前面</span>').insertBefore('#foo');
//     $('<span>在div后面</span>').insertAfter('#foo');
// });

// $('.list').empty();
// $('.list').remove();

// $('button').click(function(){
//     $('.list').clone().appendTo('body');
//     $('.box').append(`<span>123</span>`);
//     $('.box').append(345);
// });


$(document).ready(function(){
    $('span').click(function(){
        $(this).css('color','red');
    })
    var x = $('span');
    $('.button1').click(function(){
        $('span').detach();
    });
    $('.button2').click(function(){
        $('body').append(x);
    })
});

$(document).ready(function(){
    $('span').click(function(){
        $(this).css('color','red');
    })
    var x = $('span');
    $('.button1').click(function(){
        $('span').remove();
    });
    $('.button2').click(function(){
        $('body').append(x);
    })
});

console.log( $('.list>li').eq(0) );
console.log( $('.list>li').eq(-1) );
console.log( $('.list>li').first() );
console.log( $('.list>li').last());
console.log( $('.list>li').first().hasClass('item1') ); // false
console.log($('.list>li').eq(1).hasClass('item1')); // true

if( $('.item1').parent().is('.list') ){
    console.log('item1的父级时ul');
}

$('li').has('ul').css('backgroundColor','red');
console.log( $('li').has('ul') );

$('.list>li').not('.item1');
console.log( $('.list>li') );

$('.list>li').remove('.item1');
console.log( $('.list>li') );

$('.box>p').not('.text');
console.log( $('.box>p') );

$('.box>p').remove('.text');
console.log( $('.box>p') );

$('.items>li').not( document.getElementById('notli') ).css('backgroundColor','pink');

// console.log( $('.items>li').not( $('#notli') ) );
$('.items>li').not( $('#notli') );
console.log( $('.items>li') );

$('.items>li:not("#notli")').css('backgroundColor',"skyblue");

// $('.header,.footer').empty();

$('.header,.footer').remove();

console.log( $('.list-item').children() );
console.log( $('.list-item').find('li') );

$('.item1').parent().css('border','2px solid #000');

console.log( $('.item-2-a').parents() );

console.log( $('.item1').siblings() );

$('.item1').siblings().css('font-style','italic');

// bind可以绑定多个事件
$(document).ready(function(){
    // $('em').bind('mouseover mouseout',function(){
    //     $(this).toggleClass('intro');
    // })
    $('em').on('mouseover mouseout',function(){
        $(this).toggleClass('intro');
    });
});

$(document).ready(function(){
    $('.name').on('focus',function(){
        console.log('获取焦点');
    });
    $('.name').on('blur',function(){
        console.log('失去了焦点');
    });

    $('.psd').on('focus blur',function(){
        console.log('获取焦点,失去焦点');
    });

    $('.name').change(function(){
        console.log('我被改变了');
    });
    $('.psd').on('change',function(){
        console.log('我也被改变了');
    });
})


$(document).ready(function(){
    $('.button').click(function(){
        console.log('被点击了');
    });
    $('.button').dblclick(function(){
        console.log('被双击了');
    })
})

$(document).ready(function(){
    // $('.gra').click(function(event){
    //     console.log( event.currentTarget );
    // });
    // $('.parent').click(function(event){
    //     console.log(event.currentTarget);
    // })
    // $('.son').click(function(event){
    //     console.log(event.currentTarget);
    // });

    // $('.items>li').each(function(i){
    //     $(this).on('click',{x:i},function(event){
    //         console.log($(this).index() + ',' + event.data.x);
    //     });
    // })
    $('.gra').click(function(event){
        console.log(event.target);
    });
    $('.parent').click(function(event){
        console.log(event.target);
    });
    $('.son').click(function(event){
        console.log(event.target);
    });
});

$(document).ready(function(){
    $('.btn').click(function(event){
        event.preventDefault();
        event.stopPropagation();
        console.log('是否调用了阻止事件的默认程序:' + event.isDefaultPrevented());
        console.log('是否调用了阻止事件的默认程序:'+ event.isPropagationStopped());
    });
});

$(document).ready(function(){
    $('.btn').click(function(event){
        console.log(event.pageX);
    });
    // $(document).on('mousemove',function(event){
    //     console.log(event.pageX,event.pageY);
    //     console.log(event.clientX,event.clientY);
    // })
});

let ul = document.createElement('ul');
document.body.appendChild(ul);

let li1 = document.createElement('li');
let li2 = document.createElement('li');
li1.innerHTML = 'li1';
li2.innerHTML = 'li2';
ul.appendChild(li1);
ul.appendChild(li2);

function hide(e){
    e = e || window.e;
    e.target.style.visibility = 'hidden';
};
ul.addEventListener('click',hide,false);

let oUl = document.querySelector('.lists');
let aLi = document.querySelectorAll('.lists>li');
oUl.addEventListener('click',function(e){
    let oLi1 = e.target;
    let oLi2 = e.currentTarget;
    console.log(oLi1);  // <li>hello 1</li>
    console.log(oLi2);  // .lists
    console.log(oLi1 === oLi2 );    // false
});

$('.btn').click(function(event){
    console.log(event.timeStamp);
});

// $('.hover').hover(function(){
//     $('.hover').css('backgroundColor','pink');
// },function(){
//     $('.hover').css('backgroundColor','skyblue');
// })

$('.hover').hover(function(){
    $('.hover').css('backgroundColor','pink');
});

$('.hover').on('mouseenter',function(){
    console.log('我进入了');
});
$('.hover').on('mouseleave',function(){
    console.log('我出来了');
});
$('.hover').on('mousedown',function(){
    console.log('我按下了');
});
$('.hover').on('mousemove',function(){
    console.log('我移动了');
});

$('.one').one('click',function(){
    console.log('我只能被触发一次');
});

// $('.hide').hide('slow');
$('.hide').hide('slow').show('fast');

$('.show').click(function(){
    $(this).hide(3000,'linear',function(){
        console.log('方法已完成');
    })
});

$('.tog').click(function(){
    $('.toggle').toggle(2000);
});

$(document).ready(function(){
    $('.fade').click(function(){
        // $('.fadeIn').fadeIn(2000);
        $('.fadeIn').fadeIn();
        $('.fadeIn').fadeIn(fast);
    });
    $('.fadeOut').click(function(){
        $(this).fadeOut();
    });
    // $('#flip').click(function(){
    //     $('#panel').slideDown();
    // });
    $('#flip').click(function(){
        $('#panel').slideUp();
    })
});

$(document).ready(function(){
    // $('.animate').animate({left:'200px'},3000);
    $('.animate').animate({left:'300px',top:'200px'},3000,function(){
        console.log('运动完成');
    });
});