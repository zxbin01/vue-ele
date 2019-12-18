<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count" @click.stop="updateFoodCount(food,false,$event)"></div>
    </transition>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="updateFoodCount(food,true,$event)"></div>
  </div>
</template>

<script>
export default {
  props: {
    food: Object,
    updateFoodCount: Function
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.cart-control
  font-size 0
  .cart-decrease
    display inline-block
    padding 0.375rem
    line-height 1.5rem
    font-size 1.5rem
    color rgb(0,160,220)
    &.move-enter-active, &.move-leave-active
      transition all 0.4s linear
    &.move-enter, &.move-leave-active
      opacity 0
      transform translate3d(1.5rem,0,0) rotate(180deg)
  .cart-count
    display inline-block
    vertical-align top
    width 0.75rem
    padding-top 0.375rem
    line-height 1.5rem
    text-align center
    font-size 0.875rem
    color rgb(147,153,159)
  .cart-add
    display inline-block
    padding 0.375rem
    line-height 1.5rem
    font-size 1.5rem
    color rgb(0,160,220)
</style>