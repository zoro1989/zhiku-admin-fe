/**
 * Created by Administrator on 2018/2/2.
 */
import TkmLoading from 'components/tkm-loading'
import TkmMessage from 'components/tkm-message'
export const talentsMixin = {
  components: {
    TkmLoading
  },
  mounted() {
    this.$refs.loading.show()
  },
  activated() {
    this.$refs.loading.show()
  }
}
export const messageMinxin = {
  components: {
    TkmMessage
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    showMsgBox(msg) {
      this.$nextTick(() => {
        if (msg) {
          this.message = msg
          this.$refs.message.show()
        }
      })
    }
  }
}
