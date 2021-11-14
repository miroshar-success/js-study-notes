import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const container = document.createElement('div')
container.classList.add('container')
document.body.appendChild(container)

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);


/* const vnode = h("div#container.two.classes", null, [
  h("span", { style: { fontWeight: "bold" } }, "This is bold"),
  " and this is just normal text",
  h("a", { props: { href: "/foo" } }, "I'll take you places!"),
]);
 */

const vnode = h('div#hello',[
  h('h4', 'This is a title tag'),
  h('div', 'This is a p tag',[
    h('a','This is a tag'),
    h('ul',[
      h('li','kyrie'),
      h('li','irving')
    ])
  ])
])

const oldVNode = patch(container,vnode)

setTimeout(() => {  // 2000ms 后修改vnode
/*   const vnode = h('h4', 'I am new content')
  patch(oldVNode, vnode) */

  const vnode = h('!')  // 清空元素,  一个注释节点
  patch(oldVNode, vnode)
},2000)

