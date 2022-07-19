const input = document.querySelector('.input')
const button = document.querySelector('.button')

button.addEventListener('click', () => {
  if(!input.value) return
  const message_list = window.localStorage.getItem('_message_1')
  if(!message_list) {
    const list = [{
      id: Date.now(),
      text: input.value.trim()
    }]
    window.localStorage.setItem('_message_1', JSON.stringify(list))
  } else {
    try {
      const list = JSON.parse(message_list)
      list.push({
        id: Date.now(),
        text: input.value.trim()
      })
      window.localStorage.setItem('_message_1', JSON.stringify(list))
    }catch(err) {
      console.log(err)
    }
  }
  input.value = ''
}, false)

const oUl = document.querySelector('.message-list')
let last_message_list = []
function get_message_list() {
  const list = window.localStorage.getItem('_message_2')
  if (!list) return
  const message_list = JSON.parse(list)
  if (last_message_list.length === message_list.length) return
  let str = ''
  for(const message of message_list) {
    str += `<li>${message.text}</li>`
  }
  oUl.innerHTML = str
  last_message_list = message_list
}

window.setInterval(get_message_list, 100)
