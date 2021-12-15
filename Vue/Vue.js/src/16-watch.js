const watch_instance = new Vue({
  el:'#watch-element',
  data() {
    return {
      count:0,
      player:{
        age:30
      },
      singer:{
        age:28
      }
    }
  },
  watch: {
/*     count:function(v,o) {
      console.log('count:', v,o)
    } */

    //  给count的属性传递一个数组
/*     count:[function w1(w,v){
      console.log('w1',w, v)
    }, function w2(w, v){
      console.log('w2',w, v)
    }, function w3(w, v){
      console.log('w3', w, v)
    }] */
    // count 为一个对象
    count:{ // 立即执行
      handler:function(v){
        console.log('v', v)
      },
      immediate:true
    },
    // ------------------ 深度监听 ---------------
    player:{
      handler:function(v){
        console.log('player',v)
      },
      deep:true
    },
    // ------------------- 监听对象的属性 ---------------
    'player.age':function(){
      console.log('player-age-changed')
    },
    // 找到一个methods中定义的函数
    'singer.age':'watch_singer_age'
  },
  methods:{
    click() {
      this.count += 1;
      this.player.age += 1
      this.singer.age += 1;
    },
    watch_singer_age(){
      console.log('singer-age-changed')
    }
  }
})


const watch_object = {
  count(){
  },
  age:{
    handler:function(){
    }
  }
}

for(let key in watch_object){
  const handler = watch_object[key] // function
  console.log(key, typeof handler)  // object
}
