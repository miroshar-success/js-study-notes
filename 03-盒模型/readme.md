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
	
# margin

	margin的top 和 bottom 属性对非替换内联元素无效,例如 <span> 和 <code>