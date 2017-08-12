<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" class="avatar-img" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="c-title">
          <span class="brand"></span>
          <span class="c-title-name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟到达
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="icon"></span>
          <span class="description">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <!--按钮-->
      <div class="c-button" @click="detailShow(true)">
        <span>5个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!--公告-->
    <div class="bulletin-wrapper" @click="detailShow(true)">
      <span class="b-icon"></span><span class="b-context">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!--背景-->
    <div class="header-bg">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <!--详情浮层-->
    <transition name="fade">
      <div class="detail" v-if="isDetail">
        <div class="detail-wrap clearfix">
          <div class="detail-main">
            <h1 class="detail-name">{{seller.name}}</h1>
            <div class="starWrap">
              <star :score="seller.score" :size="48"></star>
            </div>
            <!--优惠信息-->
            <div class="detail-bulletin">
              <span class="line"></span>
              <span class="detail-title">优惠信息</span>
              <span class="line"></span>
            </div>
            <!--优惠条目-->
            <div class="supports" v-if="seller.supports">
              <div class="supports-item" v-for="sup in seller.supports">
                <!--<span class="supports-icon" :class="mapClass[sup.type]"></span>-->
                <icon :type="sup.type"></icon><span class="supports-text">{{sup.description}}</span>
              </div>
            </div>
            <!--商家公告-->
            <div class="detail-bulletin">
              <span class="line"></span>
              <span class="detail-title">商家公告</span>
              <span class="line"></span>
            </div>

            <div class="detail-context">
              {{seller.bulletin}}
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="detailShow(false)"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type='text/ecmascript-6'>
  import Star from 'components/star/star'
  import Icon from 'components/icon/icon'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        isDetail: false
      }
    },
    created(){
      // 减decrease 折discount 特special 票invoice 保guarantee
      this.mapClass = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
      detailShow(flag){
        this.isDetail = flag ? true : false
      }
    },
    components: {
      Star,
      Icon
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .header
    position: relative
    overflow: hidden
    .content-wrapper
      position: relative
      padding: 24px 12px 0 24px
      background: rgba(7, 17, 27, 0.5)
      color: rgb(255, 255, 255)
      font-size: 0
      .avatar
        display: inline-block
        width: 64px
        height: 64px
        .avatar-img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        vertical-align: top
        padding: 2px 0 8px 0
        .brand
          display: inline-block
          width: 30px
          height: 18px
          background: url("./brand@2x.png")
          background-size: 30px 18px
          background-repeat: no-repeat
        .c-title-name
          vertical-align: top
          display: inline-block
          font-size 16px
          font-weight bold
          line-height 16px
          margin-left: 6px
        .description
          font-size: 12px
          font-weight: 200px
          line-height: 12px
        .supports
          font-size: 10px
          margin-top: 10px
          padding: 0 0 2px 0
          .icon
            display: inline-block
            width: 12px
            height: 12px
            img-bg('decrease_1')
            background: url("./decrease_1@2x.png")
            background-repeat: no-repeat
            background-size: 12px 12px
            vertical-align: top
          .description
            font-size: 10px
            font-weight: 200px
            line-height: 12px
            vertical-align: top

      .c-button
        position: absolute
        right: 12px
        bottom: 18px
        font-size: 10px
        font-weight: 200px
        line-height: 12px
        background: rgba(0, 0, 0, 0.2)
        padding: 7px 8px 7px 8px
        border-radius: 16px
        i
          margin-left: 2px
    .bulletin-wrapper
      height: 28px
      padding: 0 22px 0 12px
      position: relative
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      color: rgb(255, 255, 255)
      background-color: rgba(7, 17, 27, 0.2)
      .b-icon
        display: inline-block
        width: 22px
        height: 12px
        margin-top: 8px
        vertical-align: top
        img-bg('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .b-context
        margin: 0 4px
        font-size: 10px
        line-height: 28px
        font-weight: 200px
      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        color: rgb(255, 255, 255)
        top: 8px
    .header-bg
      position: absolute
      width: 100%
      z-index: -1
      top: 0px
      bottom: 0
      right: 0
      left: 0
      filter: blur(10px)
    .detail
      overflow: hidden
      background: rgba(7, 17, 27, 0.8)
      backdrop-filter: blur(10px)
      z-index: 999
      position: fixed
      height: 100%
      overflow: auto
      width: 100%
      top: 0px
      left: 0
      rught: 0
      bottom: 0
      .detail-wrap
        position: relative
        min-height: 100%
        height: 100%
        .detail-main
          padding: 64px 36px 64px 36px
          .detail-name
            font-size: 16px
            font-weight: 700px
            line-height: 16px
            color: rgb(255, 255, 255)
            text-align: center
          .starWrap
            width: 100%
            text-align: center
            margin-top 12px
          .detail-bulletin
            width: 100%
            display: flex
            margin-top: 28px
            font-size: 0
            span
              display: inline-block
            .line
              flex: 1
              height: 1px
              background: rgba(255, 255, 255, 0.2)
              margin-top: 7px
            .detail-title
              font-size: 14px
              font-weight: 700px
              margin-left: 12px
              margin-right: 12px
              line-height: 14px
              color: rgb(255, 255, 255)

          .supports
            margin-top: 24px
            padding 0 12px
            .supports-item
              margin-bottom: 12px
              &:last-child
                margin-bottom: 0
              span
                display: inline-block
              .supports-text
                font-size: 12px
                vertical-align: top
                margin-left: 6px
                line-height: 18px
                font-weight: 200px
                color: rgb(255, 255, 255)
          .detail-context
            color: rgb(255, 255, 255)
            font-size: 12px
            font-weight: 200px
            line-height: 24px
            padding: 24px 12px 0 12px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .fade-enter, .fade-leave-to
    opacity: 0
</style>
