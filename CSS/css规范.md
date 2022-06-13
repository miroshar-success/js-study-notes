
# 1. CSS(Cascading Style Sheets)

  层叠样式表
  层叠: CSS样式单中的样式形成一个层次结构,样式规则的优先级由CSS根据这个层次结构决定。其基本目标是让浏览器以指定的特性去绘制页面
  比如颜色,定位,装饰等。由两个部分组成:
    1. 属性（ property）是一个标识符，用可读的名称来表示其特性。
    2. 值（value）则描述了浏览器引擎如何处理该特性。每个属性都包含一个有效值的集合，它有正式的语法和语义定义，被浏览器引擎实现。 
  
  CSS的核心功能是将CSS属性设定为特定的值。一个属性与值的键值对被称为'声明'(declaration)。CSS引擎会计算页面上每个元素
  都有哪些声明。并且会根据结果绘制元素,排布样式。
  
  一个元素可能被多个选择器选中,因此会有多个规则，有可能以不同的值去设置同一属性。CSS标准会规定哪个优先级最高并生效,
  称之为层叠算法。
    
# 2. CSS的载体

  样式要作用于页面需要和页面关联,关联方式有三种:

  2.1 行内样式
  <p style="color:red"></p>

  2.2 内联样式
  style标签承载控制, style标签写到 head里面
```html
<head>
  <style>
    p{
        color:red;
    }
  </style>
</head>
```

  2.3 外部样式

  用 link 标签引入,
  <link rel="stylesheet" href="./xxx.css">

# 3. 行内样式与内联样式的比较

  行内样式: 直接作用在元素上,清晰明了,不存在样式冲突或不准确，优先级最高。但是不利于维护,代码冗长。    

  内联样式: 需要选中元素才能设置样式,不直观。存在样式冲突(体现了层叠作用)。利于维护,利于展示页面的层级结构,
  结构和样式分离,可复用.

# @ 规则

  @charset, 定义样式表使用的字符集
  @import  告诉CSS引擎引入一个外部样式表
  @media  如果满足媒介查询的条件则条件规则组里的规则生效。
  @font-face, 描述将下载的外部的字体
  @keyframes, 描述CSS动画的中间步骤

# 5. 选择器优先级
    
  浏览器通过优先级来判断哪些属性值与一个元素最为相关，从而在该元素上应用这些属性值。优先级是基于不同种类选择器
  组成的匹配规则。
  
  优先级就是分配给指定的CSS声明的一个权重。它由匹配的选择器中的每一种选择器类型的数值决定。
  而当优先级与多个 CSS 声明中任意一个声明的优先级相等的时候，CSS 中最后的那个声明将会被应用到元素上。
    
  **内联样式**
  
  给元素添加的内联样式 (例如，style="font-weight:bold") 总会覆盖外部样式表的任何样式 ，
  因此可看作是具有最高的优先级
    
  
  !important(不推荐) > id > class > tag > *

# 6. 组合选择器

  后代选择器      ul li{color:red;}
  子代选择器      ul>li{color:red;}
  相邻兄弟        ul+li{color:red}

## 继承

  当元素的一个继承属性没有指定值时,则取父元素的同属性的计算值(computed value)。
  
  下例 em标签的 color 属性继承自 父元素p标签
```html
<style>
p { color: green; }
</style>

<p>This paragraph has <em>emphasized text</em> in it.</p>
```
    
  当元素的一个非继承属性没有指定值时,则取属性的初始值。
  
  可以继承的属性:
    字体属性: font-family font-weight font-size 
    文本系列属性: text-indent text-align line-height word-spacing letter-spacing text-transform color
    元素可见性: visibility
    
## 属性简写

  常见可以简写的CSS属性:
  background:
  CSS 2.1 
      background-color background-image background-repeat background-attachment background-position
  CSS 3
      background-size background-origin background-clip
  font:
      font-style font-weight font-size line-height font-family
  padding
  margin
      padding和margin的值是从 top 顺时针开始的：top、right、bottom、接着是 lef
  border   
  border-radius:
    border-top-left-radius、border-top-right-radius、border-bottom-right-radius，和 border-bottom-left-radius 简写为一个属性。
					
	white-space:
		pre	空白会被浏览器保留。
		nowrap: 不换行
		pre-wrap: 保留空白符序列，但是正常地进行换行。
		pre-line: 合并空白符序列，但是保留换行符。
        
    
    
    
    
    
    
    
    
    
    
      