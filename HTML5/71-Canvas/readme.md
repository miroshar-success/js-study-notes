# Canvas
	
	<canvas>是HTML5新增的元素,可用于通过使用JavaScript中的脚本来绘制图形。
	
	tips:
	1. <canvas>标签只有两个属性——width和height,如果没有设置宽高，会初始化为宽度为300px,高度为150px。
	2. <canvas>元素有一个getContext()的方法 用来获得渲染上下文和它的绘画功能。
	3. canvas是一个二维网络,左上角的坐标为(0,0)
	
## CanvasRenderingContext2D

	CanvasRenderingContext2D 接口提供的2D渲染背景用来绘制<canvas>元素，为了获得这个接口的对象，需要在<canvas>
	上调用getContext()，并其他一个'2d'的参数。
```js
const canvas = document.getElementById('2d');
const ctx = canvas.getContext('2d');
```

### beginPath()

	Canvas 2D API通过清空子路径列表开始一个新路径的方法。
	
### closePath()
	
	Canvas 2D API将笔点返回到当前子路径起始点的方法。它尝试从当前点到起始点绘制一条直线。如果图形已经是封闭的或者只有一个点，
	那么此方法不会做任何操作。

## 矩形
	
	rect() fillRect() 和 strokeRect() clearRect() 都有4个参数,分别位x,y,width,height, 分别表示 坐标 和 宽高！
	
	rect()			创建无填充的矩形
```js
ctx.rect(0,0,100,100);
ctx.fill()	/ ctx.stroke()
```
	fillRect()		绘制被填充的矩形
	tips:
	1. 需要先设置填充的颜色后，再绘制矩形
	2. stroke()和fill()都是作用在当前路径上的子路径。
	strokeRect()	绘制描边的矩形
	描边的宽度由 lineWidth 控制。
	
	clearRect()
	设置指定矩形区域内（以x,y为起点），范围是(width,height)所有像素变成透明,并擦除之前绘制的所有内容的方法。
	
## 圆

	ctx.arc(x,y,r,start,stop,direc);
	上门的参数分别表示 圆心的位置，半径，起始弧度，结束弧度，方向(顺时针还是逆时针);
	false是顺时针,true是逆时针
	
```js
在半径位 50,50 的地方，画一个半径为50的圆,起点为0，终点为180度，顺时针放向

ctx.beginPath();
ctx.arc(50,50,50,0,Math.PI,false);
```
	弧度:
		弧长等于半径的弧,其所对对圆心角为1弧度。一周对弧度数为2πR/R, 360度角度 = 2π弧度。
	
## 直线

	确定起点和终点 
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
	
	lineCap	线末端的类型。允许的值:butt(默认),round,square
	
	tips:
		1. 如果线段比较宽的话，使用lineTo方法绘制到moveTo()设置的起点,绘制的图像可能会有缺口，可以使用closePath()方法
	
### setLineDash()
 
	setLineDash(segments)方法在填充线时使用虚线模式，它使用一组值来指定描述模式的线和间隙的交替长度。
	
	segments:一个Array数组。一组描述交替绘制线段和间距长度的数字。
```js
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function drawDashLine(pattern){
	ctx.beginPath();
	ctx.setLineDash(pattern);
	ctx.moveTo(0,y);
	ctx.lineTo(300,y);
	y += 15;
}

let y = 15;
drawDashLine([]);
drawDashLine([1,1]);
```

### lineDashOffset
	
	该属性是设置虚线偏移量的属性。 ctx.lineDashOffset = value; 
	当value为正数时,整条虚线向左偏移，当value为负数时,向右偏移。
	
	
## lineJoin
	
	用来设置2个长度不为0的相连部分(线段，圆弧，曲线)如何连接在一起的属性。
	1. round
	通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。
	2. bevel
	在相连部分的末端填充一个额外的以三角形为底的区域，每个部分都有各自独立的矩形拐角
	3. miter(默认值)
	4. 通过延伸相连部分的外边缘，使其相交于一点形成一个额外的菱形区域。
	
## lineCap

	指定绘制每一条线段末端的属性，有3个可能的值，分别是 butt,round和square,默认值是butt
	
	square:长度会增加线宽的一半
	
## translate
	
	通过在网格中移动canvas和canvas原点x水平方向,原点y垂直方向,添加平移变换的方法。
	
	x : 水平方向移动的距离
	y : 垂直方向移动的距离
	
## rotate

	在变换矩阵中增加旋转的方法。角度变量表示一个顺时针旋转角度并且用弧度表示。
	
	angle : 顺时针旋转的弧度。degree * Math.PI / 180. 
	tips: 1. 旋转中心点一直是canvas的起始点。
		  2. 旋转图形的时候要先设置旋转的弧度，再绘制图形。

## save()

	通过将当前状态放入栈中，保存canvas全部状态的方法。
	1. 当前的变换矩阵
	2. 当前的剪切区域
	3. 当前的虚线列表

## restore()
	
	通过在绘图状态中弹出顶端的状态,将canvas恢复到最近的保存状态的方法，如果没有保存状态，此方法不做任何改变。
	
	先保存的后恢复，后保存的先恢复,绘制线条时，需要先使用beginPath()
	
	
## drawImage()

	CanvasRenderingContext2D.drawImage()方法提供了多种方式在canvas上绘制图像。
	
	ctx.drawImage(image,dx,dy);
	ctx.drawImage(image,dx,dy,dWidth,dHeight);
	ctx.drawImage(image,sx,sy,sWidth,sHeight,dx,dy,dWidth,dHeight);
	
		image: 绘制到上下文的元素。允许任何的canvas图像源
		dx: image的左上角在目标canvas上X轴坐标
		dy:	image的左上角在目标canvas上Y轴坐标
		dWidth: image在目标canvas上绘制的高度。允许对绘制的image进行缩放。
		dHeight: image在目标canvas上绘制的高度。允许对绘制的image进行缩放。
	
	
## createPattern()
	
	使用指定的图像创建模式的方法。它通过repetition参数在指定的方向上重复元图像。
	ctx.createPattern(image,repetition);
	
	image: 作为重复图像源的CanvasImageSource对象，可以是下列之一:
		HTMLImageElement			<img>
		HTMLVideoElement			<video>
		HTMLCanvasElement			<canvas>
		CanvasRenderingContext2D	
		ImageBitmap
		ImageData
		Blob
		
	tips: 1. 图片可以通过获取页面中的img标签，或者通过js的createElement创建，或者通过new Image()方式生成
	
	repetition: 指定如何重复图像,允许的值有:
	'repeat'
	'repeat-x'
	'repeat-y'
	'no-repeat'
	
	createPattern canvas怎么设置图片的大小? 
	离屏canvas,先把图片绘制到canvas上，然后再把canvas作为createPattern的渲染对象。
```js
const canvas = document.getElementById('canvas3');
const ctx = canvas.getContext('2d');

const info = document.createElement('canvas');
const ctx = info.getContext('2d');
info.width = 300;
info.height = 150;

let image = new Image();
image.src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553707821012&di=84f4638f522ba5e7467cf44a23db7dc3&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201607%2F19%2F20160719064142_NLihM.jpeg';
image.onload = function(){
	ctx.drawImage(image,0,0,300,150);
	const pattern = ctx3.createPattern(info,'no-repeat');
	ctx.fillStyle = pattern;
	ctx.fillRect(0,0,300,150);
}
```
	
## createLinearGradient

	该方法创建一个沿参数坐标指定的直线渐变，返回一个线性CanvasGradient对象。
	ctx.createLinearGradient(x0,y0,x1,y1);
		x0: 起点的x轴坐标
		y0:	起点的y轴坐标
		x1:	终点的x轴坐标
		y1:	终点的y轴坐标
		
	创建成功后，就可以使用CanvasGradient.addColorStop()方法，根据指定的偏移和颜色定义一个新的终止。
	
## createRadialGradient

	确定两个圆的坐标，绘制放射性渐变的方法，该方法返回CanvasGradient.
	
	ctx.createRadialGradient(x0,y0,r0,x1,y1,r1);
		x0: 开始圆形的x轴坐标。
		y0:	开始圆形的y轴坐标。
		r0:	开始圆形的半径。
		x1: 结束圆形的x轴坐标。
		y1:	结束圆形的y轴坐标。
		r1:	结束圆形的半径
		
	创建了指定开始和结束圆的CanvasGradient对象后，可以使用addColorStop()方法根据指定的偏移和颜色定义一个新的终止。
	
## arcTo()

	根据控制点和半径绘制圆弧路径，使用当前的描点。根据当前描点与给定的控制点1连接的直线，和控制点1与控制点2连接的直线
	作为使用指定半径的圆的切线，画出两条切线之间的弧线路径。
	
	ctx.arcTo(x1,y1,x2,y2,radius)
		x1: 第一个控制点的x坐标
		y1: 第一个控制点的y坐标
		x2: 第二个控制点的x坐标
		y2: 第二个控制点的y坐标
		radius: 圆弧的半径
		
## bezierCurveTo()
	
	绘制三次贝塞尔曲线路径的方法。该方法需要三个点。第一，第二个点是控制点，第三个点是结束点。起始点是当前路径的最后一个点。
	绘制贝塞尔曲线前，可以通过调用moveTo()进行修改。
	
	bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
		cp1x: 第一个控制点的x轴坐标
		cp1y: 第一个控制点的y轴坐标
		cp2x: 第二个控制点的x轴坐标
		cp2y: 第二个控制点的y轴坐标
		x:	  结束的的x轴坐标
		y:	  结束点的y轴坐标
		
## quadraticCurveTo()

	quadraticCurveTo() 是Canvas新增二次贝塞尔曲线路径的方法。它需要2个点，第一个点是控制点，第二个点是终点。
	起始点是当前路径最新的点，当创建二次贝塞尔曲线之前，可以使用moveTo()方法进行改变。
	
	ctx.quadraticCurveTo(cpx,cpy,x,y)
		cpx: 控制点的x轴坐标
		cpy: 控制点的y轴坐标
		x:	 终点的x轴坐标
		y:   终点的y轴坐标
		
## font()
	
	当前字体样式的属性，使用和CSS font规范相同的字符串值。默认是 10px sans-serif 
	tips: 两个值必须同时设置
	
### textAlign()
	
	绘制文本时，文本的对齐方式的属性。该对齐是基于fillText方法的x的值。所有如果想要文字在canvas左右居中时，
	必须设置x值为canvas宽的一半。
	ctx.textAlign = 'left | right | center | start | end';
	
### textBaseline

	当前文本基线的属性。 决定文字垂直方向的对齐方式
	ctx.textBaseline = 'top | hanging | middle | alhabetic | ideographic | bottom';
	
## shadowBlur

	描述模糊效果程度的属性；它既不对应像素值也不受当前转换矩形的影响。默认值是0
	ctx.shadowBlur = level;
	
## shadowColor

	描述阴影颜色的属性。
	tips: shadowColor属性设置成不透明的，并且shadowBlur,shadowOffsetX 或者 shadowOffsetY 属性不为0，阴影
	才会被绘制。
	
## shadowOffsetX/shadowOffsetY

	阴影水平偏移距离/垂直偏移距离，默认值是0
	
# Image()

	Image()函数将会创建一个新的HTMLImageElement实例。它的功能等价于document.createElement('img');
	
	Image(width,height)
		width: 图片的宽度(即width属性)
		height: 图片的高度(即height属性)
	
# ImageData()

	ImageData()接口描述<canvas>元素的一个隐含像素数据的区域。使用ImageData()构造函数创建或者使用和canvas在
	一起的对象的创建方法： createImageData() 和 getImageData()。也可以使用putImageData()设置canvas的一部分。
	
	new ImageData(array,width,height);
	new ImageData(width,height);
	
	属性：
		ImageData.data	Unit8ClampedArray描述了一个一维数组，包含以RGBA顺序的数据，数据使用0-255的整数表示
		ImageData.height	使用像素描述ImageData的实际高度
		ImageData.width		使用像素描述ImageData的实际宽度
		
## createImageData()
	
	创建一个新的，空白的，指定大小的ImageData对象。所有的像素在新对象中都是透明的。
	ctx.createImageData(width,height);
	ctx.createImageData(imagedata);
	
## putImageData()

	将数据从已有的ImageData对象绘制到位图的方法。
	ctx.putImageData(imageData,dx,dy);
	ctx.putImageData(imageData,dx,dy,dirtyX,dirtyY,dirtyWidth,dirtyHeight);
	
		imageData: 包含像素值的数组对象
		dx:	源图像数据在目标画布中的位置偏移量
		dy:	源图像数据在目标画布中的位置偏移量
	
## getImageData()

	返回一个ImageData对象，用来描述canvas区域隐含的像素数据，这个区域通过矩形表示，
	起始点为(sx,sy)宽为sw,高为sh
	
	ctx.getImageData(sx,sy,sw,sh);
	
# globalCompositeOperation

	设置要在绘制新形状时应用的合成操作的类型，其中type是用于标识要使用的合成或混合模式操作的字符串
	ctx.globalCompositeOperation = type;
	
# 绘制图片

    ctx.drawImage(image,dx,dy);
        将图片从画布的 (dx,dy)点开始绘制
    ctx.dragImage(image,dx,dy,dWidth,dHeight);
        将图片从画布的(dx,dy)开始绘制,图片的大小为 dWidth*dHeight;
    ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        从图片的(sx,sy)处开始裁剪,裁剪的大小为(sWidth*sHeight),从画布的(dx,dy)处开始绘制,绘制的大小为(dWidth*dHeight);
    
# 像素操作

    使用ImageData()构造函数创建或者使用 createImageData()和getImageData()。也可以使用putImageData()
    设置canvas的一部分
        
    ctx.getImageData(sx,sy,sw,sh);
        该函数返回一个ImageData对象,用来描述canvas区域隐含的像素数据。
        sx
        将要被提取的图像数据矩形区域的左上角 x 坐标。
        sy
        将要被提取的图像数据矩形区域的左上角 y 坐标。
        sw
        将要被提取的图像数据矩形区域的宽度。
        sh
        将要被提取的图像数据矩形区域的高度。
    
    ctx.createImageData(width,height)
        创建一个新的,空白的指定大小的ImageData对象,所有的像素在新对象中都是透明的。
        
    ctx.putImageData()
        数据从已有的 ImageData 对象绘制到位图的方法
        ctx.putImageData(imagedata, dx, dy);
        
# 导出图片

    1. HTMLCanvasElement.toDataURL() 方法返回一个包含图片展示的 data URL.
```JS
var canvas = document.getElementById("canvas");
var dataURL = canvas.toDataURL();
console.log(dataURL);   // 返回一个base:64的png图片格式。
```
    2. HTMLCanvasElement.toBlob(callback,type,encoderOptions)   方法创造Blob对象,用以展示canvas上的图片。
        callback 回调函数可以获得一个单独的Blob对象参数。
				type:	  		指定图片格式，默认格式为image/png
				encoderOptions:	值在0与1之间，当请求图片格式为image/jpeg或者image/webp时用来指定图片展示质量