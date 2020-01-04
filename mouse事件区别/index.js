function getDom(str){
    return document.getElementsByClassName(str)[0];
}
// mouseover mouseout
getDom('box1').addEventListener('mouseover',function(event){
    console.log('进入了box1');
},false);
getDom('box2').addEventListener('mouseover',function(event){
    console.log('进入了box2');
},false);       
getDom('box3').addEventListener('mouseover',function(event){
    console.log('进入了box3');
},false);
getDom('box1').addEventListener('mouseout',function(event){
    console.log('移出了box1');
},false);
getDom('box2').addEventListener('mouseout',function(event){
    console.log('移出了box2');
},false);
getDom('box3').addEventListener('mouseout',function(event){
    console.log('移出了box3');
},false);

// mouseenter mouseleave
getDom('item1').addEventListener('mouseenter',function(event){
    console.log('进入了item1');
},false);
getDom('item2').addEventListener('mouseenter',function(event){
    console.log('进入了item2');
},false);
getDom('item3').addEventListener('mouseenter',function(event){
    console.log('进入了item3');
},false);
getDom('item1').addEventListener('mouseleave',function(event){
    console.log('离开了item1');
},false);
getDom('item2').addEventListener('mouseleave',function(event){
    console.log('离开了item2');
},false);
getDom('item3').addEventListener('mouseleave',function(event){
    console.log('离开了item3');
},false);
/*
mouseover,mouseout 会发生事件冒泡,而mouseenter和mouseleave不会发生事件冒泡
*/

// $('.parent').on('mouseover',function(){
//     console.log('进入了父级DIV');
// });
// $('.parent').on('mouseout',function(){
//     console.log('离开了父级DIV');
// });

// $('.son').on('mouseover',function(){
//     console.log('进入了子级DIV');
// })
// $('.son').on('mouseout',function(){
//     console.log('离开了子级DIV');
// });

// $('.parent').on('mouseenter',function(){
//     console.log('进入了父级DIV');
// });
// $('.parent').on('mouseleave',function(){
//     console.log('离开了父级DIV');
// });

// $('.son').on('mouseenter',function(){
//     console.log('进入了子级DIV');
// })
// $('.son').on('mouseleave',function(){
//     console.log('离开了子级DIV');
// });

$('.parent').hover(function(){
    console.log('进入了父级DIV');
},function(){
    console.log('离开了父级DIV');
});

$('.son').hover(function(){
    console.log('进入了子级DIV');
},function(){
    console.log('离开了子级DIV');
})