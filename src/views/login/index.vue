<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">Yi度管理系统</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" class="el-icon-user-solid" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="请输入用户名" class="custom-input" name="username" type="text" tabindex="1" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="请输入密码" class="custom-input" name="password" tabindex="2" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px" @click.native.prevent="doubleHandle(true)">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { throttle } from "@/utils/antiflutter-throttling"
export default {
  name: "Login",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        // validator: validateUsername
        username: [{ required: true, trigger: "blur", message: "请输入用户名" }],
        password: [{ required: true, trigger: "blur", validator: validatePassword }],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    }
  },
  watch: {
    $route: {
      // eslint-disable-next-line space-before-function-paren
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },

      immediate: true,
    },
  },
  created() {
    this.doubleHandle = throttle(this.handleLogin, 1000)
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = ""
      } else {
        this.passwordType = "password"
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(async () => {
              this.loading = false
              await this.$store.dispatch("user/departmentList")
              await this.$store.dispatch("user/siteList")
              this.$router.push({ path: this.redirect || "/" })
            })
            .catch((err) => {
              this.$message.error(err.message)
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input::placeholder {
      color: $cursor; /* 将placeholder文字颜色改为红色 */
      font-style: italic; /* 可选：将placeholder文字样式改为斜体 */
    }

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  background: url("../../assets/logo.png") center no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    position: relative;
    width: 500px;
    max-width: 100%;
    // display: flex;
    // padding: 160px 35px 0;
    // margin: 0 auto;
    overflow: hidden;
    /* 设置半透明背景色 */
    background-color: rgba(255, 255, 255, 0.3);
    /* 应用背景模糊效果 */
    backdrop-filter: blur(10px);
    /* 兼容老版本Safari浏览器 */
    -webkit-backdrop-filter: blur(10px);
    /* 其他样式 */
    border-radius: 10px; /* 可选：添加圆角 */
    padding: 20px 50px; /* 可选：添加内边距 */
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
