import axios from 'axios'
import responseHandler from 'http/response-handler'
export default {
  get (url, params, success, fail, makeData) {
    // this.$refs.loading.show()
    axios.get(url, params).then(
      responseHandler.success(success, fail, makeData, this)
    ).catch(
      responseHandler.error(fail, this)
    )
  },
  post (url, params, success, fail, makeData) {
    // this.$refs.loading.show()
    axios.post(url, params).then(
      responseHandler.success(success, fail, makeData, this)
    ).catch(
      responseHandler.error(fail, this)
    )
  },
  postJSON (url, params, success, fail, makeData) {
    // this.$refs.loading.show()
    axios.post(url, JSON.stringify(params), {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(
      responseHandler.success(success, fail, makeData, this)
    ).catch(
      responseHandler.error(fail, this)
    )
  }
}
