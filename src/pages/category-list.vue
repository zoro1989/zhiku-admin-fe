<template>
  <div id="category-list">
    <tkm-table :tableData="tableData"
               :headers="headers"
               :searchOperations="searchOperations"
               @init-data="initData"
               @search-operation="searchOperation"
               @rows-operation="rowsOperation">
    </tkm-table>
    <tkm-dialog ref="dialogForm" title="添加分类" cancelLabel="取消" confirmLabel="确定">
      <div class="search-item">
        <mu-text-field class="item" label="分类值" v-model="dialogForm.value" hintText="请输入分类值[字母 + 数字]" labelFloat></mu-text-field>
        <mu-text-field class="item" label="分类名" v-model="dialogForm.label" hintText="分类名" labelFloat></mu-text-field>
        <tkm-select class="item" :content.sync="dialogForm.categoryParent" label="选择所属分类" :notEmpty="notRequired">
          <mu-menu-item v-for="item in parents" :key="item.id + ''" :value="item.id + ''" :title="item.categoryLabel"/>
        </tkm-select>
      </div>
      <div>
        <tkm-select class="item" :content.sync="dialogForm.sourceType" label="选择所属分类" :notEmpty="notRequired">
          <mu-menu-item value="0" title="图片类"/>
          <mu-menu-item value="1" title="视频类"/>
        </tkm-select>
        <mu-raised-button label="上传资源" @click="addImage" backgroundColor="orange" />
      </div>
      <div>
        <img :src="uploadImgSrc"/>
      </div>
    </tkm-dialog>
    <tkm-dialog ref="dialog" title="警告" cancelLabel="取消" confirmLabel="确定">
      {{dialogMsg}}
    </tkm-dialog>
    <input ref="imgFile" type="file" style="display: none;" @change="onImageChange"/>
    <tkm-loading ref="loading"></tkm-loading>
    <tkm-message ref="message" :message="message"></tkm-message>
    <router-view></router-view>
  </div>
</template>

<script>
import categoryList from 'service/category-list'
import {messageMinxin} from 'common/js/mixin'
import TkmLoading from 'components/tkm-loading'
import TkmDialog from 'components/tkm-dialog'
import TkmTable from 'components/tkm-table'
import TkmSelect from 'components/tkm-select'
export default{
  mixins: [messageMinxin],
  components: {
    TkmDialog,
    TkmTable,
    TkmSelect,
    TkmLoading
  },
  data () {
    return {
      dialog: false,
      dialogMsg: '',
      dialogForm: {
        value: '',
        label: '',
        categoryParent: '',
        sourceType: '',
        categoryValid: true
      },
      tableData: [],
      searchOperations: [
        {
          name: '查询',
          action: 'onSubmit',
          type: 'normal'
        },
        {
          name: '增加分类',
          action: 'addCategory'
        },
        {
          name: '删除',
          action: 'deleteCategories',
          type: 'delete'
        }
      ],
      headers: [{name: '类别值'}, {name: '类别标签'}],
      parents: [],
      notRequired: false,
      uploadImgSrc: ''
    }
  },
  methods: {
    initData (params, success, fail) {
      categoryList.getList.bind(this)({findContent: params.findContent, pageNo: params.pageNo}, (data) => {
        this.tableData = data
        success()
      }, (err) => {
        fail(err)
      })
    },
    rowsOperation (action, row, success, fail) {
      if (action === 'deleteCategory') {
        this.dialogMsg = '确认要删除这个分类吗？'
        this.$refs.dialog.openDialog(() => {
          categoryList.deleteOne.bind(this)({row: row}, (data) => {
            success(data.message)
          }, (err) => {
            fail(err)
          })
        }, () => {
        })
      } else if (action === 'editCategory') {
        categoryList.editCategory.bind(this)({row: row, type: this.type}, (data) => {
          this.dialogForm.value = data.categoryValue
          this.dialogForm.label = data.categoryLabel
          this.dialogForm.sourceType = data.sourceType
          this.uploadImgSrc = data.imgPath
          this.dialogForm.categoryParent = data.parentId ? data.parentId + '' : ''
          this.dialogForm.categoryValid = row.isValid
          this.parents = data.categoryParents
          this.$refs.dialogForm.openDialog(() => {
            row.categoryValue = this.dialogForm.value
            row.categoryLabel = this.dialogForm.label
            row.sourceType = this.dialogForm.sourceType
            row.imgPath = this.uploadImgSrc
            row.parentId = this.dialogForm.categoryParent
            categoryList.save.bind(this)({row: row}, (data) => {
              success(data.message)
            }, (err) => {
              fail(err)
            })
          }, () => {
          })
        }, (err) => {
          fail(err)
        })
      } else if (action === 'settingCategory') {
        this.$router.push({
          path: `/category-list/${row.id}`
        })
      }
    },
    searchOperation (action, success, fail) {
      if (action === 'deleteCategories') {
        this.dialogMsg = '确认要删除这些类别吗？'
        this.$refs.dialog.openDialog(() => {
          categoryList.delete.bind(this)({tableData: this.tableData}, (data) => {
            success(data.message)
          }, (err) => {
            fail(err)
          })
        }, () => {
        })
      } else if (action === 'addCategory') {
        categoryList.getCategoryParents.bind(this)({type: this.type}, (data) => {
          this.parents = data
          this.dialogForm.categoryValue = ''
          this.dialogForm.categoryLabel = ''
          this.dialogForm.sourceType = ''
          this.dialogForm.categoryParent = ''
          this.uploadImgSrc = ''
          this.$refs.dialogForm.openDialog(() => {
            let newRow = {}
            newRow.categoryValue = this.dialogForm.value
            newRow.categoryLabel = this.dialogForm.label
            newRow.sourceType = this.dialogForm.sourceType
            newRow.imgPath = this.uploadImgSrc
            newRow.parentId = this.dialogForm.categoryParent
            categoryList.save.bind(this)({row: newRow}, (data) => {
              success(data.message)
            }, (err) => {
              fail(err)
            })
          }, () => {
          })
        }, (err) => {
          fail(err)
        })
      } else {
        success()
      }
    },
    addImage() {
      this.$refs.imgFile.click()
    },
    onImageChange(e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      let potentialFile = files[0]
      if (e.target.value) {
        e.target.value = ''
      }
//      if (!(/(?:jpg|gif|png|bmp)$/i.test(potentialFile.name))) {
//        this.showMsgBox('只允许上传jpg|gif|png|bmp格式的图片！')
//        return
//      }
//      let size = potentialFile.size / (1024 * 1024)
//      if (size > 10) {
//        this.showMsgBox('上传图片大小不能超过10M')
//        return
//      }
      this.$refs.loading.show()
      categoryList.uploadImage.bind(this)({image: potentialFile}, (data) => {
        this.uploadImgSrc = data
      }, (err) => {
        this.$message.error(err)
      })
    }
  }
}

</script>

<style scoped lang="stylus">
</style>
