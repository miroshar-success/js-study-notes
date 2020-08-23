# CSS基础盒模型

	当对一个文档进行布局的时候,浏览器的渲染引擎会根据标准之一的CSS基础框盒模型,将所有元素表示为一个个矩形的盒子(Box)。
	CSS决定这些盒子的大小,位置以及属性。
	
	每个盒子有四个边界: 内容边界Content edge,内边距边界 Padding Edge 边框边界Border Edge,外边框边界
	Margin Edge.
	
## Content area

	由内容边界限制，容纳着元素的“真实”内容。
	如果box-sizing为content-box(默认),则内容区域的大小可明确地通过width min-width max-width height min-height
	控制。
	
## Padding area

	由内边距边界限制,扩展自内容区域,负责延申内容区域的背景,填充元素中内容与边框的间距。
	
## Border area

	如果box-sizing属性被设置为 border-box,那么边框区域的大小可明确地通过width min-width max-width
	height min-height 和 max-height属性控制。
	
	假如框盒上设置有背景(background-color 或 background-image),背景将会一直延伸至边框的外沿。
	(默认会在边框下层延伸,边框会盖在背景上)。可以通过background-clip 改变。

## Margin area

	外边距区域的大小由 margin-top margin-right margin-bottom margin-left。

	margin的top 和 bottom 属性对非替换内联元素无效,例如 <span> 和 <code>
	
# padding

	padding属性设置一个元素的内边距，padding区域值一个元素的内容和其边界之间的空间,该属性不能为负值。
	
	padding: <length>|<percentage>
	
	可以设置为固定宽度或者相对于包含块宽度的百分比
	
	tips:
	1. 对于padding而言,auto不是一个有效值,任何包含了auto的值都会被浏览器忽略。

	padding-left:10%  相对于父级宽度的10%
	padding-top:10%	  相对于父级宽度的10%
	
	要计算 width left right padding margin这些属性由包含块的width属性的值来计算它的百分比。
	
	2. 确定一个元素的包含块的过程完全依赖于这个元素的position属性。

# 可替换元素

	在CSS中,可替换元素的展现效果不是由CSS来控制的。这些元素是一种外部对象,它们外观的渲染,是独立于CSS的。
	
	CSS可以影响可替换元素的位置,但不会影响到可替换元素自身的内容。
	CSS能对可替换元素产生的唯一影响在于,部分属性支持控制元素内容在其框中的位置或定位方式。

	典型的可替换元素有:
		iframe
		video
		embed
		img
		
	HTML规范也说了<input>元素可替换,因为"image"类型的<input>元素就像<img>一样被替换。但是其他形式的控制元素,
	包括其他类型的<input>元素,被明确地列为非可替换元素。

	object-fit
		指定可替换元素的内容对象在元素盒区域中的填充方式
		
	object-position
		指定可替换元素的内容对象在元素盒区域中的位置
	
	tips:
	1. 除可替换元素外,对于行内元素来说,尽管内容周围存在内边距与边框,但其占用空间则由 line-height属性决定。即使
	边框和内边距仍会显示在内容周围。
	
# BFC(Block Formatting Context)
    
    是Web页面的可视CSS渲染的一部分，是块盒子的布局过程发生的区域。也是浮动元素与其他元素交互的区域。
    以下方式会创建块格式化上下文:
        1. 根元素<html>
        2. 浮动元素(元素的flot不是none)
        3. 绝对定位元素(元素的position为absolute或fixed)
        4. 行内块元素(元素的display为inline-block)
        5. 表格单元格(元素的display为table-cell)
        6. 表格标题(元素的display为table-caption)
        7. overflow值不为visible的块元素
        8. 弹性元素(display为flex或inline-flex元素的直接子元素)
        9. display:flow-root  一个新的display属性的值,可以创建无副作用的BFC。
        
    块格式化上下文包含创建它的元素内部的所有内容。  清除浮动只能清除同一BFC中在它前面的元素的浮动.外边距折叠
    只会发生在属于同一BFC的块级元素之间。
    
    BFC的特性:
        1. 属于同一个BFC的两个相邻容器的上下margin会重叠
        2. 计算BFC高度时,浮动元素也参与计算
        3. BFC的区域不回与浮动元素容器发生重叠
        4. BFC内的容器在垂直方向依次排列
        5. 元素的margin-left与其包含块的border-left相接触
        6. BFC是独立容器，容器内部元素不会影响容器外部元素
    
```html
// demo 外边距坍塌
<style>
    .top,.bottom{
        text-align:center;
        line-height:100px;
        height:100px;
        width:200px;
    }
    .top{
        margin-bottom:30px;
        background-color:skyblue;
    }
    .bottom{
        margin-top:60px;
        background-color:pink;
    }
</style>
<div class="top">top: margin-bottom:30px</div>
<div class="bottom">bottom: margin-top:60px</div>
```
    上述例子 top 和 bottom 之间的间距 为 60px,即两者之间margin值的较大者。
    解决办法:
        可以给top或者 bottom元素 再添加一个父元素,并设置属性 overflow:hidden,这样 .top和.bottom的div就不处于同一个BFC.
    

```html
// demo 清除浮动无法撑开父元素高度
<style>
    .outside{
        border: 10px solid blue;
    }
    .inside{
        width: 200px;
        height: 200px;
        background: yellowgreen;
        float: left;
    }
</style>

<div class="outside">
    outside
    <div class="inside">inside</div>
</div>
```
    上述案例 父元素 outside会没有高度，因为子元素设置 float后 脱离文档流，父元素又没有设置高度，所以父元素
    会出现高度坍塌。
    
    解决办法:
        1. 给父元素设置 overflow:hidden 属性。使得父元素.outside触发了BFC，
        而BFC特性规定“计算BFC高度时浮动元素也参于计算”，此时子元素.inside虽然设置了浮动，但其高度仍计算至父元素内，
        从而解决了高度塌陷问题。
        
        2. 使用伪元素
        .outside:after{content:"",display:block;clear:both}


```html
// BFC的区域不会与浮动容器发生重叠
<style>
    .left{
        width: 100px;
        height: 200px;
        background: yellowgreen;
        float: left;
    }
    .right{
        height: 300px;
        background: skyblue;
    }
</style>
<div class="left"></div>
<div class="right"></div>
```
    上述代码 左侧区域会与右侧代码块发生位置重叠,因为.left 浮动会脱离文档流。
    解决办法: 使右侧 .right div 产生BFC  可以添加一个属性 overflow:hidden 或者 display:inline-block










