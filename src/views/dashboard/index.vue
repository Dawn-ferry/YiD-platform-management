<template>
  <div class="dashboard-container">
    <vue-particles class="particles" color="#fff"></vue-particles>
    <div class="dashboard-text">欢迎【{{ name }}】使用EHR管理系统</div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      name: this.$store.getters.userInfo.username,
    }
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    background: #409eff;
    width: 100%;
    height: calc(100vh - 50px);
  }
  &-text {
    position: absolute;
    left: 50%;
    top: 45%;
    width: 90%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 66px;
    color: #fff;
  }
  .particles {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
