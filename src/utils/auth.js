import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 会员ID
const TokenMemberIdKey = 'MemberId-Token'

export function setTokenMemberId(token) {
  return Cookies.set(TokenMemberIdKey, token)
}

export function getTokenMemberId() {
  return Cookies.get(TokenMemberIdKey)
}

// APP工作台TOKEN

const TokenAppKey = 'App-Token'

export function getTokenApp() {
  return Cookies.get(TokenAppKey)
}

export function setTokenApp(token) {
  return Cookies.set(TokenAppKey, token)
}

export function removeTokenApp() {
  return Cookies.remove(TokenAppKey)
}
