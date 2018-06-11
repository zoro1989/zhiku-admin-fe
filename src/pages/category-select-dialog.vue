<template>
  <div class="category-select-dialog">
    <mu-text-field label="类别名" :value="selectedCategoryName" :disabled="true"></mu-text-field>
    <mu-raised-button label="选择所属类别"  @click="selectCategory" primary/>
    <tkm-dialog v-if="showFlag" ref="dialogForm" title="请选择项目" cancelLabel="取消" confirmLabel="确定">
      <tkm-table ref="table" :tableData="tableData"
                 :headers="headers"
                 :isdialog="isdialog"
                 :hasSearchBox="false"
                 @init-data="initData">
      </tkm-table>
    </tkm-dialog>
    <tkm-message ref="message" :message="message"></tkm-message>
  </div>
</template>
<script>
  import categoryList from 'service/category-list'
  import TkmDialog from 'components/tkm-dialog'
  import TkmTable from 'components/tkm-table'
  import {messageMinxin} from 'common/js/mixin'
  export default {
    mixins: [messageMinxin],
    props: {
      content: {
        type: Number,
        default: -1
      },
      name: {
        type: String,
        default: ''
      }
    },
    components: {
      TkmDialog,
      TkmTable
    },
    data() {
      return {
        showFlag: false,
        isdialog: true,
        tableData: [],
        selectedCategoryName: '',
        headers: [{name: '类别值'}, {name: '类别标签'}]
      }
    },
    created() {
      this.selectedCategoryName = this.name ? this.name : ''
    },
    methods: {
      selectCategory() {
        this.show()
      },
      initData (params, success, fail) {
        categoryList.getList.bind(this)({findContent: params.findContent, pageNo: params.pageNo}, (data) => {
          this.tableData = data
          success()
        }, (err) => {
          fail(err)
        })
      },
      show() {
        this.showFlag = true
        this.$nextTick(() => {
          this.$refs.dialogForm.openDialog(() => {
            let selectedTable = this.$refs.table.getDialogProjName()
            this.tableData.rows.map((row) => {
              if (row.id === selectedTable * 1) {
                let name = row.sections ? row.sections[1].value : row.columns[1].value
                this.selectedCategoryName = name
              }
            })
            this.$emit('update:content', selectedTable * 1)
            this.showFlag = false
          }, () => {
            this.showFlag = false
          })
        })
      }
    }
  }
</script>
<style scoped lang="stylus">
</style>
