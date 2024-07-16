import request from "@/utils/request"
export function login(data) {
  return request({
    url: "/api/login",
    method: "post",
    data,
  })
}
export function permissionList(data) {
  return request({
    url: "/api/oms/permissionlist",
    method: "post",
    data,
  })
}

// 角色登录权限列表
export function loginPermissions(data) {
  return request({
    url: "/api/oms/loginpermissionlist",
    method: "post",
    data,
  })
}
// 个人密码修改
export function personChangePWD(data) {
  return request({
    url: "api/oms/users/changepwd",
    method: "post",
    data,
  })
}
