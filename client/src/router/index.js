import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import ProductDetails from '../views/ProductDetails.vue'
import Favorites from '../views/Favorites.vue'
import Cart from '../views/Cart.vue'
import About from '../views/About.vue'
import FAQ from '../views/FAQ.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  { path: '/', component: Home, name: 'Home', meta: { title: '首頁' } },
  { path: '/products', component: Products, name: 'Products', alias: '/categories', meta: { title: '所有商品' } },
  { path: '/categories/:cat', component: Products, name: 'Category', meta: { title: '所有商品' } },
  { path: '/products/:id', component: ProductDetails, props: true, meta: { title: '商品頁' } },
  { path: '/favorites', component: Favorites, name: 'Favorites', meta: { title: '我的最愛' } },
  { path: '/cart', component: Cart, name: 'Cart', meta: { title: '購物車' } },
  { path: '/about', component: About, name: 'About', meta: { title: '關於我們' } },
  { path: '/faq', component: FAQ, name: 'FAQ', meta: { title: '常見問題' } },
  { path: '/404', component: NotFound, name: '404' },
  { path: '/:catchAll(.+)', component: NotFound, name: 'NotFound' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ el: to.hash, top: 100, behavior: 'smooth' });
        }, 1000);
      });
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from) => {
  // grab fav/cart data from localStorage
  store.commit('setFavProducts')
  store.commit('setCartItems')

  // change document title
  if (to.meta.title){
    document.title = `${to.meta.title} | ${process.env.VUE_APP_TITLE}`
  } else {
    document.title = process.env.VUE_APP_TITLE
  }

  // disable route transition if from & to are both Products page
  const isFromProductsPage = from.name === 'Products' || from.name === 'Category'
  const isToProductsPage = to.name === 'Products' || to.name === 'Category'
  if (isFromProductsPage && isToProductsPage){
    store.commit('clearRouteTransition')
  } else {
    store.commit('setRouteTransition')
  }
})

export default router
