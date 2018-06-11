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
    httpHandler.get.bind(this)(uris.info.selectInfoById, {
      params: {infoId: params.infoId}
    }, success, fail, makeData)
  },
  save (params, success, fail) {
    let formData = new FormData()
    params.row['id'] && formData.append('id', params.row['id'])
    params.row['parentId'] && formData.append('parentId', params.row['parentId'])
    params.row['categoryId'] && formData.append('categoryId', params.row['categoryId'])
    params.row['infoTitle'] && formData.append('infoTitle', params.row['infoTitle'])
    params.row['infoContent'] && formData.append('infoContent', params.row['infoContent'])
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.info.save, formData, success, fail, makeData)
  }
}
