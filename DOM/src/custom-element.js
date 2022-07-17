class CardComponent extends HTMLElement {
  constructor() {
    super()
    const div = document.createElement('div')
    div.textContent = 'hello world'
    div.classList.add('container')
    this.append(div)
  }
}
const info = window.customElements.define('card-component', CardComponent)
console.log(info)


class ExpandingParagraph extends HTMLParagraphElement {
  constructor() {
    self = super()
      this.style.cssText = 'padding:0; margin: 0; color:red'
  }
}
window.customElements.define('expanding-paragraph', ExpandingParagraph, {extends: 'p'})


// --------- 生命周期函数 -----------
class CustomSquare extends HTMLElement {
  static get observedAttributes() {
    return ['c', 'l'];
  }
  constructor() {
    super()
    const element = document.createElement('div')
    element.textContent = 'hello world!!!!!!!'
    this.append(element)
  }
  connectedCallback() {
    console.log('connectedCallback')
  }
  disconnectedCallback() {
    console.log('disconnectedCallback')
  }
  attributeChangedCallback() {
    console.log('attributeChangedCallback')
    updateStyle(this)
  }
}

function updateStyle(element) {
  const w = element.getAttribute('l')
  element.children[0].style.width = w + 'px'
}

window.customElements.define('custom-square', CustomSquare)

const update_button = document.querySelector('.update-button')

update_button.onclick = function() {
  const element = document.querySelector('custom-square')
  element.setAttribute('l', Math.floor(Math.random()*100))
  document.body.removeChild(element)
}






