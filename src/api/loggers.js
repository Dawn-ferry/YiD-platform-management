import request from "@/utils/request"
import { downloadFn } from "@/utils/download"
//日志列表
export function loggerList(data) {
  return request({
    url: "/api/logmanager",
    method: "get",
    params: data,
  })
}
// 日志文件导出
export function fileXLSX(data) {
  return downloadFn({
    url: "/api/fileXLSX",
    method: "get",
    params: data,
  })
}
