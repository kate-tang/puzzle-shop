import { createStore } from 'vuex'

export default createStore({
  state: {
    routeTransition: 'route',
    categories: [
      { 'category-zh': '世界名畫', 'category-en': 'world-masterpieces' },
      { 'category-zh': '東方藝術', 'category-en': 'eastern-masterpieces' },
      { 'category-zh': '風景', 'category-en': 'landscape' },
      { 'category-zh': '地圖', 'category-en': 'map' },
      { 'category-zh': '城市建築', 'category-en': 'city-and-architecture' },
      { 'category-zh': '動物', 'category-en': 'wild-animals' },
      { 'category-zh': '兒童', 'category-en': 'kids-favorite' },
      { 'category-zh': '3D立體模型', 'category-en': '3d-puzzle' },
      { 'category-zh': '周邊商品', 'category-en': 'other' },
    ],
    bannerData: {
      'products': { bg: 'products-banner-bg.jpeg', text: ['Puzzle Shop 帶您', '探索拼圖的樂趣'] },
      'categories': { bg: 'products-banner-bg.jpeg', text: ['Puzzle Shop 帶您', '探索拼圖的樂趣'] },
      'favorites': { bg: 'favorites-banner-bg.jpeg', text: ['收藏清單'] }
    },
    emptyData: {
      'favorites': { image: 'empty-favorites.jpg', imageAlt: '暫無收藏', text: ['目前沒有任何收藏喔', '還在猶豫嗎？快將喜愛的商品加入收藏吧'], btnText: '查看更多商品', btnLink: '/products' },
      'cart': { image: 'empty-cart.jpg', imageAlt: '空的購物車', text: ['Oh no :( 購物車是空的', '錢沒有消失，它只是變成你喜歡的樣子'], btnText: '查看更多商品', btnLink: '/products' },
      'notFound': { image: '404.jpg', imageAlt: '找不到頁面', text: ['Oops! 這個頁面不存在喔...'], btnText: '回首頁', btnLink: '/' }
    },
    favProducts: [],
    cartItems: [],
    faqData: [
      {
        q: '如何購買拼圖？',
        a: '您可以點選商品附近的購物車按鈕 <ion-icon name="cart-outline"></ion-icon>，將喜歡的拼圖加入購物車。欲結帳時，請點選畫面右上角的購物車圖示，依照指示完成結帳流程。'
      },
      {
        q: '目前有哪些優惠？',
        a: '全館購物滿千即享免運，另外本月主打【世界名畫】系列，全系列買二送一，歡迎多多參考選購。'
      },
      {
        q: '有哪些付款方式？',
        a: '目前提供信用卡線上刷卡（含 VISA / MASTER / JCB 等）、LINE Pay、街口支付，其他付款方式如貨到付款、ATM 匯款等目前與廠商接洽中，預計於近期開通。'
      },
      {
        q: '我已完成訂購，什麼時候會出貨？',
        a: '完成訂購流程後，商品將於 3 個工作天內出貨，如遇包裹量較多，將延遲 2-3 日出貨，敬請見諒。'
      },
      {
        q: '可以退換貨嗎？',
        a: '本館所有商品均享有 10 天的猶豫期，若需辦理退換貨，請務必在收到商品 10 日內提出退換貨申請。請注意，猶豫期間非試用期或鑑賞期，辦理退換貨時，請務必確保商品包裝完整。'
      },
      {
        q: '想要的拼圖缺貨怎麼辦？',
        a: '如欲訂購的商品缺貨，請點選商品頁中的「可訂購時通知我」按鈕，填妥聯絡資訊，我們將於商品到貨後通知您。'
      },
      {
        q: '有提供補片服務嗎？',
        a: '拼圖發生缺片的原因有很多，原廠製作過程中缺失僅占一部分原因，而絕大部分可能是於拼圖過程中遺失。如發現有缺片，請 Email 聯絡我們（puzzle@puzzleshop.com.tw），並提供相關資訊（購買人姓名和電話、缺片拼圖名稱和位置），我們將提供人工補片服務。補片服務於商品購買 1 年內免費提供，超過 1 年酌收每片 50 元工本費。'
      },
      {
        q: '可以訂製拼圖嗎？',
        a: '把具有紀念意義的照片或圖片做成拼圖，是很棒的回憶方式呢。如需訂製拼圖，請 Email 聯絡我們（puzzle@puzzleshop.com.tw），將有專人與您聯繫接洽相關事宜。'
      },
      {
        q: '我住在離島 / 海外，有提供運送服務嗎？',
        a: '我們提供離島運送，選購商品加入購物車，進入付款頁面後，即會為您試算相關運送費用；海外運送服務將於不久後開通，敬請期待。'
      },
    ],
    notificationsData: [],
    notificationTimeout: null
  },
  mutations: {
    // set route transition name
    setRouteTransition(state){
      state.routeTransition = 'route'
    },
    clearRouteTransition(state){
      state.routeTransition = null
    },

    // fav
    setFavProducts(state){
      state.favProducts = JSON.parse(localStorage.getItem('fav-puz')) || []
    },
    addFavProduct(state, id){
      state.favProducts.push(id)
      localStorage.setItem('fav-puz', JSON.stringify(state.favProducts))
    },
    deleteFavProduct(state, favIdIndex){
      state.favProducts.splice(favIdIndex, 1)
      localStorage.setItem('fav-puz', JSON.stringify(state.favProducts))
    },

    // cart
    setCartItems(state){
      state.cartItems = JSON.parse(localStorage.getItem('cart-puz')) || []
    },
    addOneToCart(state, id){
      const index = state.cartItems.findIndex(item => item['productId'] === id)

      if (index === -1){
        const data = {
          productId: id,
          qty: 1
        }
        state.cartItems.push(data)
      } else {
        state.cartItems[index]['qty']++
      }

      localStorage.setItem('cart-puz', JSON.stringify(state.cartItems))
    },
    addMultiToCart(state, { id, qty }){
      const index = state.cartItems.findIndex(item => item['productId'] === id)

      if (index === -1){
        const data = {
          productId: id,
          qty
        }
        state.cartItems.push(data)
      } else {
        state.cartItems[index]['qty'] += qty
      }

      localStorage.setItem('cart-puz', JSON.stringify(state.cartItems))
    },
    deleteOneFromCart(state, id){
      const index = state.cartItems.findIndex(item => item['productId'] === id)
      const qtyInCart = state.cartItems[index]['qty']
      if (qtyInCart === 1){
        state.cartItems.splice(index, 1)
      } else {
        state.cartItems[index]['qty']--
      }

      localStorage.setItem('cart-puz', JSON.stringify(state.cartItems))
    },
    deleteAllFromCart(state, id){
      const index = state.cartItems.findIndex(item => item['productId'] === id)
      state.cartItems.splice(index, 1)

      localStorage.setItem('cart-puz', JSON.stringify(state.cartItems))
    },
    clearCart(state){
      state.cartItems = []

      localStorage.setItem('cart-puz', JSON.stringify(state.cartItems))
    },
    reviseCartItemQty(state, { id, qty }){
      const index = state.cartItems.findIndex(item => item['productId'] === id)
      state.cartItems[index]['qty'] = qty

      localStorage.setItem('cart-puz', JSON.stringify(state.cartItems))
    },

    // notification
    addNotification(state, { type = 'success', msg }){
      clearTimeout(state.notificationTimeout)

      const data = { type, msg, timestamp: Date.now() }
      state.notificationsData = [data]

      state.notificationTimeout = setTimeout(() => {
        state.notificationsData = []
      }, 3000)
    },
    clearNotification(state){
      state.notificationsData = []
    }
  },
  actions: {
  },
  modules: {
  }
})
