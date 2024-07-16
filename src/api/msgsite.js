import request from "../utils/request"
// 信息通知站点
export function msgsiteList(data) {
  return request({
    url: "/api/msgsite/list",
    method: "post",
    data
  })
}
export function msgsiteAdd(data) {
  return request({
    url: "/api/msgsite/add",
    method: "post",
    data
  })
}
export function msgsiteUpdate(data) {
  return request({
    url: "/api/msgsite/update",
    method: "post",
    data
  })
}
export function msgsiteDelet(data) {
  return request({
    url: "/api/msgsite/delete",
    method: "get",
    params: data
  })
}