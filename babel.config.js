const prodPlugin = []
// 如果是生产环境，则自动清理日志，但保留error 与 warn
prodPlugin.push([
  "transform-remove-console",
  {
    exclude: ["error", "warn"],
  },
])

module.exports = {
  //解决 vue热加载编译速度慢问题
  presets: ["@vue/cli-plugin-babel/preset"],
  env: {
    development: {
      plugins: ["dynamic-import-node"],
    },
    production: {
      plugins: [...prodPlugin],
    },
  },
}
