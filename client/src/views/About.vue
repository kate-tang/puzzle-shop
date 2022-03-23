<template>
  <div class="about main">
    <Breadcrumb />
    <div class="container">
      <main class="about-wrap">
        <div class="main-title">
          <div class="en">The Brand</div>
          <h1 class="zh">品牌故事</h1>
        </div>
        <img class="image" src="../assets/image/about.jpeg" alt="">
        <p class="text">Puzzle Shop建立於2010年，是由三位熱愛拼圖的好朋友在因緣巧合下攜手合作，一起打造的線上拼圖購物網。</p>
        <p class="text">我們拼過各大拼圖品牌，從中精選數百款品質優良的拼圖推薦給消費者，希望可以將世界各地的拼圖品牌介紹到台灣，也盼望能帶起一股拼拼圖的風潮。</p>
      </main>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { initPage } from '../helpers'
import Breadcrumb from '../components/Breadcrumb.vue'

export default {
  components: { Breadcrumb },
  setup() {
    onMounted(() => initPage())
  }
}
</script>

<style lang="scss" scoped>
.about-wrap {
  max-width: 700px;
  width: calc(100% - 40px);
  margin: 0 auto;
  @media (max-width: 500px) {
    width: calc(100% - 20px);
  }
  .image {
    max-width: 100%;
    margin-bottom: 30px;
  }
  .text {
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 1.3;
    &:last-child {
      margin-bottom: 80px;
    }
    @media (max-width: 600px) {
      font-size: 14px;
    }
  }
}
</style>