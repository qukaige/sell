<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'checked':index===currentIndex}"
            @click="_selectMenu(index,$event)">
          <span class="menuname  border-1px"><icon class="icon" :type="item.type"></icon>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="goodsWrapper">
      <ul ref="scroll">
        <li v-for="item in goods" class="goods-items">
          <h2 class="goods-name">{{item.name}}</h2>
          <ul>
            <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
              <div class="food-img">
                <img :src="food.icon" width="57" height="57" alt="">
              </div>
              <div class="food-content">
                <h2 class="food-name">{{food.name}}</h2>
                <p class="food-description" v-if="food.description">{{food.description}}</p>
                <div class="food-rating-wrap">
                  <span class="food-sellCount">月售{{food.sellCount}}份</span><!--
                  --><span class="food-rating">好评率{{food.rating}}%</span>
                </div>
                <div>
                  <span class="newPrice">￥{{food.price}}</span><!--
               --><span class="oldPrice" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrap">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ShopCard  :selectFoods="selectFoods" :seller="seller"></ShopCard>
    <food ref="food1" :food="selectedFood"></food>
  </div>
</template>

<script type='text/ecmascript-6'>
  import axois from 'axios'
  import Icon from 'components/icon/icon'
  import BScoll from  'better-scroll'
  import ShopCard from 'components/shopcard/shopcard'
  import CartControl from 'components/cartControl/cartControl'
  import Food from 'components/food/food'
  const ERR_OK = 0
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        goods: [],
        scrollY: 0,
        listHeight: [],
        selectedFood:{}
      }
    },
    created(){
      axois.get('/api/goods').then((response) => {
        if (response.data.errno == ERR_OK) {
          this.goods = response.data.data
          //Vue.nextTick(callback)`，当数据发生变化，更新后执行回调。
          //Vue.$nextTick(callback)`，当dom发生变化，更新后执行的回调。
          this.$nextTick(() => {
            this._initBScroll()
            this._getListHeight()
          })
        }
      }, (err) => {
        console.log(err)
      })
    },
    methods: {
      _initBScroll(){
        this.menuScroll = new BScoll(this.$refs.menuWrapper, {
          click: true  //允许点击
        })
        this.goodsScroll = new BScoll(this.$refs.goodsWrapper, {
          click: true,  //允许点击
          probeType: 3  //监听用户滚动
        })
        this.goodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _getListHeight(){
        let items = this.$refs.goodsWrapper.getElementsByClassName('goods-items')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < items.length; i++) {
          height += items[i].clientHeight
          this.listHeight.push(height)
        }
      },
      _selectMenu(index, e){
        //如果是用户派发事件 e._constructed 为true
        if (!e._constructed) {
          return
        }
        let items = this.$refs.goodsWrapper.getElementsByClassName('goods-items')
        let item = items[index]
        this.goodsScroll.scrollToElement(item, 300)
      },
      selectFood(food,e){
        if (!e._constructed) {
          return
        }
        this.selectedFood = food
//        调用子组件方法,显示商品详情
        this.$refs.food1.show()
      }
    },
    computed: {
      currentIndex(){
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods(){
        let selectFoods = []
        this.goods.forEach((goods) => {
          goods.foods.forEach((foods) => {
            if (foods.count) {
              selectFoods.push(foods)
            }
          })
        })
        return selectFoods
      }
    },
    components: {
      Icon,
      ShopCard,
      cartcontrol: CartControl,
      food:Food
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display: flex
    position: absolute
    top: 176px
    bottom: 48px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .checked
        background: #ffffff
        margin-top -1px
        position: relative
        font-weight 700
        .menuname
          border: none
      .menu-item
        display table
        padding 0 12px
        height: 54px
        width 56px
        .menuname
          display table-cell
          vertical-align: middle
          font-size 12px
          color: rgb(77, 85, 93)
          line-height 14px
          border-1px(rgba(7, 17, 27, 0.1))
          .icon
            margin-right: 2px
            width: 12px
            height: 12px
            background-size: 12px 12px
            background-repeat: no-repeat
    .goods-wrapper
      flex: 1
    .goods-name
      height: 27px
      padding 0 0 0 14px
      font-size 12px
      line-height 27px
      border-left: 2px solid #d9dde1
      background: #f3f5f7
      color: rgb(147, 153, 159)

    .food-item
      display: flex
      margin: 18px
      border-1px(rgba(7, 17, 27, 0.1))
      padding-bottom: 18px
      .food-img
        flex: 0 0 57px
      .food-content
        flex: 1
        margin-left: 10px
        .food-name
          font-size: 14px
          color: rgb(7, 17, 27)
          margin-top: 2px
          line-height 14px
        .food-description
          margin-top: 8px
          font-size 10px
          line-height 12px
          color: rgb(147, 153, 159)
        .food-rating-wrap
          margin-top: 8px
          .food-sellCount
            margin-right 12px
          .food-sellCount, .food-rating
            font-size 10px
            line-height 10px
            color: rgb(147, 153, 159)
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

      .cartcontrol-wrap
        position absolute
        right: 0
        bottom: 0
</style>
