<template>
  <div class="arrival-notice">
    <form class="box" v-if="!isSent">
      <p class="text">請填寫您的聯絡資訊，我們將於商品到貨後通知您。</p>
      <input type="text" placeholder="請輸入姓名">
      <input type="tel" placeholder="請輸入電話">
      <input type="email" placeholder="請輸入 Email">
      <div class="btns">
        <button type="button" @click="$emit('close')">取消</button>
        <button type="submit" @click.prevent="send">送出</button>
      </div>
    </form>
    <div class="box" v-else>
      <p class="text">資料已送出，請耐心等候。</p>
      <button type="button" @click="$emit('close')">關閉</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    let isSent = ref(false)

    function send(){
      // send to server

      // switch view
      isSent.value = true
    }

    return { isSent, send }
  }
}
</script>

<style scoped lang="scss">
.arrival-notice {
  position: absolute;
  top: 65%;
  left: 0;
  right: 0;
  max-width: 300px;
  width: calc(100% - 10px);
  height: 240px;
  margin: 0 auto;
  padding: 15px;
  background: #FFF;
  border: 2px dashed $dark-grey;
  border-radius: $border-radius;
  font-size: 16px;
  z-index: 2;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 0;
    height: 0;
    margin: 0 auto;
    border-top: 8px dashed $dark-grey;
    border-left: 8px dashed $dark-grey;
    border-right: 8px dashed transparent;
    border-bottom: 8px dashed transparent;
    transform: rotate(45deg) translate(-6px, -6px);
  }
  @media (max-width: 768px) {
    height: 220px;
    font-size: 14px;
  }
}
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.text {
  margin-bottom: 8px;
  line-height: 1.3;
}
input {
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  &:last-of-type {
    margin-bottom: 10px;
  }
}
.btns {
  text-align: center;
}
button {
  all: unset;
  display: inline-block;
  padding: 10px 15px;
  background: $dark-grey;
  color: #FFF;
  border-radius: $border-radius;
  cursor: pointer;
  &:hover {
    background: lighten($dark-grey, 5%);
  }
  & + & {
    margin-left: 5px;
  }
}
</style>