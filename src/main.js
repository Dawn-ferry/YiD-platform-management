import Vue from "vue"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "normalize.css/normalize.css"
import "@/styles/index.scss"
import VueParticles from "vue-particles"
import App from "./App"
import store from "./store"
import router from "./router"
import moment from "moment"
import "@/icons"
import "@/permission"
// import mixin from "@/mixins/globalMixin"
import "@/utils/directive"
import "./styles/element-variables.scss"
import i18n from "./i18n"
// import "./utils/debuggers"
;(function () {
  // 这个函数会不断地设置一个定时器
  // 定时器的回调函数中包含一个 debugger 语句
  // 当开发者工具打开时，这个 debugger 语句会触发一个断点
  // 由于定时器会不断地被设置，因此断点会不断地被触发
  function block() {
    setInterval(function () {
      debugger
    }, 50)
  }

  // 尝试执行 block 函数
  // 如果成功执行，将会导致无限 debugger
  try {
    block()
  } catch (err) {
    console.log("禁止调用网页失败")
    // 如果执行失败（例如，因为代码被格式化或转换），则不做任何事情
  }
})()

console.log("ss", process.env.NODE_ENV)
// 粒子效果插件
Vue.use(VueParticles)

Vue.use(ElementUI)
// Vue.use(ElementUI, {
//   i18n: (key, value) => i18n.t(key, value),
// })
// 全局mixin
// Vue.mixin(mixin)
// 挂载到vue 中
Vue.prototype.$formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD HH:mm:ss")
}
Vue.prototype.$hiddenButton = () => {
  let isadmin = JSON.parse(localStorage.getItem("store")).user.userInfo.isadmin
  return isadmin
}

// 全局禁止使用特殊字符
Vue.prototype.validForbid = function (value, number = 255) {
  value = value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, "").replace(/\s/g, "")
  if (value.length >= number) {
    this.$message({
      type: "warning",
      message: `输入内容不能超过${number}个字符`,
    })
  }
  return value
}
Vue.config.productionTip = false

// 创建和挂载根实例
// 后面都能使用this.$xxx
new Vue({
  el: "#app",
  router,
  store,
  i18n, // 将 i18n 实例注入到 Vue 实例中
  render: (h) => h(App),
})
