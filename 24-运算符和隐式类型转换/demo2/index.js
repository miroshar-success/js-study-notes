/*
需求分析: 1.每个城市景点鼠标经过时修改颜色 
        2. 点击每个城市景点，下拉列表显示出来,并且自身颜色修改
        3. 鼠标经过每个城市下的具体景点时修改背景颜色,点击时也会修改颜色,且点击后,该景点颜色修改，上次点击修改的颜色还原为默认颜色.
        4. 重复点击城市景点时,可实现展开/折叠操作
        5. 如果某一城市景点是展开状态,点击另一城市景点时,该景点下拉列表展开,而之前展开的下拉列表收起.
*/ 
var data = [
    {
        city:'北京',
        spot:['故宫','十三陵','圆明园','长城','雍和宫','天坛公园']
    },
    {
        city:'南京',
        spot:['栖霞市','夫子庙','海底世界','中山陵','乌衣巷','雨花台']
    },
    {
        city:'上海',
        spot:['东方明珠','外滩','豫园','文庙','世博园']
    },
    {
        city:'深圳',
        spot:['华侨城','观澜湖','世界之窗','东门老街','光明农场']
    },
    {
        city:'广州',
        spot:['白云山','长隆','黄花岗公园','中山纪念堂','华南植物园']
    },
]

var oList = document.querySelector('.container .list'),
    index = 0;

function render(data){
    for(let i = 0,len = data.length; i < len; i++){
        var temp = '';
        for(let j = 0, l = data[i].spot.length; j < l; j++){
            temp += `<li>${data[i].spot[j]}</li>`;
        }
        oList.innerHTML += `
            <li>
                <p class='title'>${data[i].city}</p>
                <ul class='hide'>${temp}</ul>
            </li>
        `
    }
}
render(data);
var aLi = document.querySelectorAll('.container .hide>li');
var aUl = document.querySelectorAll('.container .hide');
var oTitle = document.querySelectorAll('.container .title');

// 定义一个函数,设置第几个盒子展开.
/*
num表示第几个盒子展开, 设置一个默认值为-1
*/
function setOpen(num = -1 ){
    // for(let i = 0, len = aUl.length;i < len; i++){
    //     aUl[i].style.height = '0px';
    // }
    // 代码优化,所有的下拉列表都关闭,此时可能很多下拉列表是关闭状态,只需要将打开过的关闭就可以了
    index > -1 && (aUl[index].style.height = '0px');
    if(num > -1){
        aUl[num].style.height = data[num].spot.length * 40 + 'px';
    }
    index = num;
}
setOpen();

for(let i = 0, len = oTitle.length; i < len; i++){
    oTitle[i].addEventListener('click',function(event){
        event = event || window.event;
        if(index == i){
            setOpen();
        }else{
            setOpen(i);
        }
    },false);
}

for(let i = 0, l = aLi.length; i < l; i++){
    aLi[i].addEventListener('click',function(event){
        event = event || window.event;
        for(let j = 0, l = aLi.length; j < l ; j++){
            aLi[j].className = '';
        }
        this.className = 'active';
    })
}