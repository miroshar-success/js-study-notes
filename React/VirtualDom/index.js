/* virtual dom */
/*
{
  type: 'div',
  props: null,
  children: [
    {
      type: 'p',
      props: {
        className: 'text'
      },
      children: []
    }
  ]
}
*/
const virtual_doms = [
  {
    type: 'div',
    props: {
      className: 'box',
    },
    children: [
      {
        type: 'text',
        props: {
          textContent: 'hello world'
        }
      },
      {
        type: 'span',
        props: {
          className: 'text',
          onClick: function() {
            console.log('hello world')
          }
        }
      },
      {
        type: 'input',
        props: {
          value: 'hello world'
        }
      },
      {
        type: 'button',
        props: {
          className: 'button'
        },
        children:[
          {
            type: 'text',
            props: {
              textContent: 'click'
            }
          }
        ]
      }
    ]
  }
]

function createHtmlElement(tag) {
  return document.createElement(tag)
}
function createTextElement(text) {
  const textNode = document.createElement('text')
  textNode.textContent = text
  return textNode
}

