<template>
  <div class="seller" v-if="seller" ref="sellerScroll">
    <div class="seller-content">
      <div class="overview border-1px">
        <h1 class="header">{{seller.name}}</h1>
        <star :size="36" :score="seller.score"></star>
        <span class="ratingCount">({{seller.ratingCount}})</span>
        <span class="sellCount">月售{{seller.sellCount}}单</span>
        <div class="favorite">
          <i class="icon-favorite" :class="{'on':controlFav}" @click="setFav($event)"></i>
          <span class="text">{{iconText}}</span>
        </div>
      </div>
      <ul class="remark">
        <li class="remark-item border-right-1px">
          <h2 class="title">起送价</h2>
          <span class="price">{{seller.minPrice}}</span>
          <span class="unit">元</span>
        </li>
        <li class="remark-item  border-right-1px">
          <h2 class="title">商家配送</h2>
          <span class="price">{{seller.deliveryPrice}}</span>
          <span class="unit">元</span>
        </li>
        <li class="remark-item">
          <h2 class="title">平均配送时间</h2>
          <span class="price">{{seller.deliveryTime}}</span>
          <span class="unit">分钟</span>
        </li>
      </ul>
      <split></split>
      <div class="bulletin-content">
        <h1 class="bulletin-title">公告与活动</h1>
        <p class="bulletin border-1px">
          {{seller.bulletin}}
        </p>
        <p class="support-item border-1px" v-for="(support,index) in seller.supports">
          <icon :type="support.type"></icon>
          <span>{{support.description}}</span>
        </p>
      </div>
      <split></split>
      <div class="pics-wrapper">
        <h1 class="pic-title">商家实景</h1>
        <div class="pics-scroll-wrap" ref="picScroll">
          <ul class="pic-group" ref="picGroup">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="100%" height="100%" alt="">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info-wrapper">
        <h1 class="info-title border-1px">商家实景</h1>
        <p class="info-item border-1px" v-for="info in seller.infos">
          {{info}}
        </p>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import Star from 'components/star/star'
  import Split from  'components/split/split'
  import Icon from 'components/icon/icon'
  import BScroll from 'better-scroll'
  import {setLocalStorage,getLocalStorage} from 'common/js/localstorage'
  export default {
    name: 'seller',
    props: {
      seller: {
        type: Object,
        default: []
      }
    },
    data(){
      return {
        controlFav: getLocalStorage(this.seller.id,'fav',false)
      }
    },
    computed: {
      iconText(){
        return !this.controlFav ? '收藏' : '已收藏'
      }
    },
    methods: {
      _initScroll(){
        this.$nextTick(() => {
          if (!this.sellerScroll) {
            this.sellerScroll = new BScroll(this.$refs.sellerScroll, {
              click: true
            })
          } else {
            this.sellerScroll.refresh()
          }
        })
      },
      _initScrollPics(){
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picScroll, {
              click: true,
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
        })
      },
      _setUlWidth(){
        let picWidth = 120
        let marRight = 6
        let len = this.seller.pics.length
        this.$refs.picGroup.style.width = (120 + 6) * len - 6 + 'px'
      },
      setFav(e){
        if (!e._constructed) {
          return
        }
        this.controlFav = !this.controlFav
        setLocalStorage(this.seller.id, 'fav', this.controlFav)
      }
    },
    mounted(){
      this._initScroll()
      if (this.seller.pics) {
        this._setUlWidth()
      }
      this._initScrollPics()
    },
    watch: {
      seller(){
        if (this.seller.pics) {
          this._setUlWidth()
        }
        this._initScroll()
        this._initScrollPics()
      }
    },
    components: {
      star: Star,
      split: Split,
      icon: Icon
    },
    created(){
      // 减decrease 折discount 特special 票invoice 保guarantee
//      this.mapClass = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position: absolute
    top: 176px
    left: 0px
    width: 100%
    bottom: 0px
    overflow hidden
    .seller-content
      position: relative
      .overview
        position: relative
        padding 18px 0
        margin: 0 18px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size 0
        .favorite
          width: 50px
          position: absolute
          top: 18px
          right: 0
          text-align center
          .icon-favorite
            font-size 24px
            line-height 24px
            color: rgba(7, 17, 27, 0.1)
            &.on
              color: rgb(240, 20, 20)
          .text
            display: block
            font-size 10px
            color: rgb(77, 85, 93)
            line-height 10px

        .header
          font-size 14px
          line-height 14px
          color: rgb(7, 17, 27)
          margin-bottom 8px
        .star
          display: inline-block
          margin-right 8px
        .ratingCount
          margin-right 12px
        .ratingCount, .sellCount
          font-size 10px
          line-height 18px
          color: rgb(77, 85, 93)
      .remark
        padding 18px
        display: flex
        .remark-item
          padding 0
          flex: 1
          text-align center
          font-size 0
          border-right-1px(rgba(7, 17, 27, 0.1))
          &.remark-item:last-child:after
            border none
          .title
            font-size 10px
            line-height 10px
            color: rgb(147, 153, 159)
            margin-bottom 4px
          .price, .unit
            vertical-align sub
            font-size 24px
            line-height 24px
            font-weight 200
            color: rgb(7, 17, 27)
          .unit
            font-size 10px
      .bulletin-content
        padding 18px 18px 0 18px
        .bulletin-title
          margin-bottom 8px
          font-size 14px
          line-height 14px
          color: rgb(7, 17, 27)
        .bulletin
          padding 0 12px 16px 12px
          font-size 12px
          line-height 24px
          color: rgb(240, 20, 20)
          border-1px(rgba(7, 17, 27, 0.1))
      .support-item
        padding 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        &.support-item:last-child:after
          border: 0
        .icon
          margin-right 6px
          vertical-align sub
      .pics-wrapper
        padding 18px 0 18px 18px
        .pic-title
          margin-bottom 12px
          margin-bottom 8px
          font-size 14px
          line-height 14px
          color: rgb(7, 17, 27)
        .pics-scroll-wrap
          width: 100%
          white-space nowrap
          overflow: hidden
          .pic-group
            font-size 0
            .pic-item
              margin-right 6px
              width: 120px
              height: 90px
              display: inline-block

      .info-wrapper
        margin: 18px 18px 0 18px
        .info-title
          padding-bottom 12px
          font-size 14px
          line-height 14px
          border-1px(rgba(7, 17, 27, 0.1))
          color: rgb(7, 17, 27)
        .info-item
          padding: 16px 12px
          font-size 12px
          line-height 16px
          color: rgb(7, 17, 27)
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()

</style>
