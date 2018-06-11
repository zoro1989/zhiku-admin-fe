<template>
  <section id="my-permission">
    <mu-list>
        <mu-list-item v-for="role in roles" :key="role.id" :title="role.name" toggleNested class="role-title" :open="open">
            <mu-list-item v-for="permission in role.permissions" :key="permission.id" slot="nested" :title="permission.name"/>
        </mu-list-item>
    </mu-list>
    <tkm-loading ref="loading"></tkm-loading>
    <tkm-message ref="message" :message="message"></tkm-message>
  </section>
</template>

<script>
import myPermission from 'service/my-permission'
import {talentsMixin, messageMinxin} from 'common/js/mixin'
export default{
  mixins: [talentsMixin, messageMinxin],
  created () {
    myPermission.get.bind(this)({}, (data) => {
      this.roles = data
    }, () => {
//      this.$message.error(err)
    })
  },
  data () {
    return {
      roles: [],
      open: false
    }
  }
}

</script>

<style scoped>
  #my-permission{
    width: 60%;
    margin: 10px auto;
    max-height: calc(100vh - 110px);
    overflow: auto;
    border: 1px solid rgba(0, 0, 0, 0.12);
  }

</style>
