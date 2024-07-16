import request from "../utils/request"
// 用户列表 分页
export function OmsUser(data) {
  return request({
    url: "/api/oms/userslist",
    method: "post",
    data,
  })
}
//添加用户
export function AddUser(data) {
  return request({
    url: "/api/oms/users/add",
    method: "post",
    data,
  })
}
// 更新用户
export function UpdateUser(data) {
  return request({
    url: "/api/oms/users/update",
    method: "post",
    data,
  })
}
// 删除用户
export function DeleteUser(data) {
  return request({
    url: "/api/oms/users/delete",
    method: "post",
    data,
  })
}

// 获取用户信息
export function GetUser(data) {
  return request({
    url: "/api/oms/users/get",
    method: "get",
    params: data,
  })
}
