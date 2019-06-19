import request from '@/utils/request'

export function getRoutes() {
  // return request({
  //   url: '/routes',
  //   method: 'get'
  // })
  return request({
    url: '/miracle-api/admin-resource/roleResTree',
    method: 'post'
  })
}

export function getRoutes2() {
  // return request({
  //   url: '/routes',
  //   method: 'get'
  // })
  return request({
    url: '/miracle-api/admin-resource/resTree',
    method: 'post'
  })
}

export function getRoles(data) {
  // return request({
  //   url: '/roles',
  //   method: 'get'
  // })
  return request({
    url: '/miracle-api/systemRoles/list',
    method: 'post',
    data
  })
}

// 新增角色
export function addRole(data) {
  // return request({
  //   url: '/role',
  //   method: 'post',
  //   data
  // })
  return request({
    url: '/miracle-api/systemRoles/save',
    method: 'post',
    data
  })
}
// 更新角色
export function updateRole(data) {
  // return request({
  //   url: `/role/${id}`,
  //   method: 'put',
  //   data
  // })
  return request({
    url: '/miracle-api/systemRoles/update',
    method: 'post',
    data
  })
}
// 删除角色
export function deleteRole(data) {
  // return request({
  //   url: `/role/${id}`,
  //   method: 'delete'
  // })
  return request({
    url: '/miracle-api/systemRoles/del',
    method: 'post',
    data
  })
}

// 获取该角色选中的资源id
export function checkedResArr(data) {
  return request({
    url: '/miracle-api/systemRoles/checkedResArr',
    method: 'post',
    data
  })
}

// 角色下拉框
export function selectOptions(data) {
  return request({
    url: '/miracle-api/systemRoles/options',
    method: 'post',
    data
  })
}
