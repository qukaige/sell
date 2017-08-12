<template>
    <span class="icon" :class="mapClass[type]" v-if="type>=0"></span>
</template>
<script type='text/ecmascript-6'>
  export default {
    props: {
      type: {
        type: Number,
        default: -1
      }
    },
    created(){
      this.mapClass = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .icon
    display: inline-block
    width: 16px
    height: 16px
    background-size: 16px 16px
    background-repeat: no-repeat

  .decrease
    img-bg('decrease_1')

  .discount
    img-bg('discount_1')

  .special
    img-bg('special_1')

  .invoice
    img-bg('invoice_1')

  .guarantee
    img-bg('guarantee_1')
</style>
