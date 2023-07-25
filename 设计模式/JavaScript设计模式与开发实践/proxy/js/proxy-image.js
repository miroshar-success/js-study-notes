  // 代理模式 图片懒加载
  const image = (function() {
    const img = document.createElement('img')
    document.body.appendChild(img)
    return function(src) {
      img.src = src
    }
  })()
  // 代理图片
  const proxyImage = (function() {
    const img = new Image()
    img.onload = function() {
      image(this.src)
    }
    return function(src) {
      image('./loading.gif')
      img.src = src
    }
  })()
  // proxyImage('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F25ae6e4e-9795-488f-80d6-2e29ff3352c9%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1692860889&t=bd21e5b09b48e822b94a56a95f220b3a')