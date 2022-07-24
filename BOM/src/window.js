console.log('------------------- window ---------------')
console.log(window.screenX, window.screenY)
console.log(window.innerWidth, window.innerHeight)
console.log(window.outerWidth, window.outerHeight)

window.addEventListener('focus', () => {
  console.log('focus, I am seen now')
}, false)

window.addEventListener('blur', () => {
  console.log('blur, I am hidden')
})

const open_button = document.querySelector('.open-button')
open_button.addEventListener('click', function() {
  window.open('http://www.baidu.com', 'baidu')
}, false)


// -------- visibilitychange ----------
document.addEventListener('visibilitychange', function(event) {
  console.log(document.visibilityState) // hidden / visible
}, false)


// ------ 是否在线 --------
window.ononline = function() {
  console.log('online')
}
window.onoffline = function() {
  console.log('offline')
  console.log(window.navigator.onLine)
}


// ---------------- storage API -----------------
const save_button = document.querySelector('.save-button')
const get_button = document.querySelector('.get-button')

// value 是一个对象, 要存储的键值对对象
function save(key, value, expire) {
  if(typeof value === null) return
  if(Object.prototype.toString.call(value) === '[object Object]') {
    const last_value = JSON.parse(window.localStorage.getItem(key) || '{}')
    window.localStorage.setItem(key, JSON.stringify({
      ...last_value,
      ...value,
      expire: expire ? (Date.now() + expire) : 0
    }))
  }
}

function get(key) {
  const value = JSON.parse(window.localStorage.getItem(key) || '{}')
  if (value.expire) {
    const current = Date.now()
    if (current > value.expire) return null
    const { expire, ...data } = value
    return data
  } else {
    return value
  }
}
save_button.addEventListener('click', () => {
  save('__player__', {
    firstName: 'kyrie',
    lastName: 'irving',
    age: 30
  })
}, false)


get_button.addEventListener('click', () => {
  const player = get('__player__')
  console.log(player)
}, false)


//  ------------------- 加密解密 --------------------
const encrypt_button = document.querySelector('.encrypt-button')
const decrypt_button = document.querySelector('.decrypt-button')

encrypt_button.addEventListener('click', () => {
  const player = {
    firstName: 'kyrie',
    lastName: 'irving',
    age: 30
  }
  window.localStorage.setItem('encode_player', encodeURIComponent(JSON.stringify(player)))
  window.localStorage.setItem('base_player', window.btoa(JSON.stringify(player)))
  ls.set('ls_player', player, {
    encrypt: true
  })
}, false)

decrypt_button.addEventListener('click', () => {
  try {
    const string_1 = window.localStorage.getItem('encode_player')
    if(string_1) {
      const player = JSON.parse(decodeURIComponent(string_1))
      console.log(player)
    }
    const string_2 = window.localStorage.getItem('base_player')
    if(string_2) {
      const player = JSON.parse(window.atob(string_2))
      console.log(player)
    }
    console.log(ls.get('ls_player', {
      decrypt: true
    }))
  } catch(err) {
    console.log(err)
    return null
  }
}, false)

