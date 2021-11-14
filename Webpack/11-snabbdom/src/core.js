/* Core documentation */
// -------------------------- init --------------------------
/* The core exposes only one single function init, This init takes a list of modules and returns
a patch function that uses the specified set of modules. */

import {
  classModule, styleModule,
  propsModule, h, init, eventListenersModule,
  toVNode
} from 'snabbdom'
const patch = init([
  classModule,
  styleModule,
  propsModule,
  toVNode,
  eventListenersModule
])

/*
patch function returned by init,The first is a DOM element or a vnode representing the current view.
*/

const vnode = h('div', {style:{
  color:'red',
  fontWeight:'bold'
}}, [
  h('button', {
    on:{
      click:clickHandler
    },
  },'click me'),
  h('a', {
    props:{
      href:'http://www.baidu.com',
      target:'_blank'
    }
  }, 'baidu')
])

function clickHandler() {
  console.log('click')
}

const container = document.createElement('div')
container.classList.add('container')
document.body.appendChild(container)

patch(container, vnode)

// ----------------------------------- tovnode -----------------------------------
/*
Converts a DOM node into a virtual node
*/
const realContainer = document.createElement('div')
realContainer.classList.add('real-container')

document.body.appendChild(realContainer)

patch(toVNode(realContainer),vnode)



// ---------------------------------- hook  ----------------------------------
/*
pre,
init,
create,
insert,
prepatch,
update,
postpatch,
destroy,
remove,
post
*/
const hookContainer = document.createElement('div')
document.body.appendChild(hookContainer)

const hook_vnode = h('div.row',{
  hook:{
    pre:() => {
      console.log('pre-hook')
    },
    init(vnode){
      console.log('init-hook', vnode)
    },
    create(emptyVnode,vnode) {
      console.log('create', emptyVnode, vnode)
    },
    insert(vnode){
      console.log('insert', vnode)
    }
  }
}, 'vnode - hooks')
patch(hookContainer, hook_vnode)

const update_vnode = h('div.row', {
  hook:{
    prepatch:function(oldVnode, vnode) {
      console.log('prepatch',oldVnode, vnode)
    },
    update:function(oldVnode, vnode){
      console.log('update',oldVnode, vnode)
    },
    postpatch() {
      console.log('postpatch')
    },
    remove(){
      console.log('remove')
    },
    post() {
      console.log('post')
    }
  }
})
setTimeout(() => {
  patch(hook_vnode, update_vnode)
},2000)


// ---------------------------------- class module ----------------------------------
const classContainer = document.createElement('div');
document.body.appendChild(classContainer)

const class_vnode = h('div', {
  class:{
    active:true,
    selected:false,
  },
},'class-module')

patch(classContainer, class_vnode)

// ----------------------------------  style module ----------------------------------
const styleContainer = document.createElement('div')
document.body.appendChild(styleContainer)
const style_vnode = h('div.row', {
  style:{
    textAlign:'center',
    backgroundColor:'pink',
    lineHeight:'100px',
    opacity:0,
    transition:'opacity 1s',
    delayed:{
      opacity:1
    }
  }
},'你好, 生活')

const opacity_vnode = h(
  "span",
  {
    style: {
      opacity: "1",
      transition: "opacity 1s",
      remove: { opacity: "0" },
    },
  },
  "It's better to fade out than to burn away"
);

patch(styleContainer, opacity_vnode)

// ----------------------------------  EventListener ----------------------------------
const eventContainer = document.createElement('div')
document.body.appendChild(eventContainer)

function sharedHandler(event){
  console.log('hello')
}

const event_vnode = h('div', [
  h('label', 'male'),
  h('input', {
    props:{type:'radio', name:'male', value:0},
    on:{change: sharedHandler}
  }),
  h('label', 'female'),
  h('input', {
    props:{type:'radio', name:'male', value:1},
    on:{change: sharedHandler}
  })
])
patch(eventContainer, event_vnode)
