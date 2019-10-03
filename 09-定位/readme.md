# 定位
	
	CSS position属性用于指定一个元素在文档中的定位方式,top,right,bottom和left属性决定了该元素的最终位置。
	
	type:
		relative:相对定位
		position:绝对定位
		fixed:固定定位
		sticky:粘性定位
		
	大多数形况下,height和width被设定为auto的绝对定位元素,按其内容大小调整尺寸。
	但是，被绝对定位的元素可以通过指定top和bottom ，保留height未指定（即auto），来填充可用的垂直空间。
	它们同样可以通过指定left 和 right并将width 指定为auto来填充可用的水平空间。
	
	
	tips:
	1. 如果bottom和top都被指定,top优先(此时height不为auto)
	2. 如果指定了 left 和 right ，当 direction设置为 ltr时 left 优先,当direction设置为 rtl
	3. 时 right 优先。

## static
	
	z指定元素使用正常的布局行为,即元素在文档常规流中当前的布局位置。
	此时top,right,bottom,left和z-index属性无效。
	
## relative
	
	该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置
	（因此会在此元素未添加定位时所在位置留下空白）。position:relative 对 table-*-group, 
	table-row, table-column, table-cell, table-caption 元素无效。
	
	相对定位不会脱离文档流
	
## fixed
	
	相对屏幕视口(viewport)的位置来指定元素位置。
	
## sticky
	
	盒位置根据正常流计算,然后相对于该元素在流中的flow root和containing block定位。
	在所有情况下,该元素定位均不对后续元素造成影响。当元素B被粘性定位时,后续元素的位置仍然
	按照B未定位时的位置来确定。
	
	粘性定位可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位,之后为固定定位。
	
	
	tips:
	须指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。
	否则其行为与相对定位相同。
	
## z-index属性
	
	通常情况下，HTML页面可以被认为是二维的，因为文本，图像和其他元素被排列在页面上而不重叠。在这种情况下，只有一个渲染进程，
	所有元素都知道其他元素所占用的空间。
	
	在CSS 2.1中,所有的盒模型元素都处于三维坐标系中。 除了我们常用的横坐标和纵坐标， 盒模型元素还可以沿着“z 轴”层叠摆放。
	
	tips:
	1. 定位元素按照HTML出现的顺序堆叠
	2. 普通流中不含有定位的标准块元素,始终先于定位元素渲染并出现在定位元素的下方，即便它们在HTML结构中出现的位置晚于定位元素
	也是如此。
	3. 浮动块元素被放置于非定位块元素与定位块元素之间。

