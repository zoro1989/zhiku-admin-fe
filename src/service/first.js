import httpHandler from 'http/http-handler'
import uris from 'router/uris'
export default {
  get (params, success, fail) {
    function makeData (originalData) {
      return originalData.data
    }
    httpHandler.get.bind(this)(uris.welcome.userinfo, {}, success, fail, makeData)
  },
  logout (params, success, fail) {
    function makeData (originalData) {
      return originalData
    }
    httpHandler.get.bind(this)(uris.user.logout, {}, success, fail, makeData)
  }
}
