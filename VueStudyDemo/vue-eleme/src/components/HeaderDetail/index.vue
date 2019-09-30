<template>
  <transition name='fade'>
    <div class="head-detail clearfix" v-show='visible'>
      <div class="wrapper">
        <div class="content">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <Star :size='48' :score='seller.score'/>
            </div>
            <div class="supports-wrapper">
              <h1 class="title">优惠信息</h1>
              <ul class="supports-list">
                <li class='support-item' v-for='(item,index) in seller.supports' :key='index'>
                  <SupportIcon :size='2' :type='item.type'/>
                  <span class='support-text'>{{item.description}}</span>
                </li>
              </ul>
            </div>
            <div class="bulletin-wrapper">
              <h1 class="title">商家公告</h1>
              <p class="text">{{seller.bulletin}}</p>
            </div>
        </div>
      </div>
      <div class="footer">
        <i class="iconfont icon-baseline-close-px icon-close"></i>
      </div>
    </div>
  </transition>
</template>

<script>
  import Star from '@/components/Star'
  import SupportIcon from '@/components/SupportIcon'
  export default{
    name:'head-detail',
    data() {
      return {
        visible:false
      }
    }, 
    props:{
      seller:{
        type:Object,
        default: function() {
          return {}
        }
      }
    }, 
    components: { Star,SupportIcon },
    methods:{
      show() {
        this.visible = true;
      }
    }
  }
</script>

<style scoped lang='scss'>
  @import '@/common/scss/index.scss';
  .head-detail{
    position:fixed;
    left:0;
    top:0;
    right:0;
    height:100%;
    background-color:rgba(7,17,27,0.8);
    z-index:100;
    overflow:auto;
  }
  .wrapper{
    color:#fff;
    padding:0 36px;
    min-height:100%;
    .content{
      padding-bottom:64px;
    }
    .name{
      padding-top:64px;
      font-size:16px;
      font-weight:700;
      line-height:16px;
      text-align:center;
    }
    .star-wrapper{
      margin-top:16px;
      margin-bottom:28px;
      height:24px;
      text-align:center;
    }
    .title{
      display:flex;
      justify-content:space-between;
      align-items:center;
      font-size:14px;
      font-weight:bold;
      height:14px;
      line-height:14px;
    }
    .title:before,.title:after{
      content:'';
      display:block;
      height:1px;
      flex:1;
      background-color:rgb(255,255,255,0.2);
    }
    .title:before{
      margin-right:12px;
    }
    .title:after{
      margin-left:12px;
    }
    .supports-list{
      padding:24px 0 28px 12px;
    }
    .support-item{
      margin-top:12px;
      height:16px;
      line-height:16px;
      &:first-child{
        margin-top:0;
      }
      .support-text{
        vertical-align:top;
        font-size:12px;
        margin-left:6px;
      }
    }
    .bulletin-wrapper{
      .text{
        margin-top:24px;
        font-size:12px;
        line-height:24px;
      }
    }
  }
  .footer{
    margin:-64px auto 0;
    position:relative;
    height:32px;
    width:32px;
    line-height:32px;
    .icon-close{
      font-size:32px;
    }
  }
</style>
