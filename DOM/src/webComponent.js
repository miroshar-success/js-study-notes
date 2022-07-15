class UserCard extends HTMLElement {
  constructor() {
    super()
    const img = document.createElement('img')
    img.width = 100
    img.src = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F28%2F20181228201944_eE2F4.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660483524&t=05cfb8eb4c5686ad454e9e2d98053e80'
    const container = document.createElement('div')
    container.style.cssText = 'width:100px;height:100px;padding:10px;border:1px solid #e8e8e8;'
    const span = document.createElement('span')
    span.textContent = 'Hello, Kyrie'
    container.append(img, span)
    this.append(container)
  }
}
window.customElements.define('user-card', UserCard)


// -------- 使用模版 ---------

class PlayerCard extends HTMLElement {
  constructor() {
    super()
      const template = document.querySelector('#userCardTemplate')
      const container = template.content.cloneNode(true)
      this.append(container)
  }
}
window.customElements.define('player-card', PlayerCard)


// ----------- 传递参数 ------------
const player_list = [
  {
    firstName: 'kyrie',
    lastName: 'irving'
  },
  {
    firstName: 'lebron',
    lastName: 'james'
  },
  {
    firstName: 'kevin',
    lastName: 'durant'
  }
]
class PlayerText extends HTMLElement {
  constructor() {
    super()
    this.addEventListener('click', function() {
      let link = document.createElement('a')
      link.href = 'http://www.baidu.com'
      link.target = '_blank'
      link.click()
      link = null
    })
  }
  connectedCallback() {
    const template = document.getElementById('playerCardTemplate')
    const content = template.content.cloneNode(true)
    content.querySelector('.firstName').textContent = this.getAttribute('firstName');
    content.querySelector('.lastName').textContent = this.getAttribute('lastName')
    this.append(content)
  }
}
window.customElements.define('player-text', PlayerText)

function createPlayerList() {
  const fragment = document.createDocumentFragment()
  for(const player of player_list) {
    const { firstName, lastName } = player;
    const element = document.createElement('player-text')
    element.setAttribute('firstName', firstName)
    element.setAttribute('lastName', lastName)
    fragment.append(element)
  }
  document.body.appendChild(fragment)
}
createPlayerList()


// ui
// fluent-ui
// lit

// ----------- Shadow DOM ----------
class PhoneCard extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'closed' })
    const template = document.getElementById('phoneCardTemplate')
    const content = template.content.cloneNode(true)
    content.querySelector('.title').textContent = this.getAttribute('name')
    content.querySelector('.image').setAttribute('src', this.getAttribute('url'))
    shadow.append(content)
  }
}
window.customElements.define('phone-card', PhoneCard)

