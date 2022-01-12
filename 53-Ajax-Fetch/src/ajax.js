// ------------------ ajax get请求 --------------
(() => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:9000/api/player', true)
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200){
      const data = JSON.parse(xhr.response)
      console.log(data)
    }
  }
  xhr.send(null)
})();


// --------------- ajax post请求 -----------------
(function() {
  const xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:9000/api/player', true)
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200){
      const data = JSON.parse(xhr.response)
      console.log('post:',data)
    }
  }
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
  xhr.send('id=1')
})();

// ------------------ 设置responseType ---------------
(() => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:9000/api/iu', true)
  xhr.responseType = 'blob'
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200){
      console.log(xhr.response)
      const url = window.URL.createObjectURL(xhr.response)
      const image = new Image(400,600)
      image.onload = function(){
        window.URL.revokeObjectURL(image.src)
      }
      image.src = url;
      document.body.appendChild(image)
    }
  }
  xhr.send(null)
})();


// ------------------ 提交FormData数据 -----------------
//  ------服务端使用 formidable 解析FormData数据------
(() => {
  const username = document.querySelector('.username')
  const age = document.querySelector('.age')
  const submit = document.querySelector('.submit')
  submit.onclick = function(event) {
    console.log(username.value, age.value)
    event.preventDefault()
    const data = new FormData()
    data.append('username', username.value)
    data.append('age', age.value)
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:9000/api/register', true)
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200){
        console.log(xhr.response)
      }
    }
    xhr.send(data)
  }
})();


// ---------------- 设置超时 --------------
(() => {
  const xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:9000/api/player', true)
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200){
      console.log(xhr.response)
    }
  }
  xhr.send(null)
  xhr.timeout = 500;
  xhr.ontimeout = function(event){
    console.log('超时了', event)
  }
})();

// -----------------  取消请求 --------------------
(() => {
  const button = document.querySelector('.cancel_button')
  const xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:9000/api/player', true)
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200){
      console.log(xhr.response)
    }
  }
  xhr.send(null)
  button.onclick = function() {
    xhr.abort()
  }
})();


// -------------- 上传文件 -----------
(() => {
  const button = document.querySelector('.file_button')
  const file = document.querySelector('.file-input')
  const files = []
  file.addEventListener('change', (event) => {
    for(let i = 0, length = event.target.files.length; i < length; i++) {
      const file = event.target.files[i]
      files.push(file)
    }
  })
  button.addEventListener('click',() => {
    const data = new FormData()
    for(let i = 0; i < files.length; i++) {
      const file = files[i];
      data.append('file', file)
    }
    const xhr = new XMLHttpRequest()
    xhr.open('POST','http://localhost:9000/api/upload', true)
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.response)
      }
    }
    xhr.upload.onprogress = function(event){
      console.log(event.total, event.loaded)
    }
    xhr.send(data)
  })
})();


// ----------------------- 使用封装的ajax --------------------
_ajax({
  url:'http://localhost:9000/api/player',
  method:'get',
  timeout:300
}).then(res => {
  console.log('_ajax', res)
}).catch(err => {
  console.log(err)
})
