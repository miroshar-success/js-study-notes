// ------------------------ setup 生命周期函数 --------------------
const { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnMounted} = Vue
Vue.createApp({
  setup(){
    const count = Vue.ref(0)

    function increase(){
      count.value += 1
    }
    onBeforeMount(() => {
      console.log('onBeforeMount...')
    })
    onMounted(() => {
      console.log('onMounted...')
    })
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate...')
    })
    onUpdated(() => {
      console.log('onUpdated...')
    })
    return {
      count,
      increase
    }
  }
}).mount('#setup-demo')


// --------------------- computed -----------------------
const { computed, createApp, ref } = Vue;
createApp({
  setup() {
    const message = ref('hello world')
    const count = ref(0)

    function increase(){
      count.value += 1
    }

    const double = computed(() => count.value*2)
    const reverseMessage = computed(() => message.value.split('').reverse().join(''))
    return {
      message,
      increase,
      double,
      count,
      reverseMessage
    }
  }
}).mount('#setup-computed')

const { watch, reactive } = Vue;
// ------------------------ watch -----------------
createApp({
  setup() {
    const count = ref(0)
    const player = reactive({
      firstName:'kyrie',
      lastName:'irving',
      age:30
    })

    function increase(){
      count.value += 1;
    }
    // ---- 监听一个变量-----
    watch(count,(newValue, oldValue) => {
      console.log(newValue, oldValue)
    })

    function change_age(){
      player.age += 1
    }
    // 监听对象, 第一个参数为函数,返回一个对象的属性
    watch(() => player.age,(newValue,oldValue) => {
      console.log(newValue, oldValue)
    })
    // 立刻执行
    watch(player,() => {
      console.log('我执行了吗')
    },{
      immediate:true
    })

    return {
      count,
      increase,
      change_age,
      player
    }
  }
}).mount('#setup-watch')
