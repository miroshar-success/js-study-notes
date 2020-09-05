
# 1. HTMLElement.client
	
	只读属性,内联元素以及没有CSS样式的元素的clientWidth属性值为0，Element.clientWidth属性表示元素的内部宽度,以像素计。
	该属性包括内边距,但不包括垂直滚动条(如果有).边框和外边距。

    clientWidth:    获取元素的宽度,包括左右padding
    clientHeight:   获取元素的高度,包括上下padding
    clientLeft:     元素的左边框的宽度
    clientTop:      元素上边框的宽度


# HTMLElement.offsetParent

	是一个只读属性,返回一个指向最近的(closest,指包含层级上的最近)包含该元素的定位元素。如果没有定位的元素,则
	offsetParent为最近的table table cell 或根元素。当元素的display设置为none,offsetParent返回Null。
	
	1. 在weibkit中,如果元素为隐藏的 或者该元素的style.position被设置为fixed,则该属性返回null
	2. 在IE9中,如果该元素的style.position被设置为fixed,则该属性返回Null,(display:none)无影响。

# 2. HTMLElement.offset
	
	HTMLElement.offsetTop为只读属性,它返回当前元素相对于其offsetParent元素的顶部的距离。
	HTMLElement.offsetLeft为只读属性,返回当前元素左上角/相对于HTMLElement.offsetParent节点的左边界便宜的像素值。

	HTMLElement.offsetWidth 和 HTMLElement.offsetHeight 也是一个只读属性,返回该元素的像素宽高。且是一个整数。
	
    最近的祖先元素设置了定位属性时的偏移量
    offsetLeft: left+margin		和 transform:translateX 无关
    offsetTop:  top+margin		和 transform:translateY 无关
    offsetWidth:    width+padding+border
    offsetHeight:   height+padding+border
	
	
	tips:
	1. offsetWidth 和 offsetHeight 将会round为一个整数。如果想要一个fractional值,可以使用
	element.getBoundingClientRect()
	
# 3. scrollTo  

    scrollTo()方法可以把内容滚动到指定的坐标
    scrollTo(xpos,ypos);

# 4. scrollBy

    window.scrollBy(x,y)
    在窗口中按指定的偏移量滚动文档。
    

