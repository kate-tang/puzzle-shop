<template>
  <section class="slider">
    <div class="container">
      <h2 class="text-slider-box">
        <router-link to="/products" class="text-slider-item" :class="{ 'active': slideNo === n }" v-for="n in $store.state.homeSlidesData.length - 2" title="前往選購" :data-num="n">
          <span class="title-zero" v-if="$store.state.homeSlidesData[n].titleZero">{{ $store.state.homeSlidesData[n].titleZero }}</span>
          <span class="title-one" v-if="$store.state.homeSlidesData[n].titleOne">{{ $store.state.homeSlidesData[n].titleOne }}</span>
          <span class="title-two" v-if="$store.state.homeSlidesData[n].titleTwo">{{ $store.state.homeSlidesData[n].titleTwo }}</span>
        </router-link>
      </h2>
      <div class="image-slider-box">
        <div class="image-slider-slides">
          <router-link :to="slide.slideRoute" class="image-slider-item" v-for="slide in $store.state.homeSlidesData" :style="[ slide.hasMultipleBackground ? { background: '#EEE'} : { backgroundImage: 'url(' + require('../assets/image/' + slide.background) + ')' } ]" title="前往選購">
            <ul class="image-slider-item-extract" v-if="slide.hasMultipleBackground">
              <li class="image-slider-item-extract-image" v-for="image in slide.background" :style="{ backgroundImage: 'url(' + require('../assets/image/' + image) + ')' }"></li>
            </ul>
          </router-link>
        </div>
        <nav class="image-slider-pagination">
          <span class="image-slider-pagination-prev">
            <ion-icon name="chevron-back-outline"></ion-icon>
          </span>
          <span class="image-slider-pagination-item" v-for="(item, index) in ($store.state.homeSlidesData.length - 2)" :data-id="index + 1" :class="{ 'active': slideNo === item }"></span>
          <span class="image-slider-pagination-next">
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </span>
        </nav>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  setup() {
    let slideNo = ref(1);
    const interval = 3000
    onMounted(() => {
      const box = document.querySelector('.image-slider-box');
      const image = document.querySelector('.image-slider-slides');
      const slides = document.querySelectorAll('.image-slider-item');
      const prevBtn = document.querySelector('.image-slider-pagination-prev');
      const nextBtn = document.querySelector('.image-slider-pagination-next');
      const pageDots = document.querySelectorAll('.image-slider-pagination-item');

      box.addEventListener('touchstart', startTouch);
      box.addEventListener('touchmove', moveTouch);
      box.addEventListener('touchend', endTouch);
      image.addEventListener('transitionend', () => isSliding = false);
      prevBtn.addEventListener('click', moveToPrev);
      nextBtn.addEventListener('click', moveToNext);
      pageDots.forEach(dot => dot.addEventListener('click', jumpPage));
      window.addEventListener('resize', () => {
        size = slides[0].offsetWidth;
        image.style.transform = `translateX(${size * -slideNo.value}px)`;
      });

      // set slider autoplay
      let autoplay = setInterval(moveToNext, interval);
      let sliderSwitches = document.querySelectorAll('.image-slider-pagination span')
      sliderSwitches.forEach(item => {
        item.addEventListener('click', () => {
          clearInterval(autoplay)
          autoplay = setInterval(moveToNext, interval);
        })
      })

      // slider logic
      let initialX = null;
      let distence = 0;
      let size = slides[0].offsetWidth;
      let isSliding = false;
      const slideTransition = 'transform .8s';

      image.style.transform = `translateX(${size * -slideNo.value}px)`;

      function startTouch(e){
        if (isSliding) return
        initialX = e.touches[0].clientX;
        clearInterval(autoplay)
      }
      function moveTouch(e){
        if (isSliding) return
        let currentX = e.touches[0].clientX;
        distence = Math.abs(currentX - initialX) <= size ? currentX - initialX : currentX - initialX > 0 ? size : -size;
        // slide right
        if (distence > 0){
          image.style.transform = `translateX(${size * -slideNo.value + distence}px)`;
        }
        // slide left
        if (distence < 0){
          image.style.transform = `translateX(${size * -slideNo.value + distence}px)`;
        }
      }
      function endTouch(e){
        // const moveMoreThanHalf = Math.abs(distence) > (size / 2);
        const moveMoreThen30px = Math.abs(distence) > 30;
        if (distence > 0 && moveMoreThen30px && slideNo.value !== 0){
          moveToPrev();
        } else if (distence < 0 && moveMoreThen30px && slideNo.value !== slides.length-1){
          moveToNext();
        } else {
          image.style.transform = `translateX(${size * -slideNo.value}px)`;
        }
        autoplay = setInterval(moveToNext, interval);
      }
      function moveToPrev(){
        isSliding = true;
        slideNo.value--;
        image.style.transition = slideTransition;
        image.style.transform = `translateX(${size * -slideNo.value}px)`;
        if (slideNo.value === 0){
          slideNo.value = slides.length - 2;
          image.addEventListener('transitionend', backToLast, { once : true });
        }
      }
      function moveToNext(){
        isSliding = true;
        slideNo.value++;
        image.style.transition = slideTransition;
        image.style.transform = `translateX(${size * -slideNo.value}px)`;
        if (slideNo.value === slides.length-1){
          slideNo.value = 1;
          image.addEventListener('transitionend', backToFirst, { once : true });
        }
      }
      function backToLast(){
        image.style.transition = 'none';
        image.style.transform = `translateX(${size * (-slides.length+2)}px)`;
        isSliding = false;
      }
      function backToFirst(){
        image.style.transition = 'none';
        image.style.transform = `translateX(${-size}px)`;
        isSliding = false;
      }
      function jumpPage(e){
        const id = Number(e.target.dataset.id);
        if (slideNo.value === id) return
        isSliding = true;
        slideNo.value = id;
        image.style.transition = slideTransition;
        image.style.transform = `translateX(${size * -slideNo.value}px)`;
      }
    })

    return { slideNo }
  }
}
</script>

<style scoped lang="scss">
.slider {
  height: 750px;
  margin-bottom: 60px;
  .container {
    position: relative;
    height: 100%;
  }
  @media (max-width: 1200px) {
    height: 60vw;
  }
  @media (max-width: 1050px) {
    height: 65vw;
  }
  @media (max-width: 800px) {
    height: 70vw;
  }
}
.text-slider-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 30px;
  width: 40%;
  height: 40%;
  margin: auto 0;
  background: rgba(0,0,0,.5);
  z-index: 2;
  font-size: 20px;
  overflow: hidden;
  @media (max-width: 1200px) {
    font-size: 18px;
  }
  @media (max-width: 1050px) {
    top: 20%;
    bottom: auto;
    left: 0;
    right: 0;
    width: 45%;
    height: 35%;
    margin: 0 auto;
  }
  @media (max-width: 950px) {
    width: 50%;
    font-size: 16px;
  }
  @media (max-width: 650px) {
    width: 55%;
    font-size: 14px;
  }
  @media (max-width: 550px) {
    width: 60%;
    font-size: 12px;
  }
  @media (max-width: 450px) {
    width: 70%;
  }
}
.text-slider-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: scale(0,0);
  transition: all .5s;
  user-select: none;
  &:nth-child(1){
    color: #FFF;
    .title-zero {
      position: relative;
      margin-bottom: 5%;
      font-size: 130%;
      letter-spacing: 0.9em;
      text-indent: 1em;
      &::before, &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 40%;
        height: 2px;
        margin: auto 0;
        background: #FFF;
      }
      &::before {
        left: 0;
        transform: translateX(-100%);
      }
      &::after {
        right: 0;
        transform: translateX(100%);
      }
    }
    .title-one {
      margin-bottom: 5%;
      font-size: 200%;
      letter-spacing: 0.2em;
      text-indent: 0.2em;
    }
    .title-two {
      font-size: 100%;
      letter-spacing: 0.05em;
      text-indent: 0.05em;
    }
    @media (max-width: 750px) {
      .title-zero {
        letter-spacing: 0.8em;
        text-indent: 0.8em;
        &::before, &::after {
          width: 30%;
        }
      }
      .title-one {
        font-size: 190%;
      }
      .title-two {
        font-size: 90%;
        letter-spacing: 0.1em;
      }
    }
    @media (max-width: 700px) {
      .title-zero {
        font-size: 120%;
      }
      .title-one {
        font-size: 180%;
      }
      .title-two {
        font-size: 80%;
      }
    }
    @media (max-width: 500px) {
      .title-zero {
        margin-bottom: 10px;
        font-size: 12px;
      }
      .title-one {
        margin-bottom: 10px;
        font-size: 16px;
        letter-spacing: 0.15em;
      }
      .title-two {
        font-size: 10px;
        letter-spacing: 0;
      }
    }
  }
  &:nth-child(2){
    position: relative;
    .title-zero {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      width: 100%;
      height: 100%;
      margin-bottom: 5%;
      color: rgba(0,0,0,.25);
      font-size: 500%;
      text-transform: uppercase;
      user-select: none;
      transform: scale(1.1);
      @media (max-width: 950px) {
        left: -10px;
      }
      @media (max-width: 750px) {
        font-size: 450%;
      }
      @media (max-width: 400px) {
        font-size: 350%;
        transform: scale(1.1);
      }
      &::before {
        content: 'Puzzle Shop';
        position: absolute;
        top: -1%;
        left: 0;
        margin: 0 auto;
        font-family: 'Carter One', cursive;
        font-size: 70%;
        text-transform: none;
        white-space: nowrap;
        @media (max-width: 950px) {
          left: 20px;
        }
      }
      &::after {
        content: 'x';
        position: absolute;
        top: 37%;
        left: 40%;
        font-family: 'Nunito', sans-serif;
        font-size: 180%;
        font-weight: 200;
        text-transform: none;
        transform: translate(-50%, -50%);
        @media (max-width: 1050px) {
          top: 40%;
          left: 50%;
          font-size: 150%;
          font-weight: 400;
        }
        @media (max-width: 950px) {
          font-size: 120%;
        }
        @media (max-width: 750px) {
          font-size: 100%;
        }
      }
    }
    .title-one {
      position: absolute;
      top: 28%;
      left: 10%;
      color: #FFF;
      font-size: 130%;
    }
    .title-two {
      position: absolute;
      top: 45%;
      left: 16%;
      color: #FFF;
      font-size: 130%;
    }
    @media (max-width: 1200px) {
      .title-one, .title-two {
        font-size: 140%;
      }
    }
    @media (max-width: 850px) {
      .title-one, .title-two {
        font-size: 120%;
      }
    }
    @media (max-width: 550px) {
      .title-one, .title-two {
        font-size: 110%;
      }
      .title-two {
        top: 50%;
      }
    }
    @media (max-width: 400px) {
      .title-one, .title-two {
        font-size: 100%;
      }
    }
  }
  &:nth-child(3){
    color: #FFF;
    .title-one {
      margin-bottom: 40px;
      font-size: 160%;
      &::before, &::after {
        content: '';
        position: absolute;
        top: 28%;
        width: 18%;
        height: 26%;
        background: url('../assets/image/slider-leaf-icon.svg') no-repeat center / contain;
      }
      &::before {
        left: 15%;
        transform: scaleX(-1);
      }
      &::after {
        right: 15%;
      }
      @media (max-width: 950px) {
        &::before, &::after {
          top: 23%;
        }
      }
      @media (max-width: 750px) {
        margin-bottom: 25px;
        &::before {
          left: 13%;
        }
        &::after {
          right: 13%;
        }
      }
      @media (max-width: 550px) {
        margin-bottom: 15px;
      }
    }
  }
  &:nth-child(4){
    color: #FFF;
    .title-zero {
      position: relative;
      margin-bottom: 30px;
      color: #FBD148;
      font-size: 170%;
      text-shadow: 1px 1px 0 #F9975D,
      2px 2px 0 #C85C5C;
      &::before, &::after {
        content: '🎁';
        position: absolute;
        top: 0;
        bottom: 0;
        font-size: 80%;
      }
      &::before {
        left: -20%;
      }
      &::after {
        right: -20%;
      }
      @media (max-width: 650px) {
        margin-bottom: 15px;
      }
      @media (max-width: 500px) {
        font-size: 160%;
      }
    }
    .title-one {
      margin-bottom: 10px;
      font-size: 100%;
    }
    .title-two {
      font-size: 100%;
    }
  }
  &.active {
    transform: scale(1,1);
  }
}
.image-slider-box {
  position: absolute;
  top: 0;
  bottom: 0;
  right: $container-padding-l;
  width: 75%;
  height: 85%;
  margin: auto 0;
  background: rgb(56, 144, 216);
  z-index: 1;
  overflow: hidden;
  @media (max-width: 1050px) {
    left: $container-padding-l;
    width: auto;
  }
  @media (max-width: 850px) {
    left: 0;
    right: 0;
    width: auto;
  }
}
.image-slider-slides {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
}
.image-slider-item {
  flex: 0 0 100%;
  display: flex;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.image-slider-item-extract {
  display: flex;
  width: 100%;
  height: 100%;
}
.image-slider-item-extract-image {
  flex: 1;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.image-slider-pagination {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-slider-pagination-prev, .image-slider-pagination-next {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 15px;
  color: #AAA;
  font-size: 24px;
  cursor: pointer;
}
.image-slider-pagination-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 20px;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: #AAA;
    border-radius: 50%;
  }
  &.active::after {
    background: #333;
  }
}
</style>