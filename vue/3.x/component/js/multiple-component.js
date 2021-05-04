console.log('111');

const multiple_component = Vue.createApp({});

multiple_component.component("my-component",{
  template:`<div>
    <teleport to="body">
      <div class="first">第一个元素</div>
    </teleport>
    <teleport to="body">
      <div class="second">第二个元素</div>
    </teleport>
  </div>`
})

multiple_component.mount("#multiple-component")