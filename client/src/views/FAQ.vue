<template>
  <div class="faq main">
    <Breadcrumb />
    <div class="container">
      <main class="faq-wrap">
        <div class="main-title">
          <div class="en">FAQ</div>
          <h1 class="zh">常見問題</h1>
        </div>
        <ul class="accordion">
          <li class="accordion-item" v-for="(item, index) in $store.state.faqData" :data-seq="index + 1" :id="`q${index + 1}`">
            <div class="accordion-item-head" @click="toggleAccordion($event)">
              <ion-icon name="arrow-down" class="arrow"></ion-icon>
              <h2 class="question">{{ item.q }}</h2>
            </div>
            <div class="accordion-item-body" :data-seq="index+1">
              <div class="answer-box">
                <p class="answer" v-html="item.a"></p>
              </div>
            </div>
          </li>
        </ul>
      </main>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { initPage } from '../helpers'
import Breadcrumb from '../components/Breadcrumb.vue'
import { useRoute } from 'vue-router'

export default {
  components: { Breadcrumb },
  setup() {
    onMounted(() => {
      initPage()

      // if route.hash exist, then open specific answer
      const route = useRoute()
      const seq = route.hash.substring(2)   // eg: #q8 -> 8
      if (seq){
        const selectedQuestion = document.querySelector(`[data-seq='${seq}']`)
        selectedQuestion.classList.add(activeClass)
      }
    })

    const activeClass = 'active'
    function toggleAccordion(e){
      const lis = e.target.closest('.accordion').querySelectorAll('.accordion-item')
      const li = e.target.closest('.accordion-item')
      const answer = li.querySelector('.accordion-item-body')

      lis.forEach(item => {
        // unclicked li -> close answer
        if (item !== li){
          const otherAnswer = item.querySelector('.accordion-item-body')
          otherAnswer.style.height = '0px'
          item.classList.remove(activeClass)
          return
        }

        // clicked li
        const clickedLiIsActive = li.classList.contains(activeClass)
        // not active -> slide open answer
        if (!clickedLiIsActive){
          li.classList.add(activeClass)
          answer.style.height = 'auto'
          const height = `${answer.offsetHeight}px`
          answer.style.height = '0px'
          setTimeout(() => {
            answer.style.height = height
          }, 0)
          return
        }
        // active -> close answer
        if (clickedLiIsActive){
          answer.style.height = '0px'
          li.classList.remove(activeClass)
          return
        }
      })
    }

    return { toggleAccordion }
  }
}
</script>

<style lang="scss" scoped>
.faq-wrap {
  max-width: 900px;
  width: calc(100% - 40px);
  margin: 0 auto;
}
.accordion {
  margin-bottom: 100px;
}
.accordion-item {
  border: 1px solid #DDD;
  border-radius: $border-radius;
  transition: all .5s;
  &:not(:last-child){
    margin-bottom: 10px;
  }
  &.active {
    background: lighten($red, 33%);
    border-top: 4px solid lighten($red, 10%);
    .arrow {
      transform: rotate(-90deg);
    }
    .accordion-item-body {
      height: auto;
      transition: all 1s;
      .answer {
        opacity: 1;
        transform: translateY(0);
        transition: all .5s .3s;
      }
    }
  }
}
.accordion-item-head {
  display: flex;
  align-items: center;
  padding: 20px 15px;
  cursor: pointer;
  .arrow {
    flex: 0 0 22px;
    margin-right: 10px;
    font-size: 22px;
    transition: all .5s;
  }
  .question {
    flex: 1;
    display: inline-block;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.3;
  }
}
.accordion-item-body {
  height: 0;
  box-sizing: border-box;
  overflow: hidden;
  transition: height 1s;
  .answer-box {
    padding: 20px 15px;
    font-size: 16px;
  }
  .answer {
    line-height: 1.5;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0s 1s;
  }
}
@media (max-width: 600px) {
  .accordion-item-head {
    padding: 15px;
    .question {
      font-size: 16px;
    }
  }
  .accordion-item-body {
    .answer-box {
      padding: 15px;
      font-size: 14px;
    }
  }
}
</style>