<template>
  <div class="image-wrap" ref="imageWrap" :class="{ 'show-zoom': showZoom }" @mouseenter="showZoom = true" @mouseleave="showZoom = false">
    <div class="main-image" @mousemove.stop="zoom">
      <img :src="require(`../assets/image/products/${product.imageFileName}`)" :alt="product.name" @load="resizePic">
      <div class="magnifier">
        <ion-icon name="search-sharp" class="icon"></ion-icon>
      </div>
      <div class="zoom-box" ref="zoomBox"></div>
    </div>
    <div class="zoom-window" ref="zoomWindow" @mouseenter="showZoom = false">
      <div class="zoom-title">細節檢視</div>
      <div class="zoom-image" ref="zoomImage">
        <img :src="require(`../assets/image/products/${product.imageFileName}`)" :alt="product.name" @load="resizePic">
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { resizePic } from '../helpers'

export default {
  props: ['product'],
  setup() {
    const imageWrap = ref(null);
    const zoomBox = ref(null);
    const zoomWindow = ref(null);
    const zoomImage = ref(null);
    let showZoom = ref(false);

    function zoom(e){
      // set zoomBox/zoomWindow/zoomImage size
      const mainImageToZoomBoxRatioX = 4;
      const mainImageToZoomBoxRatioY = 5;
      const zoomWindowToZoomBoxRatio = 3;
      zoomBox.value.style.width = `${100 / mainImageToZoomBoxRatioX}%`
      zoomBox.value.style.height = `${100 / mainImageToZoomBoxRatioY}%`
      zoomWindow.value.style.width = `${100 / mainImageToZoomBoxRatioX * zoomWindowToZoomBoxRatio}%`
      zoomWindow.value.style.height = `${100 / mainImageToZoomBoxRatioY * zoomWindowToZoomBoxRatio}%`
      zoomImage.value.style.width = `${100 * mainImageToZoomBoxRatioX}%`
      zoomImage.value.style.height = `${100 * mainImageToZoomBoxRatioY}%`

      const imageWrapSize = imageWrap.value.getBoundingClientRect()
      const zoomBoxSize = zoomBox.value.getBoundingClientRect()
      const activeArea = {
        left: zoomBoxSize.width / 2,
        right: imageWrapSize.width - (zoomBoxSize.width / 2),
        top: zoomBoxSize.height / 2,
        bottom: imageWrapSize.height - (zoomBoxSize.height / 2),
      }
      const x = e.pageX - imageWrap.value.offsetLeft;
      const y = e.pageY - imageWrap.value.offsetTop;
      // devide the imageWrap into 3 * 3 area
      const isInTopLeft = activeArea.left > x && activeArea.top > y;
      const isInTopCenter = activeArea.left <= x && x <= activeArea.right && activeArea.top > y;
      const isInTopRight = activeArea.right < x && activeArea.top > y;
      const isInCenterLeft = activeArea.left > x && activeArea.top <= y && y <= activeArea.bottom;
      const isInCenter = activeArea.left <= x && x <= activeArea.right && activeArea.top <= y && y <= activeArea.bottom;
      const isInCenterRight = activeArea.right < x && activeArea.top <= y && y <= activeArea.bottom;
      const isInBottomLeft = activeArea.left > x && activeArea.bottom < y;
      const isInBottomCenter = activeArea.left <= x && x <= activeArea.right && activeArea.bottom < y;
      const isInBottomRight = activeArea.right < x && activeArea.bottom < y;
      const walkX = -(x - (zoomBoxSize.width / 2)) * zoomWindowToZoomBoxRatio
      const walkY = -(y - (zoomBoxSize.height / 2)) * zoomWindowToZoomBoxRatio
      if (isInTopLeft) {
        zoomBox.value.style.transform = 'translateX(0) translateY(0)'
        zoomBox.value.style.left = '0px'
        zoomBox.value.style.right = 'auto'
        zoomBox.value.style.top = '0px'
        zoomBox.value.style.bottom = 'auto'
        zoomImage.value.style.left = '0px'
        zoomImage.value.style.right = 'auto'
        zoomImage.value.style.top = '0px'
        zoomImage.value.style.bottom = 'auto'
      } else if (isInTopCenter) {
        zoomBox.value.style.transform = 'translateX(-50%) translateY(0)'
        zoomBox.value.style.left = `${x}px`
        zoomBox.value.style.right = 'auto'
        zoomBox.value.style.top = '0px'
        zoomBox.value.style.bottom = 'auto'
        zoomImage.value.style.left = `${walkX}px`
        zoomImage.value.style.right = 'auto'
        zoomImage.value.style.top = '0px'
        zoomImage.value.style.bottom = 'auto'
      } else if (isInTopRight) {
        zoomBox.value.style.transform = 'translateX(0) translateY(0)'
        zoomBox.value.style.left = 'auto'
        zoomBox.value.style.right = '0px'
        zoomBox.value.style.top = '0px'
        zoomBox.value.style.bottom = 'auto'
        zoomImage.value.style.left = 'auto'
        zoomImage.value.style.right = '0px'
        zoomImage.value.style.top = '0px'
        zoomImage.value.style.bottom = 'auto'
      } else if (isInCenterLeft) {
        zoomBox.value.style.transform = 'translateX(0) translateY(-50%)'
        zoomBox.value.style.left = '0px'
        zoomBox.value.style.right = 'auto'
        zoomBox.value.style.top = `${y}px`
        zoomBox.value.style.bottom = 'auto'
        zoomImage.value.style.left = '0px'
        zoomImage.value.style.right = 'auto'
        zoomImage.value.style.top = `${walkY}px`
        zoomImage.value.style.bottom = 'auto'
      } else if (isInCenter) {
        zoomBox.value.style.transform = 'translateX(-50%) translateY(-50%)'
        zoomBox.value.style.left = `${x}px`
        zoomBox.value.style.right = 'auto'
        zoomBox.value.style.top = `${y}px`
        zoomBox.value.style.bottom = 'auto'
        zoomImage.value.style.left = `${walkX}px`
        zoomImage.value.style.right = 'auto'
        zoomImage.value.style.top = `${walkY}px`
        zoomImage.value.style.bottom = 'auto'
      } else if (isInCenterRight) {
        zoomBox.value.style.transform = 'translateX(0) translateY(-50%)'
        zoomBox.value.style.left = 'auto'
        zoomBox.value.style.right = '0px'
        zoomBox.value.style.top = `${y}px`
        zoomBox.value.style.bottom = 'auto'
        zoomImage.value.style.left = 'auto'
        zoomImage.value.style.right = '0px'
        zoomImage.value.style.top = `${walkY}px`
        zoomImage.value.style.bottom = 'auto'
      } else if (isInBottomLeft) {
        zoomBox.value.style.transform = 'translateX(0) translateY(0)'
        zoomBox.value.style.left = '0px'
        zoomBox.value.style.right = 'auto'
        zoomBox.value.style.top = 'auto'
        zoomBox.value.style.bottom = '0px'
        zoomImage.value.style.left = '0px'
        zoomImage.value.style.right = 'auto'
        zoomImage.value.style.top = 'auto'
        zoomImage.value.style.bottom = '0px'
      } else if (isInBottomCenter) {
        zoomBox.value.style.transform = 'translateX(-50%) translateY(0)'
        zoomBox.value.style.left = `${x}px`
        zoomBox.value.style.right = 'auto'
        zoomBox.value.style.top = 'auto'
        zoomBox.value.style.bottom = '0px'
        zoomImage.value.style.left = `${walkX}px`
        zoomImage.value.style.right = 'auto'
        zoomImage.value.style.top = 'auto'
        zoomImage.value.style.bottom = '0px'
      } else if (isInBottomRight) {
        zoomBox.value.style.transform = 'translateX(0) translateY(0)'
        zoomBox.value.style.left = 'auto'
        zoomBox.value.style.right = '0px'
        zoomBox.value.style.top = 'auto'
        zoomBox.value.style.bottom = '0px'
        zoomImage.value.style.left = 'auto'
        zoomImage.value.style.right = '0px'
        zoomImage.value.style.top = 'auto'
        zoomImage.value.style.bottom = '0px'
      }
    }

    return { resizePic, imageWrap, zoomBox, zoomWindow, zoomImage, zoom, showZoom }
  }
}
</script>

<style scoped lang="scss">
.image-wrap {
  position: relative;
  width: 100%;
  &.show-zoom .zoom-box, &.show-zoom .zoom-window {
    opacity: 1;
  }
  &.show-zoom .magnifier {
    opacity: 0;
  }
  @media (max-width: 800px) { /* disable zoom when device width <= 800px */
    &.show-zoom .zoom-box, &.show-zoom .zoom-window {
      opacity: 0;
    }
  }
}
.main-image {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
  cursor: crosshair;
  @media (max-width: 800px) {
    cursor: auto;
  }
  img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
  }
  .magnifier {
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 1;
    .icon {
      font-size: 24px;
    }
    @media (max-width: 800px) {
      opacity: 0;
    }
  }
  .zoom-box {
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
    border: 1px solid #CCC;
    outline: 1000px solid rgba(255,255,255,.3);
    opacity: 0;
    pointer-events: none;
  }
}
.zoom-window {
  position: absolute;
  top: 0;
  left: 102%;
  width: 75%;
  height: 60%;
  background: #FFF;
  border: 1px solid #CCC;
  opacity: 0;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
  .zoom-title {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 25px;
    background: $transparent-dark-grey;
    color: #FFF;
    letter-spacing: 4px;
    text-indent: 4px;
    z-index: 1;
  }
  .zoom-image {
    position: absolute;
    width: 400%;
    height: 500%;
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