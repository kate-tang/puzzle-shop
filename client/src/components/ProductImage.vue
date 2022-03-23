<template>
  <div class="image-wrap">
    <div class="image">
      <img :src="require(`../assets/image/products/${fileName}`)" :alt="alt" @load="resizePic">
    </div>
  </div>
</template>

<script>
import { resizePic } from '../helpers'

export default {
  props: {
    fileName: { type: String, required: true },
    alt: { type: String }
  },
  setup() {
    return { resizePic }
  }
}
</script>

<style scoped lang="scss">
.image-wrap {
  .image {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    overflow: hidden;
    img {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: auto;
    }
  }
}
</style>