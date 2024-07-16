import { login, loginPermissions } from "@/api/user"
import { searchDepartmentList } from "@/api/departmentList"
import { msgsiteList } from "@/api/msgsite"
import { getToken, setToken, removeToken } from "@/utils/auth"
import router, { resetRouter } from "@/router"
import generator from "@/router/asyncRoutes"
import { asyncRoutes } from "@/router/asyncRoutes"
function storeLocalStore(state) {
  // 当页面关闭或浏览器标签页/窗口被关闭时，数据将被清除
  window.localStorage.setItem("store", JSON.stringify(state))
}
const getDefaultState = () => {
  return {
    token: getToken(),
    requesterid: "",
    userInfo: [],
    menu: JSON.parse(localStorage.getItem("menu")) || [],
    depList: [],
    siteList: [],
  }
}
// 判断权限
const jurisdiction = (arr, roleList) => {
  let res = []
  roleList.map((item) => {
    arr.forEach((v) => {
      if (v.meta && v.meta.role && item.meta.role.indexOf(v.meta.role) > -1) {
        if (v.children && v.children.length && item.meta.role == v.meta.role) {
          v.children = jurisdiction(v.children, item.children)
        }
        res.push(v)
      }
    })
  })
  return res
}

let state = getDefaultState()
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
    // 移除store
    localStorage.clear()
  },
  SET_TOKEN: (state, { token }) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_DEPINFO: (state, payload) => {
    state.depList = payload
    storeLocalStore({ user: state })
  },
  SET_SITINFO: (state, payload) => {
    state.siteList = payload
    storeLocalStore({ user: state })
  },
}

const actions = {
  // 站点列表
  async siteList({ commit, state }) {
    let obj = { pageindex: 1, pagesize: 100 }
    let res = await msgsiteList(obj)
    if (res && res.success) {
      commit("SET_SITINFO", res.data.list)
    }
  },
  // 部门列表
  async departmentList({ commit, state }) {
    let res = await searchDepartmentList()
    if (res && res.success) {
      commit("SET_DEPINFO", res.data.list)
    }
  },
  // 登录
  login({ commit, state }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          if (response && response.success) {
            const { data } = response
            // 登录成功后设置 存储token
            commit("SET_TOKEN", { token: data.token })
            // // 设置用户信息
            commit("SET_USERINFO", { id: data.id, roleid: data.roleid, username: data.realname, isadmin: data.isadmin, account: data.username, departmentids: data.departmentids })
            setToken(data.token)
            resolve(response)
          } else {
            // 登不进情况
            reject(response)
          }
        })
        .catch((error) => {
          //抓取错误接口错误等
          reject(error)
        })
    })
  },

  // 获取用户信息,获取相关权限
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      let data = {
        roleid: state.userInfo.roleid,
        operation_sort: "operation_login",
      }
      loginPermissions(data)
        .then(async (response) => {
          if (!response.success) {
            removeToken()
            resolve(response)
            return
          }
          const { data } = response
          let permissionList = data.list || []
          const generatorRouter = generator(permissionList)
          // 本地权限路由表
          let allrouter = asyncRoutes
          let allrouter2 = jurisdiction(allrouter, generatorRouter)
          if (!state.menu.length) {
            router.addRoutes([...allrouter2, { path: "*", redirect: "/index" }])
            state.menu = [...allrouter2]
          } else {
            router.addRoutes([...allrouter2, { path: "*", redirect: "/index" }])
            state.menu = [...allrouter2]
          }
          localStorage.setItem("menu", JSON.stringify(allrouter2))
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // 用户登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter() //重置路由
      commit("RESET_STATE")
      window.location.reload()
      resolve()
    })
  },

  // token 移除
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken()
      commit("RESET_STATE")
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
