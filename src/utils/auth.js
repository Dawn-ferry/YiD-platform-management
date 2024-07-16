import Cookies from "js-cookie"
const TokenKey = "YiD_platform_token"
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function getToken() {
  return Cookies.get(TokenKey)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
