import Vue from "vue"
import VueI18n from "vue-i18n"
//引入自定义语言配置
import zh from "../i18n/langs/zh"
import en from "../i18n/langs/en"
//引入UI框架语言配置---elementui
import ElementLocale from "element-ui/lib/locale"
import enLocale from "element-ui/lib/locale/lang/en"
import zhLocale from "element-ui/lib/locale/lang/zh-CN"

ElementLocale.i18n((key, value) => i18n.t(key, value)) //实现element插件中的多语言切换
Vue.use(VueI18n) // 全局注册国际化包

// 准备翻译的语言环境信息
const i18n = new VueI18n({
  locale: localStorage.getItem("lang") || "zh", //将语言标识存入localStorage或sessionStorage中，页面刷新不会默认中文显示
  messages: {
    // 中文语言包
    zh: {
      ...zh,
      ...zhLocale,
    },
    //英文语言包
    en: {
      ...en,
      ...enLocale,
    },
  },
  silentTranslationWarn: true, //解决vue-i18n黄色警告"value of key 'xxx' is not a string"和"cannot translate the value of keypath 'xxx'.use the value of keypath as default",可忽略
  globalInjection: true, // 全局注入
  fallbackLocale: "zh", // 指定的locale没有找到对应的资源或当前语种不存在时，默认设置当前语种为中文
})

export default i18n
