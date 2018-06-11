import errorMessage from './error-message'
import EventBus from 'utilities/event-bus'
import {ERR_OK, ERR_RE_LOGIN, ERR_FIRST, ERR_LOGIN_REFUSE, SUCCESS_URI, LOGIN_URI} from './config'
import {clearRoles, clearPermissions} from 'common/js/cache'
export default {
  success: function (success, fail, makeData, vm) {
    return (response) => {
      try {
        let data = typeof response.data === 'object' ? response.data : JSON.parse(response.data)
        if (data.code === ERR_OK) {
          success && success(makeData ? makeData(data) : data)
        } else if (data.code === ERR_RE_LOGIN) {
          EventBus.backUrl = vm.$route.path
          vm.$router.replace(LOGIN_URI)
          clearRoles()
          clearPermissions()
        } else if (data.code === ERR_FIRST) {
          vm.$router.replace(SUCCESS_URI)
        } else if (data.code === ERR_LOGIN_REFUSE) {
          vm.$router.replace(LOGIN_URI)
          clearRoles()
          clearPermissions()
        } else {
          console.log('fail')
          vm.showMsgBox && vm.showMsgBox(data.errorMessage || errorMessage[data.code] || '未定义错误消息' + data.code, data.code)
          fail && fail(data.errorMessage || errorMessage[data.code] || '未定义错误消息' + data.code, data.code)
        }
      } catch (e) {
        console.log('JSON解析异常')
        console.log(response)
        success && success(makeData ? makeData(response) : response)
        vm.$router.replace(LOGIN_URI)
      }
      vm.$refs.loading && vm.$refs.loading.hide()
    }
  },
  error: function (error, vm) {
    return (err) => {
      console.log(err)
      error && error(err)
      vm.$refs.loading && vm.$refs.loading.hide()
      vm.showMsgBox && vm.showMsgBox(vm.message)
    }
  }
}
