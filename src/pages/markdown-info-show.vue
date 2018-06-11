<template>
  <div class="markdown-info-show">
    <div id="viewerSection"></div>
    <tkm-loading ref="loading"></tkm-loading>
  </div>
</template>
<script>
  import zhikuEditorInfo from 'service/zhiku-editor-info'
  import TkmLoading from 'components/tkm-loading'
  import Editor from 'tui-editor'
//  import Viewer from 'tui-editor/dist/tui-editor-Viewer'
  // deps for editor
  require('codemirror/lib/codemirror.css') // codemirror
  require('tui-editor/dist/tui-editor.css') // editor ui
  require('tui-editor/dist/tui-editor-contents.css') // editor content
  require('highlight.js/styles/github.css') // code block highlight
  export default {
    components: {
      TkmLoading
    },
    data() {
      return {
        editor: null
      }
    },
    mounted() {
      this._initData()
    },
    methods: {
      _initData () {
        if (!this.$route.query.infoId || this.$route.query.infoId === '0') {
          return
        }
        this.$refs.loading.show()
        zhikuEditorInfo.get.bind(this)({infoId: this.$route.query.infoId}, (data) => {
          Editor.factory({
            el: document.querySelector('#viewerSection'),
            height: '600px',
            viewer: true,
            initialValue: data.infoContent
          })
        }, () => {
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .markdown-info-show
    color: rgba(0,0,0,0.6)
    background: #fff!important
    margin-left: 10px
</style>
