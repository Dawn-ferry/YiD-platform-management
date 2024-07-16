/****
 *
 * 指令集合
 *
 */
import Vue from "vue"
// 全局注册指令
// 不允许输入特殊字符
Vue.directive("nsc", {
  bind: function (el, binding, vnode) {
    // 自定义正则表达式
    var regRule = /[ `~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g
    el.$handle = function () {
      let val = el.children[0].value
      if (val) {
        el.children[0].value = val.replace(regRule, " ")
      }
    }
    el.children[0].addEventListener("input", el.$handle)
  },
})

/**
 * 水印
 * text：水印文字
 * font：字体
 * textColor：文字颜色
 * width：宽度
 * height：高度
 * textRotate：偏转度 -90到0， 负数值，不包含-90
 */
Vue.directive("watermark", (el, binding) => {
  let text = binding.value.text
  let font = binding.value.font || "16px Microsoft JhengHei"
  let textColor = binding.value.textColor || "rgba(215, 215, 215, 0.2)"
  let width = binding.value.width || 400
  let height = binding.value.height || 200
  let textRotate = binding.value.textRotate || -20

  function addWaterMarker(parentNode) {
    var can = document.createElement("canvas")
    parentNode.appendChild(can)
    can.width = width
    can.height = height
    can.style.display = "none"
    var cans = can.getContext("2d")
    cans.rotate((textRotate * Math.PI) / 180)
    cans.font = font
    cans.fillStyle = textColor
    cans.textAlign = "left"
    cans.textBaseline = "Middle"
    cans.fillText(text, 0, can.height)
    parentNode.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")"
  }
  addWaterMarker(el)
})
