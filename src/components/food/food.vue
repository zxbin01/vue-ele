<template>
  <transition name="move">
    <div class="food" v-show="isShow" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="showOrHide(false)">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cart-control :food='food' :update-food-count='updateFoodCount'></cart-control>
          </div>
          <div class="buy" v-if="!food.count" @click="updateFoodCount(food,true,$event)">加入购物车</div>
        </div>
        <split></split>
        <div class="info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <rating-select :desc='desc' :only-content='onlyContent' :ratings='food.ratings'
          :select-type='selectType' @switchonlycontent='switchOnlyContent' @setselecttype='setSelectType'
          v-if="food.ratings"></rating-select>
          <div class="rating-wrapper">
            <ul>
              <li class="rating-item border-1px" v-for="(rating,index) in filterRatings" :key="index">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" style="width:0.75rem; height:0.75rem;" class="avatar">
                </div>
                <div class="time">{{rating.rateTime}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up': rating.rateType == 0, 'icon-thumb_down': rating.rateType == 1}"></span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || food.ratings.length === 0">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import cartControl from 'components/cartControl/cartControl'
import ratingSelect from 'components/ratingSelect/ratingSelect'
import split from 'components/split/split'

const ALL = 2; // 全部

export default {
  data() {
    return {
      isShow: false,
      onlyContent: false,
      selectType: ALL
    }
  },
  props: {
    food: Object,
    updateFoodCount: Function
  },
  created() {
    this.desc = {
      all: '全部',
      positive: '推荐',
      negative: '吐槽'
    }
  },
  methods: {
    showOrHide(isShow) {
      this.isShow = isShow;
      if (this.isShow) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh();
          }
        });
      }
    },
    switchOnlyContent() {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    setSelectType(selectType) {
      this.selectType = selectType;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  },
  computed: {
    filterRatings() {
      if (!this.food.ratings) {
        return [];
      }
      const ratings = this.food.ratings;
      const selectType = this.selectType;
      const onlyContent = this.onlyContent;
      return ratings.filter(rating => {
        var {rateType, text} = rating;
        if (selectType === 2) {
          return !onlyContent || text.length > 0;
        } else {
          return selectType === rateType && (!onlyContent || text.length > 0);
        }
      });
    }
  },
  components: {
    ratingSelect,
    cartControl,
    split
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.food
  position fixed
  left 0
  top 0
  bottom 3rem
  z-index 30
  width 100%
  max-width 414px
  background #ffffff
  &.move-enter-active, &.move-leave-active
    transition transform 0.2s linear
  &.move-enter, &.move-leave-active
    transform translate3d(100%,0,0)
  .image-header
    position relative
    width 100%
    height 0
    padding-top 100%
    img
      position absolute
      top 0
      left 0
      width 100%
      height 100%
    .back
      position absolute
      top 0.625rem
      left 0
      .icon-arrow_lift
        display block
        padding 0.625rem
        font-size 1.25rem
        color #ffffff
  .content
    position relative
    padding 1.125rem
    .title
      line-height 0.875rem
      margin-bottom 0.5rem
      font-size 0.875rem
      font-weight 700
      color rgb(7,17,27)
    .detail
      margin-bottom 1.125rem
      line-height 0.625rem
      height 0.625rem
      .sell-count, .rating
        font-size 0.625rem
        color rgb(147,153,159)
      .sell-count
        margin-right 0.75rem
    .price
      font-weight 700
      line-height 1.5rem
      .now
        margin-right 0.5rem
        font-size 0.875rem
        color rgb(240,20,20)
      .old
        text-decoration line-through
        font-size 0.625rem
        color rgb(147,153,159)
    .cartcontrol-wrapper
      position absolute
      right 0.75rem
      bottom 0.75rem
    .buy
      position absolute
      right 1.125rem
      bottom 1.125rem
      z-index 10
      height 1.5rem
      line-height 1.5rem
      padding 0 0.75rem
      box-sizing border-box
      border-radius 0.75rem
      font-size 0.625rem
      color #ffffff
      background rgb(0,160,220)
      &.fade-transition
        transition all 0.2s
        opacity 1
      &.fade.enter, &.fade-leave
        opacity 0
  .info
    padding 1.125rem
    .title
      line-height 0.875rem
      margin-bottom 0.375rem
      font-size 0.875rem
      color rgb(7,17,27)
    .text
      line-height 1.5rem
      padding 0 0.5rem
      font-size 0.75rem
      color rgb(77,85,93)
  .rating
    padding-top 1.125rem
    .title
      line-height 0.875rem
      margin-left 1.125rem
      font-size 0.875rem
      color rgb(7,17,27)
    .rating-wrapper
      padding 0 1.125rem
      .rating-item
        position relative
        padding 1rem 0
        border-1px(rgba(7,17,27,0.1))
        .user
          position absolute
          right 0
          top 1rem
          line-height 0.75rem
          .name
            display inline-block
            margin-right 0.375rem
            vertical-align top
            font-size 0.625rem
            color rgb(147,153,159)
          .avatar
            border-radius 50%
        .time
          margin-bottom 0.375rem
          line-height 0.75rem
          font-size 0.625rem
          color rgb(147,153,159)
        .text
          line-height 1rem
          font-size 0.75rem
          color rgb(7,17,27)
          .icon-thumb_up, .icon-thumb_down
            margin-right 0.25rem
            line-height 1rem
            font-size 0.75rem
          .icon-thumb_up
            color rgb(0,160,220)
          .icon-thumb_down
            color rgb(147,153,159)
      .no-rating
        padding 1rem 0
        font-size 0.75rem
        color rgb(147,153,159)
</style>