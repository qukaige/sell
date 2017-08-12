<template>
  <div>
    <div class="shopCard">
      <div>
        <div class="content" @click="toggleList">
          <div class="shopCard-left">
            <div class="logoWrap">
              <div class="logo" :class="{'selected-bg':foodTotalPrice>0}">
                <i class="icon-shopping_cart" :class="{'selected':foodTotalPrice>0}"></i>
              </div>
              <!--小标签 显示购买的数量-->
              <span class="total" v-show="selectFoods.length>0">{{foodTotalCount}}</span>
            </div>
            <!--selected 购买后高亮-->
            <div class="price" :class="{'selected':foodTotalPrice>0}">￥{{foodTotalPrice}}元</div>
            <div class="deliveryPrice">另需配送费￥{{seller.deliveryPrice}}元</div>
          </div>
          <div class="shopCard-right" :class="{'selected-right-bg':foodTotalPrice>=seller.minPrice}">
            <span v-if="foodTotalPrice<=0">￥{{seller.minPrice}}起送</span>
            <span v-else-if="foodTotalPrice<seller.minPrice">还差￥{{minPrice}}起送</span>
            <span v-else-if="foodTotalPrice>=seller.minPrice">结算</span>
          </div>
        </div>
      </div>
      <!--小球-->
      <div class="ball-container">
        <transition name="drop" v-for="(ball,index) in balls" :key="index"
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:after-enter="afterEnter">
          <!--在methods中定义enter...等方法回调 具体guanwang-->

          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>


      <transition name="transHeight">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="setEmpty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <cartcontrol :food="food"></cartcontrol>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="mask">
      <div class="list-mask" v-show="listShow" @click="toggleList"></div>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
  import CartControl from 'components/cartControl/cartControl'
  import BScoll from  'better-scroll'
  export default {
    props: {
      seller: {
        type: Object
      },
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data(){
      return {
//          定义5个小球
        balls: [
          {
            show: false
          },
          {
            show: false
          }
          ,
          {
            show: false
          }
          ,
          {
            show: false
          }
          ,
          {
            show: false
          }
        ],
        dropBall: [],
        fold: true
      }
    },
    created(){
      // 接收cartControl 发出的事件
      this.$root.eventHub.$on('cart.add', this._drop);
    },
    computed: {
      foodTotalCount(){ //购物车总数量
        let count = 0
        this.selectFoods.forEach((foods) => {
          count += foods.count
        })
        return count
      },
      //计算总价
      foodTotalPrice(){
        let sum = 0
        for (let i = 0; i < this.selectFoods.length; i++) {
          let price = this.selectFoods[i].price
          let count = this.selectFoods[i].count
          sum += price * count
        }
        return sum
      }
      ,
      minPrice(){
        return this.seller.minPrice - this.foodTotalPrice
      },
      listShow(){
        if (!this.foodTotalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (this.scroll) {
              this.scroll.refresh()
            } else {
              this.scroll = new BScoll(this.$refs.listContent, {
                click: true
              })
            }
          })
        }
        return show
      }
    },
    methods: {
//        获取点击的事件对象,改变一个小球的状态
      _drop(el){
        console.log(el)
        for (let i = 0; i < this.balls.length; i++) {
          if (!this.balls[i].show) {
            this.balls[i].show = true
            this.balls[i].el = el
            this.dropBall.push(this.balls[i])
            return
          }
        }
      },
      beforeEnter(el){  //el小球
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
//              获取点击的元素(+) 的位置
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.querySelector('.inner-hook')
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      enter(el){
        el.offsetLeft //重绘
        this.$nextTick(() => {
          el.style.transform = `translate3d(0,0,0)`
          let inner = el.querySelector('.inner-hook')
          inner.style.transform = `translate3d(0,0,0)`
        })
      },
      afterEnter(el){
        let ball = this.dropBall.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      toggleList(){
        if (!this.foodTotalCount) {
          return
        }
        this.fold = !this.fold
      },
      setEmpty(){
        this.selectFoods.forEach((foods) => {
          foods.count = 0
        })
      }
    },
    components: {
      cartcontrol: CartControl
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .shopCard
    position: fixed
    left: 0
    right: 0
    bottom: 0
    z-index 20
    background: #141d27
    height: 48px
    .content
      display: flex
      background #141d27
      .shopCard-left
        flex: 1
        height: 48px
        font-size 0
        .logoWrap
          display: inline-block
          box-sizing: border-box
          margin: -10px 12px 0px 12px
          padding 6px 6px 8px 6px
          background: #141d27
          width: 56px
          border-radius: 50%
          position: relative
          .logo
            width: 44px
            height: 44px
            border-radius: 50%
            background: #2b343c
            text-align: center
            .icon-shopping_cart
              font-size 24px
              color: rgba(255, 255, 255, 0.4)
              line-height 44px
            .selected
              color: #ffffff
          .selected-bg
            background: rgb(0, 160, 220)
          .total
            position: absolute
            right: 0
            top: 0
            display: inline-block
            width: 24px
            padding: 0 6px
            background: rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
            font-size 9px
            text-align center
            line-height 16px
            font-weight 700
            color: rgb(255, 255, 255)
            border-radius 16px
        .selected
          color: #ffffff
        .price
          vertical-align bottom
          margin-bottom 12px
          font-size 16px
          font-weight 700
          padding-right 12px
          margin-right 12px
          display: inline-block
          border-right 1px solid rgba(255, 255, 255, 0.1)
        .deliveryPrice
          vertical-align bottom
          display inline-block
          font-size 12px
          margin-bottom 12px
          color: rgba(255, 255, 255, 0.4)
          font-weight 200
      .shopCard-right
        flex: 0 0 100px
        width: 100px
        height: 48px
        padding: 0 8px
        background: #2b333b
        color: rgba(255, 255, 255, 0.4)
        font-size 12px
        font-weight 700
        line-height 48px
        text-align center
      .selected-right-bg
        background: #0dcc72
        color: #ffffff
    .ball-container //------------------
      .ball
        position fixed
        left 32px
        bottom 22px //最终落点的位置
        z-index 200 //
        &.drop-enter, &.drop-enter-active
          transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner
            width 16px
            height 16px
            border-radius 50%
            background rgb(0, 160, 220)
            transition all 0.4s linear
    .shopcart-list
      position absolute
      top 0
      left 0
      width 100%
      background white
      transform translate3d(0, -100%, 0)
      z-index: -1
      &.transHeight-enter-active, &.transHeight-leave-active
        transition all 0.5s
      &.transHeight-enter, &.transHeight-leave-active
        transform translate3d(0, 0, 0)
      .list-header
        height 40px
        line-height 40px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          display inline-block
          font-size 14px
          font-weight 200
          color rgb(7, 17, 27)
          padding-left 18px
        .empty
          position absolute
          right 8px
          font-size 12px
          color rgb(0, 160, 220)
          padding 0 10px
      .list-content
        max-height 217px
        overflow hidden
        .food
          position relative
          display flex
          height 48px
          border-bottom 1px solid rgba(7, 17, 27, 0.1)
          .name
            flex: 1
            padding-left 12px
            font-size 14px
            color rgb(7, 17, 27)
            line-height 48px
            font-weight 700
          .price
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
            padding 0 12px 0 18px
            line-height 48px
          .cartControl
            margin-top: 12px
            margin-right 16px
  .list-mask
    position: fixed
    top: 0
    left: 0px
    right: 0px
    width: 100%
    z-index 9
    height: 100%
    -webkit-backdrop-filter blur(10px)
    background: rgba(7, 17, 27, 0.6)
    &.mask-enter-active,&.mask-leave-active
      transition: all .4s
    &.mask-enter,&.mask-leave-active
      opacity: 0
</style>
