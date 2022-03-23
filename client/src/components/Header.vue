<template>
  <div class="header" ref="header">
    <div class="container">
      <router-link to="/" class="logo">Puzzle Shop</router-link>

      <nav class="navigation">
        <div class="menu-wrap" :class="{ 'active': toggleMenu }">
          <ul class="menu">
            <li>
              <router-link to="/" class="link menu-link">首頁</router-link>
            </li>
            <li>
              <router-link to="/products" class="link menu-link" active-class="active">所有商品</router-link>
            </li>
            <li @mouseenter="showSubmenu" @mouseleave="hideSubmenu" @click="mobileToggleSidemenu">
              <div class="link menu-link">
                精選類別
                <ion-icon :name="submenuToggleIcon" class="submenu-toggle-icon"></ion-icon>
              </div>
              <div class="submenu-wrap" ref="submenu">
                <ul class="submenu">
                  <li v-for="category in $store.state.categories">
                    <router-link :to="{ path: `/categories/${category['category-en']}`, hash: '#main' }" class="link menu-link">
                      <ion-icon name="chevron-forward-outline" class="menu-item-list-icon"></ion-icon>
                      {{ category['category-zh'] }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <router-link to="/about" class="link menu-link">關於我們</router-link>
            </li>
            <li>
              <router-link to="/faq" class="link menu-link">常見問題</router-link>
            </li>
          </ul>
          <div class="close" @click="toggleMenu = false">
            <ion-icon name="close-sharp" class="close-icon"></ion-icon>
          </div>
        </div>
        <router-link to="/favorites" class="link nav-link">
          <ion-icon name="heart-outline" class="link-icon"></ion-icon>
        </router-link>
        <router-link to="/cart" class="link nav-link">
          <ion-icon name="cart-outline" class="link-icon"></ion-icon>
          <div class="cart-qty" v-if="$store.state.cartItems.length > 0">{{ $store.state.cartItems.length }}</div>
        </router-link>
      </nav>

      <div class="toggle" @click="toggleMenu = true">
        <ion-icon name="menu-sharp" class="toggle-icon"></ion-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const header = ref(null);
    const submenu = ref(null);
    const toggleMenu = ref(false);
    const toggleSidemenu = ref(false);
    const submenuToggleIcon = ref('chevron-down-outline');

    // submenu slide up/down
    function showSubmenu(){
      submenu.value.removeEventListener('transitionend', deactivateSubmenu);
      submenu.value.classList.add('active');
      submenu.value.style.height = 'auto';
      const height = `${submenu.value.offsetHeight}px`;
      submenu.value.style.height = '0px';
      setTimeout(() => {
        submenu.value.style.height = height;
        submenuToggleIcon.value = 'chevron-up-outline';
        toggleSidemenu.value = true;
      }, 0);
    }
    function hideSubmenu(){
      submenu.value.style.height = '0px';
      submenuToggleIcon.value = 'chevron-down-outline';
      toggleSidemenu.value = false;
      submenu.value.addEventListener('transitionend', deactivateSubmenu, { once: true });
    }
    function deactivateSubmenu(){
      submenu.value.classList.remove('active');
    }
    function mobileToggleSidemenu(){
      if (!toggleSidemenu.value){
        showSubmenu()
      } else {
        hideSubmenu()
      }
    }

    // close sidemenu when 1. click outside of it or 2. click on menu item
    document.addEventListener('click', e => {
      const sideMenu = document.querySelector('.menu-wrap')
      const toggle = document.querySelector('.toggle')
      
      if (!sideMenu.contains(e.target) && e.target !== toggle || e.target.href){
        toggleMenu.value = false
      }
    })

    return { header, submenu, toggleMenu, toggleSidemenu, submenuToggleIcon, showSubmenu, hideSubmenu, mobileToggleSidemenu }
  }
}
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  background: var(--header-bg);
  transition: all .3s;
  transition-delay: .2s;
  z-index: 5;
  @media (max-width: 850px) {
    background: #FFF;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    font-size: 28px;
    @media (max-width: 850px) {
      font-size: 26px;
    }
    @media (max-width: 550px) {
      font-size: 24px;
      line-height: 2.2;
    }
    @media (max-width: 400px) {
      font-size: 22px;
    }
  }
}
.navigation {
  display: flex;
  align-items: center;
  margin-left: auto;
  & > * {
    border-radius: $border-radius;
  }
  & > * + * {
    margin-left: 5px;
  }
  .menu {
    display: flex;
    & > li {
      &:hover > .submenu-wrap {
        transition: all .5s;
        transition-delay: .3s;
      }
      &:hover > .link {
        background: $transparent-dark-grey;
        color: #FFF;
      }
      &:first-child > .link {
        border-radius: $border-radius 0 0 $border-radius;
      }
      &:last-child > .link {
        border-radius: 0 $border-radius $border-radius 0;
      }
    }
    @media (max-width: 850px) {
      flex-direction: column;
      width: 280px;
      margin: 50px 0;
      & > li {
        width: 80%;
        margin: 0 auto;
        &:first-child > .link {
          border-radius: $border-radius $border-radius 0 0;
        }
        &:last-child > .link {
          border-radius: 0 0 $border-radius $border-radius;
        }
      }
    }
  }
  .menu-wrap {
    .close {
      position: absolute;
      top: 0;
      right: 0;
      display: none;
      width: 46px;
      height: 40px;
      background: #FFF;
      cursor: pointer;
      .close-icon {
        color: #000;
        font-size: 36px;
        z-index: 5;
      }
    }
    @media (max-width: 850px) {
      position: absolute;
      top: 0;
      bottom: 0;
      right: -100%;
      height: 100vh;
      background: $transparent-dark-grey;
      transition: all .7s;
      z-index: 5;
      overflow-x: hidden;
      overflow-y: visible;
      &.active {
        right: 0;
      }
      .close {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .submenu-toggle-icon {
    margin-left: 3px;
    font-size: 14px;
  }
  .submenu-wrap {
    display: none;
    position: absolute;
    // top: 100%;
    left: 0;
    right: 0;
    z-index: 5;
    background: $transparent-dark-grey;
    transition: all .5s;
    overflow: hidden;
    &.active {
      display: block;
    }
    .submenu {
      display: flex;
      flex-wrap: wrap;
      justify-items: flex-start;
      max-width: 1200px;
      width: 100%;
      margin: 50px auto;
      padding: 0 30px;
      gap: 1%;
      li {
        flex: 0 0 24%;
        justify-content: flex-start;
        margin-bottom: 5px;
        .link {
          justify-content: flex-start;
          background: rgba(255,255,255,.15);
          color: #FFF;
          border-radius: $border-radius;
          text-align: left;
          .menu-item-list-icon {
            margin-right: 5px;
            font-size: 14px;
          }
          &:hover {
            background: rgba(255,255,255,.3);
            .menu-item-list-icon {
              transform: translateX(3px);
              transition: transform .3s;
            }
          }
        }
      }
    }
    @media (max-width: 850px) {
      position: static;
      .submenu {
        flex-direction: column;
        margin: 0;
      }
    }
  }
  .link {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    padding: 10px 15px;
    font-size: 16px;
    user-select: none;
    transition: all .5s;
    &:hover {
      transition: all .3s;
    }
    &.menu-link {
      background: #FFF;
      color: #000;
      &:hover, &.router-link-active, &.active {
        background: $transparent-dark-grey;
        color: #FFF;
      }
    }
    &.nav-link {
      width: 42px;
      padding: 0;
      background: $dark-grey;
      color: #FFF;
      font-size: 20px;
      &:hover {
        background: #FFF;
        color: #000;
        border: 1px solid #000;
        .cart-qty {
          top: 1px;
          right: 1px;
        }
      }
      @media (max-width: 400px) {
        width: 38px;
        height: 36px;
        font-size: 18px;
      }
    }
    .cart-qty {
      position: absolute;
      top: 2px;
      right: 2px;
      min-width: 18px;
      min-height: 18px;
      padding: 0 2px;
      background: $red;
      color: #FFF;
      line-height: 18px;
      text-align: center;
      font-size: 12px;
      border-radius: 50%;
      &:hover {
        color: #FFF;
      }
    }
  }
}
.toggle {
  display: none;
  width: 46px;
  height: 40px;
  margin-left: 5px;
  cursor: pointer;
  .toggle-icon {
    font-size: 30px;
  }
  @media (max-width: 850px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 400px) {
    width: 38px;
    height: 36px;
    .toggle-icon {
      font-size: 26px;
    }
  }
}
</style>