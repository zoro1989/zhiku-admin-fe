/**
 * Created by zhulin on 2017/6/18.
 */
import httpHandler from 'http/http-handler'
import uris from 'router/uris'
export default {
  get (params, success, fail) {
    function makeData (originalData) {
      return originalData.data
    }
    httpHandler.get.bind(this)(uris.welcome.userinfo, {
      params: {}
    }, success, fail, makeData)
  },
  save (params, success, fail) {
    let formData = new FormData()
    for (let item in params.form) {
      formData.append(item, params.form[item])
    }
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.welcome.updateSelf, formData, success, fail, makeData)
  }
}
