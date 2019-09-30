<template>
  <div class='star' :class='starType'>
    <span
      class='star-item'
      v-for='(item,index) in itemClasses'
      :key='index'
      :class='item'
     ></span>
  </div>
</template>

<script>
  const LENGTH = 5;
  const CLASS_ON = 'on';
  const CLASS_HALF = 'half';
  const CLASS_OFF = 'off';
  export default{
    name:'star',
    props:{
      size:{
        type:Number
      },
      score:{
        type:Number
      }
    },
    computed:{
      starType(){
        return `star-${this.size}`;
      },
      itemClasses(){
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1;
        let integer = Math.floor(score);
        for(let i = 0; i < integer; i++){
          result.push(CLASS_ON);
        }
        if (hasDecimal) {
          result.push(CLASS_HALF);
        }
        while(result.length < LENGTH){
          result.push(CLASS_OFF);
        }
        return result;
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '@/common/scss/index.scss';
  .star{
    font-size:0;
  }
  .star-48{
    height:24px;
    .star-item{
      display:inline-block;
      margin-right:20px;
      height:24px;
      width:24px;
      background-size:24px 24px;
      &:last-child{
        margin-right:0;
      }
      &.on{
        @include bg-image('./imgs/star48_on');
      }
      &.half{
        @include bg-image('./imgs/star48_half');
      }
      &.off{
        @include bg-image('./imgs/star48_off');
      }
    }
  }

</style>
