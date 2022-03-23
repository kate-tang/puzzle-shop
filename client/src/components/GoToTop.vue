<template>
  <div class="gototop goto-btn" :class="{ 'show': showGoToTopBtn }" @click="goToTop">
    <ion-icon name="chevron-up-outline" class="icon"></ion-icon>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const showGoToTopBtn = ref(false)

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 150){
        showGoToTopBtn.value = true
      } else {
        showGoToTopBtn.value = false
      }
    })

    function goToTop(){
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return { showGoToTopBtn, goToTop }
  }
}
</script>

<style scoped lang="scss">
.gototop {
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 14px;
  border: 2px solid #FFF;
  z-index: 6;
  cursor: pointer;
  transition: all .5s;
  opacity: 0;
  visibility: hidden;
  .icon {
    color: #FFF;
    font-size: 24px;
  }
  &.show {
    opacity: 1;
    visibility: visible;
  }
}
</style>