<template>
  <div class="dashboard-container">
    <vue-particles class="particles" color="#fff"></vue-particles>
    <div class="dashboard-text">欢迎{{ name }}使用Yi度管理系统</div>
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
    cursor: pointer;
  }
  &-text {
    position: absolute;
    left: 50%;
    top: 45%;
    width: 90%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 60px;
    font-weight: bold;
    color: #fff;
    // 文字无法选中
    -webkit-user-select: none; /*webkit浏览器*/
    -moz-user-select: none; /*火狐*/
    -ms-user-select: none; /*IE10*/
    user-select: none;
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
