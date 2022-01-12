// ---------------- window.load --------------------
window.addEventListener('load', function(event) {
  console.log('page is fully loaded')
})

// ----------------- window.beforeunload -------------------
window.addEventListener('beforeunload', function(e) {
  e.preventDefault();
  var msg="填写的内容尚未保存，真的要离开么？";
  e.returnValue=msg;
  return msg
})
