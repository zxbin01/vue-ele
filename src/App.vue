<template>
  <div id="app">
    <ele-header :seller='seller'></ele-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to='/goods'>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/ratings'>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/seller'>商家</router-link>
      </div>
    </div>
    <router-view :seller='seller'></router-view>
  </div>
</template>

<script>
import header from 'components/header/header'
import axios from 'axios'

export default {
  components: {
    'ele-header': header
  },
  data() {
    return {
      seller: {}
    }
  },
  created() {
    axios({
      url: '/api2/seller'
    }).then(response => {
      if (response.data.code === 0) {
        this.seller = response.data.data;
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#app
  width 100%
  max-width 414px
.tab
  display flex
  width 100%
  height 2.5rem
  line-height 2.5rem
  border-1px(rgba(7,17,27,0.1))
  .tab-item
    flex 1
    text-align center
    & > a
      display block
      font-size 0.875rem
      color rgb(77,85,93)
      &.active
        color rgb(240,20,20)
</style>