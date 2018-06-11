<template>
  <div class="register">
    <img src="../assets/logo-big.png" />
    <h1 class="title"><strong class="title-item">Welcome</strong> BOOS</h1>
    <h5 class="sub-title">CCBJB Talents Search</h5>
    <div class="input-group">
      <div class="input">
        <mu-text-field label="姓名" v-model="form.nickname" hintText="请输入姓名" labelFloat></mu-text-field>
      </div>
    </div>
    <div class="input-group">
      <div class="input">
        <mu-text-field label="用户名" v-model="form.username" hintText="请输入邮件地址" labelFloat></mu-text-field>
      </div>
    </div>
    <div class="input-group">
      <div class="input">
        <mu-text-field label="密码" v-model="form.password" type="password" hintText="请输入密码" labelFloat></mu-text-field>
      </div>
    </div>
    <div class="input-group">
      <div class="input">
        <mu-text-field label="密码" type="password" hintText="请再次输入密码" labelFloat></mu-text-field>
      </div>
    </div>
    <div class="input-group">
      <div class="input">
        <mu-text-field label="验证码" v-model="form.vcode" hintText="请输入验证码" labelFloat></mu-text-field>
      </div>
    </div>
    <div class="input-group">
      <div class="input" ref="vcodeParent">
        <img class="vcode" ref="vcode" :src="vcodeurl" @click="changeVCode"/>
      </div>
    </div>
    <div class="input-group">
      <div class="input">
        <mu-raised-button label="注册"  @click="onRegister" secondary/>
        <mu-raised-button label="登录"  @click="onSubmit" primary/>
      </div>
    </div>
    <tkm-loading ref="loading"></tkm-loading>
    <tkm-message ref="message" :message="message"></tkm-message>
  </div>
</template>
<script>
import register from 'service/register'
import TkmLoading from 'components/tkm-loading'
import {messageMinxin} from 'common/js/mixin'
import {LOGIN_URI, SUCCESS_URI} from 'http/config'
export default {
  mixins: [messageMinxin],
  components: {
    TkmLoading
  },
  data () {
    return {
      form: {
        nickname: '',
        username: '',
        password: '',
        vcode: ''
      },
      vcodeurl: '/common/getVCode.tkm',
      vcodeShow: true
    }
  },
  methods: {
    onSubmit () {
      this.$router.replace(LOGIN_URI)
    },
    onRegister () {
      this.$refs.loading.show()
      register.submitRegister.bind(this)({form: this.form}, (data) => {
//        this.$message({
//          message: data.message,
//          type: 'success'
//        })
        this.$router.replace(SUCCESS_URI)
      }, () => {
//        this.$message.error(err)
      })
    },
    changeVCode () {
      this.$refs.vcode.src = '/common/getVCode.tkm?' + Math.random()
    }
  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  .register
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
