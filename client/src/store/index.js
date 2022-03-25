import { createStore } from 'vuex'

export default createStore({
  state: {
    homeSlidesData: [
      {
        slideId: 4,
        slideRoute: '/products',
        hasMultipleBackground: false,
        background: 'slider-04.jpeg',
        titleZero: '最佳禮物提案',
        titleOne: '還在煩惱送禮該選什麼嗎？',
        titleTwo: '來 Puzzle Shop 就對了'
      },
      {
        slideId: 1,
        slideRoute: '/categories/world-masterpieces',
        hasMultipleBackground: true,
        background: ['slider-01-1.jpg','slider-01-2.jpg','slider-01-3.jpg','slider-01-4.jpg','slider-01-5.jpg'],
        titleZero: '本月主題',
        titleOne: '世界名畫巡禮',
        titleTwo: '拼出藝術家畫筆下的精采與靈動'
      },
      {
        slideId: 2,
        slideRoute: '/products/-My7c7Q34oSjRxHQLBm7',
        hasMultipleBackground: false,
        background: 'slider-02.jpg',
        titleZero: 'Monet',
        titleOne: '這個周末',
        titleTwo: '我想來點莫內的印象日出'
      },
      {
        slideId: 3,
        slideRoute: '/products',
        hasMultipleBackground: false,
        background: 'slider-03.jpeg',
        titleZero: '',
        titleOne: '歡慶佳節',
        titleTwo: '全館單筆消費滿千享免運優惠'
      },
      {
        slideId: 4,
        slideRoute: '/products',
        hasMultipleBackground: false,
        background: 'slider-04.jpeg',
        titleZero: '最佳禮物提案',
        titleOne: '還在煩惱送禮該選什麼嗎？',
        titleTwo: '來 Puzzle Shop 就對了'
      },
      {
        slideId: 1,
        slideRoute: '/categories/world-masterpieces',
        hasMultipleBackground: true,
        background: ['slider-01-1.jpg','slider-01-2.jpg','slider-01-3.jpg','slider-01-4.jpg','slider-01-5.jpg'],
        titleZero: '本月主題',
        titleOne: '世界名畫巡禮',
        titleTwo: '拼出藝術家畫筆下的精采與靈動'
      }
    ],
    homeSeriesData: [
      {
        seriesId: 1,
        route: '/categories/landscape#main',
        title: '風景',
        subtitle: '收藏心中最美的風景',
        images: ['c001.jpeg', 'c004.jpeg', 'c006.jpeg']
      },
      {
        seriesId: 2,
        route: '/categories/world-masterpieces#main',
        title: '世界名畫',
        subtitle: '大師經典',
        images: ['a001.jpg', 'a003.jpeg', 'a004.jpg']
      },
      {
        seriesId: 3,
        route: '/categories/wild-animals#main',
        title: '動物',
        subtitle: '我家有個動物園',
        images: ['f002.jpeg', 'f001.jpeg', 'f007.jpeg']
      },
      {
        seriesId: 4,
        route: '/categories/city-and-architecture#main',
        title: '城市建築',
        subtitle: '萬丈高樓拼起來',
        images: ['e004.jpeg', 'e005.jpeg', 'e006.jpeg']
      }
    ],
    homeWallDesktopData: [
      {
        id: 1,
        sequence: 2,
        images: [
          { fileName: 'c012.jpeg', direction: 'v', route: '/products/-My7c8hoUanJN25SHHUF' },
          { fileName: 'f006.jpeg', direction: 'v', route: '/products/-My7c9g6x22OufnE2-TX' },
          { fileName: 'b001.jpg', direction: 'h', route: '/products/-My7c80ojJcD82w0QnPF' },
          { fileName: 'a007.jpg', direction: 'v', route: '/products/-My7c7Sd8t_eIXEgv8D_' }
        ]
      },
      {
        id: 2,
        sequence: 6,
        images: [
          { fileName: 'e012.jpeg', direction: 'v', route: '/products/-My7c9Oxjv5BylvOvZPg' },
          { fileName: 'd001.jpeg', direction: 'v', route: '/products/-My7c8sB8ygAxbbmsznJ' },
          { fileName: 'f008.jpeg', direction: 'v', route: '/products/-My7c9lJbwYNl8MVoF-G' },
          { fileName: 'c005.jpeg', direction: 'h', route: '/products/-My7c8Qh7Qnf7EMxn12i' }
        ]
      },
      {
        id: 3,
        sequence: 3,
        images: [
          { fileName: 'f003.jpeg', direction: 'h', route: '/products/-My7c9ZOydAt679zYbG3' },
          { fileName: 'c015.jpeg', direction: 'v', route: '/products/-My7c8p_VegH3lGO_W8k' },
          { fileName: 'g002.jpeg', direction: 'v', route: '/products/-My7c9vloQZfAxWiWGcK' },
          { fileName: 'a017.jpg', direction: 'v', route: '/products/-My7c7rPdeUlAoN7-b5A' }
        ]
      },
      {
        id: 4,
        sequence: 5,
        images: [
          { fileName: 'c010.jpeg', direction: 'v', route: '/products/-My7c8cdbAaw2rFqydOx' },
          { fileName: 'a013.jpg', direction: 'v', route: '/products/-My7c7h6cTnYcxUQzFnd' },
          { fileName: 'h010.jpeg', direction: 'v', route: '/products/-My7cB0B4gwZ6ymLb5m8' },
          { fileName: 'b003.jpg', direction: 'h', route: '/products/-My7c85yUs1YbH058UV8' }
        ]
      },
      {
        id: 5,
        sequence: 2,
        images: [
          { fileName: 'a001.jpg', direction: 'h', route: '/products/-My7c7D03Gw-GbU131oR' },
          { fileName: 'b006.jpg', direction: 'v', route: '/products/-My7c8DjUOgxJ-CYWTpO' },
          { fileName: 'e002.jpeg', direction: 'v', route: '/products/-My7c8zzsymMgoOzMkMz' },
          { fileName: 'g001.jpeg', direction: 'v', route: '/products/-My7c9t9kSYepo4uITRi' }
        ]
      },
      {
        id: 6,
        sequence: 6,
        images: [
          { fileName: 'e008.jpeg', direction: 'v', route: '/products/-My7c9EWCxEbAGD1zb6-' },
          { fileName: 'a004.jpg', direction: 'h', route: '/products/-My7c7Kq1LJ3ELrCUCaz' },
          { fileName: 'f009.jpeg', direction: 'v', route: '/products/-My7c9nxnsZAZFSFcFcd' },
          { fileName: 'c007.jpeg', direction: 'v', route: '/products/-My7c8VrG56ID58O5aIT' }
        ]
      },
      {
        id: 7,
        sequence: 1,
        images: [
          { fileName: 'c013.jpeg', direction: 'v', route: '/products/-My7c8kPuRPAUSWj-IbV' },
          { fileName: 'f005.jpeg', direction: 'v', route: '/products/-My7c9dXPAT6nBsVqnbi' },
          { fileName: 'a005.jpg', direction: 'h', route: '/products/-My7c7NTZOebebout77t' },
          { fileName: 'c011.jpeg', direction: 'v', route: '/products/-My7c8fDMv-6IHUoEo9W' }
        ]
      }
    ],
    homeWallMobileData: [
      { id: 1, fileName: 'b003.jpg' },
      { id: 2, fileName: 'a020.jpg' },
      { id: 3, fileName: 'f001.jpeg' },
      { id: 4, fileName: 'a019.jpg' },
      { id: 5, fileName: 'e010.jpeg' }
    ],
    categories: [
      { 'category-zh': '世界名畫', 'category-en': 'world-masterpieces' },
      { 'category-zh': '東方藝術', 'category-en': 'eastern-masterpieces' },
      { 'category-zh': '風景', 'category-en': 'landscape' },
      { 'category-zh': '地圖', 'category-en': 'map' },
      { 'category-zh': '城市建築', 'category-en': 'city-and-architecture' },
      { 'category-zh': '動物', 'category-en': 'wild-animals' },
      { 'category-zh': '兒童', 'category-en': 'kids-favorite' },
      { 'category-zh': '3D 立體模型', 'category-en': '3d-puzzle' },
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
    aboutData: [
      'Puzzle Shop 建立於 2010 年，是由三位熱愛拼圖的好朋友在因緣巧合下攜手合作，一起打造的線上拼圖購物網。',
      '我們拼過各大拼圖品牌，從中精選數百款品質優良的拼圖推薦給消費者，希望可以將世界各地的拼圖品牌介紹到台灣，也盼望能帶起一股拼拼圖的風潮。'
    ],
    routeTransition: 'route',
    favProducts: [],
    cartItems: [],
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
