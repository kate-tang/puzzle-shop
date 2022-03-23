<template>
  <div class="empty">
    <div class="image">
      <img :src="require('../assets/image/' + $store.state.emptyData[path]['image'])" :alt="$store.state.emptyData[path]['imageAlt']">
    </div>
    <div class="textbox">
      <p class="text" v-for="item in $store.state.emptyData[path]['text']">{{ item }}</p>
      <router-link :to="$store.state.emptyData[path]['btnLink']" class="btn">{{ $store.state.emptyData[path]['btnText'] }}</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import store from '../store'

export default {
  setup() {
    const route = useRoute()
    const path = ref(route.path.substring(1).split('/')[0])
    if (!store.state.emptyData[path.value]){
      path.value = 'notFound'
    }

    return { path }
  }
}
</script>

<style scoped lang="scss">
.empty {
  display: flex;
  max-width: 800px;
  margin: 50px auto 100px auto;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: stretch;
    max-width: 400px;
    margin: 30px auto 80px auto;
  }
  @media (max-width: 500px) {
    margin: 20px auto 50px auto;
  }
  .image {
    flex: 0 0 50%;
    img {
      max-width: 100%;
    }
    @media (max-width: 800px) {
      flex: 0 0 auto;
    }
  }
  .textbox {
    flex: 0 0 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 20px;
    .text {
      line-height: 1.5;
    }
    .btn {
      margin-top: 10px;
      padding: 10px 15px;
      border: 1px solid $dark-grey;
      border-radius: $border-radius;
      transition: all .5s;
      &:hover {
        background: $dark-grey;
        color: #FFF;
        transition: all .3s;
      }
    }
    @media (max-width: 800px) {
      flex: 0 0 auto;
      align-items: center;
      margin-top: 20px;
    }
  }
}
</style>