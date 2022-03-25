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
  margin: 0 auto;
  padding: 50px 0 100px 0;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: stretch;
    max-width: 400px;
  }
  @media (max-width: 500px) {
    padding: 50px 0;
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
      font-size: 16px;
      line-height: 1.3;
      & + .text {
        margin-top: 5px;
      }
    }
    .btn {
      margin-top: 10px;
      padding: 10px 15px;
      border: 1px solid $dark-grey;
      border-radius: $border-radius;
      font-size: 16px;
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
      padding-left: 0;
    }
    @media (max-width: 768px) {
      .text, .btn {
        font-size: 14px;
      }
    }
  }
}
</style>