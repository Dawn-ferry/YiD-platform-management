<template>
  <div class="yidu-editor">
    <!-- 图片上传组件辅助-->
    <el-upload
      class="quill-upload"
      :action="action"
      :with-credentials="true"
      :show-file-list="false"
      :on-success="handleSuccess"
      :on-error="uploadError"
      :before-upload="beforeUpload"
    />
    <!--富文本编辑器组件-->
    <!-- 做个全局的loading 防止多次点击 -->
    <el-row v-loading="isShow">
      <quill-editor ref="quillEditorCom" v-model="detailContent" :options="editorOption" @change="onEditorChange($event)" />
    </el-row>
  </div>
</template>

<script>
import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css"
import "quill/dist/quill.bubble.css"
// VueQuillEditor
import { quillEditor } from "vue-quill-editor"
import { editorOption } from "./config"

export default {
  components: {
    quillEditor,
  },
  props: ["backData"],
  data() {
    return {
      detailContent: null, // 富文本内容
      isShow: false,
      imgUrl: "",
      action: process.env.NODE_ENV !== "development" ? `${process.env.VUE_APP_BASE_API1}/api/public/upload/image` : `/api/public/upload/image`,
      // 富文本编辑器配置
      editorOption: editorOption,
    }
  },
  mounted() {
    this.detailContent = this.backData ? this.backData : ""
  },

  methods: {
    onEditorChange(val) {
      this.$emit("getEditData", val.html)
    },
    beforeUpload() {
      this.isShow = true
    },
    handleSuccess(res, file) {
      // 获取富文本组件实例
      let quill = this.$refs.quillEditorCom.quill
      // 如果上传成功
      if (res.code === 1 && res.data.file_url) {
        // 获取光标所在位置
        let length = quill.getSelection().index
        //将图片插入文本
        quill.insertEmbed(length, "image", res.data.file_url)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error("图片插入失败")
      }
      this.isShow = false
    },
    uploadError() {
      this.isShow = false
      this.$message.error("图片插入失败")
    },
  },
}
</script>
<style lang="scss">
.yidu-editor {
  width: auto;
  height: 100%;
}
.ql-container {
  height: 130px;
}
.ql-snow .ql-editor img {
  max-width: 300px;
}

.ql-editor .ql-video {
  max-width: 300px;
}
</style>