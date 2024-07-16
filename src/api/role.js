import request from "../utils/request"
//角色列表
export function roleList(data) {
  return request({
    url: "/api/oms/rolelist",
    method: "post",
    data,
  })
}
// 增/编辑 角色
export function roleAdd(data) {
  return request({
    url: "/api/oms/roles/add",
    method: "post",
    data,
  })
}
export function roleEdit(data) {
  return request({
    url: "/api/oms/roles/update",
    method: "post",
    data,
  })
}
// 为角色添加权限
export function addRolePer(data) {
  return request({
    url: "/api/oms/roles/permission/add",
    method: "post",
    data,
  })
}
