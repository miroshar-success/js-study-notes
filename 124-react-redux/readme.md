# 安装

    npm install --save redux
    
    三大原则:
      1. 单一数据源
      整个应用的state被储存在一个object tree中,并且这个object tree只存在于唯一一个store中。
      
      2. State是只读的
      唯一改变state的方法就是触发action,action是一个用于描述已发生事件的普通对象。
      
      3. 使用纯函数来进行修改
      为了描述action如何改变state tree,需要编写reducers.
      把要做的修改变成一个普通对象,这个对象叫做action,而不是直接修改state。然后编写专门的函数来决定每个action如何改变应用的state,
      这个函数被叫做reducer
      
# Action

    Action是把数据从应用传到store的有效载荷。它是store数据的唯一来源。Action本质上是JavaScript
    普通对象。action内部必须使用一个字符串类型的type字段来表示将要执行的动作。多数情况下,type
    会被定义成字符串常量。
    
    Action创建函数就是生成action的方法。在Redux 中的action创建函数只是简单的返回一个action
```js
function addTodo(text){
    return {
        type:ADD_TODO,
        text
    }
}
```
    这样做将使action创建函数更容易被移植和测试。
    在Redux中只需要把action创建函数的结果传递给dispatch()方法即可发起一次dispatch过程。
    
# Store

    getState() 方法获取state
    dispatch(action) 更新state
    subscribe(listener) 注册监听器
    
    Redux原生提供combineReducers()辅助函数,来把根reducer拆分成多个函数,用于分别处理state树的一个分支。
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        