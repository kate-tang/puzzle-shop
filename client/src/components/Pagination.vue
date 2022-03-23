<template>
  <div class="pagination">
    <ul>
      <li class="prev" v-if="page > 1" @click="handlePage(page - 1)">
        <ion-icon name="chevron-back"></ion-icon>
      </li>
      <li class="num" v-if="page > 2 && neighborLiNum < totalPage" @click="handlePage(1)">1</li>
      <li class="dot" v-if="page > 3 && neighborLiNum < totalPage - 1">...</li>
      <li class="num" v-for="p in currentPageArr" @click="handlePage(p)" :class="{ 'active' : p === page }" :key="p">{{ p }}</li>
      <li class="dot" v-if="page < totalPage - 2 && neighborLiNum < totalPage - 1">...</li>
      <li class="num" v-if="page < totalPage - 1 && neighborLiNum < totalPage" @click="handlePage(totalPage)">{{ totalPage }}</li>
      <li class="next" v-if="page < totalPage" @click="handlePage(page + 1)">
        <ion-icon name="chevron-forward"></ion-icon>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router';

export default {
  props: ['page', 'totalPage', 'path'],
  setup(props){
    const router = useRouter()

    let totalPage = props.totalPage;
    let page = props.page;
    let neighborLiNum = ref(4);
    let currentPageArr = ref(populatePageArr());
    function populatePageArr(){
      let arr = [];
      if (page === 1){
        for (let i = 0; i < neighborLiNum.value; i++){
          let num = page + i
          if (num > totalPage){ continue }
          arr.push(num)
        }
        return arr
      } else if (page === 2){
        for (let i = 0; i < neighborLiNum.value; i++){
          let num = page + (i - 1)
          if (num > totalPage){ continue }
          arr.push(num)
        }
        return arr
      } else if (page === totalPage - 1){
        for (let i = neighborLiNum.value; i > 0; i--){
          let num = page - i + 2;
          if (num < 1){ continue }
          arr.push(num)
        }
        return arr
      } else if (page === totalPage){
        for (let i = neighborLiNum.value; i > 0; i--){
          let num = page - i + 1;
          if (num < 1){ continue }
          arr.push(num)
        }
        return arr
      } else {
        return [page - 1, page, page + 1]
      }
    }
    function handlePage(futureP){
      if (futureP === page.value) return
      const path = `${props.path}?page=${futureP}#main`
      router.push(path)
    }

    return { neighborLiNum, currentPageArr, handlePage }
  }
}
</script>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  ul {
    display: flex;
    padding: 5px;
    border-radius: 500px;
  }
  li {
    width: 40px;
    height: 40px;
    color: $dark-grey;
    font-size: 18px;
    line-height: 40px;
    text-align: center;
    border-radius: 500px;
    user-select: none;
    &.prev, &.next, &.num {
      cursor: pointer;
      &:active, &:hover, &.active {
        background: $dark-grey;
        color: #FFF;
      }
    }
    &.num.active {
      cursor: default;
    }
    &.prev {
      border-radius: 20px 5px 5px 20px;
      font-size: 16px;
    }
    &.next {
      border-radius: 5px 20px 20px 5px;
      font-size: 16px;
    }
    & + li {
      margin-left: 5px;
    }
  }
  @media (max-width: 600px) {
    li {
      width: 30px;
      height: 30px;
      font-size: 14px;
      line-height: 30px;
      & + li {
        margin-left: 0;
      }
    }
  }
}
</style>