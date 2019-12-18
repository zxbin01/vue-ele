<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(item,index) in goods" :key="index" :class="{current:currentIndex===index}" @click="clickMenuItem(index,$event)">
            <span class="text border-1px">
              <span class="icon" v-if="item.type > 0" :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-list food-list-hook" v-for="(item,index) in goods" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item border-1px" v-for="(food,index) in item.foods" :key="index" @click="selectFood(food,$event)">
                <div class="icon">
                  <img :src="food.icon" style="width:3.5625rem; height:3.5625rem;">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cart-control :food='food' :update-food-count='updateFoodCount'></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shop-cart :food-list='foodList' :min-price='seller.minPrice' :delivery-price='seller.deliveryPrice'
      :update-food-count='updateFoodCount' @clear='clearCart' ref="shopcart"></shop-cart>
    </div>
    <food :food='selectedFood' :update-food-count='updateFoodCount' ref="food"></food>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import axios from 'axios'
import cartControl from 'components/cartControl/cartControl'
import shopCart from 'components/shopCart/shopCart'
import food from 'components/food/food'

export default {
  data() {
    return {
      goods: [],
      tops: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  props: {
    seller: Object
  },
  components: {
    cartControl,
    shopCart,
    food
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    axios({
      url: '/api2/goods'
    }).then(response => {
      if (response.data.code === 0) {
        this.goods = response.data.data;
        this.$nextTick(() => {
          this._initScroll();
          this._initTops();
        })
      }
    })
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      this.foodsScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      })
    },
    _initTops() {
      const foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let top = 0;
      this.tops.push(top);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        top += item.clientHeight;
        this.tops.push(top);
      }
      console.log(this.tops);
    },
    clickMenuItem(index, event) {
      if (!event._constructed) {
        return;
      }
      const foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      const el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    updateFoodCount(food, isAdd, event) {
      // 过滤系统的点击回调
      if (!event._constructed) {
        return;
      }
      if (isAdd) {
        if (!food.count) {
          // 新增属性加入监视
          this.$set(food, 'count', 1);
        } else {
          food.count++;
        }
      } else {
        if (food.count) {
          food.count--;
        }
      }
    },
    clearCart() {
      this.foodList.forEach(food => {
        food.count = 0;
      });
    },
    selectFood(food, event) {
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
      this.$refs.food.showOrHide(true);
    }
  },
  computed: {
    currentIndex() {
      return this.tops.findIndex((top, index) => {
        return this.scrollY >= top && this.scrollY < this.tops[index + 1];
      })
    },
    foodList() {
      const foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.goods
  display flex
  position absolute
  top 11.125rem
  bottom 2.875rem
  width 100%
  max-width 414px
  overflow hidden
  .menu-wrapper
    flex 0 0 5rem
    width 5rem
    background #f3f5f7
    .menu-item
      display table
      height 3.375rem
      width 3.5rem
      padding 0 0.75rem
      line-height 0.875rem
      &.current
        position relative
        z-index 10
        margin-top -0.0625rem
        background #ffffff
        font-weight 700
        .text
          border-none()
      .icon
        display inline-block
        vertical-align middle
        width 0.75rem
        height 0.75rem
        margin-right 0.125rem
        background-size 0.75rem 0.75rem
        background-repeat no-repeat
        &.decrease
          bg-image('/goods/decrease_3')
        &.discount
          bg-image('/goods/discount_3')
        &.guarantee
          bg-image('/goods/guarantee_3')
        &.invoice
          bg-image('/goods/invoice_3')
        &.special
          bg-image('/goods/special_3')
      .text
        display table-cell
        width 3.5rem
        vertical-align middle
        border-1px(rgba(7,17,27,0.1))
        font-size 0.75rem
  .foods-wrapper
    flex 1
    .title
      padding-left 0.875rem
      height 1.625rem
      line-height 1.625rem
      border-left 0.125rem solid #d9dde1
      font-size 0.75rem
      color rgb(147, 153, 159)
      background #f3f5f7
    .food-item
      display flex
      margin 1.125rem
      padding-bottom 1.125rem
      border-1px(rgba(7,17,27,0.1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex 0 0 3.5625rem
        margin-right 0.625rem
      .content
        flex 1
        .name
          margin 0.125rem 0 0.5rem 0
          height 0.875rem
          line-height 0.875rem
          font-size 0.875rem
          color rgb(7,17,27)
        .desc, .extra
          line-height 0.625rem
          font-size 0.625rem
          color rgb(147,153,159)
        .desc
          line-height 0.75rem
          margin-bottom 0.5rem
        .extra
          .count
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
            right 0
            bottom 0.75rem
</style>