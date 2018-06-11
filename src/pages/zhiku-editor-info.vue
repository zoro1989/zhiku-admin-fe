<template>
  <div class="zhiku-editor-info">
    <mu-text-field label="信息标题" v-model="infoTitle" labelFloat hintText="请输入标题"></mu-text-field>
    <div id="editSection"></div>
    <section class="button-group">
      <mu-raised-button label="取消修改"  @click="onCancel" secondary/>
      <mu-raised-button label="确认修改"  @click="onSubmit" primary/>
    </section>
  </div>
</template>

<script>
  import zhikuEditorInfo from 'service/zhiku-editor-info'
  import Editor from 'tui-editor'
  // deps for editor
  require('codemirror/lib/codemirror.css') // codemirror
  require('tui-editor/dist/tui-editor.css') // editor ui
  require('tui-editor/dist/tui-editor-contents.css') // editor content
  require('highlight.js/styles/github.css') // code block highlight
  //  import Viewer from 'tui-editor/dist/tui-editor-Viewer'
  export default{
    created () {
      this._initData()
    },
    data () {
      return {
        infoId: '',
        infoTitle: '',
        infoContent: ''
      }
    },
    mounted () {
      this.editor = new Editor({
        el: document.querySelector('#editSection'),
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        height: '300px',
        initialValue: this.infoContent
      })
//      new Viewer({
//        el: document.querySelector('#viewerSection'),
//        height: '500px',
//        initialValue: this.content
//      })
    },
    methods: {
      _initData () {
        if (!this.$route.params.infoId || this.$route.params.infoId === '0') {
          return
        }
        zhikuEditorInfo.get.bind(this)({infoId: this.$route.params.infoId || ''}, (data) => {
          this.infoContent = data.infoContent
          setTimeout(() => {
            this.editor && this.editor.setValue(this.infoContent)
          }, 20)
        }, (err) => {
          this.$message.error(err)
        })
      },
      onCancel () {
        this.$router.go(-1)
      },
      onSubmit () {
        zhikuEditorInfo.save.bind(this)({id: this.infoId, infoTitle: this.infoTitle, infoContent: this.editor.getValue()}, (data) => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }, (err) => {
          this.$message.error(err)
        })
      }
    }
  }

</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  .zhiku-editor-info
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: $color-background
    #editSection
      background: #fff
</style>
