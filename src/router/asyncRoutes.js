import { repStr } from "@/utils/index"
import Layout from "@/layout"
const generator = (routerMap) => {
  return routerMap.map((item) => {
    const currentRouter = {
      path: item.parent_id ? `${repStr(item.per_code)}` : `/${repStr(item.per_code)}`,
      name: item.per_name,
      hidden: item.status ? false : true,
      meta: { title: item.per_name, role: item.per_code },
    }
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      currentRouter.children = generator(item.children)
    }
    return currentRouter
  })
}
// ============================================================================================//

// 注意配置父节点数据 要与后端保持一致
//  动态路由
export const asyncRoutes = [
  {
    path: "/dynamicroute",
    name: "dynamicroute",
    component: Layout,
    meta: { title: "动态管理", role: "oms_dynamic" },
    children: [
      {
        path: "/one",
        name: "one",
        component: () => import("@/views/dynamicwroute/index.vue"),
        meta: { title: "一级菜单", role: "dynamic_one" },
      },
    ],
  },
  // 系统管理
  {
    path: "/omsmanage",
    name: "omsmanage",
    component: Layout,
    meta: { title: "系统管理", role: "oms_manage" },
    children: [
      {
        path: "/userinfo",
        name: "userinfo",
        component: () => import("@/views/setting/manageuser"),
        meta: { title: "用户管理", role: "manage_user" },
      },
      {
        path: "/roleinfo",
        name: "roleinfo",
        component: () => import("@/views/setting/managerole"),
        meta: { title: "角色管理", role: "manage_role" },
      },
      {
        path: "/permissionsinfo",
        name: "permissionsinfo",
        component: () => import("@/views/setting/managepermissions"),
        meta: { title: "基础权限管理", role: "manage_permissions" },
      },
      {
        path: "/managelogger",
        name: "managelogger",
        component: () => import("@/views/setting/loggers"),
        meta: { title: "日志管理", role: "manage_loggers" },
      },
      {
        path: "/notificationStationManage",
        name: "notificationStationManage",
        component: () => import("@/views/setting/notificationStationManage"),
        meta: { title: "信息通知站点", role: "info_notification_site" },
      },
    ],
  },
]

export default generator
