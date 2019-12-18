<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(item, index) in starClasses" :key="index" :class="item"></span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLASS_ON = 'on';
const CLASS_HALF = 'half';
const CLASS_OFF = 'off';

export default {
  props: {
    score: Number,
    size: {
      type: Number,
      default: 48
    }
  },
  computed: {
    starClasses() {
      const scs = [];
      const score = this.score;
      const scoreInteger = Math.floor(score);
      for (let i = 0; i < scoreInteger; i++) {
        scs.push(CLASS_ON);
      }
      if (score - scoreInteger >= 0.5) {
        scs.push(CLASS_HALF);
      }
      while (scs.length < LENGTH) {
        scs.push(CLASS_OFF);
      }
      return scs;
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.star
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 1.25rem
      height 1.25rem
      margin-right 1.375rem
      background-size 1.25rem 1.25rem
      &:last-child
        margin-right 0
      &.on
        bg-image("/star/star48_on")
      &.half
        bg-image("/star/star48_half")
      &.off
        bg-image("/star/star48_off")
  &.star-36
    .star-item
      width 0.9375rem
      height 0.9375rem
      margin-right 0.375rem
      background-size 0.9375rem 0.9375rem
      &:last-child
        margin-right 0
      &.on
        bg-image("/star/star36_on")
      &.half
        bg-image("/star/star36_half")
      &.off
        bg-image("/star/star36_off")
  &.star-24
    .star-item
      width 0.625rem
      height 0.625rem
      margin-right 0.1875rem
      background-size 0.625rem 0.625rem
      &:last-child
        margin-right 0
      &.on
        bg-image("/star/star24_on")
      &.half
        bg-image("/star/star24_half")
      &.off
        bg-image("/star/star24_off")
</style>