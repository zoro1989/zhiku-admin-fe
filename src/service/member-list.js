/**
 * Created by zhulin on 2017/6/18.
 */
import httpHandler from 'http/http-handler'
import uris from 'router/uris'
import timeFilter from 'utilities/timestamp-to-date-time'
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
                name: 'nickname',
                value: row.nickname || '--'
              },
              {
                name: 'email',
                value: row.email || '--'
              },
              {
                name: 'status',
                value: row.status === 1 ? '有效' : '禁止'
              },
              {
                name: 'createTime',
                value: timeFilter(row.createTime) || '--'
              },
              {
                name: 'lastLoginTime',
                value: timeFilter(row.lastLoginTime) || '--'
              }
            ],
            operations: [
              {
                name: row.status === 1 ? '禁止' : '激活',
                action: 'forbidden',
                type: 'normal'
              },
              {
                name: '删除',
                action: 'deleteMember',
                type: 'delete'
              }
            ]
          }
        })
      }
    }
    httpHandler.post.bind(this)(uris.member.list, formData, success, fail, makeData)
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
    httpHandler.post.bind(this)(uris.member.deleteUserById, formData, success, fail, makeData)
  },
  deleteOne (params, success, fail) {
    let formData = new FormData()
    formData.append('ids', params.row.id)
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.member.deleteUserById, formData, success, fail, makeData)
  },
  forbidden (params, success, fail) {
    let formData = new FormData()
    formData.append('id', params.row.id)
    formData.append('status', params.row.columns[2].value === '有效' ? 0 : 1)
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.member.forbidUserById, formData, success, fail, makeData)
  }
}
