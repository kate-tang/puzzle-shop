<template>
  <div class="banner" :style="{ backgroundImage: 'url(' + require('../assets/image/' + $store.state.bannerData[path]['bg']) + ')' }">
    <div class="container">
      <div class="banner-content">
        <p class="banner-text" v-for="item in $store.state.bannerData[path]['text']">{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const path = ref(route.path.substring(1).split('/')[0])

    return { path }
  }
}
</script>

<style scoped lang="scss">
.banner {
  height: 300px;
  margin-bottom: 60px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  @media (max-width: 850px) {
    height: 35vw;
    margin-bottom: 30px;
  }
  @media (max-width: 600px) {
    margin-bottom: 15px;
  }
  @media (max-width: 450px) {
    margin-bottom: 10px;
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
}
.banner-content {
  width: 100%;
  margin-bottom: 30px;
  color: #FFF;
  font-size: 28px;
  text-align: left;
  @media (max-width: 1200px) {
    font-size: 2.5vw;
  }
  @media (max-width: 850px) {
    font-size: 3vw;
  }
  @media (max-width: 600px) {
    font-size: 20px;
  }
  @media (max-width: 500px) {
    font-size: 18px;
  }
}
.banner-text {
  font-family: 'Carter One', "Noto Sans TC", sans-serif;
  & + & {
    margin-top: 10px;
  }
}
</style>