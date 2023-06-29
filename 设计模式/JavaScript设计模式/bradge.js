// ------------------桥接模式------------------
const changeStyle = (dom, styles) => {
  for (const key in styles) {
    dom.style[key] = styles[key]
  }
}

const spans = document.querySelectorAll('.bradge-container .text')
for (let i = 0, length = spans.length; i < length; i++) {
  const span = spans[i]
  span.addEventListener('mouseover', function() {
    changeStyle(span, { color: 'red', 'backgroundColor': 'blue'})
  }, false)
  span.addEventListener('mouseout', function() {
    changeStyle(span, { color: '#000', backgroundColor: '#fff'})
  }, false)
}