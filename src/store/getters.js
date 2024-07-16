const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  menu: (state) => state.user.menu, // 动态路由菜单
  name: (state) => state.user.name,
  userInfo: (state) => state.user.userInfo, //用户信息
  depList: (state) => state.user.depList, //部门列表
}
export default getters
