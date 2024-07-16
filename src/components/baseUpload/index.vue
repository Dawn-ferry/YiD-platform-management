<template>
  <div class="yidu-upload">
    <el-upload id="itemUpload" class="itemUpload" ref="itemUpload" :action="action" :with-credentials="true" :on-success="handleSuccess" :on-error="handleError" :before-upload="beforeAvatarUpload" :show-file-list="false" :headers="{ Authorization: getToken, ContentType: 'UTF-8' }">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip" v-show="isTips">{{ tipsName }}</div>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth"
export default {
  name: "yiduUpload",
  props: {
    fileSize: {
      type: Number,
      default: 100,
    },
    fileType: {
      type: String,
      default: "",
    },
    // 是否显示tips
    isTips: {
      type: Boolean,
      default: true,
    },
    fileName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      screenloading: null,
      action: "/public/upload/",
      getToken: `Bearer ${getToken()}`,
      tipsName: "",
    }
  },
  mounted() {
    this.tipsName = this.fileName
  },
  methods: {
    handleSuccess(res, file, fileList) {
      if (res.success) {
        this.tipsName = res.data.filename
        this.$emit("getUrl", res.data.fileurl)
        this.$message.success("上传成功")
      } else {
        this.$message.error(res.message)
      }
      this.screenloading.close()
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < this.fileSize
      if (this.fileType === "image") {
        var isImage = /^image\/(jpeg|png|jpg|gif|bmp)$/.test(file.type)
        if (!isImage) {
          this.$message.error("上传文件只能是 JPG/PNG/GIF/BMP 格式!")
          return false
        }
      }
      if (this.fileType === "video") {
        const isVideo = file.type === "audio/mp4" || file.type === "video/mp4"
        if (!isVideo) {
          this.$message.error("上传文件只能是MP4视频格式!")
          return false
        }
      }

      this.screenloading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      })
      if (!isLt2M) {
        this.$message.error(`上传文件大小不能超过 ${this.fileSize}MB!`)
        this.screenloading.close()
      }
      return isLt2M
    },
    handleError(err, file, fileList) {
      this.$message.error("上传失败")
      this.screenloading.close()
    },
  },
}
</script>
