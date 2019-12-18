<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :score='seller.serviceScore' :size='36'></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :score='seller.foodScore' :size='36'></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select :desc='desc' :only-content='onlyContent' :ratings='ratings' :select-type='selectType'
      @switchonlycontent='switchOnlyContent' @setselecttype='setSelectType'></rating-select>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating, index) in ratings" v-show="needShow(rating)" :key="index">
            <div class="avatar">
              <img :src="rating.avatar" style="width:1.75rem; height:1.75rem;">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :score='rating.score' :size='24'></star>
                <span class="delivery">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>
                <span class="item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | dateString}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import BScroll from 'better-scroll'
import star from 'components/star/star'
import ratingSelect from 'components/ratingSelect/ratingSelect'
import split from 'components/split/split'

const ALL = 2;

export default {
  data() {
    return {
      ratings: [],
      onlyContent: true,
      selectType: ALL
    }
  },
  props: {
    seller: Object
  },
  components: {
    ratingSelect,
    split,
    star
  },
  created() {
    this.desc = {
      all: '全部',
      positive: '满意',
      negative: '不满意'
    },
    axios({
      url: '/api2/ratings'
    }).then(res => {
      if (res.data.code === 0) {
        this.ratings = res.data.data;
        this.$nextTick(() => {
          if (this.$refs.ratings) {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          }
        });
      }
    });
  },
  methods: {
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
    },
    needShow(rating) {
      const {rateType, text} = rating;
      const selectType = this.selectType;
      const onlyContent = this.onlyContent;
      if (selectType === 2) {
        return !onlyContent || text.length > 0;
      } else {
        return selectType === rateType && (!onlyContent || text.length > 0);
      }
    }
  },
  filters: {
    dateString(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.ratings
  position absolute
  top 10.875rem
  bottom 0
  left 0
  width 100%
  max-width 414px
  overflow hidden
  .overview
    display flex
    padding 1.125rem 0
    .overview-left
      flex 0 0 8.5625rem
      padding 0.375rem 0
      width 8.5625rem
      border-right 0.0625rem solid rgba(7,17,27,0.1)
      text-align center
      @media only screen and (max-width 320px)
        flex 0 0 6.875rem
        width 6.875rem
      .score
        margin-bottom 0.375rem
        line-height 1.75rem
        font-size 1.5rem
        color rgb(255,153,0)
      .title
        margin-bottom 0.5rem
        line-height 0.75rem
        font-size 0.75rem
        color rgb(7,17,27)
      .rank
        line-height 0.625rem
        font-size 0.625rem
        color rgb(147,153,159)
    .overview-right
      flex 1
      padding 0.375rem 0 0.375rem 1.5rem
      @media only screen and (max-width 320px)
        padding-left 0.375rem
      .score-wrapper
        margin-bottom 0.5rem
        font-size 0
        .title
          display inline-block
          line-height 1.125rem
          vertical-align top
          font-size 0.75rem
          color rgb(7,17,27)
        .star
          display inline-block
          margin 0 0.75rem
          vertical-align top
        .score
          display inline-block
          line-height 1.125rem
          vertical-align top
          font-size 0.75rem
          color rgb(255,153,0)
      .delivery-wrapper
        font-size 0
        .title
          line-height 1.125rem
          font-size 0.75rem
          color rgb(7,17,27)
        .delivery
          margin-left 0.75rem
          font-size 0.75rem
          color rgb(147,153,159)
  .rating-wrapper
    padding 0 1.125rem
    .rating-item
      display flex
      padding 1.125rem 0
      border-1px(rgba(7,17,27,0.1))
      .avatar
        flex 0 0 1.75rem
        width 1.75rem
        margin-right 0.75rem
        img
          border-radius 50%
      .content
        position relative
        flex 1
        .name
          margin-bottom 0.25rem
          line-height 0.75rem
          font-size 0.625rem
          color rgb(7,17,27)
        .star-wrapper
          margin-bottom 0.375rem
          font-size 0
          .star
            display inline-block
            margin-right 0.375rem
            vertical-align top
          .delivery
            display inline-block
            vertical-align top
            line-height 0.75rem
            font-size 0.625rem
            color rgb(147,153,159)
        .text
          margin-bottom 0.5rem
          line-height 1.125rem
          color rgb(7,17,27)
          font-size 0.75rem
        .recommend
          line-height 1rem
          font-size 0
          .icon-thumb_up, .icon-thumb_down, .item
            display inline-block
            margin 0 0.5rem 0.25rem 0
            font-size 0.5625rem
          .icon-thumb_up
            color rgb(0,160,220)
          .icon-thumb_down
            color rgb(147,153,159)
          .item
            padding 0 0.375rem
            border 0.0625rem solid rgba(7,17,27,0.1)
            border-radius 0.0625rem
            color rgb(147,153,159)
            background #ffffff
        .time
          position absolute
          top 0
          right 0
          line-height 0.75rem
          font-size 0.625rem
          color rgb(147,153,159)
</style>