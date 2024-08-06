<template>
  <div class="model">
    <el-dialog title="通知" :visible="isDialog" @close="$emit('close')" width="30%" height="500px" center>
      <div class="infoContent">
        <div class="main">{{ msgInfo.content }}</div>
        <div class="bottom">
          <div class="time">
            <div>发布时间</div>
            <div>{{ $formatDate(msgInfo.release_time) }}</div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "model",
  props: ["msgInfo", "isDialog"],
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.model {
  ::v-deep .el-dialog {
    height: 40%;
    border: 1px solid red;
    position: relative;
  }
  .infoContent {
    margin: 0 auto;
    color: teal;
    font-size: 18px;
    line-height: 1.5;
    .main {
      font-weight: bold;
      font-size: 20px;
      line-height: 1.5;
    }
    .bottom {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
}
</style>
