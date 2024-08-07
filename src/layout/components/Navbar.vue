<template>
  <div class="navbar">
    <!-- 伸缩 -->
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <!-- 通知 -->
      <div class="inform" @click="msgFn">
        <el-badge is-dot :hidden="ishidden">
          <i class="el-icon-message-solid"></i>
        </el-badge>
      </div>
      <!-- 语言 -->
      <div class="lang">
        <el-dropdown :hide-on-click="false" @command="changeLang">
          <svg-icon icon-class="lang" class="el-dropdown-link" style="font-size: 28px" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh" :disabled="isforbid">中文</el-dropdown-item>
            <el-dropdown-item command="en" :disabled="!isforbid">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 头像 -->
      <div class="avatar">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img src="../../assets/avatar.gif" class="user-avatar" />
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>Home</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="changePWD">
              <span style="display: block">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <Modal v-if="isShow" :title="title" :isShow="isShow" @close="isShow = false" />
    <Drawer v-if="isHide" :title="title" :isHide="isHide" @close="isHide = false" />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcrumb from "@/components/Breadcrumb"
import Hamburger from "@/components/Hamburger"
import Modal from "@/components/changePWD"
import Drawer from "@/components/drawer"
export default {
  data() {
    return {
      isforbid: true,
      isShow: false,
      title: "",
      ishidden: false,
      isHide: false,
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    Modal,
    Drawer,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    changeLang() {
      // 读取缓存
      this.isforbid = !this.isforbid
      let lang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "zh"
      if (lang === "zh") {
        this.$i18n.locale = "en"
        localStorage.setItem("lang", "en")
      } else {
        this.$i18n.locale = "zh"
        localStorage.setItem("lang", "zh")
      }
      location.replace(location) //刷新网页
    },
    msgFn() {
      this.ishidden = true
      this.isHide = true
    },
    changePWD() {
      this.isShow = true
      this.title = "用户修改"
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar")
    },
    async logout() {
      await this.$store.dispatch("user/logout")
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    // border: 1px solid blue;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 50px;
  }
  .inform {
    display: inline-block;
    font-size: 28px;
  }
  .lang {
    font-size: 28px;
    margin: 0 40px;
  }

  .avatar {
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
