class PopUp extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'closed'})
    const span = document.createElement('span')
    span.textContent = 'hello world'
    span.classList.add('text')
    const wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    const style = document.createElement('style')
    style.textContent = `
      .text {
        position: relative;
        color: red;
      }
      .text:hover {
        color: red;
        text-decoration: underline;
      }
      .wrapper {
        position: absolute;
        left:0;
        top:0;
        width: 200px;
        height: 200px;
        z-index: 20;
        background-color: pink;
        opacity: 0;
        z-index: 10;
      }
      .text:hover .wrapper {
        opacity: 1;
      }
    `
    shadow.append(span)
    shadow.append(style)
    span.appendChild(wrapper)
  }
}
window.customElements.define('pop-up', PopUp)


// ------------- my-paragraph -----------
class MyParagraph extends HTMLElement {
  constructor() {
    super()
    const template = document.getElementById('paragraph')
    const content = template.content.cloneNode(true)
    const shadow = this.attachShadow({mode: 'closed'})
    const style = document.createElement('style')
    style.textContent = `
      .title {
        color: red;
      }
      .content {
        font-size: 18px;
        color: pink;
      }
    `
    shadow.append(content, style)
  }
}
window.customElements.define('my-paragraph', MyParagraph)
