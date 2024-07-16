import router from "./router"
import store from "./store"
import { Message } from "element-ui"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { getToken } from "@/utils/auth"
import getPageTitle from "@/utils/get-page-title"
NProgress.configure({ showSpinner: false })
// 不需要登录， 不需要重定向的页面,
const whiteList = ["/login"]
let flag = 0
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  if (to.matched.length === 0) {
    next({ path: "/404" })
    return
  }
  const hasToken = getToken()
  if (!!hasToken) {
    if (to.path === "/login") {
      next({ path: "/" })
      NProgress.done()
    } else {
      let hasGetUserInfo = await store.getters.menu
      if (hasGetUserInfo.length && flag) {
        next()
      } else {
        try {
          let res = await store.dispatch("user/getInfo")
          if (!res.success) {
            Message.error("权限错误请联系管理员:", res.message)
            next(`/login?redirect=${to.path}`)
            return
          }
          // 权限接口异常
          flag++
          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch("user/resetToken")
          Message.error(error || "Has Error")
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
