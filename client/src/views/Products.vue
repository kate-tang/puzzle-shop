<template>
  <div class="products main" :key="$route.fullPath">
    <Banner />
    <main class="product-wrap">
      <Breadcrumb />
      <div class="container" id="main">
        <nav class="categories">
          <button type="button" class="categories-menu-btn" @click="showMenu = !showMenu" @blur="closeMenu">
            精選類別
            <ion-icon name="chevron-down-outline" class="icon"></ion-icon>
          </button>
          <ul class="categories-menu" :class="{ 'show': showMenu }">
            <li class="categories-menu-item">
              <router-link :to="{ path: '/products', hash: '#main' }" class="categories-menu-item-link" @click="showMenu = false" tabindex="0" data-menulink="true">所有商品</router-link>
            </li>
            <li class="categories-menu-item" v-for="category in $store.state.categories">
              <router-link :to="{ path: `/categories/${category['category-en']}`, hash: '#main' }" class="categories-menu-item-link" @click="showMenu = false" tabindex="0" data-menulink="true">{{ category['category-zh'] }}</router-link>
            </li>
          </ul>
        </nav>
        <div class="product-list-wrap">
          <Loading :active="isLoading" :is-full-page="false" />
          <div v-if="!isLoading">
            <ul class="product-list">
              <li v-for="item in paginatedProducts" class="product-item" :key="item.id">
                <router-link :to="`/products/${item.id}`" class="product-item-link">
                  <ProductImage class="product-image" :file-name="item.imageFileName" :alt="item.name" />
                  <div class="product-details">
                    <div class="category">{{ item['category-zh'] }}</div>
                    <div class="name">{{ item.name }}</div>
                    <div class="price">NT ${{ item.price }}</div>
                    <div class="btns">
                      <button type="button" class="btn" @click.prevent="updateFav(item.id)">
                        <ion-icon name="heart" class="icon" :class="{ 'fav': $store.state.favProducts.includes(item.id) }" v-if="$store.state.favProducts.includes(item.id)"></ion-icon>
                        <ion-icon name="heart-outline" class="icon" v-else></ion-icon>
                      </button>
                      <button type="button" class="btn" @click.prevent="addCart(item.id, item.countInStock)" :class="{ 'disabled': item.countInStock === 0 }">
                        <img src="../assets/image/load.gif" alt="" class="load" v-if="isAddingToCart && addToCartId === item.id">
                        <ion-icon name="cart-outline" class="icon" v-else></ion-icon>
                      </button>
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
            <Pagination :page="page" :total-page="totalPage" :path="path" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import store from '../store'
import { initPage, getProduct, updateFav } from '../helpers'
import Banner from '../components/Banner.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import ProductImage from '../components/ProductImage.vue'
import Pagination from '../components/Pagination.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: { Banner, Breadcrumb, ProductImage, Pagination, Loading },
  setup(){
    onMounted(() => initPage())

    const showMenu = ref(false)
    function closeMenu(e){
      if (e.relatedTarget && e.relatedTarget.dataset && e.relatedTarget.dataset.menulink) return
      showMenu.value = false
    }

    const route = useRoute();
    const router = useRouter();
    const path = route.path.replace(/\/$/, "");
    let products = [];
    let paginatedProducts = ref(null);
    let isLoading = ref(true)

    // pagination
    const items = 6
    const page = ref(Number(route.query.page) || 1)
    let totalPage = ref(null);
    function paginatedItems(list, itemsPerPage, currentPage){
      totalPage.value = Math.ceil(list.length / itemsPerPage);
      if (currentPage.value > totalPage.value){
        currentPage.value = totalPage.value
      }

      let start = itemsPerPage * (currentPage.value - 1);
      let end = start + itemsPerPage;
      paginatedProducts.value = list.slice(start, end);
    }

    // get products data
    if (path === '/categories' || path === '/products') {
      getProduct('all')
        .then(data => {
          console.log(data);
          if (!data.success) throw new Error(data.message);
          products = data.products
          paginatedItems(products, items, page)
          setTimeout(() => isLoading.value = false, 500)
        })
        .catch(err => {
          console.log(err.message)
          router.push('/404')
        })
    } else {
      let childPath = path.replace('/categories/', '').replace('/products/', '')
      getProduct(`all/${childPath}`)
        .then(data => {
          console.log(data);
          if (!data.success) throw new Error(data.message);
          products = data.products
          paginatedItems(products, items, page)
          setTimeout(() => isLoading.value = false, 500)
        })
        .catch(err => {
          console.log(err.message)
          router.push('/404')
        })
    }

    // add to cart
    const loadingTime = 800
    let isAddingToCart = ref(false)
    let addToCartId = ref(null)
    function addCart(id, countInStock){
      if (isAddingToCart.value === true) return

      isAddingToCart.value = true
      addToCartId.value = id
      const itemInCart = store.state.cartItems.find(item => item['productId'] === id)
      if (countInStock === 0){
        setTimeout(() => {
          store.commit('addNotification', { type: 'warning', msg: '暫無庫存' })
          isAddingToCart.value = false
        }, loadingTime)
      } else if (!itemInCart || itemInCart['qty'] < countInStock){
        setTimeout(() => {
          store.commit('addOneToCart', id)
          store.commit('addNotification', { msg: '已加入購物車' })
          isAddingToCart.value = false
        }, loadingTime)
      } else {
        setTimeout(() => {
          store.commit('addNotification', { type: 'warning', msg: `抱歉，本商品最多可購買${countInStock}件` })
          isAddingToCart.value = false
        }, loadingTime)
      }
    }

    return {
      showMenu, closeMenu, updateFav, isLoading,
      isAddingToCart, addToCartId, addCart,
      page, totalPage, paginatedProducts, path
    }
  }
}
</script>

<style lang="scss" scoped>

// products
.product-wrap {
  margin-bottom: 100px;
  .container {
    display: flex;
  }
  @media (max-width: 768px) {
    max-width: 600px;
    margin: 0 auto 100px auto;
    .container {
      flex-direction: column;
    }
  }
}
.categories {
  flex: 0 0 180px;
  margin-right: 30px;
  @media (max-width: 768px) {
    flex: auto;
    position: relative;
    margin-right: 0;
    margin-bottom: 20px;
  }
}
.categories-menu-btn {
  display: none;
  width: 100%;
  padding: 10px 0;
  background: $dark-grey;
  color: #FFF;
  border: none;
  border-radius: $border-radius;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background: $transparent-dark-grey;
  }
  @media (max-width: 768px) {
    display: block;
  }
}
.categories-menu {
  background: #FFF;
  @media (max-width: 768px) {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 2px;
    padding: 5px 0;
    border: 1px solid #CCC;
    border-radius: $border-radius;
    z-index: 2;
    &.show {
      display: block;
    }
  }
}
.categories-menu-item {
  overflow: hidden;
  border: 1px solid #CCC;
  & + & {
    border-top: none;
  }
  &:first-child {
    border-radius: 5px 5px 0 0;
  }
  &:last-child {
    border-radius: 0 0 5px 5px;
  }
  @media (max-width: 768px) {
    border: none;
    &:first-child, &:last-child {
      border-radius: 0;
    }
  }
}
.categories-menu-item-link {
  display: block;
  padding: 15px 20px;
  color: $dark-grey;
  &:hover {
    background: #EEE;
  }
  &.router-link-exact-active {
    background: $dark-grey;
    color: #FFF;
    cursor: default;
    pointer-events: none;
  }
  @media (max-width: 768px) {
    padding: 10px 20px;
  }
}
.product-list-wrap {
  flex: 1;
  position: relative;
  min-height: 20vh;
}
.product-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
}
.product-item {
  flex: 0 0 32%;
  margin-bottom: 20px;
  box-shadow: 2px 2px 10px #EEE;
  overflow: hidden;
  transition: all .3s;
  &:nth-child(3n+2), &:nth-child(3n) {
    margin-left: 2%;
  }
  &:hover {
    box-shadow: 5px 5px 10px #DDD;
    transform: scale(1.02);
  }
  @media (max-width: 950px) {
    flex: 0 0 49%;
    &:nth-child(3n+2), &:nth-child(3n) {
      margin-left: 0;
    }
    &:nth-child(2n) {
      margin-left: 2%;
    }
  }
  @media (max-width: 600px) {
    margin-bottom: 2vw;
  }
}
.product-item-link {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.product-image {
  width: 100%;
}
.product-details {
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
  color: $dark-grey;
  @media (max-width: 450px) {
    padding: 10px;
  }
  .category {
    margin-bottom: 5px;
    color: #777;
    font-size: 14px;
    @media (max-width: 450px) {
      font-size: 12px;
    }
  }
  .name {
    margin-bottom: 10px;
    font-size: 20px;
    line-height: 1.3;
    @media (max-width: 1100px) {
      font-size: 18px;
    }
    @media (max-width: 550px) {
      font-size: 16px;
    }
    @media (max-width: 450px) {
      margin-bottom: 5px;
      font-size: 14px;
    }
  }
  .price {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
    @media (max-width: 450px) {
      font-size: 14px;
    }
  }
  .btns {
    display: flex;
    justify-content: center;
    margin-top: auto;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 12px;
    background: #FFF;
    border: 1px solid $dark-grey;
    border-radius: $border-radius;
    user-select: none;
    transition: all .5s;
    cursor: pointer;
    &.disabled {
      background: #DDD;
      border: none;
      .icon {
        color: #999;
      }
    }
    .icon {
      color: $dark-grey;
      font-size: 18px;
      &.fav {
        color: $red;
      }
    }
    .load {
      width: 18px;
      height: 18px;
    }
    & + .btn {
      margin-left: 10px;
    }
    @media (max-width: 600px) {
      padding: 8px 10px;
    }
    @media (max-width: 450px) {
      padding: 6px 8px;
    }
  }
}
</style>