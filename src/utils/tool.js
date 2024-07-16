//二维数组的部门id
import store from "@/store/index"
let userInfo = store.getters.userInfo
let depList = store.getters.depList
// 所有部门数据
let departmentsArr = depList ? depList : []
// 个人部门id 转化字符串形式
let departmentid = userInfo ? userInfo.departmentids : ""
departmentid = JSON.parse(departmentid).toString()
// 个人部门id 转数组 并去重
let depToArr = departmentid ? departmentid.split(",") : departmentid
depToArr = Array.from(new Set(depToArr))
function findNodeById(tree, ids) {
  if (!tree.length) {
    return null
  }
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.id == ids) {
      return { departmentName: node.departmentName, id: node.id }
    }
    if (node.children && node.children.length > 0) {
      const found = findNodeById(node.children, ids)
      if (found) {
        return found
      }
    }
  }
  return null
}
// 结构性转变返回id,name
let depToIdToName = []
depToArr.forEach((element) => {
  if (Number(element.toString()) < 20) {
    let obj = findNodeById(departmentsArr, Number(element.toString()))
    depToIdToName.push(obj)
  }
})

export const departmentsList = depToIdToName

// 通过id 找部门名称
export function foundNode(path) {
  let tree = departmentsArr
  const result = findNodeByPath(tree, path)
  if (result) {
    return result
  } else {
    return path
  }
}
//
function findNodeByPath(tree, path) {
  const parts = path.split(",")
  function traverse(node, index = 0) {
    if (index === parts.length) {
      return null
    }
    if (node.id === parseInt(parts[index], 10)) {
      if (node.children && index < parts.length - 1) {
        return node.children.find((child) => traverse(child, index + 1))
      }
      return node
    }
    return null
  }
  for (let i = 0; i < tree.length; i++) {
    const result = traverse(tree[i], 0)
    if (result) {
      return result
    }
  }
  return null
}
