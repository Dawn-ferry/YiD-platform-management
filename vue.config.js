const os = require("os")
const path = require("path")
const defaultSettings = require("./src/settings.js")
process.env.VUE_APP_DEV_IP = getIP()
function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || "管理系统" // page title
// 开发环境获取本地IP
function getIP() {
  const ifaces = os.networkInterfaces()
  let ip = ""
  for (const dev in ifaces) {
    ifaces[dev].forEach(function (details) {
      if (ip === "" && details.family === "IPv4" && !details.internal) {
        ip = details.address
        return
      }
    })
  }
  return ip || "127.0.0.1"
}
const port = process.env.port || process.env.npm_config_port || 8585 // dev port
module.exports = {
  // 打包的时候要改成 ./
  publicPath: process.env.NODE_ENV === "development" ? "/" : "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false, //关闭eslint检查
  // lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  // 代理配置
  devServer: {
    port: port,
    open: true,
    // host: process.env.VUE_APP_DEV_IP,
    https: false,
    hotOnly: false,
    proxy: {
      // 代理路径, 只要开发环境作用,产线环境需要使用NG
      "/api": {
        target: "http://10.44.60.199:3000",
        // target: "http://127.0.0.1:3000",
        ws: true,
        changeOrigin: true,
        // 重写路径
        pathRewrite: {
          "^/api": "/api",
        },
      },
      "/": {
        target: "http://10.44.60.199:3000",
        // target: "http://127.0.0.1:3000",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  // 路径简写
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  // svg图片的配置
  chainWebpack(config) {
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch")
    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end()
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end()
  },
}
