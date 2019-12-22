
# router-link

    tag: 渲染成某种标签 <router-link to="/foo" tag="li">foo</router-link>
    <!-- 渲染结果 -->
    <li>foo</li>
    
    通过注入路由器,可以在任何组件内通过 this.$router访问路由器,也可以通过this.$route访问当前路由;
    
    tips:
    当使用动态路由的时候,下面这种写法,路由参数必须使用name属性,使用path的时候无法匹配
    <router-link :to={name:'user',params:{id:1}}></router-link>
    
    replace:
    设置replace属性的话,当点击的时候,会调用router.replace() 而不是 router.push()。
    
    exact:
    想要链接使用 精确匹配模式,则使用exact属性
    <router-link to='/' exact></router-link>   这个链接只会在地址为 / 的时候被激活。
    
    event   default:'click'
        可以用来触发导航的事件。可以是一个字符串或是一个包含字符串的数组
    
    
# 响应路由参数变化

    当使用路由参数时, 原来的组件实力会被复用。因为两个路由组件都渲染同个组件，比起销毁再创建，复用则显得更加高效。
    不过这也意味着 组件的生命周期钩子不会再被调用。
    
    想对路由参数的变化作出响应的话,可以简单地watch $route 对象:
```js
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

# 组件内的守卫

    beforeRouteEnter
    beforeRouteUpdate
    beforeRouteLeave
    
```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```
    