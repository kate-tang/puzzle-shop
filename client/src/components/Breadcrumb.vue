<template>
  <nav class="breadcrumb">
    <div class="container">
      <ol class="breadcrumb-list">
        <li class="breadcrumb-item">
          <router-link to="/" class="breadcrumb-link">首頁</router-link>
        </li>
        <li class="breadcrumb-item" v-for="item in breadcrumbArr">
          <router-link :to="item.path" class="breadcrumb-link">{{ item.text }}</router-link>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import store from '../store'
import { getProduct } from '../helpers'

export default {
  setup() {
    const route = useRoute();
    let path = route.path.replace(/\/$/, "");
    let breadcrumbArr = ref([]);
    if (path === '/about') {
      breadcrumbArr.value.push({ text: '關於我們', path })
    } else if (path === '/favorites') {
      breadcrumbArr.value.push({ text: '收藏清單', path })
    } else if (path === '/cart') {
      breadcrumbArr.value.push({ text: '購物車', path })
    } else if (path === '/faq') {
      breadcrumbArr.value.push({ text: '常見問題', path })
    } else if (path.startsWith('/products')) {
      breadcrumbArr.value.push({ text: '所有商品', path: '/categories' })

      let childPath = path.replace('/products/', '').replace('/products', '')
      if (childPath.length > 0) {
        getProduct(childPath)
          .then(data => {
            if (data.success){
              const product = data.product;
              breadcrumbArr.value.push(
                { text: product['category-zh'], path: `/categories/${product['category-en']}` },
                { text: product.name, path: '' }
              )
            }
          })
          .catch(err => console.log(err, 'can not get category'))
      }
    } else if (path.startsWith('/categories')) {
      breadcrumbArr.value.push({ text: '所有商品', path: '/categories' })
      
      let childPath = path.replace('/categories/', '').replace('/categories', '')
      if (childPath.length > 0) {
        const category = store.state.categories.find(cat => cat['category-en'] === childPath)
        if (!category) return
        breadcrumbArr.value.push({ text: category['category-zh'], path: `/categories/${childPath}` })
      }
    }

    return { breadcrumbArr }
  }
}
</script>

<style scoped lang="scss">
.breadcrumb-list {
  padding: 10px 0;
  line-height: 1.3;
  @media (max-width: 600px) {}
}
.breadcrumb-item {
  position: relative;
  display: inline;
  padding: 0 12px;
  & + &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 0;
    width: 1px;
    height: 13px;
    margin: auto 0;
    background: #000;
    transform: rotate(20deg);
  }
  &:first-child {
    padding: 0 12px 0 0;
  }
  &:last-child .breadcrumb-link {
    color: #999;
    pointer-events: none;
  }
  @media (max-width: 450px) {
    padding: 0 8px;
    &:first-child {
      padding: 0 8px 0 0;
    }
    & + &::before {
      top: 2.5px;
      height: 11px;
    }
  }
}
.breadcrumb-link {
  color: $dark-grey;
  font-size: 16px;
  font-weight: 700;
  @media (max-width: 450px) {
    font-size: 14px;
  }
}
</style>