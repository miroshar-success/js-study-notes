const ref_app = Vue.createApp({
  template:`<div>
    <p>使用ref创建的counter变量: <button @click.stop="add_1">{{counter1}}</button></p>
    <p>使用reactive创建的counter对象: <button @click.stop="add_2">{{counter2.counter}}</button></p>
  </div>`,
  setup(){
    let counter1 = Vue.ref(0);
    let counter2 = Vue.reactive({counter:0});
    function add_1(){
      counter1.value += 1;
    }
    function add_2(){
      counter2.counter += 1;
    }
    return {counter1,counter2,add_1,add_2}
  }
})
ref_app.mount("#ref-app");



const reactive_app = Vue.createApp({
  template:`<div>
    <p>使用ref创建的对象, <button @click.stop="changeName">firstName:{{user.firstName}}--lastName:{{user.lastName}}</button></p>
    <p>使用reactive创建的变量, <button @click.stop="add">{{counter.counter}}</button></p>
  </div>`,
  setup(){
    let counter = Vue.reactive({counter:0});
    let user = Vue.ref({firstName:"kyrie",lastName:"irving"});
    function add(){
      counter.counter += 1;
    }
    function changeName(){
      user.value.firstName = 'lebron';
      user.value.lastName = 'james';
    }
    return {counter,user,add,changeName}
  }
}).mount("#reactive-app");



const array_app = Vue.createApp({
  template:`<div>
    <ul>
      <li v-for="(singer,index) in singerList" :key="'singer-'+index">{{singer}}</li>
    </ul>
    <ul>
      <li v-for="(player,index) in playerList" :key="'player-'+index">{{player}}</li>
    </ul>
    <button @click.stop="addSinger">add-singer</button> <button @click.stop="addPlayer">add-player</button>
  </div>`,
  setup(){
    const singerList = Vue.ref(['周杰伦','王力宏','林俊杰']);
    const playerList = Vue.reactive(['詹姆斯','欧文','韦德']);
    function addSinger(){
      singerList.value.push("潘玮柏");
    }
    function addPlayer(){
      playerList.push('博士');
    }
    return {
      singerList,
      playerList,
      addSinger,
      addPlayer
    }
  }
}).mount("#array-ref");