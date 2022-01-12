// ------------ 封装一个简单的ajax -----------
function parse(obj) {
  const temp = []
  const _obj = {...obj}
  for(let key in _obj) {
    temp.push(`${key}=${encodeURIComponent(_obj[key])}`)
  }
  return temp.join('&')
}

function _ajax(options = {
  url:'',
  method:'GET',
  data:{},
  timeout:3000
}) {
  return new Promise((resolve,reject) => {
    if(!options.url) return;
    let xhr, timer = null;
    if(window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()
    }else{
      xhr = ActiveXObject('Microsoft.XMLHTTP')
    }

    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4){
        if(timer){
          reject('超时啦啦啦啦')
          clearTimeout(timer)
          timer = null;
        }
        if((xhr.status >= 200 && xhr.status < 300)) {
          resolve(xhr.response)
        }else{
          reject(xhr.status)
        }
      }
    }
    if(options.timeout !== 0) {
      timer = setTimeout(() => {
        xhr.abort()
      }, options.timeout)
    }
    if(options.method.toUpperCase() === 'GET') {
      xhr.open('GET', `${options.url}${parse(options.data)}`, true)
      xhr.send(null)
    }else {
      xhr.open('POST',options.url, true)
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
      xhr.send(options.data)
    }
  })
}
