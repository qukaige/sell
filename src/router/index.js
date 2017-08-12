import Vue from 'vue'
import Router from 'vue-router'
import Goods from 'components/goods/Goods.vue'
import Seller from 'components/seller/Seller.vue'
import Ratings from 'components/ratings/Ratings.vue'
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {path: "/", redirect: '/goods'},
    {path: "/goods", component: Goods},
    {path: "/seller", component: Seller},
    {path: "/ratings", component: Ratings}
  ]
})
