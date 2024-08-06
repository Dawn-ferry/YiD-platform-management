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
// 粒子效果插件
Vue.use(VueParticles)

Vue.use(ElementUI)
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

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
})
