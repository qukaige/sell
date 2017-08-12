<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span
        class="all-num">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span
        class="positive-num">{{positive.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span
        class="negative-num">{{negative.length}}</span></span>
    </div>
    <div @click="toggleContent($event)" class="switch" :class="{'on' :onlyContent}">
      <span class="icon-check_circle "></span>
      <span class="text">只看内容的评价</span>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  const POSITIVE = 0 //推荐
  const NEGATIVE = 1 //吐槽
  const ALL = 2
  export default {
    props: {
      ratings: {
        type: Array,
        default(){
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default(){
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    methods: {
      select(type, e){
        if (!e._constructed) {
          return
        }
//        修改选择的类型
        this.$root.eventHub.$emit('selectTypeCheange', type)
      },
      toggleContent(e){
        if (!e._constructed) {
          return
        }
//        切换是否只看有内容的评论
        this.$root.eventHub.$emit('changeOnlyContent')
      }
    },
    computed: {
      positive(){
        return this.ratings.filter((rating) => {
          return rating.rateType == POSITIVE
        })
      },
      negative(){
        return this.ratings.filter((rating) => {
          return rating.rateType == NEGATIVE
        })
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratingselect
    .rating-type
      margin: 0 18px
      padding: 18px 0
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 0
      .block
        display inline-block
        padding: 8px 12px
        margin-right: 8px
        &.positive
          font-size: 12px
          color: rgb(77, 85, 93)
          line-height 16px
          background: rgba(0, 160, 220, 0.2)
          .all-num, .positive-num
            margin-left: 4px
            font-size: 8px
        &.negative
          font-size: 12px
          color: rgb(77, 85, 93)
          line-height 16px
          background: rgba(77, 85, 93, 0.2)
          .negative-num
            font-size: 8px
            margin-left: 4px
        &.positive
          &.active
            color: rgb(255, 255, 255)
            background: rgb(0, 160, 220)
        &.negative
          &.active
            color: rgb(255, 255, 255)
            background: rgb(77, 85, 93)
    .switch
      padding: 12px 18px
      font-size: 0
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      &.on
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        font-size: 24px
        line-height: 24px
        color: rgb(147, 153, 159)
        margin-right: 4px
      .text
        font-size: 12px
        line-height: 24px
        vertical-align: top
        color: rgb(147, 153, 159)
</style>
