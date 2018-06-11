/**
 * Created by zhulin on 2017/6/18.
 */
import httpHandler from 'http/http-handler'
import uris from 'router/uris'
import timeFilter from 'utilities/timestamp-to-date-time'
function _normalizeInfos(list) {
  let ret = []
  list.map((row) => {
    ret.push({
      id: row.id,
      selected: false,
      isValid: false,
      sections: [
        {
          name: 'infoTitle',
          value: row.infoTitle || '--'
        },
        {
          name: 'updateTime',
          value: timeFilter(row.updateTime) || '--'
        },
        {
          name: 'createTime',
          value: timeFilter(row.createTime) || '--'
        }
      ],
      operations: [
        {
          name: '删除',
          action: 'deleteInfo',
          type: 'delete'
        },
        {
          name: '编辑',
          action: 'editInfo'
        }
      ]
    })
    row.infoItems.map((item) => {
      ret.push(
        {
          id: item.id,
          selected: false,
          isValid: true,
          columns: [
            {
              name: 'infoTitle',
              value: item.infoTitle || '--'
            },
            {
              name: 'updateTime',
              value: timeFilter(item.updateTime) || '--'
            },
            {
              name: 'createTime',
              value: timeFilter(item.createTime) || '--'
            }
          ],
          operations: [
            {
              name: '删除',
              action: 'deleteInfo',
              type: 'delete'
            },
            {
              name: '编辑',
              action: 'editInfo'
            }
          ]
        }
      )
    })
  })
  return ret
}
export default {
  getList (params, success, fail) {
    let formData = new FormData()
    formData.append('categoryId', params.categoryId)
    formData.append('findContent', params.findContent)
    formData.append('pageNo', params.pageNo)
    function makeData (originalData) {
      let rows = _normalizeInfos(originalData.data.list)
      return {
        message: originalData.message,
        totalCount: originalData.data.total,
        rows: rows
      }
    }
    httpHandler.post.bind(this)(uris.info.list, formData, success, fail, makeData)
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
    httpHandler.post.bind(this)(uris.info.deleteInfoById, formData, success, fail, makeData)
  },
  deleteOne (params, success, fail) {
    let formData = new FormData()
    formData.append('ids', params.row.id)
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.info.deleteInfoById, formData, success, fail, makeData)
  },
  getInfoParents (params, success, fail) {
    function makeData (originalData) {
      return originalData.data
    }
    httpHandler.get.bind(this)(uris.info.selectInfoParents, {
      params: {categoryId: params.categoryId}
    }, success, fail, makeData)
  }
}
