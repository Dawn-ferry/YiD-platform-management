import axios from "axios"
import { Message } from "element-ui"
import { getToken } from "@/utils/auth"
import store from "@/store"
// 封住统一axios 请求
const service = axios.create({
  baseURL: "/",
  timeout: 5000,
})
axios.defaults.headers.post["Content-Type"] = "application/json"
axios.defaults.headers.get["Content-Type"] = "application/json"
axios.defaults.withCredentials = true
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    let userInfo = store.getters.userInfo
    if (getToken() && store.getters.token) {
      config.headers["Authorization"] = `Bearer ${getToken()}`
      config.headers["Requesterid"] = userInfo.id
      config.headers["Operator"] = encodeURIComponent(userInfo.username)
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 100) {
      if (res.code === 500) {
        Message({
          message: "系统异常,请联系管理员" || res.message,
          type: "error",
          duration: 5 * 1000,
        })
      } else if (res.code === 2001) {
        Message({
          message: res.message || "Error",
          type: "error",
          duration: 5 * 1000,
        })
        store.dispatch("user/resetToken").then(() => {
          location.reload()
        })
      } else {
        return res
      }
    } else {
      return res
    }
  },
  (error) => {
    Message({
      message: "系统异常,联系下管理员",
      err: error.message,
      type: "error",
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  }
)

export default service
