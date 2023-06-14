/* // ------------------- 基本的fetch ------------------
fetch('http://localhost:9000/api/player?id=5').then(res => res.json()).then(res => {console.log(res)}).catch(err => {
  console.log(err)
})

// ------------------ fetch携带参数 post ---------------
fetch('http://localhost:9000/api/register',{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({
    username:'lebron',
    age:30
  })
}).then(res => res.json()).then(res => {
  console.log('register-response',res)
})

fetch('http://localhost:9000/api/register',{
  method:'POST',
  headers:{
    'Content-Type':'application/x-www-form-urlencoded'
  },
  body:'username=lebron&age=30'
}).then(res => res.json())
.then(res => {
  console.log('register-body', res)
})




// ------------------ fetch携带get参数------------
fetch('http://localhost:9000/api/player?id=1',{
  method:'GET',
}).then(res => {
  return res.json()
}).then(res => {
  console.log(res)
})

fetch('http://localhost:9000/api/player',{
  method:'GET',
}).then(res => {
  return res.json()
}).then(res => {
  console.log(res)
})

fetch('http://localhost:9000/api/player?id=2').then(res => res.json()).then(res => {console.log(res)}); */


// ------------------ fetch 和 ajax携带cookie -------------------
// ---------- 原生js --------
(() => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://127.0.0.1:9000/api/login', true)
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200){
      console.log('ajax-cookie-result',JSON.parse(xhr.response))
    }
  }
  xhr.send(null)
})();

// -------- 使用$.ajax --------
/* $.ajax({
  url:'http://127.0.0.1:9000/api/login',
  type:'get',
  success:result => {
    console.log('$.ajax-result', result)
  }
}) */

// --------- axios --------
/* axios({
  url:'http://127.0.0.1:9000/api/login',
  method:'get'
}).then(res => {
  console.log('axios-method', res)
}); */


// ---------------- 上传文件 -----------------
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
    fetch('http://localhost:9000/api/upload',{
      method:'POST',
      body:data
    }).then(res => {
      console.log('fetch-res',res)
      return res.json()
    }).then(res => {
      console.log('fetch-file-res',res)
    })
  })
})();


// ---------------------------- 取消fetch请求 ---------------------------
const controller = new AbortController()
const signal = controller.signal;

fetch('http://127.0.0.1:9000/api/player',{
  method:'GET',
  signal
}).then(res => res.json())
.then(res => {
  console.log(res)
}).catch(err => {
  console.log('err')
})
setTimeout(() => {
  controller.abort()
},100)
