import Vue from 'vue'
import VueRouter from 'vue-router'

const goods = () => import('components/goods/goods');
const ratings = () => import('components/ratings/ratings');
const seller = () => import('components/seller/seller');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/goods',
    name: 'goods',
    component: goods
  },
  {
    path: '/ratings',
    name: 'ratings',
    component: ratings
  },
  {
    path: '/seller',
    name: 'seller',
    component: seller
  }
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router
