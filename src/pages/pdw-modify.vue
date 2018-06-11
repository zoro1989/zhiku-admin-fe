<template>
  <section id="pwd-modify">
    <mu-text-field label="原密码" v-model="form.pswd" type="password" hintText="请输入原密码" labelFloat></mu-text-field>
    <mu-text-field label="新密码" v-model="form.newPswd" type="password" hintText="请输入新密码" labelFloat></mu-text-field>
    <mu-text-field label="新密码（再输入一次）" v-model="form.reNewPswd" hintText="请再次输入新密码" type="password" labelFloat></mu-text-field>
    <section class="button-group">
      <mu-raised-button label="确认修改"  @click="onSubmit" primary/>
    </section>
    <tkm-loading ref="loading"></tkm-loading>
    <tkm-message ref="message" :message="message"></tkm-message>
  </section>
</template>

<script>
import pwdModify from 'service/pwd-modify'
import {messageMinxin} from 'common/js/mixin'
import TkmLoading from 'components/tkm-loading'
export default{
  mixins: [messageMinxin],
  components: {
    TkmLoading
  },
  data () {
    return {
      form: {
        pswd: '',
        newPswd: '',
        reNewPswd: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.loading.show()
      pwdModify.save.bind(this)({form: this.form}, (data) => {
        this.showMsgBox('修改密码成功')
//        this.$message({
//          message: data.message,
//          type: 'success'
//        })
      }, () => {
//        this.$message.error(err)
      })
    }
  }
}

</script>

<style scoped>
  #pwd-modify{
    width: 60%;
    margin: 0 auto;
  }
</style>
