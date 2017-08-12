<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" class="item-class" :class="itemClass"></span>
  </div>
</template>

<script type='text/ecmascript-6'>
  let LENGTH = 5
  let STAR_ON = 'on'
  let STAR_HALF = 'half'
  let STAR_OFF = 'off'
  export default {
    props: {
      score: {
        type: Number
      },
      size: {
        type: Number
      }
    },
    computed: {
      starType(){
        return 'star-' + this.size
      },
      itemClasses(){
        let classArr = []
        let score = Math.floor(this.score * 2) / 2
        let scoreFlag = score % 1 !== 0
        let endFor = Math.floor(score)
        for (let i = 0; i < endFor; i++) {
          classArr.push(STAR_ON)
        }
        if (scoreFlag) {
          classArr.push(STAR_HALF)
        }
        while (classArr.length < LENGTH) {
          classArr.push(STAR_OFF)
        }
        return classArr
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .star
    font-size: 0px
    position: relative
    .item-class
      display: inline-block
      background-repeat: no-repeat

  .star-24
    .on
      width: 10px
      height: 10px
      img-bg('star48_on')
      background-size: 10px 10px
      margin-right: 4px
      &:last-child
        margin-right: 0
    .half
      width: 10px
      height: 10px
      img-bg('star48_half')
      background-size: 10px 10px
      margin-right: 4px
      &:last-child
        margin-right: 0
    .off
      width: 10px
      height: 10px
      img-bg('star48_off')
      background-size: 10px 10px
      margin-right: 4px
      &:last-child
        margin-right: 0

  .star-36
    .on
      width: 15px
      height: 15px
      img-bg('star48_on')
      background-size: 15px 15px
      margin-right: 6px
      &:last-child
        margin-right: 0
    .half
      width: 15px
      height: 15px
      img-bg('star48_half')
      background-size: 15px 15px
      margin-right: 6px
      &:last-child
        margin-right: 0
    .off
      width: 15px
      height: 15px
      img-bg('star48_off')
      background-size: 15px 15px
      margin-right: 6px
      &:last-child
        margin-right: 0

  .star-48
    .on
      width: 20px
      height: 20px
      img-bg('star48_on')
      background-size: 20px 20px
      margin-right: 21.5px
      &:last-child
        margin-right: 0
    .half
      width: 20px
      height: 20px
      img-bg('star48_half')
      background-size: 20px 20px
      margin-right: 21.5px
      &:last-child
        margin-right: 0
    .off
      width: 20px
      height: 20px
      img-bg('star48_off')
      background-size: 20px 20px
      margin-right: 21.5px
      &:last-child
        margin-right: 0


</style>
