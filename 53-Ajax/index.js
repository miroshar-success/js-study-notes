let xhr = new XMLHttpRequest();
console.log(xhr.readyState);    // 1 请求未初始化

xhr.open('GET','http://h6.duchengjiu.top/shop/api_cat.php',true);
console.log(xhr.readyState);    // 1 服务器已建立连接
xhr.send();
console.log(xhr.readyState);    // 1

let oList = document.querySelector('.list');

xhr.onreadystatechange = function(){
    console.log(xhr.readyState);    // 2  3  4
    console.log(xhr.status);
    if(xhr.readyState == 4 && xhr.status == 200){
        var obj = xhr.responseText;
        var message = JSON.parse(obj);
        var data = message.data;
        console.log(data);
        let fragment = document.createDocumentFragment();
        data.forEach(function(item){
            let oLi = document.createElement('li');
            oLi.innerHTML = `<li class='item'>${item.cat_name}</li>`;
            fragment.appendChild(oLi);
        });
        oList.appendChild(fragment);
    }
}


let oImgList = document.querySelector('.imgList');
let xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET','http://h6.duchengjiu.top/shop/api_goods.php?cat_id=125&page=1&pagesize=102');
xmlhttp.send();

xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        var obj = JSON.parse(xmlhttp.responseText);
        let data = obj.data;
        let fragment = document.createDocumentFragment();
        data.forEach(function(item){
            let oLi = document.createElement('li');
            oLi.innerHTML = `<a href='' target='_blank'>
                <img src='${item.goods_thumb}' class='img'>
            </a>`
            fragment.appendChild(oLi);
        });
        oImgList.appendChild(fragment);
    }
}

// let oBox = document.querySelector('.box');
// let oStyle = oBox.style.cssText;
// console.log(oStyle);
// oBox.style.cssText = 'left:100px;height:150px;';


// jQuery的ajax

$.ajax({
    url:'http://h6.duchengjiu.top/shop/api_goods.php',
    type:'GET',
    data:{
        page:3,
        pagesize:50
    },
    dataType:'json',
    success:function(obj){
        var data = obj.data
        console.log(data);
        let fragment = document.createDocumentFragment();
        data.forEach(function(item){
            let oImg = document.createElement('img');
            oImg.src = `${item.goods_thumb}`;
            fragment.appendChild(oImg);
        })
        document.body.appendChild(fragment);
    }
})