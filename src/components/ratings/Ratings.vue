<template>
  <div class="ratings" ref="scroll">
    <div class="ratings-wrap" v-if="seller">
      <div class="ratings-header">
        <div class="ratings-h-left">
          <h1 class="score">{{seller.score}}</h1>
          <span class="overallScore ">综合评分</span>
          <p class="rankRate">高于周边商家 {{seller.rankRate}}%</p>
        </div>
        <div class="ratings-h-right">
          <div class="row">
            <span class="title">服务评分</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="_score">{{seller.serviceScore}}</span>
          </div>
          <div class="row">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="_score">{{seller.foodScore}}</span>
          </div>
          <div class="row">
            <span class="title">送达时间</span>
            <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <split></split>
      <ratingselect :ratings="ratings" :onlyContent="onlyContent" :selectType="selectType"></ratingselect>
      <ul>
        <li class="ratings-item border-1px" v-for="item in ratings" v-show="showItem(item.rateType,item.text)">
          <div class="avatar-wrapper">
            <img :src="item.avatar" width="28" height="28" alt="">
          </div>
          <div class="content">
            <div class="username">{{item.username}}</div>
            <star :size="36" :score="item.score"></star>
            <span class="dTime" v-if="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
            <p class="text">{{item.text}}</p>
            <div class="recommend">
              <i :class="[{'icon-thumb_up':item.rateType===0},{'icon-thumb_down':item.rateType===1}]"></i>
              <span class="tag" v-for="tag in item.recommend">{{tag}}</span>
            </div>
          </div>
          <span class="rateTime">{{item.rateTime | formatDate}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import Star from 'components/star/star'
  import Split from 'components/split/split'
  import RatingSelect from 'components/ratingselect/ratingselect'
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import {formatDate} from 'common/js/data'
  const POSITIVE = 0 //推荐
  const NEGATIVE = 1 //吐槽
  const ALL = 2
  const ERR_OK = 0
  export default {
    props: {
      seller: {
        type: Object,
        default: []
      }
    },
    created(){
      this.$root.eventHub.$on('selectTypeCheange', this._changeSelectType)
      this.$root.eventHub.$on('changeOnlyContent', this._changeOnlyContent)
      axios.get('/api/ratings').then((response) => {
        if (response.data.errno == ERR_OK) {
          this.ratings = response.data.data
          this.$nextTick(() => {
            this.ratScroll = new BScroll(this.$refs.scroll, {
              click: true
            })
          })
        }
      });
    },
    data(){
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: false
      }
    },
    methods: {
      _changeSelectType(type){
        this.selectType = type
        this.$nextTick(() => {
          this.ratScroll.refresh()
        })
      },
      _changeOnlyContent(){
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.ratScroll.refresh()
        })
      },
      showItem(type, text){
        if (this.onlyContent && text && (this.selectType == type || this.selectType == ALL)) {
          return true
        }
        if (this.selectType == ALL && !this.onlyContent) {
          return true
        }
        if (this.selectType == type && !this.onlyContent) {
          return true
        }
        return false
      },
    },
    filters: {
      formatDate(time){
        return formatDate(new Date(time), 'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      star: Star,
      split: Split,
      ratingselect: RatingSelect
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratings
    position: absolute
    top: 176px
    left: 0px
    width: 100%
    bottom: 0px
    overflow hidden
    .ratings-header
      font-size 0px
      display: flex
      padding 18px 0
      .ratings-h-left
        display inline-block
        flex: 0 0 137px
        width: 137px
        padding: 6px 0
        text-align center
        border-right 1px solid rgba(7, 17, 27, 0.1)
        .score
          font-size 24px
          color: rgb(255, 153, 0)
          line-height 28px
          margin-bottom: 6px
        .overallScore
          font-size: 12px
          color: rgb(7, 17, 27)
          line-height 12px
          margin-bottom: 8px
        .rankRate
          font-size: 10px
          line-height 10px
          color: rgb(7, 17, 27)
      .ratings-h-right
        flex: 1
        padding: 6px 24px
        .row
          height: 18px
          margin-bottom 8px
          &.row:last-child
            margin-bottom: 0
          .title
            margin-right 12px
            font-size: 12px
            line-height 16px
            color: rgb(7, 17, 27)
          .star
            margin-right 12px
            display inline-block
          ._score
            font-size: 12px
            line-height 18px
            vertical-align top
            color: rgb(255, 153, 0)
          .deliveryTime
            font-size: 12px
            line-height 18px
            color: rgb(147, 153, 159)
    .ratings-item
      position: relative
      display: flex
      margin: 0 18px
      padding: 18px 0
      font-size 0
      border-1px(rgba(7, 17, 27, 0.1))
      .avatar-wrapper
        flex: 0 0 40px
      .content
        flex: 1
        .username
          font-size 10px
          line-height 12px
          margin-bottom: 4px
          color: rgb(7, 17, 27)
        .star
          display inline-block
          padding 0px
        .dTime
          margin-left: 6px
          font-size 10px
          font-weight 200
          line-height 12px
          color: rgb(147, 153, 159)
        .text
          font-size 12px
          line-height 18px
          color: rgb(7, 17, 27)
          margin-bottom 8px
        .icon-thumb_up
          font-size 12px
          color: rgb(0, 160, 220)
          line-height 16px
          margin-right: 8px
        .icon-thumb_down
          font-size 12px
          color: rgb(183, 187, 191)
          line-height 16px
          margin-right: 8px
        .tag
          padding 0px 6px
          margin-right: 8px
          display: inline-block
          margin-bottom 4px
          font-size 9px
          color: rgb(147, 153, 159)
          line-height 16px
          border: 1px solid rgba(7, 17, 27, 0.1)
      .rateTime
        position: absolute
        top: 18px
        right: 0
        font-size 10px
        font-weight 200
        line-height 12px
        color: rgb(147,153,159)
</style>
