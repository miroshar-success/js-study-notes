const teleport_button = Vue.createApp({});

teleport_button.component("modal-button",{
  template:`<div>
    <button @click="modalOpen = true">Open full screen modal!</button>
    <div v-if="modalOpen" class="modal">
      I am a modal!
      <div @click="modalOpen = false">close</div>  
    </div>
  </div>`,
  data(){
    return {
      modalOpen:false
    }
  }
});

teleport_button.mount("#teleport-app");


const teleport_app = Vue.createApp({});
teleport_app.component("modal-button",{
  template:`<div>
    <button @click="visible = true">Open full screen modal</button>
      <teleport to="body">
        <div v-if="visible" class="modal">
          I am a modal!
          <button @click="visible = false">close</button>
        </div>
      </teleport>
    </div>`,
    data(){
      return {
        visible:false
      }
    }
});

teleport_app.mount("#teleport");