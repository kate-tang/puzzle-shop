<template>
  <main class="product main">
    <Breadcrumb />
    <div class="container">
      <div class="waiting" v-if="product.length === 0">商品載入中，請稍候...</div>
      <div class="product-wrap" v-else>
        <div class="product-intro">
          <div class="product-intro-gallery">
            <ProductImageZoom :product="product"/>
          </div>
          <div class="product-intro-info">
            <div class="series">【{{ product['category-zh'] }}】</div>
            <h1 class="title">{{ product.name }}</h1>
            <div class="promotion">
              <div class="promotion-item" v-if="product['category-en'] === 'world-masterpieces'">本月主打【世界名畫】系列，全系列買二送一</div>
              <div class="promotion-item">全館單筆消費滿千，即享免運優惠</div>
            </div>
            <div class="pieces" v-if="product.pieces">片數：{{ product.pieces }} 片</div>
            <div class="price" v-if="product.pieces">NT${{ product.price }}</div>
            <div class="qty">
              <div class="change-qty">
                <button class="change-qty-btn" @click="reduce_qty">-</button>
                <input type="number" class="change-qty-input" v-model="buy_qty" step="1" min="1" :max="product.countInStock" @blur="adjust_qty">
                <button class="change-qty-btn" @click="add_qty">+</button>
              </div>
              <p class="remain">
                <div class="remain-more" v-if="product.countInStock >= 10">庫存量 ≥ 10</div>
                <div class="remain-less" v-else-if="product.countInStock > 0">庫存 {{ product.countInStock }} 件</div>
                <div class="remain-none" v-else="product.countInStock === 0">暫無庫存</div>
              </p>
              <p class="alert" v-if="product.countInStock > 0 && buy_qty >= product.countInStock">已達到購買上限</p>
            </div>
            <div class="action">
              <button type="button" class="action-btn checkout-btn" v-if="product.countInStock > 0" @click="addCart">
                加入購物車
                <img src="../assets/image/load-white.gif" alt="" class="load" v-if="isAddingToCart">
              </button>
              <button type="button" class="action-btn pre-order-btn" v-else @click="showArrivalNotice = true">可訂購時通知我</button>
              <button type="button" class="wishlist-btn" @click="updateFav(id)">
                <ion-icon name="heart" class="link-icon" :class="{ 'fav': $store.state.favProducts.includes(id) }" v-if="$store.state.favProducts.includes(id)"></ion-icon>
                <ion-icon name="heart-outline" class="link-icon" v-else></ion-icon>
                加入我的最愛
              </button>
              <Transition name="slide">
                <ArrivalNotice v-if="product.countInStock === 0 & showArrivalNotice" @close="showArrivalNotice = false" />
              </Transition>
            </div>
            <div class="share-links">
              分享到
              <ul class="social">
                <li class="social-item"><a href="https://www.facebook.com/" class="social-link"><ion-icon name="logo-facebook"></ion-icon></a></li>
                <li class="social-item"><a href="https://twitter.com/" class="social-link"><ion-icon name="logo-twitter"></ion-icon></a></li>
                <li class="social-item"><a href="https://www.instagram.com/" class="social-link"><ion-icon name="logo-instagram"></ion-icon></a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="product-details">
          <div class="description">
            <h2 class="main-title small">
              <div class="en">details</div>
              <div class="zh">商品描述</div>
            </h2>
            <!-- description for 3D puzzle -->
            <div class="description-content" v-if="product['category-en'] === '3d-puzzle'">
              <div class="set">
                <img src="../assets/image/product-details-04.jpeg" alt="拚膩了平面拼圖嗎？來款燒腦的3D立體模型。">
                <p class="set-text">拚膩了平面拼圖嗎？來款燒腦的3D立體模型吧。</p>
              </div>
              <div class="set">
                <img src="../assets/image/product-details-05.jpeg" alt="忠實重現每一處細節，讓您遊玩時彷彿身入其境。">
                <p class="set-text">忠實重現每一處細節，讓您遊玩時彷彿身入其境。</p>
              </div>
            </div>
            <!-- description for not-puzzle product -->
            <div class="description-content" v-else-if="product['category-en'] === 'other'">
              <div class="set">
                <img src="../assets/image/product-details-06.jpeg" alt="更多拼圖相關小物，快來選購。">
                <p class="set-text">更多拼圖相關小物，快來選購。</p>
              </div>
            </div>
            <!-- description for general puzzle -->
            <div class="description-content" v-else>
              <div class="set">
                <img src="../assets/image/product-details-01.jpg" alt="拼圖採用優質紙質材料製成，觸感細膩，印刷清晰。">
                <p class="set-text">拼圖採用優質紙質材料製成，觸感細膩，印刷清晰。</p>
              </div>
              <div class="set">
                <img src="../assets/image/product-details-02.jpg" alt="每片拼圖形狀獨一無二，咬合力強，讓您享受拼圖樂趣的同時又不誤拼。">
                <p class="set-text">每片拼圖形狀獨一無二，咬合力強，讓您享受拼圖樂趣的同時又不誤拼。</p>
              </div>
              <div class="set">
                <img src="../assets/image/product-details-03.jpeg" alt="可加購拼圖框，讓親手完成的拼圖變成牆上的藝術品。">
                <p class="set-text">可加購拼圖框，讓親手完成的拼圖變成牆上的藝術品。</p>
              </div> 
            </div>
          </div>
          <div class="spec">
            <h2 class="main-title small">
              <div class="en">spec</div>
              <div class="zh">商品規格</div>
            </h2>
            <table class="spec-table">
              <tr class="row">
                <th class="title">品名</th>
                <td class="content">{{ product.name }}</td>
              </tr>
              <tr class="row" v-if="product.pieces">
                <th class="title">片數</th>
                <td class="content">{{ product.pieces }}片</td>
              </tr>
              <tr class="row" v-if="product.pieces">
                <th class="title">完成尺寸</th>
                <td class="content">{{ product.size }}</td>
              </tr>
              <tr class="row" v-if="product.size && !product.pieces">
                <th class="title">尺寸</th>
                <td class="content">{{ product.size }}</td>
              </tr>
              <tr class="row">
                <th class="title">材質</th>
                <td class="content">{{ product.material }}</td>
              </tr>
              <tr class="row" v-if="product.direction">
                <th class="title">方向</th>
                <td class="content">{{ product.direction === 'v' ? '直向' : '橫向' }}</td>
              </tr>
              <tr class="row">
                <th class="title">產地</th>
                <td class="content">台灣</td>
              </tr>
              <tr class="row" v-if="product.content">
                <th class="title">內容物</th>
                <td class="content">{{ product.content }}</td>
              </tr>
              <tr class="row" v-if="product.pieces">
                <th class="title">難易度</th>
                <td class="content">
                  <span v-if="product.pieces < 100">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                  </span>
                  <span v-else-if="product.pieces < 500">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                  </span>
                  <span v-else-if="product.pieces < 1000">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star-half"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                  </span>
                  <span v-else-if="product.pieces === 1000">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                  </span>
                  <span v-else>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                  </span>
                </td>
              </tr>
              <tr class="row">
                <th class="title">適用年齡</th>
                <td class="content">3歲以上</td>
              </tr>
            </table>
          </div>
          <div class="notice">
            <h2 class="main-title small">
              <div class="en">notice</div>
              <div class="zh">商品須知</div>
            </h2>
            <p class="notice-item">商品尺寸及顏色可能會與圖片有微小差異，請以實際商品為主。</p>
            <p class="notice-item">本商品內含小物件，不適合三歲以下兒童使用且應避免幼兒吞食窒息。</p>
            <p class="notice-item">為了保護消費者權益，依消保法規定，商品皆享有七天猶豫期的權益。退換貨商品須為未經拆封使用，或非人為瑕疵所造成的污損、故障，並保留完整的原始包裝（含外包裝紙盒），否則恕不接受退貨。</p>
            <p class="notice-item">如遇有缺片問題，請參考<router-link :to="{ path: '/faq', hash: '#q7' }" class="link">補片說明</router-link>了解如何申請補片。</p>
            <p class="notice-item">平面拼圖類商品皆提供代拼服務，如有需要請於訂購時備註告訴我們。</p>
          </div>
          <div class="recommend">
            <h2 class="main-title small">
              <div class="en">more</div>
              <div class="zh">與此商品相似</div>
            </h2>
            <p v-if="!recommendedProducts">商品載入中，請稍候...</p>
            <ul class="recommend-list" v-else>
              <li class="recommend-item" v-for="item in recommendedProducts" :style="{ order: Math.floor(Math.random() * 100) }">
                <router-link :to="`/products/${item.id}`" class="recommend-link">
                  <ProductImage class="product-image" :file-name="item.imageFileName" :alt="item.name" />
                  <div class="product-details">
                    <div class="name">{{ item.name }}</div>
                    <div class="price">NT ${{ item.price }}</div>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { onMounted, ref } from 'vue'
import store from '../store'
import { useRouter } from 'vue-router'
import { initPage, getProduct, updateFav } from '../helpers'
import Breadcrumb from '../components/Breadcrumb.vue'
import ProductImage from '../components/ProductImage.vue'
import ProductImageZoom from '../components/ProductImageZoom.vue'
import ArrivalNotice from '../components/ArrivalNotice.vue'

export default {
  components: { Breadcrumb, ProductImage, ProductImageZoom, ArrivalNotice },
  props: ['id'],
  setup(props) {
    onMounted(() => initPage())

    let showArrivalNotice = ref(false)

    // get product data, and then recommended products (products of the same category)
    const router = useRouter();
    let product = ref([]);
    let recommendedProducts = ref(null);
    let buy_qty = ref(1);
    getProduct(props.id)
      .then(data => {
        console.log(data);
        if (!data.success) throw new Error(data.message);
        product.value = data.product
        document.title = `${data.product.name} | ${document.title}`
        buy_qty.value = product.value.countInStock === 0 ? 0 : 1

        // generate 4 recommended products from relative category
        return getProduct(`all/${product.value['category-en']}`)
      })
      .then(data => {
        console.log(data);

        let tempArr = data.products

        // first, exclude current product 
        let currentProductIndex = tempArr.findIndex(item => item.id === props.id)
        tempArr.splice(currentProductIndex, 1)

        // second, if products left <= 4 then use all, if > 4 then get random 4
        if (tempArr.length <= 4){
          recommendedProducts.value = tempArr
        } else {
          let newArr = []
          for (let i = 0; i < 4; i++){
            let id = Math.floor(Math.random() * tempArr.length)
            newArr.push(tempArr[id])
            tempArr.splice(id, 1)
          }
          recommendedProducts.value = newArr
        }
      })
      .catch(err => {
        console.log(err)
        router.push('/404')
      })

    // handle product qty +/-
    function add_qty(){
      if (buy_qty.value === product.value.countInStock || product.value.countInStock === 0) return
      buy_qty.value++;
    }
    function reduce_qty(){
      if (buy_qty.value === 1 || product.value.countInStock === 0) return
      buy_qty.value--;
    }
    function adjust_qty(){
      if (!buy_qty.value || buy_qty.value <= 0) buy_qty.value = 1
      if (buy_qty.value > product.value.countInStock) buy_qty.value = product.value.countInStock
      if (!Number.isInteger(buy_qty.value)) buy_qty.value = Math.floor(buy_qty.value)
    }

    // add to cart
    const loadingTime = 1000
    let isAddingToCart = ref(false)
    function addCart(){
      isAddingToCart.value = true
      const id = props.id
      const countInStock = product.value.countInStock
      const itemInCart = store.state.cartItems.find(item => item['productId'] === id)
      if (!itemInCart || itemInCart['qty'] + buy_qty.value <= countInStock){
        setTimeout(() => {
          store.commit('addMultiToCart', { id, qty: buy_qty.value })
          store.commit('addNotification', { msg: '已加入購物車' })
          isAddingToCart.value = false
        }, loadingTime)
      } else {
        setTimeout(() => {
          store.commit('addNotification', { type: 'warning', msg: `抱歉，本商品最多可購買 ${countInStock} 件` })
          isAddingToCart.value = false
        }, loadingTime)
      }
    }

    return {
      product, recommendedProducts,
      buy_qty, add_qty, reduce_qty, adjust_qty,
      updateFav,
      addCart, isAddingToCart,
      showArrivalNotice
    }
  },
}
</script>

<style lang="scss" scoped>
.product {
  .container {
    margin-top: 30px;
    @media (max-width: 800px) {
      margin-top: 0;
    }
  }
}
.waiting {
  height: 100vh;
}
.product-wrap {
  margin-bottom: 80px;
}

.product-intro {
  display: flex;
  margin-bottom: 80px;
  @media (max-width: 800px) {
    flex-direction: column;
    max-width: 600px;
    margin: 0 auto;
  }
}

// gallery
.product-intro-gallery {
  flex: 1;
  margin-right: 30px;
  @media (max-width: 800px) {
    max-width: 600px;
    margin-right: 0;
    margin-bottom: 30px;
  }
}

// info
.product-intro-info {
  flex: 1;
  font-size: 16px;
  & > * {
    margin-bottom: 25px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
    & > * {
      margin-bottom: 15px;
    }
  }
}
.series {
  margin-bottom: 0px;
  line-height: 1.5;
}
.title {
  font-size: 32px;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 28px;
  }
  @media (max-width: 500px) {
    font-size: 24px;
  }
}
.promotion-item {
  padding: 3px 0 3px 10px;
  border-left: 3px solid $red;
  line-height: 1.3;
  & + & {
    margin-top: 5px;
  }
}
.price {
  margin-bottom: 60px;
  color: $red;
  font-size: 28px;
  @media (max-width: 768px) {
    font-size: 24px;
  }
}
.pieces {
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
}
.qty {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 16px;
  .change-qty {
    display: flex;
    align-items: center;
    width: 114px;
  }
  .change-qty-btn {
    width: 32px;
    height: 32px;
    background-color: #FFF;
    color: #777;
    outline: none;
    cursor: pointer;
    border: 1px solid #CCC;
    font-size: 20px;
  }
  .change-qty-input {
    width: 50px;
    height: 32px;
    padding: 2px 5px;
    color: #555;
    border: 1px solid #CCC;
    border-left: 0;
    border-right: 0;
    outline: none;
    font-size: 18px;
    text-align: center;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &[type=number] {
      -moz-appearance: textfield;
    }
  }
  .remain {
    margin-left: 15px;
    color: #777;
    font-size: 15px;
    white-space: nowrap;
  }
  .alert {
    width: 100%;
    margin-top: 1px;
    color: red;
    font-size: 15px;
  }
  @media (max-width: 768px) {
    .change-qty-input {
      font-size: 16px;
    }
    .remain, .alert {
      font-size: 14px;
    }
  }
}
.action {
  position: relative;
  .action-btn {
    display: block;
    width: 100%;
    padding: 10px;
    color: #FFF;
    border: none;
    border-radius: $border-radius;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
  }
  .checkout-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background: $red;
    &:hover {
      background: lighten($red, 5%);
    }
    .load {
      width: 18px;
      height: 18px;
      margin-left: 5px;
    }
  }
  .pre-order-btn {
    background: $dark-grey;
    &:hover {
      background: lighten($dark-grey, 5%);
    }
  }
  .wishlist-btn {
    display: block;
    margin: 0 auto;
    padding: 10px;
    background: #FFF;
    border: none;
    font-size: 16px;
    cursor: pointer;
    .fav {
      color: $red;
    }
  }
}
.share-links {
  display: flex;
  align-items: center;
  .social {
    display: flex;
    margin-left: 10px;
    .social-item {
      transition: all .3s;
      & + .social-item {
        margin-left: 7px;
      }
      &:hover {
        transform: translateY(-5px);
      }
      &:nth-child(1) .social-link { background: #4267B2; }
      &:nth-child(2) .social-link { background: #1DA1F2; }
      &:nth-child(3) .social-link { background-image: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%); }
      &:nth-child(4) .social-link { background: #FF0000; }
    }
    .social-link {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 28px;
      height: 28px;
      color: #FFF;
      border-radius: 5px;
      font-size: 18px;
    }
  }
}

// arrival notice transition
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.slide-enter-active,
.slide-leave-active {
  transition: all .5s;
}

// details
.product-details {
  & > * {
    margin-bottom: 80px;
  }
}
.description {
  .set {
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    img {
      max-width: 600px;
      width: 100%;
      height: auto;
    }
    .set-text {
      margin-top: 15px;
      font-size: 16px;
      line-height: 1.3;
      text-align: center;
      @media (max-width: 768px) {
        font-size: 14px;
      }
    }
    & + .set {
      margin-top: 40px;
    }
  }
}
.spec-table {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  .row {
    .title {
      width: 150px;
      padding: 5px 10px;
      color: #777;
      text-align: left;
      font-size: 16px;
      @media (max-width: 768px) {
        font-size: 14px;
      }
      @media (max-width: 500px) {
        width: 110px;
      }
      @media (max-width: 400px) {
        width: 100px;
      }
    }
    .content {
      padding: 5px 10px;
      font-size: 16px;
      @media (max-width: 768px) {
        font-size: 14px;
      }
    }
  }
}
.notice {
  max-width: 800px;
  width: 100%;
  margin: 0 auto 80px auto;
  .notice-item {
    position: relative;
    margin-left: 25px;
    margin-bottom: 8px;
    line-height: 1.3;
    font-size: 16px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
    &::before {
      content: '+';
      position: absolute;
      left: -15px;
    }
    .link {
      color: $red;
      border-bottom: 3px solid $red;
    }
  }
}
// details - recommend
.recommend-list {
  display: flex;
  @media (max-width: 800px) {
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
.recommend-item {
  flex: 0 0 25%;
  padding: 0 10px;
  &:hover {
    background: url('../assets/image/recommend-01.jpg') center;
  }
  @media (max-width: 800px) {
    flex: 0 0 49%;
    padding: 0;
  }
  .product-image {
    width: 100%;
  }
  .product-details {
    padding: 10px 15px;
    color: $dark-grey;
    @media (max-width: 450px) {
      padding: 5px 10px 10px 10px;
    }
    .name {
      margin-bottom: 5px;
      font-size: 18px;
      line-height: 1.3;
      @media (max-width: 768px) {
        font-size: 16px;
      }
      @media (max-width: 450px) {
        margin-bottom: 5px;
        font-size: 14px;
      }
    }
    .price {
      margin: 0;
      font-size: 16px;
      font-weight: bold;
      @media (max-width: 450px) {
        font-size: 14px;
      }
    }
  }
}
</style>