<template>
  <div class="tkm-loading" v-show="showFlag">
    <div class="loading-wrapper">
      <img src="./loader.gif"/>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  .tkm-loading
    background: $color-background-dd
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 999
    text-align: center
    .loading-wrapper
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%,-50%)
</style>
