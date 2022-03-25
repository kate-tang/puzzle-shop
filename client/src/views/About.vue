<template>
  <div class="about main">
    <Breadcrumb />
    <div class="container">
      <main class="about-wrap">
        <div class="main-title">
          <div class="en">The Brand</div>
          <h1 class="zh">品牌故事</h1>
        </div>
        <img class="image" src="../assets/image/about.jpeg" alt="關於 Puzzle Shop">
        <p class="text" v-for="item in $store.state.aboutData">{{ item }}</p>
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