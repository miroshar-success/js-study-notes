<template>
  <span class='support-icon' :class='iconCls'></span>
</template>

<script>
  export default{
    name:'support-icon',
    props:{
      size:{
        type:Number,
        default:1
      },
      type:{
        type:Number,
      }
    },
    computed:{
      /*
      根据传入的大小不同计算出一个动态的class @example: icon-1 decrease
      icon-1 表示图标的大小, decrease表示在该尺寸下的icon类型,然后在css根据不同的icon-size 定义大小, 每个icon-size下不同的icon-type 显示不同的图片
      */
      iconCls(){
        const types = ['decrease','discount','special','invoice','guarantee'];
        return `icon-${this.size} ${types[this.type]}`;
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "@/common/scss/mixin.scss";
  .support-icon{
    display:inline-block;
  }
  .icon-1{
    width:12px;
    height:12px;
    background-size:12px 12px;
    &.decrease{
      @include bg-image("./imgs/decrease_1");
    }
    &.discount{
      @include bg-image("./imgs/discount_1");
    }
    &.special{
      @include bg-image("./imgs/special_1");
    }
    &.invoice{
      @include bg-image("./imgs/invoice_1");
    }
    &.guarantee{
      @include bg-image("./imgs/guarantee_1");
    }
  }
  .icon-2{
    width:16px;
    height:16px;
    background-size:16px 16px;
    &.decrease{
      @include bg-image("./imgs/decrease_1");
    }
    &.discount{
      @include bg-image("./imgs/discount_1");
    }
    &.special{
      @include bg-image("./imgs/special_1");
    }
    &.invoice{
      @include bg-image("./imgs/invoice_1");
    }
    &.guarantee{
      @include bg-image("./imgs/guarantee_1");
    }
  }
</style>
