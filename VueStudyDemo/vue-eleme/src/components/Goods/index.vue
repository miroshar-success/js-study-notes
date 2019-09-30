<template>
  <div class='goods'>
    <div class="scroll-wrapper">
      <ul class="slide-nav">
        <li
          v-for='(item,index) in goods'
          :key='index'
          class='slide-item'
         >{{item.name}}</li>
      </ul>
      <div class="goods-wrapper">

      </div>
    </div>
  </div>
</template>

<script>
  import {getGoods} from '@/common/js/index.js';
  export default{
    name:'goods',
    data() {
      return {
        goods:{}
      }
    },
    methods:{
      fetch() {
        getGoods().then(res => {
          this.goods = res.goods;
          console.log(res.goods);
        })
      }
    }
  }
</script>

<style lang='scss'>
  .goods{
    position:relative;
    height:100%;
    width:100%;
    .scroll-wrapper{
      display:flex;
      position:absolute;
      top:0;
      left:0;
      right:0;
      bottom:48px;
    }
    .slide-nav{
        overflow:auto;
       .slide-item{
        white-space:normal;
        padding:0 12px;
        width:56px;
        height:54px;
        font-size:12px;
        color:rgb(7,17,27);
      }
    }
  }
</style>
