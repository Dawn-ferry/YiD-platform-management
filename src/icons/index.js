import Vue from "vue"
import SvgIcon from "@/components/SvgIcon" // svg component
// register globally
Vue.component("svg-icon", SvgIcon)
// vue项目中 使用require.context()实现前端工程化引入文件
// 是 Webpack 提供的一个高级 API
// 当前目录（./svg）中查找所有以 .svg 结尾的文件
const req = require.context("./svg", false, /\.svg$/)
const requireAll = (requireContext) => {
  // 文件夹的路径
  return requireContext.keys().map(requireContext)
}
requireAll(req)
