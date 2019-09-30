<template>
  <div class="tab">
    <cube-tab-bar
      v-model='selectedLabel'
      :data='tabs'
      :showSlider='true'
      @click='handleChangeTab'
      ref='tab'
      :useTransition='false'
    ></cube-tab-bar>
    <cube-slide
      ref='slide'
      :auto-play='false'
      :showDots='false'
      :initialIndex='index'
      :options='options'
      @change='handleChangePage'
      @scroll='scroll'
      :loop='false'
      >
      <cube-slide-item
          v-for='(tab,index) in tabs'
          :key='index'
      >
        <keep-alive>
          <component :is='tab.component' ref='component'></component>
        </keep-alive>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
  export default{
    name:'top-tab',
    data() {
      return {
        index:0,
        selectedLabel:this.tabs[0].label,
        options:{
          listenScroll:true,
          probeType:3,
          directionLockThreshold:0
        }
      }
    },
    props:{
      tabs:{
        type:Array,
        default:function() {
          return []
        }
      }
    },
    mounted() {
      this.handleChangePage(this.index);
    },
    methods:{
      handleChangeTab(tab){
        let current = this.tabs.findIndex(value => {
          return value.label === tab;
        })
        this.index = current;
      },
      scroll(pos){
        let oTabWidth = this.$refs.tab.$el.offsetWidth/3;
        let oPageWidth = this.$refs.tab.$el.offsetWidth;
        let transformX = Math.abs(pos.x) / oPageWidth * oTabWidth;
        this.$refs.tab.setSliderTransform(transformX);
      },
      // 在页面滚动的时候,如果组件有获取数据的方法，则调用该方法
      handleChangePage(current){
        this.selectedLabel = this.tabs[current].label;
        const component = this.$refs.component[current];
        component.fetch && component.fetch();
      }
    }
  }
</script>

<style lang='scss'>
  @import '@/common/scss/index.scss';
  .tab{
    position:fixed;
    top:134px;
    bottom:0;
    left:0;
    right:0;
    display:flex;
    flex-direction:column;
    .slide-wrapper{
      flex:1;
    }
  }
  .cube-tab-bar{
    height:40px;
    background-color:#fff;
    @include border-bottom-1px($border-color);
    .cube-tab{
      line-height:14px;
      font-size:14px;
    }
  }

</style>
