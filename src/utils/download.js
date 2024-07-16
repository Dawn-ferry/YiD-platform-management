// 封装导出
import { getToken } from "@/utils/auth"
import store from "@/store"
import axios from "axios"
let userInfo = store.getters.userInfo
export function downloadFn(data) {
  let { url, method, params } = data
  axios({
    url: url,
    method: method,
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Requesterid: userInfo.id,
      Operator: encodeURIComponent(userInfo.username),
    },
  })
    .then((res) => {
      // 处理后端返回的 Excel 文件流
      const blob = new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
      const url = window.URL.createObjectURL(blob)
      // 创建下载链接并触发下载
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `${params.name}.xlsx`)
      document.body.appendChild(link)
      link.click()
      // 释放 URL 对象 这步很重要
      window.URL.revokeObjectURL(url)
    })
    .catch((err) => {
      console.error("Error exporting to Excel:", err)
    })
}
