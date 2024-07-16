import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)
import Layout from "@/layout"
export const constantRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },
  {
    path: "*",
    component: () => import("@/views/404"),
  },
]

const createRouter = () =>
  new Router({
    // 产线使用history 模式
    mode: "hash",
    // mode: process.env.NODE_ENV === "development" ? "hash" : "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
