// 在组件上使用teleport
const teleport_component = Vue.createApp({
  template:`<div>
    <h1>Root instance</h1>
    <parent-component></parent-component>
  </div>`
})

teleport_component.component("parent-component",{
  template:`<div>
    <h2>This is a parent component</h2>
    <teleport to="body">
      <child-component name="John"></child-component>
    </teleport>
  </div>`
})

teleport_component.component("child-component",{
  props:['name'],
  template:`<div>Hello, {{name}}</div>`
});

teleport_component.mount("#teleport-component");