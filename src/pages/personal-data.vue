<template>
  <section id="personal-data">
    <mu-text-field label="昵称" v-model="form.nickname" disabled></mu-text-field>
    <mu-text-field label="Email/帐号" v-model="form.email" disabled></mu-text-field>
    <mu-text-field label="创建时间" v-model="form.createTime" disabled></mu-text-field>
    <mu-text-field label="最后登录时间" v-model="form.lastLoginTime" disabled></mu-text-field>
    <tkm-loading ref="loading"></tkm-loading>
    <tkm-message ref="message" :message="message"></tkm-message>
  </section>

</template>

<script>
import personalData from 'service/personal-data'
import {talentsMixin, messageMinxin} from 'common/js/mixin'
import timestampToDateTime from 'utilities/timestamp-to-date-time'
export default{
  mixins: [talentsMixin, messageMinxin],
  created () {
    personalData.get.bind(this)({}, (data) => {
      data.createTime = timestampToDateTime(data.createTime)
      data.lastLoginTime = timestampToDateTime(data.lastLoginTime)
      this.form = data
    }, () => {
//      this.$message.error(err)
    })
  },
  data () {
    return {
      form: {
        nickname: '',
        email: '',
        createTime: '',
        lastLoginTime: ''
      }
    }
  },
  methods: {
    onSubmit () {

    }
  }
}

</script>

<style scoped>
  #personal-data{
    width: 60%;
    margin: 0 auto;
  }
</style>
