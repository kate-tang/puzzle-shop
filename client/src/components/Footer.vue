<template>
  <footer class="footer">
    <div class="footer-info">
      <div class="container">
        <div class="logo">Puzzle Shop</div>
        <ul class="menu">
          <li class="menu-item">
            <router-link to="/" class="menu-link">首頁</router-link>
          </li>
          <li class="menu-item">
            <router-link to="/products" class="menu-link">所有商品</router-link>
          </li>
          <li class="menu-item">
            <router-link to="/products#main" class="menu-link">精選類別</router-link>
          </li>
          <li class="menu-item">
            <router-link to="/about" class="menu-link">關於我們</router-link>
          </li>
          <li class="menu-item">
            <router-link to="/faq" class="menu-link">常見問題</router-link>
          </li>
        </ul>
        <address class="contact">
          <span class="contact-item">客服專線：(02)1234-5678</span>
          <a href="mailto:puzzle@puzzleshop.com.tw" class="contact-item">信箱：puzzle@puzzleshop.com.tw</a>
          <span class="contact-item">地址：台北市中正區北平西路3號</span>
        </address>
        <ul class="social">
          <li class="social-item"><a href="https://www.facebook.com/" class="social-link"><ion-icon name="logo-facebook"></ion-icon></a></li>
          <li class="social-item"><a href="https://twitter.com/" class="social-link"><ion-icon name="logo-twitter"></ion-icon></a></li>
          <li class="social-item"><a href="https://www.instagram.com/" class="social-link"><ion-icon name="logo-instagram"></ion-icon></a></li>
          <li class="social-item"><a href="https://www.youtube.com/" class="social-link"><ion-icon name="logo-youtube"></ion-icon></a></li>
        </ul>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
        <p class="copyright-text">Copyright © {{ year }} Puzzle Shop. All Rights Reserved. Designed by <a href="https://github.com/kate-tang" class="copyright-link">Kate Tang</a>. Pictures designed by <a href="http://www.freepik.com" class="copyright-link">Freepik</a>.</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const year = ref(new Date().getFullYear())
    
    return { year }
  }
}
</script>

<style scoped lang="scss">
.footer-info {
  padding: 50px 0;
  background: $dark-grey;
  .logo {
    margin-bottom: 20px;
    color: #FFF;
    text-align: center;
    font-size: 24px;
  }
}
.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  .menu-item {
    position: relative;
  }
  .menu-item::before, .menu-item:last-child::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    height: 4px;
    margin: auto 0;
    background: #AAA;
    border-radius: 50%;
    transform: translateX(-50%);
  }
  .menu-item:last-child::after {
    left: auto;
    right: 0;
    transform: translateX(50%);
  }
  .menu-link {
    display: block;
    margin: 0 20px;
    color: #AAA;
    line-height: 1.5;
    font-size: 16px;
    &:hover {
      color: #FFF;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    .menu-item {
      padding: 3px 0;
    }
    .menu-item::before, .menu-item:last-child::after {
      display: none;
    }
    .menu-link {
      padding: 5px 10px;
      font-size: 14px;
    }
  }
}
.contact {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 30px 20px 30px;
  .contact-item {
    margin: 5px 0;
    padding: 0 15px;
    color: #AAA;
    font-size: 16px;
    border-left: 2px solid #AAA;
    white-space: nowrap;
    &:hover {
      color: #FFF;
    }
    &:last-child {
      border-right: 2px solid #AAA;
    }
  }
  @media (max-width: 900px) {
    flex-wrap: wrap;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    margin: 0 0 20px 0;
    .contact-item {
      padding: 0;
      font-size: 14px;
      border-left: none;
      &:last-child {
        border-right: none;
      }
    }
  }
}
.social {
  display: flex;
  justify-content: center;
  .social-item {
    & + .social-item {
      margin-left: 20px;
    }
    &:hover .social-link {
      background-origin: border-box;
      color: #FFF;
      border: 1px solid transparent;
    }
    &:hover:nth-child(1) .social-link { background: #4267B2; }
    &:hover:nth-child(2) .social-link { background: #1DA1F2; }
    &:hover:nth-child(3) .social-link { background-image: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%); }
    &:hover:nth-child(4) .social-link { background: #FF0000; }
  }
  .social-link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    color: #AAA;
    border: 1px solid #AAA;
    border-radius: 5px;
    font-size: 18px;
  }
}
.footer-copyright {
  padding: 10px 0;
  .copyright-text {
    font-size: 14px;
    line-height: 1.3;
    text-align: center;
  }
  .copyright-link {
    color: #AAA;
    white-space: nowrap;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>