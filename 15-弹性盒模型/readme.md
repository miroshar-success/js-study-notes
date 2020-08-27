# Flex布局

    采用Flex布局的元素,成为Flex容器。(flex container),它的所有子元素自动成为容器成员称为(flex item).
    
	Flex 是Flexible Box的缩写,意味'弹性布局',任何一个容器都可以指定为flex布局。
```css
.box{
	display:flex;
}

<!-- 行内元素也可以使用Flex布局 -->
.box{
	display:inline-flex;
}
```
	tips:
	1. 设置为flex布局以后,子元素的float,clear和vertical-align属性都将失效。

## 设置在容器的属性

    flex-direction
        决定主轴的方向,取值为 row|row-reverse|column|column-reverse
     tips:
        1. 如果不换行,当父元素宽度小于子元素宽度之和的时候,会挤压子元素    
         
    flex-wrap
        nowrap:默认不换行
        wrap:换行
        wrap-reverse:换行,第一行在下方
    
    flex-flow
        该属性是flex-direction和flex-wrap属性的简写形式
        
    justify-content
        定义了项目在主轴上的对齐方式
        flex-start|flex-end|center|space-between|space-around
		
		space-around:每个项目两侧的间隔相等,所以项目之间的间隔比项目与边框的间隔大一倍;
         
    align-items
        定义项目在交叉轴的对齐方式
         flex-start|flex-end|center|baseline|stretch
         
    align-content
		定义了多根轴线的对齐方式。如果项目只有一根轴线,该属性不起作用。
    
## 设置在项目上的属性

    order
    flex-grow
    flex-shrink
    flex-basis
    flex
    align-self
	
	
	flex-grow属性
	定义项目的放大比例,默认为0 即如果存在剩余空间,也不放大.
	如果所有项目的flex-grow属性都为1,则它们将等分剩余空间(如果有的话)。如果一个项目的flex-grow属性为2,其他项目都为1,
	则前者占据的剩余空间将比其他项多一倍。
	
	flex-shrink属性
	定义项目的缩小比例,默认为1,即如果空间不足，该项目将缩小。
	如果所有项目的flex-shrink属性都为1,当空间不足时，都将等比例缩小。如果一个项目的flex-shrink为0，其他项目都为1，则空间不足时
	前者不缩小。
	
	flex-basis属性
	定义了在分配多余空间之前,项目占据的主轴空间(main size)。浏览器根据这个属性,计算主轴是否有多余空间。
	
	
	flex
	flex-grow flex-shrink flex-basis的简写,默认值为 0 1 auto。 后面两个属性可选。
	
## align-self属性
	
	align-self属性允许单个项目有与其他项目不一样的对齐方式,可覆盖align-items属性。默认值为auto。
		align-self: auto | flex-start | flex-end |center | baseline | stretch