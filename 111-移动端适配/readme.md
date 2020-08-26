
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

const width = window.innerWidth;    // 获取设备宽度
const fixedWidth = 750; // 设计稿宽度
const scale = (width / fixedWidth).toFixed(2);   // 缩放比例
const meta = document.createElement('meta');
meta.setAttribute('name','viewport');
meta.setAttribute('content',`width=${fixedWidth},initial-scale=${scale},maximum-scale=${scale}`);
document.head.appendChild(meta);
```
```js
// rem



```
    
# window.screen 
    
    屏幕的可用宽高,(减去下方状态栏的高度)
    screen.availWidth - 可用的屏幕宽度     
    screen.availHeight - 可用的屏幕高度
    
    screen.width        屏幕的总宽度
    screen.height       屏幕的总高度
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    