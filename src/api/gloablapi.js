import request from '@/utils/request'

// 默认测试
export function defaultslash(data) {
  return request({
    url: '/miracle-api/',
    method: 'post',
    data
  })
}

// 登录
export function login(data) {
  return request({
    url: '/miracle-api/login/dologin',
    method: 'post',
    data
  })
}

// 获取对象
export function getInfo(token) {
  return request({
    url: '/miracle-api/login/info',
    method: 'get',
    params: { token }
  })
}

// 注销
export function logout() {
  return request({
    url: '/miracle-api/login/logout',
    method: 'post'
  })
}

// 获取菜单路由
export function roleResTree() {
  return request({
    url: '/miracle-api/admin-resource/roleResTree',
    method: 'post'
  })
}

// 注册
export function doregist(data) {
  return request({
    url: '/miracle-api/regist/doregist',
    method: 'post',
    data
  })
}
// 切换APP工作台
export function chooseApp(data) {
  return request({
    url: '/miracle-api/appConfigInfo/chooseApp',
    method: 'post',
    data
  })
}
