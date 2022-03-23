<template>
  <NotificationsList />
  <GoToTop />
  <Header />
  <router-view v-slot="{ Component, route }">
    <Transition :name="$store.state.routeTransition" mode="out-in" appear>
      <component :is="Component" :key="route.fullPath"></component>
    </Transition>
  </router-view>
  <Footer />
</template>

<script>
import { onMounted } from 'vue'
import NotificationsList from './components/NotificationsList.vue'
import GoToTop from './components/GoToTop.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import store from './store'

export default {
  components: { NotificationsList, GoToTop, Header, Footer },
  setup() {
    onMounted(() => {
      // set header bg
      document.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset;
        if (scrollPos > 50){
          document.documentElement.style.setProperty('--header-bg', 'transparent');
        } else {
          document.documentElement.style.setProperty('--header-bg', '#FFF');
        }
      })

      // grab fav/cart data from localStorage
      store.commit('setFavProducts')
      store.commit('setCartItems')
    })
  }
}
</script>

<style lang="scss">
:root {
  --header-bg: #FFF;
}
html, body {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}
#app {
  max-width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $dark-grey;
  font-family: "Helvetica", "Arial", "Noto Sans TC", sans-serif;
}

// route transition
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.route-enter-active,
.route-leave-active {
  transition: opacity .6s, transform .6s;
}
</style>
