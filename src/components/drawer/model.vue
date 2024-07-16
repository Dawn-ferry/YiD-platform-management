<template>
  <div class="model">
    <el-dialog title="通知" :visible="isDialog" @close="$emit('close')" width="30%" center>
      <span style="line-height: 20px;">{{msgInfo.content}}</span>
      <div style="position: absolute;right: 20px;bottom:60px;text-align: center;line-height: 20px;">
        <div>发布时间</div>
        <div>{{ $formatDate(msgInfo.release_time) }}</div>
      </div>
      <div style="height: 100px;"></div>
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
<style scoped>
.model {
  height: 400px;
}
</style>
