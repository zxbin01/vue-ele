<template>
  <div class="rating-select">
    <div class="rating-type border-1px">
      <span class="block positive" :class="{active: selectType === 2}" @click="setSelectType(2,$event)">
        {{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" :class="{active: selectType === 0}" @click="setSelectType(0,$event)">
        {{desc.positive}}
        <span class="count">{{positiveLength}}</span>
      </span>
      <span class="block negative" :class="{active: selectType === 1}" @click="setSelectType(1,$event)">
        {{desc.negative}}
        <span class="count">{{ratings.length - positiveLength}}</span>
      </span>
    </div>
    <div class="switch" :class="{on: onlyContent}" @click="switchOnlyContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    desc: Object,
    onlyContent: Boolean,
    ratings: Array,
    selectType: Number
  },
  computed: {
    positiveLength() {
      return this.ratings.reduce((preTotal, rating) => {
        return preTotal + (rating.rateType === 0 ? 1 : 0);
      }, 0);
    }
  },
  methods: {
    setSelectType(type, event) {
      if (!event._constructed) {
        return;
      }
      this.$emit('setselecttype', type);
    },
    switchOnlyContent(event) {
      if (!event._constructed) {
        return;
      }
      this.$emit('switchonlycontent');
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.rating-select
  .rating-type
    padding 1.125rem 0
    margin 0 1.125rem
    border-1px(rgba(7,17,27,0.1))
    font-size 0
    .block
      display inline-block
      padding 0.5rem 0.75rem
      margin-right 0.5rem
      line-height 1rem
      border-radius 0.0625rem
      font-size 0.75rem
      color rgb(77,85,93)
      &.active
        color #ffffff
      .count
        margin-left 0.125rem
        font-size 0.5rem
      &.positive
        background rgba(0,160,220,0.2)
        &.active
          background rgb(0,160,220)
      &.negative
        background rgba(77,85,93,0.2)
        &.active
          background rgb(77,85,93)
  .switch
    padding 0.75rem 1.125rem
    line-height 1.5rem
    border-bottom 0.0625rem solid rgba(7,17,27,0.1)
    color rgb(147,153,159)
    font-size 0
    &.on
      .icon-check_circle
        color #00c850
    .icon-check_circle
      display inline-block
      vertical-align top
      margin-right 0.25rem
      font-size 1.5rem
    .text
      display inline-block
      vertical-align top
      font-size 0.75rem
</style>