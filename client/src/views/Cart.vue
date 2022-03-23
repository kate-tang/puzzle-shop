<template>
  <main class="cart main">
    <Breadcrumb />
    <div class="container">
      <Loading :active="isLoading" :is-full-page="false" />
      <div v-if="!isLoading">
        <Empty v-if="cartItemDetails.length === 0" />
        <div v-else class="cart-wrap">
          <div class="process">
            <ol class="steps">
              <li class="step done">購物車</li>
              <li class="step" :class="{ 'done': checkoutStep >= 2 }">填寫資料</li>
              <li class="step" :class="{ 'done': checkoutStep >= 3 }">確認付款</li>
              <li class="step" :class="{ 'done': checkoutStep >= 4 }">完成購物</li>
            </ol>
          </div>
          <section class="checkout checkout-items" v-if="checkoutStep === 1">
            <div class="checkout-items-list">
              <div class="btns head">
                <router-link to="/products" class="btn-hollow">
                  <ion-icon name="caret-back-sharp"></ion-icon>
                  <span>繼續購物</span>
                </router-link>
                <button class="btn-hollow" @click="clearCart">
                  <ion-icon name="trash-outline"></ion-icon>
                  清除全部
                </button>
              </div>
              <ul class="cart-items">
                <li class="cart-item" v-for="item in cartItemDetails" :key="item.id">
                  <ProductImage class="item-image" :file-name="item.product.imageFileName" :alt="item.product.name" />
                  <div class="item-details">
                    <div class="name">{{ item.product.name }}</div>
                    <div class="price">${{ item.product.price }} / 個</div>
                    <div class="qty">
                      <div class="change-qty">
                        <button class="change-qty-btn" @click="removeCart(item.id)">-</button>
                        <input :value="item.qty" type="number" class="change-qty-input" step="1" min="1" :max="item.product.countInStock" @input="reviseInput($event)" @blur="reviseCart($event, item.id, item.product.countInStock)" @keyup.enter="reviseCart($event, item.id, item.product.countInStock)">
                        <button class="change-qty-btn" @click="addCart(item.id, item.product.countInStock, item.qty)">+</button>
                      </div>
                    </div>
                    <div class="subtotal">小計：${{ item.product.price * item.qty }}</div>
                    <button class="delete-btn" @click="removeCart(item.id, true)">
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
            <div class="checkout-items-shipping-zone">
              請選擇送貨區域：
              <select name="shipping-zone" class="shipping-zone" id="" v-model="shippingZone" @change="getPrice">
                <option value="taiwan">本島</option>
                <option value="kmp">離島</option>
              </select>
            </div>
            <div class="checkout-items-amount">
              <div class="amount-item">
                <div class="name">小計</div>
                <div class="price">${{ subTotal }}</div>
              </div>
              <div class="amount-item">
                <div class="name">運費</div>
                <div class="price">${{ shippingFee }}</div>
              </div>
              <div class="amount-item" v-for="item in deductArr">
                <div class="name">{{ item.name }}</div>
                <div class="price">-${{ item.price }}</div>
              </div>
              <div class="amount-item">
                <div class="name">總金額</div>
                <div class="total">${{ total }}</div>
              </div>
              <button type="button" class="btn-solid" @click="goNext">前往結帳</button>
            </div>
          </section>
          <section class="checkout checkout-form" v-else-if="checkoutStep === 2">
            <h2 class="title">訂購人資料</h2>
            <p class="text"><span class="required">*</span> 為必填</p>
            <Form method="post" class="form" @submit="submitOrder">
              <div class="form-item">
                <label for="name">姓名 <span class="required">*</span></label>
                <Field type="text" name="name" id="name" v-model="order_name" :rules="validateName" />
                <ErrorMessage name="name" class="err-msg" />
              </div>
              <div class="form-item">
                <label for="email">Email <span class="required">*</span></label>
                <Field type="email" name="email" id="email" v-model="order_email" :rules="validateEmail" />
                <ErrorMessage name="email" class="err-msg" />
              </div>
              <div class="form-item">
                <label for="tel">電話 <span class="required">*</span></label>
                <Field type="tel" name="tel" id="tel" v-model="order_tel" :rules="validateTel" />
                <ErrorMessage name="tel" class="err-msg" />
              </div>
              <div class="form-item">
                <label for="address">地址 <span class="required">*</span></label>
                <Field type="text" name="address" id="address" v-model="order_address" :rules="validateAddress" />
                <ErrorMessage name="address" class="err-msg" />
              </div>
              <div class="form-item">
                <label for="payment">付款方式 <span class="required">*</span></label>
                <Field as="select" name="payment" id="payment" v-model="order_payment" :rules="validatePayment">
                  <option value="" disabled selected>請選擇</option>
                  <option value="creditcard">信用卡</option>
                  <option value="linepay">LinePay</option>
                  <option value="jkopay">街口支付</option>
                </Field>
                <ErrorMessage name="payment" class="err-msg" />
              </div>
              <div class="form-item">
                <label for="message">備註</label>
                <textarea name="message" id="message" v-model="order_message"></textarea>
              </div>
              <div class="btns">
                <button class="btn-hollow" type="button" @click="checkoutStep--">
                  <ion-icon name="caret-back-sharp"></ion-icon>
                  回購物車
                </button>
                <button class="btn-solid" type="submit">確認送出</button>
              </div>
            </Form>
          </section>
          <section class="checkout checkout-payment" v-else-if="checkoutStep === 3">
            <div class="order-list">
              <h2 class="title">訂單明細</h2>
              <ul class="product-items">
                <li class="item" v-for="item in cartItemDetails">
                  <ProductImage class="item-image" :file-name="item.product.imageFileName" :alt="item.product.name" />
                  <div class="item-details">
                    <div class="name">{{ item.product.name }}</div>
                    <div class="qty">{{ item.qty }} 個</div>
                  </div>
                  <div class="item-price">${{ item.product.price * item.qty }}</div>
                </li>
              </ul>
              <ul class="discount-items">
                <li class="item">
                  <div class="item-details">運費</div>
                  <div class="item-price">${{ shippingFee }}</div>
                </li>
                <li class="item" v-for="item in deductArr">
                  <div class="item-details">{{ item.name }}</div>
                  <div class="item-price">-${{ item.price }}</div>
                </li>
              </ul>
              <div class="total">
                <div class="item">
                  <div class="item-details">訂單金額</div>
                  <div class="item-price">${{ total }}</div>
                </div>
              </div>
            </div>
            <div class="order-details">
              <h2 class="title">訂購人資料</h2>
              <ul class="buyer-data">
                <li class="item">
                  <div class="name">訂購人</div>
                  <div class="content">{{ order_name }}</div>
                </li>
                <li class="item">
                  <div class="name">Email</div>
                  <div class="content">{{ order_email }}</div>
                </li>
                <li class="item">
                  <div class="name">電話</div>
                  <div class="content">{{ order_tel }}</div>
                </li>
                <li class="item">
                  <div class="name">地址</div>
                  <div class="content">{{ order_address }}</div>
                </li>
                <li class="item">
                  <div class="name">備註</div>
                  <div class="content">{{ order_message }}</div>
                </li>
                <li class="item">
                  <div class="name">付款方式</div>
                  <div class="content">{{ order_payment_zh }}</div>
                </li>
                <li class="item">
                  <div class="name">付款狀態</div>
                  <div class="content red">尚未付款</div>
                </li>
              </ul>
              <button class="btn-solid" type="button" @click="payForOrder">確認付款</button>
            </div>
          </section>
          <section class="checkout checkout-finish" v-else>
            <ion-icon class="icon-success" name="checkmark-circle-outline"></ion-icon>
            <h2 class="title">交易成功</h2>
            <p class="text">感謝購買，商品將於3個工作天內出貨。</p>
            <router-link to="/products" class="btn-solid">
              再去逛逛
            </router-link>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import store from '../store'
import { initPage, getProduct, validateName, validateEmail, validateTel, validateAddress, validatePayment } from '../helpers'
import Banner from '../components/Banner.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import Empty from '../components/Empty.vue'
import ProductImage from '../components/ProductImage.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { Form, Field, ErrorMessage } from 'vee-validate'

export default {
  components: { Banner, Breadcrumb, Empty, ProductImage, Loading, Form, Field, ErrorMessage },
  setup() {
    onMounted(() => initPage())

    let isLoading = ref(true)
    let checkoutStep = ref(1)
    let cartItemList = ref([])          // list of cart items
    let cartItemDetails = ref([])       // list of cart items with product details

    let shippingZone = ref('taiwan')

    const getCart = () => {
      cartItemList.value = JSON.parse(localStorage.getItem('cart-puz')) || []
      if (cartItemList.value.length === 0){
        cartItemDetails.value = []
        isLoading.value = false
        return
      }
      
      let promises = []
      for (let i=0; i<cartItemList.value.length; i++){
        promises.push(getProduct(cartItemList.value[i]['productId'], cartItemList.value[i]['qty']))
      }
      Promise.all(promises)
        .then(data => {
          cartItemDetails.value = data.filter(item => item.success)
          getPrice()
          isLoading.value = false
        })
        .catch(err => console.log(err))
    }
    getCart()

    let order_name = ref()
    let order_email = ref()
    let order_tel = ref()
    let order_address = ref()
    let order_payment = ref()
    let order_message = ref()
    let paymentLookup = {
      creditcard: '信用卡',
      linepay: 'LinePay',
      jkopay: '街口支付'
    }
    let order_payment_zh = computed(() => paymentLookup[order_payment.value])
    let orderId = ''
    function goNext(){
      window.scrollTo({ top: 0, behavior: 'smooth' })
      checkoutStep.value++
    }
    function submitOrder(){
      let data = {
        created_at: Date.now(),
        is_paid: false,
        payment_method: order_payment.value,
        products: cartItemList.value,
        user: {
          address: order_address.value,
          email: order_email.value,
          name: order_name.value,
          tel: order_tel.value
        },
        message: order_message.value
      }
      fetch('http://127.0.0.1:3000/api/order', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      .then(res => {
        if (res.ok){
          return res.json()
        }
      })
      .then(data => {
        console.log(data)
        if (data.success){
          orderId = data.key
          store.commit('clearCart')
          goNext()
        }
      })
      .catch(err => console.log(err))
    }
    function payForOrder(){
      if (!orderId){
        console.log('cannot get order id');
        return
      }

      fetch(`http://127.0.0.1:3000/api/order/pay/${orderId}`, {
        method: 'post',
      })
      .then(res => {
        if (res.ok){
          return res.json()
        }
      })
      .then(data => {
        console.log(data);
        if (data.success){
          goNext()
        }
      })
      .catch(err => console.log(err))
    }

    // get order price
    const subTotal = ref(0)
    const total = ref(0)
    const shippingFeeForTaiwan = 100
    const shippingFeeForKmp = 160
    const shippingFee = ref(shippingFeeForTaiwan)
    const deductArr = ref([])
    function getPrice(){
      // subTotal
      let catArr = []
      let price = 0
      cartItemDetails.value.forEach(item => {
        catArr.push({
          cat: item.product['category-en'],
          qty: item.qty,
          price: item.product.price
        })
        price += (item.product.price * item.qty)
      })
      subTotal.value = price

      // discount
      let deducts = []

      // discount: buy three get one free for world-masterpieces series products
      let worldMasterpiecesProductNum = 0
      let worldMasterpiecesArr = catArr.filter(item => {
        return item.cat === 'world-masterpieces'
      }).reduce((prev, item) => {
        worldMasterpiecesProductNum += item.qty
        if (item.qty === 1){
          return prev.concat(item)
        } else if (item.qty > 1){
          let tempItem = Object.assign({}, item, { qty: 1 })
          let arr = new Array(item.qty).fill(tempItem)
          return prev.concat(arr)
        }
      }, []).sort((a, b) => a.price - b.price)
      let numForFree = Math.floor(worldMasterpiecesProductNum / 3)
      for (let i = 0; i < numForFree; i++){
        price -= worldMasterpiecesArr[i].price
        deducts.push({
          name: '【世界名畫】全系列買二送一',
          price: worldMasterpiecesArr[i].price
        })
      }

      // discount: order over $1000 qualifies for free shipping
      shippingFee.value = shippingZone.value === 'taiwan' ? shippingFeeForTaiwan : shippingFeeForKmp
      if (price > 1000){
        deducts.unshift({
          name: '運費折扣',
          price: shippingFee.value
        })
      } else {
        price += shippingFee.value
      }

      deductArr.value = deducts

      // total price
      total.value = price
    }

    // revise cart item qty
    function addCart(id, countInStock, qtyInCart){
      if (qtyInCart < countInStock){
        store.commit('addOneToCart', id)
        store.commit('addNotification', { msg: '成功修改數量' })
        getCart()
      } else {
        store.commit('addNotification', { type: 'warning', msg: '已達購買上限' })
      }
    }
    function removeCart(id, clearAll = false){
      if (!clearAll){
        store.commit('deleteOneFromCart', id)
        store.commit('addNotification', { msg: '成功修改數量' })
      } else {
        store.commit('deleteAllFromCart', id)
        store.commit('addNotification', { msg: '成功移除商品' })
      }
      getCart()
    }
    function clearCart(){
      store.commit('clearCart')
      store.commit('addNotification', { msg: '成功移除所有商品' })
      getCart()
    }
    function reviseInput(e){
      const forbiddenCharacter = /[,.+-]|^0/g
      e.target.value = e.target.value.replace(forbiddenCharacter, '')
    }
    function reviseCart(e, id, countInStock){
      const qty = Number(e.target.value)
      if (!qty) return

      if (qty <= countInStock){
        store.commit('reviseCartItemQty', { id, qty })
        store.commit('addNotification', { msg: '成功修改數量' })
        getCart()
      } else {
        store.commit('addNotification', { type: 'warning', msg: '已達購買上限' })
        e.target.value = countInStock
      }

      e.target.blur()
    }

    return {
      cartItemDetails, isLoading, checkoutStep, goNext, shippingZone,
      subTotal, total, shippingFee, deductArr, getPrice,
      addCart, removeCart, clearCart, reviseInput, reviseCart,
      order_name, order_email, order_tel, order_address, order_payment, order_message, order_payment_zh,
      submitOrder, payForOrder, validateName, validateEmail, validateTel, validateAddress, validatePayment
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  min-height: 50vh;
}
.steps {
  display: flex;
  justify-content: space-between;
  max-width: 800px;
  margin: 30px auto 50px auto;
  counter-reset: step;
  @media (max-width: 400px) {
    margin: 30px auto 40px auto;
  }
  .step {
    position: relative;
    flex: 25%;
    padding: 30px 5px 20px 5px;
    color: $green;
    border-bottom: 5px solid $light-green;
    text-align: center;
    counter-increment: step;
    @media (max-width: 768px) {
      padding: 25px 5px 10px 5px;
      font-size: 14px;
    }
    &::before {
      content: counter(step);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 20px;
      height: 20px;
      margin: 0 auto;
      background: $light-green;
      color: #FFF;
      border-radius: 50%;
      font-size: 14px;
      text-align: center;
      line-height: 20px;
      transition: all 1s;
      @media (max-width: 768px) {
        width: 18px;
        height: 18px;
        font-size: 12px;
      }
    }
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      right: 100%;
      height: 5px;
      background: $green;
      transition: right 1s;
    }
    &.done {
      &::before {
        background: $green;
      }
      &::after {
        right: 0;
      }
    }
  }
}
.title {
  margin-bottom: 20px;
  font-size: 26px;
  text-align: center;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 22px;
  }
  @media (max-width: 500px) {
    font-size: 18px;
  }
}
.btns {
  display: flex;
  justify-content: space-between;
}
.btn-hollow {
  all: unset;
  display: block;
  color: $green;
  font-weight: 500;
  font-size: inherit;
  &:hover {
    color: darken($green, 10%);
    cursor: pointer;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
}
.btn-solid {
  all: unset;
  box-sizing: border-box;
  display: block;
  padding: 10px 30px;
  background: $dark-grey;
  color: #FFF;
  border-radius: $border-radius;
  &:hover {
    background: lighten($dark-grey, 10%);
    cursor: pointer;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
}

.cart-wrap {
  padding-bottom: 100px;
}
.checkout {
  margin: 0 auto;
  width: calc(100% - 40px);
  @media (max-width: 500px) {
    width: calc(100% - 20px);
  }
  @media (max-width: 400px) {
    width: auto;
  }
}

// 1
.checkout-items {
  max-width: 800px;
}
.checkout-items-list {
  margin-bottom: 20px;
  .head {
    padding-bottom: 20px;
    @media (max-width: 768px) {
      padding-bottom: 15px;
      font-size: 14px;
    }
  }
  .cart-item {
    display: flex;
    padding: 10px 0 10px 0;
    border-top: 1px solid black;
    &:last-child {
      border-bottom: 1px solid #000;
    }
  }
  .item-image {
    flex: 0 0 80px;
  }
  .item-details {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;
    .name {
      flex: 1;
      line-height: 1.3;
    }
    .price {
      flex: 0 0 90px;
      text-align: right;
    }
    .qty {
      flex: 0 0;
      margin-left: 10px;
    }
    .subtotal {
      flex: 0 0 100px;
      margin-left: 5px;
      color: gray;
      font-size: 14px;
      text-align: right;
      line-height: 1.2;
    }
    .delete-btn {
      all: unset;
      margin-left: 10px;
      cursor: pointer;
    }
    @media (max-width: 768px) {
      margin-left: 10px;
      font-size: 14px;
    }
    @media (max-width: 600px) {
      position: relative;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 30px;
      .name, .price, .qty, .subtotal {
        flex: auto;
      }
      .qty {
        margin-left: 0;
        margin-top: auto;
      }
      .subtotal {
        position: absolute;
        right: 0;
        bottom: 5px;
      }
      .delete-btn {
        display: none;
      }
    }
    @media (max-width: 500px) {
      margin-left: 20px;
    }
    @media (max-width: 400px) {
      margin-left: 10px;
    }
  }
}
.qty {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
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
  @media (max-width: 768px) {
    .change-qty {
      width: 92px;
    }
    .change-qty-btn {
      width: 26px;
      height: 26px;
    }
    .change-qty-input {
      width: 40px;
      height: 26px;
    }
  }
  @media (max-width: 400px) {
    .change-qty {
      width: 86px;
    }
    .change-qty-btn {
      width: 24px;
      height: 24px;
    }
    .change-qty-input {
      width: 38px;
      height: 24px;
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
}
.checkout-items-shipping-zone {
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
  .shipping-zone {
    width: 100px;
    height: 25px;
    outline: none;
  }
}
.checkout-items-amount {
  max-width: 45%;
  margin-left: auto;
  .amount-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1.3;
    margin-bottom: 10px;
    .total {
      color: $red;
      font-size: 20px;
    }
  }
  .btn-solid {
    margin-left: auto;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
}

// 2
.checkout-form {
  max-width: 550px;
  .text {
    margin-bottom: 20px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
}
.required {
  color: red;
}
.err-msg {
  display: block;
  margin-top: 5px;
  color: red;
}
.form-item {
  margin-bottom: 20px;
  label {
    display: block;
    margin-bottom: 10px;
  }
  input, select, textarea {
    width: 100%;
    padding: 10px 13px;
    font-size: 16px;
    border: 1px solid #BBB;
    border-radius: $border-radius;
  }
  select {
  }
  textarea {
    height: 80px;
    resize: none;
    font-family: inherit;
    line-height: 1.3;
  }
  @media (max-width: 768px) {
    font-size: 14px;
    input, select, textarea {
      font-size: 14px;
    }
  }
}

// 3
.checkout-payment {
  max-width: 800px;
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
}
.order-list {
  margin-bottom: 50px;
  padding: 20px;
  border: 1px solid #BBB;
  border-radius: $border-radius;
  .product-items {
    padding: 10px 0;
    border-top: 1px solid #BBB;
  }
  .discount-items {
    padding: 10px 0;
  }
  .total {
    padding: 15px 0;
    border-top: 1px solid #BBB;
    .item .item-price {
      color: $red;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .item {
    display: flex;
    align-items: center;
    padding: 8px 0;
  }
  .item-image {
    flex: 0 0 70px;
    margin-right: 10px;
    @media (max-width: 768px) {
      flex: 0 0 60px;
    }
  }
  .item-details {
    flex: 1;
    .name {
      margin-bottom: 8px;
    }
  }
  .item-price {
    flex: 0 0 60px;
    text-align: right;
  }
}
.order-details {
  padding: 20px;
  background: #EEE;
  border-radius: $border-radius;
  .buyer-data {
    padding: 20px 0;
    border-top: 1px solid #BBB;
    .item {
      display: flex;
      padding: 5px 0;
      line-height: 1.3;
      .name {
        flex: 0 0 100px;
        @media (max-width: 400px) {
          flex: 0 0 80px;
        }
      }
      .content {
        flex: 1;
        &.red {
          color: red;
        }
      }
    }
  }
  .btn-solid {
    max-width: 100%;
    width: 100%;
    text-align: center;
  }
}

// 4
.checkout-finish {
  max-width: 450px;
  margin-bottom: 150px;
  padding: 50px 20px;
  background: lighten($green, 50%);
  border-radius: $border-radius;
  text-align: center;
  .icon-success {
    margin-bottom: 20px;
    color: $green;
    font-size: 100px;
  }
  .text {
    margin-bottom: 20px;
    line-height: 1.3;
  }
  .btn-solid {
    width: 150px;
    margin: 0 auto;
  }
  @media (max-width: 768px) {
    margin-bottom: 0;
  }
}
</style>