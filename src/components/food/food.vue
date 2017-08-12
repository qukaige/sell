<template>
  <transition name="food">
    <div class="food" v-show="foodFlag" ref="foodScroll">
      <div class="foodContent">
        <div class="logowrap">
          <i class="icon-arrow_lift" @click="back"></i>
          <img :src="food.image" height="100%" width="100%" alt="">
        </div>
        <div class="food-content">
          <h2 class="food-name">{{food.name}}</h2>
          <div class="food-rating-wrap">
            <span class="food-sellCount">月售{{food.sellCount}}份</span><!--
                  --><span class="food-rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price-wrap">
            <span class="newPrice">￥{{food.price}}</span><!--
               --><span class="oldPrice" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="shopCart">
            <div class="text" @click="addCart($event)" v-show="!food.count">加入购物车</div>
            <cartcontrol :food="food" v-show="food.count"></cartcontrol>
          </div>
        </div>
        <split v-show="food.info"></split>
        <div class="info-wrap" v-show="food.info">
          <h1 class="title">商家介绍</h1>
          <p class="food-info">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :desc="desc" :ratings="food.ratings" :onlyContent="onlyContent"
                        :selectType="selectType"></ratingselect>
        </div>
        <!--用户评价-->
        <div class="users" v-if="food.ratings">
          <div class="no-user" v-show="!food.ratings.length">暂无评价</div>
          <div class="user-item border-1px" v-for="(rating,index) in food.ratings"
               v-show="showItem(rating.rateType,rating.text)">
            <span class="rateTime">{{rating.rateTime | formatDate}}</span>
            <div class="user-right">
              <span class="username">{{rating.username}}</span>
              <img :src="rating.avatar" width="12" height="12" alt="">
            </div>
            <p>
              <i :class="[{'icon-thumb_up':rating.rateType===0},{'icon-thumb_down':rating.rateType===1}]"></i>
              <span class="text">{{rating.text}}</span>
            </p>

          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type='text/ecmascript-6'>
  import CartControl from 'components/cartControl/cartControl'
  import BScroll from 'better-scroll'
  import Vue from  'vue'
  import Split from 'components/split/split'
  import RatingSelect from 'components/ratingselect/ratingselect'
  import {formatDate} from 'common/js/data'
  const POSITIVE = 0 //推荐
  const NEGATIVE = 1 //吐槽
  const ALL = 2
  export default {
    props: {
      food: {
        type: Object,
        default: {}
      }
    },
    created(){
      this.$root.eventHub.$on('selectTypeCheange', this._changeSelectType)
      this.$root.eventHub.$on('changeOnlyContent', this._changeOnlyContent)
    },
    data(){
      return {
        foodFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
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
//      子组件响应事件
      _changeSelectType(type){
        this.selectType = type
        this.$nextTick(() => {
          this.foodScroll.refresh()
        })
      },
//      子组件响应事件
      _changeOnlyContent(){
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.foodScroll.refresh()
        })
      },
      show(){
        this.selectType = ALL
        this.onlyContent = false //看所有的评价
        this.foodFlag = true
        this.$nextTick(() => {
          if (!this.foodScroll) {
            this.foodScroll = new BScroll(this.$refs.foodScroll, {
              click: true
            })
          } else {
            this.foodScroll.refresh()
          }
        })
      },
      back(){
        this.foodFlag = false
      },
      addCart(e){
        if (!e._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        }
        //派发一个事件,带走点击的这个元素
        this.$root.eventHub.$emit('cart.add', e.target)
      }
    },
    filters: {
      formatDate(time){
        return formatDate(new Date(time), 'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      cartcontrol: CartControl,
      Split,
      ratingselect: RatingSelect
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .food
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    width: 100%
    z-index: 19
    background: #ffffff
    transform: translate3d(0, 0, 0)
    &.food-enter-active, &.food-leave-active
      transition: all .4s linear
    &.food-enter, &.food-leave-active
      transform: translate3d(100%, 0, 0)
    .foodContent
      .logowrap
        position: relative
        width: 100%
        height: 0px
        padding-top 100%
        img
          position: absolute
          top: 0px
          left: 0px
          z-index: 0
        .icon-arrow_lift
          position: absolute
          top: 10px
          left: 0px
          z-index 1
          padding 10px
          color: #ffffff
      .food-content
        padding: 18px
        position: relative
        .food-name
          font-size: 14px
          color: rgb(7, 17, 27)
          font-weight: 700
          line-height 14px
          margin-bottom: 8px
        .food-rating-wrap
          font-size 10px
          line-height 10px
          color: rgb(147, 153, 159)
          margin-bottom 16px
          .food-sellCount
            margin-right 12px
        .price-wrap
          .newPrice
            font-size 14px
            color: rgb(240, 20, 20)
            font-weight 700px
            line-height 14px
            margin-right: 8px
          .oldPrice
            font-size 10px
            font-weight 700px
            line-height 10px
            text-decoration: line-through
            color: rgb(147, 153, 159)
        .shopCart
          position: absolute
          right: 18px
          bottom: 18px
          .text
            padding: 6px 12px
            border-radius: 24px
            background: rgb(0, 160, 220)
            font-size 10px
            color: rgb(255, 255, 255)
            line-height: 12px

      .info-wrap
        padding: 18px
        .title
          font-size: 14px
          color: rgb(7, 17, 27)
          font-weight: 700
          line-height 14px
          margin-bottom: 8px
        .food-info
          font-size: 12px
          color: rgb(77, 85, 93)
          font-weight: 200
          line-height 24px
          padding-left: 8px
      .rating
        padding-top: 18px
        .title
          font-size: 14px
          color: rgb(7, 17, 27)
          font-weight: 700
          line-height 14px
          margin-left: 18px
      .users
        padding: 0 18px
        font-size 0
        .no-user
          font-size: 12px;
          color: rgb(147, 153, 159)
          padding: 12px 0
        .user-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 10px
          line-height 12px
          color: rgb(147, 153, 159)
          .rateTime
            margin-bottom: 6px
          .user-right
            position: absolute
            top: 16px
            right: 18px
          .icon-thumb_up
            font-size: 12px
            line-height: 24px
            color: rgb(0, 160, 220)
          .icon-thumb_down
            font-size: 12px
            line-height: 24px
            color: rgb(147, 153, 159)
          .text
            font-size: 12px
            line-height: 16px
            color: rgb(7, 17, 27)

</style>
