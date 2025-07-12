<template>
  <div id="app">
    <!-- 二级路由出口 -->
    <router-view></router-view>

    <van-tabbar route v-model="active" active-color="#f9a602" inactive-color="#999">
      <van-tabbar-item icon="wap-home-o" text="首页" to="/home" />
      <van-tabbar-item icon="search" text="分类页" to="/category" />
      <van-tabbar-item icon="shopping-cart-o" text="购物车" to="/cart" />
      <van-tabbar-item icon="user" text="我的" to="/user" />
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>
<style lang="less">

</style>
