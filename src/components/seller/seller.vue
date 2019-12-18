<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :score='seller.score' :size='36'></star>
          <span class="text">{{seller.ratingCount}}</span>
          <span class="text">月售{{seller.saleCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggle">
          <span class="icon-favorite" :class="{active: favorite}"></span>
          <span class="text">{{favorite ? '已收藏' : '收藏'}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li class="support-item border-1px" v-for="(support, index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[support.type]"></span>
            <span class="text">{{support.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="(pic, index) in seller.pics" :key="index">
              <img :src="pic" style="width:7.5rem; height:5.625rem;">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="(info, index) in seller.infos" :key="index">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import split from 'components/split/split'
import star from 'components/star/star'

export default {
  data() {
    return {
      favorite: localStorage.favorite === 'true'
    }
  },
  props: ['seller'],
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$nextTick(() => {
      if (this.$refs.seller) {
        new BScroll(this.$refs.seller, {
          click: true
        });
      }
      if (this.$refs.picWrapper) {
        var liWidth = 120;
        var space = 6;
        var liLength = this.$refs.picList.children.length;
        this.$refs.picList.style.width = (liWidth + space) * liLength - space + 'px';
        new BScroll(this.$refs.picWrapper, {
          click: true,
          scrollX: true  // 水平方向
        });
      }
    });
  },
  methods: {
    toggle(event) {
      if (!event._constructed) {
        return;
      }
      this.favorite = !this.favorite;
      window.localStorage.favorite = this.favorite;
    }
  },
  components: {
    star,
    split
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.seller
  position absolute
  top 10.875rem
  bottom 0
  left 0
  width 100%
  max-width 414px
  overflow hidden
  .overview
    position relative
    padding 1.125rem
    .title
      margin-bottom 0.5rem
      line-height 0.875rem
      color rgb(7,17,27)
      font-size 0.875rem
    .desc
      padding-bottom 1.125rem
      border-1px(rgba(7,17,27,0.1))
      font-size 0
      .star
        display inline-block
        margin-right 0.5rem
        vertical-align top
      .text
        display inline-block
        margin-right 0.75rem
        line-height 1.125rem
        vertical-align top
        font-size 0.625rem
        color rgb(77,85,93)
    .remark
      display flex
      padding-top 1.125rem
      .block
        flex 1
        text-align center
        border-right 0.0625rem solid rgba(7,17,27,0.1)
        &:last-child
          border none
        h2
          margin-bottom 0.25rem
          line-height 0.625rem
          font-size 0.625rem
          color rgb(147,153,159)
        .content
          line-height 1.5rem
          font-size 0.625rem
          color rgb(7,17,27)
          .stress
            font-size 1.5rem
    .favorite
      position absolute
      width 3.125rem
      right 0.6875rem
      top 1.125rem
      text-align center
      .icon-favorite
        display block
        margin-bottom 0.25rem
        line-height 1.5rem
        font-size 1.5rem
        color #d4d6d9
        &.active
          color rgb(240,20,20)
      .text
        line-height 0.625rem
        font-size 0.625rem
        color rgb(77,85,93)
  .bulletin
    padding 1.125rem 1.125rem 0 1.125rem
    .title
      margin-bottom 0.5rem
      line-height 0.875rem
      color rgb(7,17,27)
      font-size 0.875rem
    .content-wrapper
      padding 0 0.75rem 1rem 0.75rem
      border-1px(rgba(7,17,27,0.1))
      .content
        line-height 1.5rem
        font-size 0.75rem
        color rgb(240,20,20)
    .supports
      .support-item
        padding 1rem 0.75rem
        border-1px(rgba(7,17,27,0.1))
        font-size 0
        &:last-child
          border-none()
      .icon
        display inline-block
        width 1rem
        height 1rem
        vertical-align top
        margin-right 0.375rem
        background-size 1rem 1rem
        background-repeat no-repeat
        &.decrease
          bg-image('/seller/decrease_4')
        &.discount
          bg-image('/seller/discount_4')
        &.guarantee
          bg-image('/seller/guarantee_4')
        &.invoice
          bg-image('/seller/invoice_4')
        &.special
          bg-image('/seller/special_4')
      .text
        line-height 1rem
        font-size 0.75rem
        color rgb(7,17,27)
  .pics
    padding 1.125rem
    .title
      margin-bottom 0.75rem
      line-height 0.875rem
      color rgb(7,17,27)
      font-size 0.875rem
    .pic-wrapper
      width 100%
      overflow hidden
      white-space nowrap
      .pic-list
        font-size 0
        .pic-item
          display inline-block
          margin-right 0.375rem
          width 7.5rem
          height 5.625rem
          &:last-child
            margin 0
  .info
    padding 1.125rem 1.125rem 0 1.125rem
    color rgb(7,17,27)
    .title
      padding-bottom 0.75rem
      line-height 0.875rem
      border-1px(rgba(7,17,27,0.1))
      font-size 0.875rem
    .info-item
      padding 1rem 0.75rem
      line-height 1rem
      font-size 0.75rem
      border-1px(rgba(7,17,27,0.1))
      &:last-child
        border-none()
</style>