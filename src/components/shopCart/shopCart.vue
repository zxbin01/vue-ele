<template>
  <div>
    <div class="shop-cart">
      <div class="content">
        <div class="content-left" @click="toggleList">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: foodList.length}">
              <i class="icon-shopping_cart" :class="{highlight: foodList.length}"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight: foodList.length}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click="pay">
          <div class="pay" :class="payClass">{{payText}}</div>
        </div>
      </div>
      <div class="ball-container"></div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clear">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="(food,index) in foodList" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food='food' :update-food-count='updateFoodCount'></cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggleList"></div>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import cartControl from 'components/cartControl/cartControl'

export default {
  data() {
    return {
      isShow: false
    }
  },
  components: {
    cartControl
  },
  props: {
    foodList: Array,
    minPrice: Number,
    deliveryPrice: Number,
    updateFoodCount: Function
  },
  computed: {
    totalCount() {
      var count = 0;
      this.foodList.forEach(food => {
        count += food.count;
      });
      return count;
    },
    totalPrice() {
      var price = 0;
      this.foodList.forEach(food => {
        price += food.count * food.price;
      });
      return price;
    },
    payText() {
      if (this.totalCount === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        return `还差￥${this.minPrice-this.totalPrice}元起送`;
      } else {
        return `去结算`;
      }
    },
    payClass() {
      return this.totalPrice < this.minPrice ? 'not-enough' : 'enough';
    },
    listShow() {
      if (this.foodList.length === 0) {
        this.isShow = false;
        return false;
      }
      if (this.isShow) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
      return this.isShow;
    }
  },
  methods: {
    toggleList() {
      if (this.foodList.length) {
        this.isShow = !this.isShow;
      }
    },
    clear() {
      if (confirm('确定清空购物车吗？')) {
        this.$emit('clear', this.foodList);
      }
    },
    pay() {
      if (this.totalPrice - this.minPrice >= 0) {
        alert(`支付${this.totalPrice + this.deliveryPrice}`);
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.shop-cart
  position fixed
  left 0
  bottom 0
  z-index 50
  width 100%
  max-width 414px
  height 3rem
  .content
    display flex
    background #141d27
    font-size 0
    color rgba(255,255,255,0.4)
    .content-left
      flex 1
      .logo-wrapper
        display inline-block
        vertical-align top
        position relative
        top -0.625rem
        margin 0 0.75rem
        padding 0.375rem
        width 3.5rem
        height 3.5rem
        box-sizing border-box
        border-radius 50%
        background #141d27
        .logo
          width 100%
          height 100%
          border-radius 50%
          text-align center
          background #2b343c
          &.highlight
            background rgb(0,160,220)
          .icon-shopping_cart
            line-height 2.75rem
            font-size 1.5rem
            color #80858a
            &.highlight
              color #ffffff
        .num
          position absolute
          top 0
          right 0
          width 1.5rem
          height 1rem
          line-height 1rem
          text-align center
          border-radius 1rem
          font-size 0.5625rem
          font-weight 700
          color #ffffff
          background rgb(240,20,20)
          box-shadow 0 0.25rem 0.5rem 0 rgba(0,0,0,0.4)
      .price
        display inline-block
        vertical-align top
        margin-top 0.75rem
        line-height 1.5rem
        padding-right 0.75rem
        box-sizing border-box
        border-right 0.0625rem solid rgba(255,255,255,0.1)
        font-size 1rem
        font-weight 700
        &.highlight
          color #ffffff
      .desc
        display inline-block
        vertical-align top
        margin 0.75rem 0 0 0.75rem
        line-height 1.5rem
        font-size 0.625rem
    .content-right
      flex 0 0 6.5625rem
      width 6.5625rem
      .pay
        height 3rem
        line-height 3rem
        text-align center
        font-size 0.75rem
        font-weight 700
        &.not-enough
          background #2b333b
        &.enough
          background #00b43c
          color #ffffff
  .shopcart-list
    position absolute
    left 0
    top 0
    z-index -1
    width 100%
    transform translate3d(0,-100%,0)
    &.fold-enter-active, &.fold-leave-active
      transition all 0.5s
    &.fold-enter, &.fold-leave-active
      transform translate3d(0,0,0)
    .list-header
      height 2.5rem
      line-height 2.5rem
      padding 0 1.125rem
      background #f3f5f7
      border-bottom 0.0625rem solid rgba(7,17,27,0.1)
      .title
        float left
        font-size 0.875rem
        color rgb(7,17,27)
      .empty
        float right
        font-size 0.75rem
        color rgb(0,160,220)
    .list-content
      padding 0 1.125rem
      max-height 217px
      overflow hidden
      background #ffffff
      .food
        position relative
        padding 0.75rem 0
        box-sizing border-box
        border-1px(rgba(7,17,27,0.1))
        .name
          line-height 1.5rem
          font-size 0.875rem
          color rgb(7,17,27)
        .price
          position absolute
          right 5.625rem
          bottom 0.75rem
          line-height 1.5rem
          font-size 0.875rem
          font-weight 700
          color rgb(240,20,20)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 0.375rem
.list-mask
  position fixed
  top 0
  left 0
  width 100%
  max-width 414px
  height 100%
  z-index 40
  backdrop-filter blur(10px)
  opacity 1
  background rgba(7,17,27,0.6)
  &.fade-enter-active, &.fade-leave-active
    transition all 0.5s
  &.fade-enter, &.fade-leave-active
    opacity 0
    background rgba(7,17,27,0)
</style>