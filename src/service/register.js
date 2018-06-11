import httpHandler from 'http/http-handler'
import uris from 'router/uris'
export default {
  submitRegister (params, success, fail) {
    let formData = new FormData()
    formData.append('vcode', params.form['vcode'])
    formData.append('nickname', params.form['nickname'])
    formData.append('email', params.form['username'])
    formData.append('pswd', params.form['password'])
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.user.subRegister, formData, success, fail, makeData)
  },
  changeVCode (params, success, fail) {
    function makeData (originalData) {
      return originalData
    }
    httpHandler.get.bind(this)(uris.common.getVCode, {}, success, fail, makeData)
  }
}
