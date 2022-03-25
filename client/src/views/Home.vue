<template>
  <div class="home main">
    <Slider />
    <section class="series">
      <div class="container">
        <div class="main-title">
          <div class="en">Hot</div>
          <h2 class="zh">熱門系列</h2>
        </div>
        <ul class="series-wrap">
          <li v-for="series in $store.state.homeSeriesData">
            <router-link :to="series.route" class="series-item">
              <div class="series-item-intro">
                <h4 class="series-item-subtitle">{{ series.subtitle }}</h4>
                <h3 class="series-item-title"><span class="main">{{ series.title }}</span>系列</h3>
                <router-link :to="series.route" class="goto-btn">
                  <ion-icon name="chevron-forward-outline" class="icon"></ion-icon>
                </router-link>
              </div>
              <div class="series-item-image-wrap">
                <div class="series-item-image" v-for="image in series.images" :style="{ backgroundImage: 'url(' + require('../assets/image/products/' + image) + ')' }"></div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </section>
    <section class="slogan">
      <h1 class="slogan-box" ref="slogan">
        <span class="slogan-text">一杯咖啡，一幅拼圖</span>
        <span class="slogan-text">陪你度過一個優閒的下午</span>
      </h1>
    </section>
    <section class="wall">
      <div class="container">
        <div class="main-title">
          <div class="en">Selection</div>
          <h2 class="zh">多款拼圖，任君挑選</h2>
        </div>
        <div class="wall-desktop" ref="wallDesktop" v-if="isDesktopMode">
          <div class="wall-d-wrap">
            <div class="wall-d-col" v-for="(col, index) in $store.state.homeWallDesktopData" 
            :style="[ (index+1) % 2 === 0 ? { '--seq': col.sequence, '--offset': `${wallOffset}%` } : { '--seq': col.sequence, '--offset': '0%' } ]"
            >
              <router-link :to="image.route" class="wall-d-col-item" v-for="image in col.images" :style="[ image.direction === 'v' ? { paddingBottom: '140%', backgroundImage: 'url(' + require('../assets/image/products/' + image.fileName) + ')' } : { paddingBottom: '84%', backgroundImage: 'url(' + require('../assets/image/products/' + image.fileName) + ')' } ]"></router-link>
            </div>
          </div>
        </div>
        <div class="wall-mobile" ref="wallMobile" v-else>
          <div class="wall-m-wrap">
            <div class="wall-m-bg">
              <div class="wall-m-frame">
                <div class="wall-m-puzzles">
                  <div class="wall-m-puzzle-item" v-for="image in $store.state.homeWallMobileData" :style="{ backgroundImage: 'url(' + require('../assets/image/products/' + image.fileName) + ')' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="service">
      <div class="container">
        <div class="main-title">
          <div class="en">Service</div>
          <h2 class="zh">專屬服務</h2>
        </div>
        <ul class="service-list">
          <li>
            <router-link :to="{ path: '/faq', hash: '#q2' }" class="service-item">
              <div class="service-item-icon">
                <ion-icon name="cart" class="icon"></ion-icon>
              </div>
              <div class="service-item-text">
                <h3 class="title">滿千免運</h3>
                <p class="description">全館購物滿千即享免運</p>
                <router-link to="/" class="goto-btn">
                  <ion-icon name="chevron-forward-outline" class="icon"></ion-icon>
                </router-link>
              </div>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path: '/faq', hash: '#q5' }" class="service-item">
              <div class="service-item-icon">
                <ion-icon name="person" class="icon"></ion-icon>
              </div>
              <div class="service-item-text">
                <h3 class="title">售後服務</h3>
                <p class="description">我們提供完整的退換貨服務</p>
                <router-link to="/" class="goto-btn">
                  <ion-icon name="chevron-forward-outline" class="icon"></ion-icon>
                </router-link>
              </div>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path: '/faq', hash: '#q7' }" class="service-item">
              <div class="service-item-icon">
                <ion-icon name="extension-puzzle" class="icon"></ion-icon>
              </div>
              <div class="service-item-text">
                <h3 class="title">拼圖缺片</h3>
                <p class="description">拼完才發現缺片？快來補片</p>
                <router-link to="/" class="goto-btn">
                  <ion-icon name="chevron-forward-outline" class="icon"></ion-icon>
                </router-link>
              </div>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path: '/faq', hash: '#q8' }" class="service-item">
              <div class="service-item-icon">
                <ion-icon name="camera" class="icon"></ion-icon>
              </div>
              <div class="service-item-text">
                <h3 class="title">訂製拼圖</h3>
                <p class="description">拼出你的美好回憶</p>
                <router-link to="/" class="goto-btn">
                  <ion-icon name="chevron-forward-outline" class="icon"></ion-icon>
                </router-link>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import Slider from '../components/Slider.vue'
import { initPage } from '../helpers'

export default {
  components: { Slider },
  setup(){
    onMounted(() => initPage())
    
    // slide in/out content when scroll
    const slogan = ref(null);
    const wallDesktop = ref(null);
    const wallMobile = ref(null);
    let wallOffset = ref(0);
    let isDesktopMode = ref(true)
    function switchWallMode(){
      let siteWidth = document.body.offsetWidth
      if (siteWidth <= 850){
        isDesktopMode.value = false
      } else {
        isDesktopMode.value = true
      }
    }
    function popUpContent(){
      const scrollPos = window.pageYOffset;
      const topEffectivePoint = window.screen.height * 0.3;
      const bottomEffectivePoint = window.screen.height * 0.8;

      // slogan slide in/out
      const sloganPos = slogan.value.getBoundingClientRect();
      if (sloganPos.top < bottomEffectivePoint) {
        slogan.value.classList.add('active');
      } else {
        slogan.value.classList.remove('active');
      }

      // wall slide in/out
      if (isDesktopMode.value){
        const wallDesktopPos = wallDesktop.value.getBoundingClientRect();
        const walk = wallDesktopPos.height + (bottomEffectivePoint - topEffectivePoint);
        const startPos = window.pageYOffset + wallDesktopPos.top - bottomEffectivePoint;
        const offsetLevel = 30;

        if (wallDesktopPos.top < bottomEffectivePoint && wallDesktopPos.bottom > topEffectivePoint) {
          const offsetValue = ((scrollPos - startPos) / walk) * offsetLevel;
          wallOffset.value = offsetValue;
        }
        if (wallDesktopPos.top < bottomEffectivePoint) {
          wallDesktop.value.classList.add('active');
        } else {
          wallDesktop.value.classList.remove('active');
        }
      } else {
        const wallMobilePos = wallMobile.value.getBoundingClientRect();

        if (wallMobilePos.top < bottomEffectivePoint) {
          wallMobile.value.classList.add('active');
        } else {
          wallMobile.value.classList.remove('active');
        }
      }
    }
    window.addEventListener('resize', switchWallMode)
    window.addEventListener('scroll', popUpContent)
    onUnmounted(() => {
      window.removeEventListener('resize', switchWallMode)
      window.removeEventListener('scroll', popUpContent)
    })

    return { slogan, wallDesktop, wallMobile, wallOffset, isDesktopMode }
  }
}
</script>

<style lang="scss" scoped>
// series
.series {
  margin-bottom: 150px;
}
.series-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 80px;
  & > * {
    flex: 0 0 49%;
    &:nth-child(1), &:nth-child(2){
      margin-bottom: 20px;
    }
    &:hover {
      .series-item {
        box-shadow: 3px 3px 10px 3px rgba(0,0,0,0.2);
        transform: translateY(-5px);
      }
      .series-item-image {
        animation: slide-image 2s .5s forwards;
      }
    }
  }
  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
    & > * {
      max-width: 630px;
      width: 100%;
      &:nth-child(1), &:nth-child(2), &:nth-child(3){
        margin-bottom: 20px;
      }
    }
  }
}
.series-item {
  display: flex;
  height: 180px;
  border-radius: $border-radius;
  box-shadow: 3px 3px 10px 3px rgba(0,0,0,0.1);
  transition: all .5s;
  overflow: hidden;
}
.series-item-intro {
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 15px 20px 20px;
  font-size: 16px;
  .series-item-title {
    color: #000;
    .main {
      font-size: 26px;
    }
  }
  .series-item-subtitle {
    display: inline-block;
    margin-bottom: 10px;
    padding: 2px 10px;
    background: $dark-grey;
    color: #FFF;
    border-radius: 500px;
    font-size: 14px;
    line-height: 1.2;
    letter-spacing: 0.5px;
  }
  .goto-btn {
    margin: auto 0;
  }
}
.series-item-image-wrap {
  flex: 0 0 50%;
  display: flex;
  transition: all .5s;
  overflow: hidden;
  .series-item-image {
    flex: 0 0 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
}
@media (max-width: 900px) {
  .series-item-intro {
    font-size: 14px;
    .series-item-title {
      .main {
        font-size: 24px;
      }
    }
    .series-item-subtitle {
      font-size: 12px;
    }
  }
}
@media (max-width: 500px) {
  .series-item {
    height: 35vw;
  }
  .series-item-intro {
    flex: 0 0 55%;
    .series-item-title {
      .main {
        font-size: 22px;
      }
    }
  }
  .series-item-image-wrap {
    flex: 0 0 45%;
  }
}
@media (max-width: 400px) {
  .series-item-intro {
    padding: 15px 10px 15px 15px;
    .series-item-title {
      .main {
        font-size: 20px;
      }
    }
  }
}
@keyframes slide-image {
  0% { transform: translateX(0); }
  50% { transform: translateX(-100%); }
  100% { transform: translateX(-200%); }
}

// slogan
.slogan {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 520px;
  background: url('../assets/image/slogan.jpg') fixed no-repeat center / cover;
  @media (max-width: 1000px) {
    height: 50vw;
  }
  @media (max-width: 600px) {
    height: 70vw;
  }
}
.slogan-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 200px;
  background: rgba(0,0,0,.3);
  transform: translateY(100px);
  opacity: 0;
  transition: all 1s;
  &.active {
    transform: translateY(0);
    opacity: 1;
  }
  @media (max-width: 1000px) {
    width: 60%;
    height: 35%;
  }
}
.slogan-text {
  display: block;
  color: rgba(255,255,255,.9);
  font-size: 24px;
  & + & {
    margin-top: 15px;
  }
  @media (max-width: 1000px) {
    font-size: 2.2vw;
  }
  @media (max-width: 600px) {
    font-size: 14px;
  }
}

// wall
.wall {
  .container {
    padding-top: 100px;
  }
}
.wall-desktop {
  position: relative;
  padding-bottom: 110%;
  margin-top: 10%;
  margin-bottom: 5%;
  transform: translateY(100px);
  opacity: 0;
  transition: all 1s;
  &.active {
    transform: translateY(0);
    opacity: 1;
  }
}
.wall-d-wrap {
  position: absolute;
  top: -100px;
  bottom: -100px;
  left: -10%;
  right: -10%;
  display: flex;
  justify-content: space-between;
}
.wall-d-col {
  flex: 0 0 13.5%;
  padding-top: calc(var(--seq) * 6% - var(--offset));
  transition: all .6s ease;
}
.wall-d-col-item {
  display: block;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  transition: all .5s;
  & + & {
    margin-top: 6%;
  }
  &:hover {
    transform: scale(1.05);
  }
}
.wall-mobile {
  position: relative;
  max-width: 550px;
  width: 100%;
  margin: 100px auto 150px auto;
  transform: translateY(100px);
  opacity: 0;
  transition: all 1s;
  &.active {
    transform: translateY(0);
    opacity: 1;
  }
}
.wall-m-wrap {
  padding-bottom: 120%;
}
.wall-m-bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url('../assets/image/wall-m-01.jpeg') no-repeat center / cover;
  @media (max-width: 600px) {
    left: -20px;
    right: -20px;
  }
  @media (max-width: 500px) {
    left: -15px;
    right: -15px;
  }
}
.wall-m-frame {
  position: absolute;
  top: 8%;
  left: 0;
  right: 0;
  width: 51%;
  height: 32%;
  margin: 0 auto;
  padding: 8px;
  background-color: #999;
  border: 8px solid #CCC;
  box-shadow: 1px 1px 3px rgba(0,0,0,.5) inset,
              3px 25px 55px -1px rgba(0,0,0,.5),
              -25px -25px 80px -15px rgba(255,255,255,.9);
  @media (max-width: 600px) {
    padding: 6px;
    border: 6px solid #CCC;
  }
}
.wall-m-puzzles {
  position: relative;
  width: 100%;
  height: 100%;
}
$interval: 1.5s;
.wall-m-puzzle-item {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0;
  animation-name: switch;
  animation-duration: $interval * 5;
  animation-iteration-count: infinite;
  @for $i from 1 through 5 {
    &:nth-child(#{$i}) {
      animation-delay: calc(#{$i} * #{$interval});
    }
  }
  &:nth-child(1) {
    opacity: 1;
  }
}
@keyframes switch {
  0% { opacity: 1; z-index: 1; }
  20% { opacity: 1; z-index: 1; }
  21% { opacity: 0; z-index: 0; }
  100% { opacity: 0; z-index: 0; }
}

// service
.service-list {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: 100px 0 150px 0;
  font-size: 16px;
  @media (max-width: 700px) {
    font-size: 14px;
  }
  & > li {
    flex: 0 0 35%;
    & + li {
      margin-top: 50px;
    }
    &:nth-child(1) { transform: translateX(240px); }
    &:nth-child(2) { transform: translateX(120px); }
    &:nth-child(3) { transform: translateX(120px); }
    &:nth-child(4) { transform: translateX(240px); }
    @media (max-width: 1200px) {
      &:nth-child(1) { transform: translateX(18vw); }
      &:nth-child(2) { transform: translateX(8vw); }
      &:nth-child(3) { transform: translateX(8vw); }
      &:nth-child(4) { transform: translateX(18vw); }
    }
    @media (max-width: 1100px) {
      &:nth-child(1) { transform: translateX(16vw); }
      &:nth-child(2) { transform: translateX(6vw); }
      &:nth-child(3) { transform: translateX(6vw); }
      &:nth-child(4) { transform: translateX(16vw); }
    }
    @media (max-width: 1000px) {
      &:nth-child(1) { transform: translateX(14vw); }
      &:nth-child(2) { transform: translateX(4vw); }
      &:nth-child(3) { transform: translateX(4vw); }
      &:nth-child(4) { transform: translateX(14vw); }
    }
    @media (max-width: 650px) {
      &:nth-child(1) { transform: translateX(24vw); }
      &:nth-child(2) { transform: translateX(14vw); }
      &:nth-child(3) { transform: translateX(4vw); }
      &:nth-child(4) { transform: translateX(14vw); }
    }
    @media (max-width: 500px) {
      & + li {
        margin-top: 35px;
      }
    }
    @media (max-width: 400px) {
      &:nth-child(1) { transform: translateX(15px); }
      &:nth-child(2) { transform: translateX(15px); }
      &:nth-child(3) { transform: translateX(15px); }
      &:nth-child(4) { transform: translateX(15px); }
    }
  }
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 15%;
    top: 0;
    bottom: 0;
    margin: auto 0;
    background: url('../assets/image/service-bg-d.svg') no-repeat center / contain;
    pointer-events: none;
    z-index: -1;
    @media (max-width: 1100px) {
      width: 90%;
      height: 90%;
      left: 24%;
    }
    @media (max-width: 650px) {
      background: url('../assets/image/service-bg-m.svg') no-repeat center / contain;
      left: 28%;
    }
  }
}
.service-item {
  display: flex;
  &:hover {
    transform: scale(1.05);
    .service-item-icon {
      background: $dark-grey;
      .icon {
        color: #FFF;
      }
    }
  }
  .service-item-icon {
    flex: 0 0 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 90px;
    margin-right: 20px;
    border: 4px solid $dark-grey;
    border-radius: 50%;
    transition: all .5s;
    .icon {
      color: $dark-grey;
      font-size: 2.5em;
      transition: all .5s .2s;
    }
    @media (max-width: 750px) {
      flex: 0 0 80px;
      width: 80px;
      height: 80px;
      margin-right: 15px;
    }
    @media (max-width: 500px) {
      flex: 0 0 75px;
      width: 75px;
      height: 75px;
      margin-right: 10px;
    }
    @media (max-width: 400px) {
      flex: 0 0 65px;
      width: 65px;
      height: 65px;
    }
  }
  .service-item-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: #000;
    .title {
      line-height: 1.5;
      font-size: 1.4em;
      @media (max-width: 500px) {
        font-size: 1.2em;
      }
    }
    .description {
      margin-bottom: 15px;
      line-height: 1.5;
      font-size: 1em;
      @media (max-width: 650px) {
        margin-bottom: 5px;
      }
    }
  }
}
</style>