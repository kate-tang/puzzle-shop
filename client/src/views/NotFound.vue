<template>
  <div class="not-found main">
    <div class="container">
      <Empty />
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { initPage } from '../helpers'
import Empty from '../components/Empty.vue'

export default {
  components: { Empty },
  setup() {
    onMounted(() => initPage())
  }
}
</script>

<style lang="scss" scoped></style>