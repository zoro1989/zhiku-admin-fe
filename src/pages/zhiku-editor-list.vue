<template>
  <div class="zhiku-editor-list">
    <div>
      当前编辑的模块类别：{{categoryName}}
    </div>
    <tkm-table :tableData="tableData"
               :headers="headers"
               :searchOperations="searchOperations"
               @init-data="initData"
               @search-operation="searchOperation"
               @rows-operation="rowsOperation">
    </tkm-table>
    <tkm-dialog ref="dialog" title="警告" cancelLabel="取消" confirmLabel="确定">
      {{dialogMsg}}
    </tkm-dialog>
    <tkm-dialog ref="editorDialog" title="警告" cancelLabel="取消" confirmLabel="确定" @alreadyShow="alreadyShow">
      <div class="zhiku-editor-info">
        <mu-text-field label="信息标题" v-model="infoTitle" labelFloat hintText="请输入标题"></mu-text-field>
        <tkm-select class="item" :content.sync="infoParent" label="选择所属信息类别" :notEmpty="notRequired">
          <mu-menu-item v-for="item in parents" :key="item.id + ''" :value="item.id + ''" :title="item.infoTitle"/>
        </tkm-select>
        <category-select-dialog v-if="showSelectCategory" :content.sync="selectedCategoryId" ></category-select-dialog>
        <div id="editSection"></div>
      </div>
    </tkm-dialog>
  </div>
</template>
<script>
  import zhikuEditorList from 'service/zhiku-editor-list'
  import zhikuEditorInfo from 'service/zhiku-editor-info'
  import categoryList from 'service/category-list'
  import TkmDialog from 'components/tkm-dialog'
  import TkmTable from 'components/tkm-table'
  import TkmSelect from 'components/tkm-select'
  import CategorySelectDialog from './category-select-dialog'

  import Editor from 'tui-editor'
  // deps for editor
  require('codemirror/lib/codemirror.css') // codemirror
  require('tui-editor/dist/tui-editor.css') // editor ui
  require('tui-editor/dist/tui-editor-contents.css') // editor content
  require('highlight.js/styles/github.css') // code block highlight
  //  import Viewer from 'tui-editor/dist/tui-editor-Viewer'

  export default{
    components: {
      TkmDialog,
      TkmTable,
      TkmSelect,
      CategorySelectDialog
    },
    data () {
      return {
        editor: null,
        dialog: false,
        dialogMsg: '',
        tableData: [],
        searchOperations: [
          {
            name: '查询',
            action: 'onSubmit',
            type: 'normal'
          },
          {
            name: '删除',
            action: 'deleteInfos',
            type: 'delete'
          },
          {
            name: '添加',
            action: 'addInfo'
          }
        ],
        headers: [{name: '编号'}, {name: '标题'}, {name: '修改时间'}, {name: '创建时间'}],
        categoryName: '',
        infoId: '',
        infoTitle: '',
        infoContent: '',
        infoParent: '',
        parents: [],
        notRequired: false,
        selectedCategoryId: -1,
        showSelectCategory: false
      }
    },
    methods: {
      initData (params, success, fail) {
        if (!this.$route.params.categoryId || this.$route.params.categoryId === '0') {
          return
        }
        zhikuEditorList.getList.bind(this)({categoryId: this.$route.params.categoryId || '', findContent: params.findContent, pageNo: params.pageNo}, (data) => {
          this.tableData = data
          success()
        }, (err) => {
          fail(err)
        })
        categoryList.editCategory.bind(this)({row: {id: this.$route.params.categoryId || ''}}, (data) => {
          this.categoryName = data.categoryLabel
        }, (err) => {
          fail(err)
        })
      },
      rowsOperation (action, row, success, fail) {
        if (action === 'deleteInfo') {
          this.dialogMsg = '确认要删除这条数据吗？'
          this.$refs.dialog.openDialog(() => {
            zhikuEditorList.deleteOne.bind(this)({row: row}, (data) => {
              success(data.message)
            }, (err) => {
              fail(err)
            })
          }, () => {
          })
        }
        if (action === 'editInfo') {
          zhikuEditorInfo.get.bind(this)({infoId: row.id}, (data) => {
            this.infoTitle = data.infoTitle
            this.infoContent = data.infoContent
            this.infoParent = data.parentId ? data.parentId + '' : ''
            this.parents = data.infoParents
            if (!row.isValid) {
              this.showSelectCategory = true
            }
            this.$refs.editorDialog.openDialog(() => {
              row.infoTitle = this.infoTitle
              row.infoContent = this.editor.getValue()
              row.parentId = this.infoParent
              row.categoryId = this.selectedCategoryId > 0 ? this.selectedCategoryId : (this.$route.params.categoryId || '')
              this.showSelectCategory = false
              zhikuEditorInfo.save.bind(this)({row: row}, (data) => {
                success(data.message)
              }, (err) => {
                fail(err)
              })
            }, () => {
              this.showSelectCategory = false
            })
          }, (err) => {
            fail(err)
          })
        }
      },
      searchOperation (action, success, fail) {
        if (action === 'deleteInfos') {
          this.dialogMsg = '确认要删除这些数据吗？'
          this.$refs.dialog.openDialog(() => {
            zhikuEditorList.delete.bind(this)({tableData: this.tableData}, (data) => {
              success(data.message)
            }, (err) => {
              fail(err)
            })
          }, () => {
          })
        } else if (action === 'addInfo') {
          zhikuEditorList.getInfoParents.bind(this)({categoryId: this.$route.params.categoryId || ''}, (data) => {
            this.parents = data
            this.infoTitle = ''
            this.infoContent = ''
            this.infoParent = ''
            this.$refs.editorDialog.openDialog(() => {
              let newRow = {}
              newRow.infoTitle = this.infoTitle
              newRow.infoContent = this.editor.getValue()
              newRow.parentId = this.infoParent
              newRow.categoryId = this.selectedCategoryId > 0 ? this.selectedCategoryId : (this.$route.params.categoryId || '')
              zhikuEditorInfo.save.bind(this)({row: newRow}, (data) => {
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
      alreadyShow() {
        setTimeout(() => {
          this.editor = new Editor({
            el: document.querySelector('#editSection'),
            initialEditType: 'wysiwyg',
            previewStyle: 'tab',
            height: '600px',
            initialValue: this.infoContent
          })
        }, 20)
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  .zhiku-editor-list
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: $color-background
  #editSection
    background: #fff
</style>
