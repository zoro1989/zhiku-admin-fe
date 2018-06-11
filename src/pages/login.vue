<template>
  <div class="login-box">
    <div class="login">
      <img src="../assets/logo-big.png" />
      <h1 class="title"><strong class="title-item">Welcome</strong> BOOS</h1>
      <h5 class="sub-title">CCBJB Talents Search</h5>
      <div class="input-group">
        <div class="input">
          <mu-text-field label="用户名" v-model="form.email" hintText="请输入用户名" labelFloat></mu-text-field>
        </div>
        <div class="input-group-addon"><i class="fa fa-user"></i></div>
      </div>
      <div class="input-group">
        <div class="input">
          <mu-text-field label="密码" v-model="form.pswd" type="password" hintText="请输入密码" labelFloat @keyup.enter.native="onSubmit"></mu-text-field>
        </div>
        <div class="input-group-addon"><i class="fa fa-key"></i></div>
      </div>
      <div class="rememberMe">
        <mu-checkbox label="记住密码" v-model="isRememberMe"></mu-checkbox>
      </div>
      <div class="btns">
        <mu-raised-button label="登录" @click="onSubmit" class="login-btn"/>
        <mu-raised-button label="注册" @click="onRegister" class="register-btn" />
      </div>
      <tkm-loading ref="loading"></tkm-loading>
      <tkm-message ref="message" :message="message"></tkm-message>
    </div>
  </div>
</template>
<script>
import login from 'service/login'
import EventBus from 'utilities/event-bus'
import TkmLoading from 'components/tkm-loading'
import {messageMinxin} from 'common/js/mixin'
import {SUCCESS_URI, REGISTER_URI} from 'http/config'
import {saveRoles, savePermissions, clearRoles, clearPermissions} from 'common/js/cache'
export default {
  mixins: [messageMinxin],
  components: {
    TkmLoading
  },
  data () {
    return {
      form: {
        email: '',
        pswd: '',
        rememberMe: ''
      },
      isRememberMe: [],
      loadingClass: 'loading'
    }
  },
  methods: {
    onSubmit () {
      this.$refs.loading.show()
      if (this.isRememberMe.length > 0) {
        this.form.rememberMe = true
      } else {
        this.form.rememberMe = false
      }
      login.submitLogin.bind(this)({form: this.form}, (data) => {
        clearRoles()
        clearPermissions()
        savePermissions(data.permissions)
        saveRoles(data.roles)
        let backUrl = EventBus.backUrl ? EventBus.backUrl : SUCCESS_URI
//        this.$message({
//          message: data.message,
//          type: 'success'
//        })
        EventBus.backUrl = ''
        this.$router.replace(backUrl)
      }, () => {
//        this.$message.error(err)
      })
    },
    onRegister () {
      this.$router.replace(REGISTER_URI)
    }
  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  .login-box
    background: $color-background
    height: 100%
    .login
      width: 460px
      height: 100%
      padding: 50px
      box-sizing: border-box
      margin: 0 auto
      text-align: center
      background: $color-background-d
      .title
        margin-top: 20px
        font-weight: 500
        line-height: 1.1
        font-size: 26px
        .title-item
          position: relative
        .title-item:before
          content: ""
          position: absolute
          display: block
          width: 40px
          height: 5px
          background-color: #1ccdaa
          top: -5px
          left: 0;
      .sub-title
        font-size: 12px
        line-height: 13.2px
      .input-group
        display: table
        margin-bottom: 10px;
        position: relative;
        border-collapse: separate;
        margin: 0 auto;
        .input
          display: inline-block
          text-align: left
        .input-group-addon
          display: table-cell
      .rememberMe
        width: 270px
        margin: 0 auto
        text-align: left
        overflow: hidden
      .btns
        margin-top: 20px
        .login-btn
          background: #1ccdaa
          color: #f2f2f2
        .register-btn
          background: #394759
          color: #fff

</style>
