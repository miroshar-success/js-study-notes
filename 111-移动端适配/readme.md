
# 移动端事件
    
    在移动端,click事件触发有300ms的延迟
    
    ontouchstart    触碰开始事件
    ontouchmove     在屏幕移动时触发
    ontouchend      手指离开屏幕的时候触发
    
    TouchEvent.targetTouches
        一个只读的TouchList列表,含有当前屏幕的所有触摸点所对应的Touch对象。这些点的目标
        元素和触发touchstart事件的目标元素时同一个。
    
    TouchEvent.touches
        一个 TouchList，其会列出所有当前在与触摸表面接触的  Touch 对象，不管触摸点是否
        已经改变或其目标元素是在处于 touchstart 阶段
  
    
    获取手指的个数: e.changedTouches.length
    
    第三方package: 
        fastclick
    
    mobile browsers will wait approximately 300ms from the time that you tap the button to fire the click event.
    The reason for this is that the browser is waiting to see if you are actually performing a double tap.

# 移动端适配
    
    一般来说,移动设备上的viewport都要大于浏览器可视区域的，这是因为考虑到移动设备的分辨率相对于桌面电脑来说都比较小,为了能在移动设备上
    正常显示那些传统的为桌面浏览器设计的网站,移动设备上的浏览器都会把自己默认的viewport设为980px。
    
    meta:表示那些不能由其他HTML相关元素之一表示的任何元数据信息。
        name: 如果设置了name属性,meta元素提供的是文档级别的元数据,应用于整个页面。
        charset: 字符集声明,告诉文档使用哪种字符编码。
        viewport 它提供有关视口初始大小的提示,仅供移动设备使用。 <meta name='viewport'>   
            content属性:
                width           以pixels为单位,定义viewport的宽度。(device-width)
                height          以pixels为单位,定义viewport的高度
                initial-scale:  定义设备宽度与视口大小之间的缩放比率
                maximum-scale:  定义缩放的最大值
                minimum-scale:  定义缩放的最小值
                user-scalable:  如果设置为no,用户将不能放大或缩小网页。
    
    固定宽度适配
    百分比 vm/vh 
    rem
    flex
    
    
    CSS像素是一个抽象单位,一般情况下,CSS像素称为与设备无关的像素。
        window.devicePixelRatio 返回当前设备的物理像素分辨率与CSS像素分辨率之比。    
        window.navigator.appVersion 可以用正则匹配是Android还是iPhone
        orientationchange 事件在设备的纵横方向改变时触发。
        
```js
// 固定宽度适配方案,将设计稿的进行缩放装载进指定设备中。
(function(window,document) {
    let docEle = window.document.documentElement;
    let dpr = window.devicePixelRatio;
    const fixedWidth = 750; // 设计稿宽度;
    docEle.setAttribute('data-dpr',dpr);
    var resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
    function getScale(){
        const screenWidth = window.screen.width;    // 获取移动设备宽度
        const scale = screenWidth / fixedWidth;
        return scale;
    }
    function refresh() {
        const scale = getScale();
        let metaEle = document.querySelector('meta[name="viewport"]');
        if(metaEle) {
            metaEle.setAttribute(
                'content',
                `width=${fixedWidth},initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale},user-scalable=no`
            )
        }else{
            const meta = document.createElement('meta');
            meta.setAttribute('name','viewport');
            meta.setAttribute(
                'content',
                `width=${fixedWidth},initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale},user-scalable=no`
            )
            document.head.appendChild(meta);
        }
    }
    window.addEventListener(resizeEvent,refresh,false);
    refresh();
})(window,document);
```
```js
// rem
// width/fontSize = baseWidth / baseFontSize;   baseWidth 和 baseFontSize是选为基准的设备宽度及根元素大小。
// 所以根元素的fontSize算法是 width * baseFontSize / baseWidth;

(function(window,document) {
    function refresh() {
        let oHtml = document.querySelector('html');
        const oWidth = oHtml.getBoundingClientRect().width;
        const baseWidth = 750;  // 设计稿的宽度
        const baseFontSize = 100;   // 750设计稿的宽度下，以根元素的字体大小为100px;
        oHtml.style.fontSize = (oWidth * baseFontSize / baseWidth) + 'px';
    }
    const resizeEvent = 'orientationchange' in window ? 'orientation' : 'resize';
    window.addEventListener(resizeEvent,refresh,false);
    // document.addEventListener('DOMContentLoaded',refresh,false);
    document.addEventListener('readystatechange',() => {
        if(document.readyState === "interactive"){
            refresh();
        }
    },false);
})(window,document);
```
    html{font-size:100px!important}
    手动设置rem基准值的方法。字体的大小不推荐使用rem作为单位。所以对于字体的设置,仍旧使用px作为单位。
    
# window.screen 
    
    屏幕的可用宽高,(减去下方状态栏的高度)
    screen.availWidth - 可用的屏幕宽度     
    screen.availHeight - 可用的屏幕高度
    
    screen.width        屏幕的总宽度
    screen.height       屏幕的总高度
    
# orientation

    CSS媒体查询屏幕方向(orientation) 可用于测试视口,viewport。
        portrait: viewport处于纵向,即高度大于等于宽度。
        landscape: viewport处于横向,即宽度大于高度。
```css
@media (orientation:landscape) {
    body {
        flex-direction:row;
    }
}

@media (orientation:portrait) {
    body {
        flex-direction:column;
    }
}
```    

# ppi

    Pixels Per Inch,也叫像素密度,所表示的是每英寸所拥有的像素数量。因此PPI数值越高,即代表显示屏能够以更高的密度
    显示图像。
    
    dppx 表示每个px的点数。
    
    @media.resolution
        媒体功能可基于输出装置的像素密度,来应用样式。
```css
/* Minimum resolution */
@media (min-resolution: 72dpi) {
  p {
    font-size: 1.5em;
  }
}

/* Maximum resolution */
@media (max-resolution: 300dpi) {
  p {
    background: yellow;
  }
}

@media (min-resolution:2dppx) {
    .border-top-1px{
        position:relative;
        &::before{
           width:200%;
           transform:scale(.333) translateZ(0);
        }
    }
}
```   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    