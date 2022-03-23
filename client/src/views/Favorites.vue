<template>
  <main class="favorites main">
    <Banner />
    <Breadcrumb />
    <div class="container">
      <Loading :active="isLoading" :is-full-page="false" />
      <div v-if="!isLoading">
        <Empty v-if="favProducts.length === 0" />
        <table v-else class="fav-list">
          <thead>
            <tr class="title-row">
              <th></th>
              <th>名稱</th>
              <th>價格</th>
              <th class="m-hide">加入購物車</th>
              <th class="m-hide">取消收藏</th>
            </tr>
          </thead>
          <tbody>
            <tr class="item-row" v-for="fav in favProducts" :class="fav" :key="fav.id">
              <td class="image">
                <router-link :to="`/products/${fav.id}`" class="image-link">
                  <ProductImage class="img" :file-name="fav.product.imageFileName" :alt="fav.product.name" />
                </router-link>
              </td>
              <td class="name">
                <router-link :to="`/products/${fav.id}`">{{ fav.product.name }}</router-link>
              </td>
              <td class="price">{{ fav.product.price }}</td>
              <td class="addcart">
                <button type="button" class="btn" @click="addFavToCart(fav.id)">
                  <span class="text m-hide">加入購物車</span>
                  <ion-icon name="cart-outline" class="icon m-show"></ion-icon>
                </button>
              </td>
              <td class="unfav">
                <button type="button" class="btn" @click="removeFav(fav.id)">
                  <ion-icon name="trash-outline" class="icon"></ion-icon>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
import { onMounted, ref } from 'vue'
import store from '../store'
import { initPage, getProduct, updateFav } from '../helpers'
import Banner from '../components/Banner.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import Empty from '../components/Empty.vue'
import ProductImage from '../components/ProductImage.vue'
import { useRoute } from 'vue-router'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: { Banner, Breadcrumb, Empty, ProductImage, Loading },
  setup() {
    onMounted(() => initPage())

    const route = useRoute()
    const path = route.path.replace(/\/$/, "");

    let isLoading = ref(true)

    let favProducts = ref([])

    const getFav = () => {
      const favIds = JSON.parse(localStorage.getItem('fav-puz')) || []
      if (favIds.length === 0){
        favProducts.value = []
        isLoading.value = false
        return
      }
      
      let promises = []
      for (let i=0; i<favIds.length; i++){
        promises.push(getProduct(favIds[i]))
      }
      Promise.all(promises)
        .then(data => {
          let fav = data.filter(item => item.success)
          favProducts.value = fav
          isLoading.value = false
        })
        .catch(err => console.log(err))
    }
    getFav()

    const removeFav = (id) => {
      updateFav(id)
      getFav()
    }
    const addFavToCart = (id) => {
      isLoading.value = true
      store.commit('addOneToCart', id)
      updateFav(id)
      store.commit('addNotification', { msg: '已加入購物車' })
      setTimeout(() => getFav(), 1000)
    }

    return { favProducts, isLoading, removeFav, addFavToCart }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  min-height: 50vh;
}
.fav-list {
  max-width: 750px;
  width: 100%;
  margin: 50px auto 200px auto;
  color: $dark-grey;
  font-size: 16px;
  @media (max-width: 600px) {
    margin: 50px auto 100px auto;
  }
  @media (max-width: 500px) {
    margin: 30px auto 70px auto;
    font-size: 14px;
  }
}
th, td {
  padding: 10px;
  vertical-align: middle;
  @media (max-width: 500px) {
    padding: 10px 5px;
  }
  @media (max-width: 400px) {
    padding: 5px 0;
  }
}
.m-show {
  display: none;
}
@media (max-width: 800px) {
  .m-hide {
    display: none;
  }
  .m-show {
    display: block;
  }
}
.title-row {
  border-top: 1px solid #AAA;
  border-bottom: 1px solid #AAA;
}
.item-row {
  border-bottom: 1px solid #CCC;
  .image {
    width: 100px;
    .image-link {
      display: block;
      width: 100%;
      .img {
        width: 100%;
      }
    }
    @media (max-width: 400px) {
      width: 90px;
    }
  }
  .name {
    width: auto;
    @media (max-width: 400px) {
      padding: 10px 5px;
    }
    a {
      line-height: 1.3;
    }
  }
  .price {
    width: 75px;
    text-align: right;
    @media (max-width: 500px) {
      width: 50px;
    }
    @media (max-width: 400px) {
      padding: 10px 5px;
    }
  }
  .addcart {
    width: 140px;
    .btn {
      width: 100%;
      height: 45px;
      background: $dark-grey;
      color: #FFF;
      transition: all .5s;
      &:hover {
        background: #FFF;
        color: $dark-grey;
        border: 1px solid $dark-grey;
      }
    }
  }
  .unfav {
    width: 90px;
    .btn {
      width: 30px;
      height: 25px;
      background: transparent;
      color: #000;
    }
  }
  .addcart, .unfav {
    text-align: center;
    .btn {
      border: none;
      border-radius: $border-radius;
      font-size: 16px;
      text-align: center;
      cursor: pointer;
      .icon {
        color: $dark-grey;
        font-size: 22px;
        text-align: center;
      }
    }
    @media (max-width: 800px) {
      width: 50px;
      .btn {
        width: 100%;
        height: 25px;
        background: transparent;
        color: $dark-grey;
        &:hover {
          border: none;
        }
        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    @media (max-width: 600px) {
      width: 40px;
      .btn {
        .icon {
          font-size: 20px;
        }
      }
    }
    @media (max-width: 500px) {
      width: 35px;
    }
    @media (max-width: 400px) {
      width: 25px;
    }
  }
}
</style>