<template>
  <div id="app">
    <!-- <index><index> -->
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
    //公用样式
	@import './assets/styles/common/base.scss';
	@import '~vux/dist/vux.css';
</style>

<script>
import Index from './view/Index';

export default {
  components: {
    Index
  }
}
</script>
