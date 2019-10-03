# 绘制矩形
    
    绘制空心矩形
        ctx.strokeRect(x,y,width,height);
        ctx.stroke()    
    
    实心矩形
        ctx.fillStyle = color
        ctx.fillRect(x,y,width,height);
        
    绘制矩形,可以填充,也可以描边
        ctx.rect(x,y,width,height);
        
    清除画布
        ctx.rect(x,y,w,h);
        
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
    2. HTMLCanvasElement.toBlob(callback)   方法创造Blob对象,用以展示canvas上的图片。
        callback 回调函数可以获得一个单独的Blob对象参数。
    