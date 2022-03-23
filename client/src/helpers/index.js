import store from '../store'

export function initPage(){
  // offset header height
  document.querySelector('.main').style.paddingTop = `${document.querySelector('.header').offsetHeight}px`;
}

// get backend data
// path: get all >> '/all'
//       get category >> '/all/:cat'
//       get product >> '/:id'
// qty: use for cart page; if query.qty > 0 then backend will include qty in returned json obj
export function getProduct(path, qty = 0){
  return fetch(`http://127.0.0.1:3000/api/products/${path}?qty=${qty}`)
    .then(res => {
      if (res.ok) return res.json();
      throw new Error('抓不到資料，請再重新整理一次');
    })
}

// acheve background-size:contain for <img>
export function resizePic(e){
  const pic = e.target;
  const parentEl = pic.parentNode;
  const ratio = parentEl.clientWidth / parentEl.clientHeight;
  if (pic.clientWidth / pic.clientHeight < ratio){
    pic.style.width = 'auto';
    pic.style.height = '100%';
    pic.style.margin = '0 auto';
  } else if (pic.clientWidth / pic.clientHeight > ratio){
    pic.style.width = '100%';
    pic.style.height = 'auto';
    pic.style.margin = 'auto 0';
  }
}

// add to/delete from favorites
export function updateFav(id){
  const favIdIndex = store.state.favProducts.findIndex(favId => favId === id)

  if (favIdIndex >= 0){
    store.commit('deleteFavProduct', favIdIndex)
    store.commit('addNotification', { msg: '已從我的最愛中移除' })
  } else {
    store.commit('addFavProduct', id)
    store.commit('addNotification', { msg: '已加入我的最愛' })
  }
}

// cart form validation
export function validateName(value){
  if (!value) {
    return '姓名 為必填資料'
  }
  
  return true;
}
export function validateEmail(value){
  if (!value) {
    return 'Email 為必填資料'
  }

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return '請輸入正確的 Email 格式';
  }

  return true;
}
export function validateTel(value){
  if (!value) {
    return '電話 為必填資料'
  }

  const regex = /(\D*\d){8}/i;
  if (!regex.test(value)) {
    return '電話 不能小於 8 個數字';
  }

  return true;
}
export function validateAddress(value){
  if (!value) {
    return '地址 為必填資料'
  }
  
  return true;
}
export function validatePayment(value){
  if (!value) {
    return '請選擇 付款方式'
  }
  
  return true;
}