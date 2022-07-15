for(let i = 0; i < 1000000000; i++) {
}
// 当纯HTML被完全加载以及解析时, DOMContentLoaded事件会被触发,而不必等待样式表,图片或者子框架完成加载。
document.addEventListener('DOMContentLoaded', function() {
  console.log('loaded...')
})

function get_container() {
  return document.querySelector('.root_container')
}

document.onreadystatechange = function() {
  const type = document.readyState
  switch(type) {
    case 'loading':
      console.log('loading...', get_container())
    break;
    case 'interactive':
      const container = get_container()
      const style = window.getComputedStyle(container, null)
      const { width, height, backgroundColor } = style
      console.log(width, height, backgroundColor)
      console.log('interactive...', get_container())
      console.log(document.styleSheets)
    break;
    case 'complete':
      console.log('complete', get_container())
  }
}


window.onload = function() {
  console.log('window.load...')
}

