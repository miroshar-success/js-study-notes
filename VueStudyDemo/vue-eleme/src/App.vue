<template>
  <div id="app">
    <Header/>
    <TabBar :tabs='tabs'/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import Goods from '@/components/Goods'
import Ratings from '@/components/Ratings'
import Seller from '@/components/Seller'

export default {
  name: 'app',
  data(){
    return{
      seller:{},
      goods:{},
      ratgins:{},
      tabs:[
        {
          label:'商品',
          component:Goods,
        },
        {
          label:'评价',
          component:Ratings,
        },
        {
          label:'商家',
          component:Seller,
        }
      ],
    }
  },
  components: {
    Header,TabBar,Goods,Ratings,Seller
  },
}
</script>

<style lang="scss">

</style>
