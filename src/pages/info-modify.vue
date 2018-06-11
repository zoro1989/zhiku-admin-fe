<template>
  <section id="info-modify">
    <input type="hidden" v-model="form.id" />
    <mu-text-field label="昵称" v-model="form.nickname" labelFloat hintText="请输入昵称" ></mu-text-field>
    <mu-text-field label="Email（不准修改）" v-model="form.email" :disabled="true"></mu-text-field>
    <section class="button-group">
      <mu-raised-button label="确认修改"  @click="onSubmit" primary/>
    </section>
    <tkm-loading ref="loading"></tkm-loading>
    <tkm-message ref="message" :message="message"></tkm-message>
  </section>
</template>

<script>
import infoModify from 'service/info-modify'
import EventBus from 'utilities/event-bus'
import {talentsMixin, messageMinxin} from 'common/js/mixin'
export default{
  mixins: [talentsMixin, messageMinxin],
  created () {
    infoModify.get.bind(this)({}, (data) => {
      this.form.id = data.id
      this.form.nickname = data.nickname
      this.form.email = data.email
    }, () => {
//      this.$message.error(err)
    })
  },
  data () {
    return {
      form: {
        id: '',
        nickname: '',
        email: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.loading.show()
      infoModify.save.bind(this)({form: this.form}, (data) => {
        EventBus.$emit('usernamechange', this.form.nickname)
        this.showMsgBox('修改昵称成功')
//        this.$message({
//          message: '保存成功',
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
   #info-modify{
     width: 60%;
     margin: 0 auto;
   }

</style>
