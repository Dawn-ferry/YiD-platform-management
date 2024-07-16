import request from "../utils/request"
//字典项
export function dictList(data) {
  return request({
    url: "/api/public/dict/item/list",
    method: "get",
    params: {
      data,
    },
  })
}
// 母字典
export function dictTop() {
  return request({
    url: "/api/public/dict/list",
    method: "get",
  })
}
//导出
export function exportFile(data) {
  return downloadFn({
    url: "/api/clockingRecord/files",
    method: "get",
    params: data,
  })
}
