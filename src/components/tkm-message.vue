<template>
  <div class="tkm-message">
    <mu-snackbar v-if="snackbar" :message="message" action="关闭" @actionClick="hide" @close="hide"/>
  </div>
</template>
<script>
  export default {
    props: {
      message: {
        type: String,
        default: '提示'
      }
    },
    data() {
      return {
        snackbar: false
      }
    },
    methods: {
      show () {
        this.snackbar = true
        if (this.snackTimer) {
          clearTimeout(this.snackTimer)
        }
        this.snackTimer = setTimeout(() => { this.snackbar = false }, 2000)
      },
      hide () {
        this.snackbar = false
        if (this.snackTimer) {
          clearTimeout(this.snackTimer)
        }
      }
    }
  }
</script>
<style scoped lang="stylus">
</style>
