console.log( $('#foo') );   //jQuery.fn.init [vid#foo]
console.log( $('div') ) ;
console.log($('div') instanceof Array );    // false
console.log( typeof $('div') ); // object
console.log( $('div') instanceof Object );  // true
console.log( $('div')[0] ); //

let aDiv = document.getElementsByTagName('div');
console.log(aDiv);
console.log(typeof aDiv);   // object
console.log(aDiv instanceof Object);    // true
console.log(aDiv[0]);   //    

console.log( $('.myClass') );   // 
console.log( $('.list') );      // [ul.list]
console.log( $('.list,div') );

console.log( $('fieldset input'));  // [input,input]
console.log( $('form>fieldset'));   // 
console.log( $('label+input')); // [input#name]

console.log($('.myClass~div') );    // [div.myClass,div#foo]
console.log( $('.list>li:first') );  
console.log( $('.list>li:first').html() );  // item1

console.log($('.list>li:not(:first)')[0] );    // item2
console.log( $('.list>li:not(:first)')[1] );    // item3

console.log( $('ul.player>li:even') );   

for(let item of $('ul.player>li:even')){
    console.log(item);  // kyrie durant curry
}
console.log($('table tr:even'));
for(let item of $('ul.player>li:odd')){
    console.log(item);  //lebron wade kobe
}

console.log($('.player>li').eq(1).html() );    // lebron
console.log($('.player>li:eq(1)').html()); //   lebron
console.log($('.player>li:gt(4)').html());    // kobe
console.log($('.player>li:last').html());   // kobe

console.log( $('.player>li:lt(1)').html()); // kyrie
$(':header').css('color','#f00');

$(document).ready(function(){
    $('ul.box>li:first').css('backgroundColor','pink');
    $('ul.box>li:last').css('backgroundColor','skyblue');

    function run(){
        $('ul.box>li:first').animate({width:'600px'},'slow');
        $('ul.box>li:first').animate({width:'300px'},'slow',run);
    }
    run();
    var flag = true;
    $('button').click(function(){
        if(flag){
            $('.box>li:animated').css('backgroundColor','#f00');
            flag = false;
        }else{
            $('.box>li:animated').css('backgroundColor','pink');
            flag = true;
        }
        
    })
})

console.log( $("div:contains('John')") );
console.log( $('.cars>li:empty') );
$('ul.cars>li:has(.car3)').css('color','red');

$('div:has(p)').css('color','red');
$('ul.cars:has(li)').css('color','red');
$('div:has(p)').css('font-size','20px');

console.log( $('.text:parent') );
$('p.text:parent').css({width:'100px',height:'100px',border:'1px solid #000'});
console.log( $(".text").parent() );
$('p:parent').css({width:'100px',height:'100px',border:'1px solid #000'});

console.log( $('li:hidden') );
console.log( $('input:hidden') );

$(document).ready(function(){
    $('p:hidden').show(3000);
});

console.log( $('input[name="news"]') );
console.log( $('input[name!="news"]') );
console.log( $('input[name$="news"]') );

$('.list1>li:first-child').css('color','red');
$('.list2>li:first-child').css('color','red');
$('.list1>li:last-child').css('font-size','20px');
$('.list2>li:last-child').css('font-size','20px');

console.log( $('.list1>li:nth-child(1)').html() );  // John  
console.log( $('.list2>li:nth-child(1)').html() );  // undefined
console.log( $('.list2>li:nth-child(2)').html() );  // abc
console.log( $('.list1>li:nth-of-type(1)').html() );    // John
console.log( $('.list2>li:nth-of-type(1)').html() );    // abc

console.log( $('img').attr('src') );
$('img').attr('src','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548230649&di=c9686081bc3a4275efa3a2c5ea7305a6&imgtype=jpg&er=1&src=http%3A%2F%2Fp.store.itangyuan.com%2Fp%2Fuser%2Favatar%2Fe_2U4BAuEA%2FEg6Te_btetEWeg2Te_IWEGuFJt5_Jb1r9-.jpg')
$('.list1').removeAttr('class');

$('.list2').addClass('list2');
$('.list2').addClass('big father');
$('.list2>li').addClass(function(){
    return 'item-' + $(this).index();
})
$('.list2').removeClass('big');
console.log( $('.list2').html() );

$('.item1').html('<p>Hello World!</p>');
$('.item2').text('<p>Hello World!</p>');
console.log( $('.item2').text() );
console.log( $('#player').val() );  // kyrie
$('#player').val('Hello World');

console.log( $('dt').css('color') );    // rgb(255,0,0)
console.log( $('dt').css('font-size') );    // 18px;

$('dl>dd').css({'background-color':'skyblue','font-weight':'bold'});

console.log( $('.milk').offset() );

console.log( $('.father>.son').offset().left ); // 40
console.log( $('.father>.son').offset().top );  // 65

$('.father').click(function(){
    $(document).scrollTop(500);
    $(document).scrollLeft(100);
    console.log('点击了');
});

// $('.phone').height(100);
// $('.phone').width(100);
// $('.phone').css('backgroundColor','red');
console.log( $('.phone').height() );    // 100
console.log( $('.phone').width() );     // 100
console.log( $('.phone').innerWidth() );    // 104;
console.log( $('.phone').innerHeight() );   // 102
console.log( $('.phone').outerWidth() );    // 108
console.log( $('.phone').outerHeight() );   // 106
console.log( $('.phone').outerWidth(true)); // 110
console.log( $('.phone').outerHeight(true));    //110