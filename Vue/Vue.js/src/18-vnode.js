new Vue({
  el:'#render-demo',
  render(h){
    const vnode = h(
      'div',
      {
        attrs:{id:'title'}
      },
      'hello world'
    )
    console.log('vnode', vnode)
    return vnode
  }
})
