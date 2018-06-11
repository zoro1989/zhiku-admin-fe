import httpHandler from 'http/http-handler'
import uris from 'router/uris'
export default {
  submitLogin (params, success, fail) {
    let formData = new FormData()
    for (let item in params.form) {
      formData.append(item, params.form[item])
    }
    function makeData (originalData) {
      let permissions = []
      let roles = []
      originalData.data.map((role) => {
        roles.push(role.type)
        role.permissions.map((permission) => {
          permissions.push(permission.url)
        })
      })
      return {
        permissions: permissions,
        roles: roles
      }
    }
    httpHandler.post.bind(this)(uris.user.submitLogin, formData, success, fail, makeData)
  }
}
