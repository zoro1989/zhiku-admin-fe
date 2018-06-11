/**
 * Created by zhulin on 2017/6/18.
 */
import httpHandler from 'http/http-handler'
import uris from 'router/uris'
function _normalizeCategories(list) {
  let ret = []
  list.map((row) => {
    ret.push({
      id: row.id,
      selected: false,
      isValid: false,
      sections: [
        {
          name: 'categoryValue',
          value: row.categoryValue || '--'
        },
        {
          name: 'categoryLabel',
          value: row.categoryLabel || '--'
        }
      ],
      operations: []
    })
    row.categoryItems.map((item) => {
      ret.push(
        {
          id: item.id,
          selected: false,
          isValid: true,
          columns: [
            {
              name: 'categoryValue',
              value: item.categoryValue || '--'
            },
            {
              name: 'categoryLabel',
              value: item.categoryLabel || '--'
            }
          ],
          operations: [
            {
              name: '编辑',
              action: 'editCategory',
              type: 'normal'
            },
            {
              name: '删除',
              action: 'deleteCategory',
              type: 'delete'
            },
            {
              name: '配置',
              action: 'settingCategory'
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
    formData.append('findContent', params.findContent)
    formData.append('pageNo', params.pageNo)
    function makeData (originalData) {
      let rows = _normalizeCategories(originalData.data.list)
      return {
        message: originalData.message,
        totalCount: originalData.data.total,
        rows: rows
      }
    }
    httpHandler.post.bind(this)(uris.category.index, formData, success, fail, makeData)
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
    httpHandler.post.bind(this)(uris.category.deleteCategoryById, formData, success, fail, makeData)
  },
  deleteOne (params, success, fail) {
    let formData = new FormData()
    formData.append('ids', params.row.id)
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.category.deleteCategoryById, formData, success, fail, makeData)
  },
  editCategory (params, success, fail) {
    function makeData (originalData) {
      return originalData.data
    }
    httpHandler.get.bind(this)(uris.category.selectCategoryById, {
      params: {id: params.row.id}
    }, success, fail, makeData)
  },
  getCategoryParents (params, success, fail) {
    function makeData (originalData) {
      return originalData.data
    }
    httpHandler.get.bind(this)(uris.category.selectCategoryParents, {
      params: {}
    }, success, fail, makeData)
  },
  save (params, success, fail) {
    let formData = new FormData()
    params.row['id'] && formData.append('id', params.row['id'])
    params.row['categoryValue'] && formData.append('categoryValue', params.row['categoryValue'])
    params.row['categoryLabel'] && formData.append('categoryLabel', params.row['categoryLabel'])
    params.row['sourceType'] && formData.append('sourceType', params.row['sourceType'])
    params.row['imgPath'] && formData.append('imgPath', params.row['imgPath'])
    params.row['parentId'] && formData.append('parentId', params.row['parentId'])
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.category.save, formData, success, fail, makeData)
  },
  uploadImage (params, success, fail) {
    let formData = new FormData()
    formData.append('image', params.image)
    formData.append('pointId', params.pointId)
    function makeData (originalData) {
      return originalData.data
    }
    httpHandler.post.bind(this)(uris.category.uploadImage, formData, success, fail, makeData)
  }
}
