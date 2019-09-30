<template>
  <header>
    <div class='header-wrapper'>
      <div class='header-img'>
        <img :src='seller.avatar' alt='' width='64' height='64'>
      </div>
      <div class='header-info'>
        <div class='title'>
          <div class="brand"></div>
          <h1 class="name">{{seller.name}}</h1>
         </div>
        <p class='desc'>
          <span>{{seller.description}}</span>
          /
          <span>{{seller.deliveryTime}}分钟送达</span>
        </p>
        <p class='support' v-if='seller.supports'>
          <SupportIcon :size="1" :type="seller.supports[0].type"/>
          <span class="support-text">{{seller.supports[0].description}}</span>
        </p>
      </div>
      <div class='supports-btn'>
        <span v-if='seller.supports' class='supports-count'>{{seller.supports.length}}个</span>
        <i class='iconfont icon-previewright'></i>
      </div>
    </div>
    <div class='bulletin'>
      <span class="bulletin-icon"></span>
      <p class='text'>{{seller.bulletin}}</p>
      <i class='iconfont icon-previewright'></i>
    </div>
    <div class="header-bg" :style='{backgroundImage:"url("+ seller.avatar+")"}'></div>
  </header>
</template>

<script>
  import SupportIcon from '@/components/SupportIcon';
  import HeaderDetail from '@/components/HeaderDetail';
  const CODE_OK = 'ok'
  export default{
    name:'v-head',
    data() {
      return {
        seller:{}
      }
    },
    components: { SupportIcon,HeaderDetail },
    created() {
      this.getSeller()
    },
    methods:{
      getSeller() {
        this.$axios.get('/api/seller').then( response => {
          if(response.data.msg === CODE_OK){
            this.seller = response.data.seller;
            console.log(response.data.seller);
          }
        })
      }
    }
  }
</script>

<style scoped lang='scss'>
  @import '@/common/scss/index.scss';
  header{
    position:relative;
    width:100%;
    color:$color-white;
    overflow:hidden;
  }
  .header-wrapper{
    display:flex;
    position:relative;
    padding:24px 12px 18px 24px;
    background-color:rgba(7,17,27,0.5);
    .header-img{
      width:64px;
      height:64px;
      img{
        display:block;
        width:100%;
        height:100%;
        border-radius:2px;
      }
    }
    .header-info{
      margin-left:16px;
      .title{
        margin-top:2px;
        display:flex;
        height:18px;
        align-items:center;
        .name{
          margin-left:6px;
          font-size:16px;
          font-weight:bold;
          line-height:18px;
        }
        .brand{
          width:30px;
          height:18px;
          @include bg-image("./imgs/brand");
          background-size:30px 18px;
        }
      }
      .desc{
        margin-top:8px;
        font-size:12px;
      }
      .support{
        margin-top:10px;
        height:12px;
        line-height:12px;
        .support-text{
          display:inline-block;
          vertical-align:top;
          margin-left:2px;
          font-size:10px;
        }
      }
    }
    .supports-btn{
      position:absolute;
      right:12px;
      bottom:15px;
      height:24px;
      padding:0 8px;
      background-color:rgba(7,17,27,0.2);
      border-radius:24px;
      line-height:24px;
      text-align:center;
      .supports-count,.icon-previewright{
        font-size:10px;
      }
      .supports-count{
        margin-right:5px;
      }
    }
  }
  .bulletin{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 12px;
    height:10px;
    height:28px;
    background-color:rgba(7,17,27,0.2);
    .bulletin-icon{
      display:block;
      width:22px;
      height:12px;
      @include bg-image("./imgs/bulletin");
      background-size:22px 12px;
    }
    .text{
      margin-left:4px;
      width:100%;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      line-height:28px;
      font-size:10px;
    }
    .icon-previewright{
      margin-left:4px;
      font-size:10px;
    }
  }
  .header-bg{
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    background-repeat:no-repeat;
    background-position:left top;
    background-size:100%;
    filter:blur(10px);
    z-index:-1;
  }
</style>
