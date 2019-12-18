<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" style="width: 4rem; height: 4rem;">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟到达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="supports_count" v-if="seller.supports" @click="showDetail(true)">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail(true)">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper">
        <div class="detail-main clearfix">
          <div class="name">{{seller.name}}</div>
          <div class="star-wrapper">
            <star :score='seller.score' :size='48'></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports" v-if="seller.supports">
            <li class="support" v-for="(item, index) in seller.supports" :key="index">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="content">
            <p>{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="showDetail(false)">
        <span class="icon-close"></span>
      </div>
    </div>
  </div>
</template>

<script>
import star from 'components/star/star'

export default {
  data() {
    return {
      detailShow: false
    }
  },
  props: {
    seller: Object
  },
  methods: {
    showDetail(isShow) {
      this.detailShow = isShow;
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"]
  },
  components: {
    star
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.header
  position relative
  color rgb(255,255,255)
  overflow hidden
  background-color rgba(7,17,27,0.5)
  .content-wrapper
    position relative
    padding 1.5rem 0.75rem 1.125rem 1.5rem
    .avatar
      display inline-block
      vertical-align top
    .content
      display inline-block
      margin-left 1rem
      .title
        margin 0.125rem 0 0.5rem 0
        .brand
          margin-right 0.375rem
          vertical-align top
          bg-image("/header/brand")
          display inline-block
          width 1.875rem
          height 1.125rem
          background-size 1.875rem 1.125rem
          background-repeat no-repeat
        .name
          font-size 1rem
          line-height 1.125rem
          font-weight bold
      .description
        font-size 0.75rem
        font-weight 200
        line-height 0.75rem
      .support
        margin 0.625rem 0 0.125rem 0
        .icon
          margin-right 0.25rem
          vertical-align middle
          display inline-block
          width 0.75rem
          height 0.75rem
          background-size 0.75rem 0.75rem
          background-repeat no-repeat
          &.decrease
            bg-image("/header/decrease_1")
          &.discount
            bg-image("/header/discount_1")
          &.guarantee
            bg-image("/header/guarantee_1")
          &.invoice
            bg-image("/header/invoice_1")
          &.special
            bg-image("/header/special_1")
        .text
          font-size 0.625rem
          font-weight 200
          line-height 0.75rem
    .supports_count
      position absolute
      right 0.75rem
      bottom 0.9375rem
      height 1.5rem
      padding 0.1875rem 0.5rem
      border-radius 0.875rem
      background-color rgba(0,0,0,0.2)
      box-sizing border-box
      .count
        vertical-align middle
        font-size 0.625rem
        line-height 0.75rem
        font-weight 200
        margin-right 0.125rem
      .icon-keyboard_arrow_right
        font-size 0.625rem
        line-height 0.75rem
        font-weight 200
  .bulletin-wrapper
    background-color rgba(7,17,27,0.2)
    position relative
    padding 0 1.25rem 0 0.75rem
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    display block
    .bulletin-title
      vertical-align middle
      display inline-block
      width 1.375rem
      height 0.75rem
      bg-image("/header/bulletin")
      background-size 100% 100%
      background-repeat no-repeat
      margin-right 0.125rem
    .bulletin-text
      font-size 0.625rem
      line-height 1.75rem
    .icon-keyboard_arrow_right
      position absolute
      right 0.75rem
      bottom 0.5625rem
      font-size 0.625rem
  .background
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    z-index -1
    img
      filter blur(10px)
  .detail
    position fixed
    left 0
    top 0
    z-index 100
    width 100%
    height 100%
    max-width 414px
    background rgba(7,17,27,0.8)
    overflow auto
    transition all 0.5s
    backdrop-filter blur(10px)
    &.fade-transition
      opacity 1
    &.fade-enter, &.fade-leave
      opacity 0
    .detail-wrapper
      display inline-block
      width 100%
      min-height 100%
      .detail-main
        margin-top 4rem
        padding-bottom 4rem
        .name
          text-align center
          font-size 1rem
          line-height 1rem
          font-weight 700
        .star-wrapper
          margin-top 1rem
          text-align center
        .title
          display flex
          width 80%
          margin 1.75rem auto 1.5rem
          .text
            padding 0 0.75rem
          .line
            flex 1
            position relative
            top -0.4375rem
            border-bottom 0.125rem solid rgba(255,192,203,0.3)
        .supports
          width 80%
          margin 0 auto
          .support
            margin-bottom 0.75rem
            &:last-child
              margin-bottom 0
            .icon
              display inline-block
              width 1rem
              height 1rem
              background-size 1rem 1rem
              background-repeat no-repeat
              vertical-align middle
              margin-right 0.375rem
              &.discount
                bg-image("/header/discount_2")
              &.decrease
                bg-image("/header/decrease_2")
              &.guarantee
                bg-image("/header/guarantee_2")
              &.invoice
                bg-image("/header/invoice_2")
              &.special
                bg-image("/header/special_2")
            .text
              font-size 0.75rem
              line-height 0.75rem
              font-weight 200
        .content
          width 80%
          margin 0 auto
          font-size 0.75rem
          line-height 1.5rem
          font-weight 200
    .detail-close
      margin-top -4rem
      clear both
      text-align center
      .icon-close
        display inline-block
        width 2rem
        height 2rem
        font-size 2rem
</style>