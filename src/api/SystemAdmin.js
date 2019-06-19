import request from '@/utils/request'

export function pageListSystemAdmin(data) {
  return request({
    url: '/miracle-api/systemAdmin/pageList',
    method: 'post',
    data
  })
}

export function listSystemAdmin(data) {
  return request({
    url: '/miracle-api/systemAdmin/list',
    method: 'post',
    data
  })
}

export function detailSystemAdmin(data) {
  return request({
    url: '/miracle-api/systemAdmin/detail',
    method: 'post',
    data
  })
}

export function saveSystemAdmin(data) {
  return request({
    url: '/miracle-api/systemAdmin/save',
    method: 'post',
    data
  })
}

export function updateSystemAdmin(data) {
  return request({
    url: '/miracle-api/systemAdmin/update',
    method: 'post',
    data
  })
}

export function delSystemAdmin(data) {
  return request({
    url: '/miracle-api/systemAdmin/del',
    method: 'post',
    data
  })
}

