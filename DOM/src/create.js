const div = document.createElement('div')
const comment = document.createComment('注释')
const text = document.createTextNode('文本')
const fragment = document.createDocumentFragment()

fragment.appendChild(div)
fragment.appendChild(comment)
fragment.appendChild(text)

document.body.appendChild(fragment)

console.log(document.lastModified)


// --------- 挂载元素 -----------
const create = document.getElementById('create')
console.log(create)
create.append(text, comment, div)


document.body.append(document.createTextNode('hello world'))


document.body.before(document.createTextNode('I am the first Element'))

const element = document.createElement('div')
document.body.appendChild(element)
element.before(document.createTextNode('你好,世界'))
element.append(document.createTextNode('你好'))
element.prepend(document.createTextNode('我是前面的元素'))
element.prepend(document.createTextNode('我是前面的元素111'))

element.after(document.createTextNode('hello'))


//  ---------- element.insertAdjacentHTML -------------
const insert = document.createElement('div')
document.body.appendChild(insert)

insert.insertAdjacentHTML('afterbegin', '<p>after-begin</p>')
insert.insertAdjacentHTML('afterend', '<p>after-end</p>')
insert.insertAdjacentHTML('beforebegin', '<p>before-begin</p>')
insert.insertAdjacentHTML('beforeend', '<p>before-end</p>')


insert.insertAdjacentText('afterbegin', 'HELLO')
insert.insertAdjacentText('beforeend', 'WORLD')

// ----------- element.remove -------

const message = document.createElement('div')
message.textContent = 'hello world, 你好世界';
document.body.appendChild(message)
// message.remove()


message.insertAdjacentElement('beforeend', document.createElement('div'))
// message.insertAdjacentElement('beforebegin', document.createTextNode('hello'))

console.log(message.outerHTML)
// message.outerHTML = 'hello'
message.innerHTML = 'hello'

// console.log(document.body.outerHTML)
// document.body.outerHTML = 'hello';

const d = document.getElementById("d");
console.log(d)
d.outerHTML = "<p>This paragraph replaced the original div.</p>";
