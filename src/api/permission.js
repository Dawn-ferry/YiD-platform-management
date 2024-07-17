import request from "../utils/request"
// 权限列表
export function permissionsList(data) {
  return request({
    url: "/api/oms/permissionlist",
    method: "post",
    data,
  })
}
// 权限信息
export function permissionsInfo(data) {
  return request({
    url: "/api/oms/permissions/get",
    method: "get",
    params: {
      ...data,
    },
  })
}
// 权限编辑
export function permissionsEdit(data) {
  return request({
    url: "/api/oms/permissions/update",
    method: "post",
    data,
  })
}
// 权限新增
export function permissionsAdd(data) {
  return request({
    url: "/api/oms/permissions/add",
    method: "post",
    data,
  })
}
