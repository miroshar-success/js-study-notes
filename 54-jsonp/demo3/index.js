/* 
1. 先获取页面的元素 input 和 ul
2. 当键盘弹起的时候,并且有内容的时候,获取输入的内容。
3. 将输入的内容拼接到请求的地址上面
4. 通过jsonp callback后面的回调函数,获取到请求的数据
5. 遍历请求的数据,添加到创建的li标签里,再把li标签添加到ul里，使其能够显示在页面上
*/ 

// let oSearch = document.querySelector('.search');
// let oList = document.querySelector('.list');

// oSearch.addEventListener('keyup',function(e){
//     e = e || window.e;
//     let oScript = document.createElement('script');
//     document.body.appendChild(oScript);
//     if(!oSearch.value){
//         oList.style.display = 'none';
//         return;
//     }else{
//         oList.innerHTML = '';
//         oList.style.display = 'block';
//         let val = oSearch.value;
//         oScript.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+val+'&cb=baidu';
//     }
// },false);

// function baidu(data){
//     let message = data.s;
//     let fragment = document.createDocumentFragment();
//     message.forEach(function(item){
//         let oLi = document.createElement('li');
//         oLi.innerHTML = item;
//         fragment.appendChild(oLi);
//     })
//     oList.appendChild(fragment);
// }


let oList = document.querySelector('.list');
let oSearch = document.querySelector('.search');
let keyword = '';
console.log(oList,oSearch);

oSearch.addEventListener('keyup',function(event){
    event = event || window.event;
    let oScript = document.createElement('script');
    setTimeout(function(){
        keyword = oSearch.value;
        oScript.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${keyword}&cb=baidu`;
    },300)
    document.body.appendChild(oScript);
},false);

function baidu(data){
    var data = data.s;
    console.log(data);
    oList.innerHTML = '';
    data.forEach(function(item){
        if(data.length){
            oList.style.display = 'block';
            let oLi = document.createElement('li');
            oLi.innerHTML = item;
            oList.appendChild(oLi);
            oLi.onclick = function(){
                window.location.href = `https://www.baidu.com/s?wd='${item}`;
            }
        }
    });
}