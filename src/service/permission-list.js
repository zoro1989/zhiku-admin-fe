/**
 * Created by zhulin on 2017/6/18.
 */
import httpHandler from 'http/http-handler'
import uris from 'router/uris'
export default {
  getList (params, success, fail) {
    let formData = new FormData()
    formData.append('findContent', params.findContent)
    formData.append('pageNo', params.pageNo)
    function makeData (originalData) {
      return {
        message: originalData.message,
        totalCount: originalData.data.total,
        rows: originalData.data.list.map((row) => {
          return {
            id: row.id,
            selected: false,
            columns: [
              {
                name: 'name',
                value: row.name || '--'
              },
              {
                name: 'url',
                value: row.url || '--'
              }
            ],
            operations: [
              {
                name: '删除',
                action: 'deletePermission',
                type: 'delete'
              }
            ]
          }
        })
      }
    }
    httpHandler.post.bind(this)(uris.permission.index, formData, success, fail, makeData)
  },
  delete (params, success, fail) {
    let formData = new FormData()
    params.tableData.rows.map((row) => {
      if (row.selected) {
        formData.append('ids', row.id)
      }
    })
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.permission.deletePermissionById, formData, success, fail, makeData)
  },
  deleteOne (params, success, fail) {
    let formData = new FormData()
    formData.append('ids', params.row.id)
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.permission.deletePermissionById, formData, success, fail, makeData)
  },
  addPermission (params, success, fail) {
    let formData = new FormData()
    for (let item in params.form) {
      formData.append(item, params.form[item])
    }
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.permission.addPermission, formData, success, fail, makeData)
  }
}
