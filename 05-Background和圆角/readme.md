# background
	
	复合属性的写法顺序：
		
		background: background-color|background-image|background-repeat|background-attachment|background-position|inherit
		
## background-attachment

	决定背景图像的位置是在视口内固定,还是随着包含它的区块滚动。
	
	fixed: 表示背景相对视口固定。即使一个元素拥有滚动机制,背景也不会随着元素的内容滚动。
	local: 表示背景相对于元素的内容固定。
	scroll: 表示背景相对于元素本身固定,而不是随着他的内容滚动。
	
## background-clip
	
	background-clip属性指定背景绘制区域，默认 border-box;
		border-box	默认值。背景绘制在边框方框内（剪切成边框方框）
		padding-box	背景绘制在衬距方框内（剪切成衬距方框）
		content-box	背景绘制在内容方框内（剪切成内容方框）
		text: 背景被裁剪成文字的前景色
		
## background-origin

	 background-origin 规定了指定背景图片background-image 属性的原点位置的背景相对区域.
	 左上角从元素的哪个位置开始绘制图片。
	 tips:
		注意：当使用 background-attachment 为fixed时，该属性将被忽略不起作用。
		
	padding-box	背景图像填充框的相对位置 (默认)
	border-box	背景图像边界框的相对位置
	content-box	背景图像的相对位置的内容框
	
## background-position

	为每一个背景图片设置初始位置.这个位置是相对于由background-origin定义的位置图层的。
	
	值:
		center 居中背景图片
		top,left,bottom,right  用来把这个项目放在哪一个边缘。另一个维度被设置成50%。
		length 或 percentage 相对于左边缘的x坐标,y坐标被设置为50%.
		
	tips:
		1. 如果背景图片的大小和容器一样,那么设置百分比的值将永远无效,因为"容器"和图片的差为 0.

## background-blend-mode

	该属性定义了背景层的混合模式（图片与颜色）。
	
	normal | multiply| screen | overlay | draken