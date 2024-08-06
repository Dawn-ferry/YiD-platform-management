<template>
  <div class="drawerbox">
    <el-drawer title="信息通知站" show-close withHeader :before-close="handleClose" :visible="isHide" center @close="$emit('close')" :with-header="false" custom-class="content">
      <div class="info">
        <div class="info-item" v-for="(item, index) in siteArr" :key="index" @click="infoFn(item)">
          <span>{{ index + 1 }}: {{ item.content }}</span>
        </div>
      </div>
    </el-drawer>
    <Modal v-if="isDialog" :msgInfo="msgInfo" :isDialog="isDialog" @close="isDialog = false" />
  </div>
</template>
<script>
import Modal from "./model.vue"
export default {
  name: "drawer",
  props: ["isHide"],
  components: {
    Modal,
  },
  data() {
    return {
      isDialog: false,
      msgInfo: "",
      siteArr: this.$store.state.user.siteList,
    }
  },
  methods: {
    infoFn(val) {
      this.isDialog = true
      this.msgInfo = val
    },
    handleClose() {
      this.$emit("close")
    },
  },
}
</script>

<style lang="scss" scoped>
.drawerbox {
  background: #f4f5f5;
  width: 100px;
  height: 100%;
  // 样式穿透
  ::v-deep .el-drawer {
    background: #f4f5f5;
  }

  .content {
    overflow-x: hidden; /* 隐藏横向滚动条 */
    overflow-y: scroll; /* 开启纵向滚动条 */
    text-align: center;
  }
  .info {
    width: 90%; /* 设置容器的宽度 */
    margin: 0 auto;
    .info-item {
      background: #fff;
      width: 100%;
      margin: 2px auto;
      height: 80px;
      font-weight: bold;
      line-height: 80px;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #303133;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      display: inline-block;
      padding: 0 20px;
      overflow: hidden;
      cursor: pointer;
    }
  }
}
</style>
