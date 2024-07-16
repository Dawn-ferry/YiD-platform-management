import request from "../utils/request"
// 查询
export function searchDepartmentList(data) {
  return request({
    url: "/api/department/list",
    method: "post",
    data,
  })
}
