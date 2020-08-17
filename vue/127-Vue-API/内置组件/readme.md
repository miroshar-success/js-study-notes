# slot

    v-slot: 在向具名插槽提供内容的时候 可以在一个 template元素上使用 v-slot 指令,并以 v-slot的参数的形式提供其名称:
       
    tips: v-slot 只能使用在template 或者组件上,否则会报错！
    
    用法: v-slot:header / v-slot:footer
    
# 作用域插槽

    有时让插槽内容能够访问子组件中才有的数据是很有用的。
    
    
# 动态组件

    可以通过Vue的<component>元素加一个特殊的is特性来实现：
    
    <component :is='currentTabComponent'></component>
    
    tips:
    1. 如果在不同组件之间切换,有时想要保持这些组件的状态,以避免反复重复渲染导致的性能问题,可以使用<keep-alive></keep-alive>组件
       失活的组件将会被缓存！
    
    
    
    
    
    
    
    
    
    
    
    