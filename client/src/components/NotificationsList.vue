<template>
  <div class="notifications-list">
    <TransitionGroup name="list">
      <div class="notification-box" v-for="item in $store.state.notificationsData" :key="item.timestamp" :class="item.type">
        <div class="msg">{{ item.msg }}</div>
        <div class="close" @click="$store.commit('clearNotification')">
          <ion-icon name="close" class="close-icon"></ion-icon>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
export default {
  setup() {
    return {  }
  }
}
</script>

<style scoped lang="scss">
.notifications-list {
  position: fixed;
  top: 55px;
  left: 0;
  right: 0;
  width: calc(1200px - (#{$container-padding-l} * 2));
  margin: 0 auto;
  z-index: 15;
  @media (max-width: 1200px) {
    width: calc(100% - (#{$container-padding-l} * 2));
  }
  @media (max-width: 850px) {
    width: calc(100% - (#{$container-padding-m} * 2));
  }
  @media (max-width: 500px) {
    width: calc(100% - (#{$container-padding-s} * 2));
  }
}
.notification-box {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  width: 250px;
  padding: 12px 20px;
  background: #D4EDDA;
  border-radius: $border-radius;
  &.success {
    background: #D4EDDA;
  }
  &.warning {
    background: #F8D7DA;
  }
  .msg {
    flex: 1;
    margin-right: 10px;
    line-height: 1.3;
  }
  .close {
    flex: 0 0 16px;
    cursor: pointer;
    .close-icon {
      width: 16px;
      height: 16px;
    }
  }
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.list-enter-active,
.list-leave-active {
  transition: all 0.7s;
}
</style>