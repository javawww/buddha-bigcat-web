import request from '@/utils/request'

export function pageListAppShareInfo(data) {
  return request({
    url: '/miracle-api/appShareInfo/pageList',
    method: 'post',
    data
  })
}


export function pageListAppShareInfoAudit(data) {
  return request({
    url: '/miracle-api/appShareInfo/pageListAudit',
    method: 'post',
    data
  })
}

export function listAppShareInfo(data) {
  return request({
    url: '/miracle-api/appShareInfo/list',
    method: 'post',
    data
  })
}

export function detailAppShareInfo(data) {
  return request({
    url: '/miracle-api/appShareInfo/detail',
    method: 'post',
    data
  })
}

export function saveAppShareInfo(data) {
  return request({
    url: '/miracle-api/appShareInfo/save',
    method: 'post',
    data
  })
}

export function updateAppShareInfo(data) {
  return request({
    url: '/miracle-api/appShareInfo/update',
    method: 'post',
    data
  })
}

export function delAppShareInfo(data) {
  return request({
    url: '/miracle-api/appShareInfo/del',
    method: 'post',
    data
  })
}

export function passAppShareInfo(data) {
  return request({
    url: '/miracle-api/appShareInfo/pass',
    method: 'post',
    data
  })
}

export function selectOptionsAppShareInfo(data) {
  return request({
    url: '/miracle-api/appShareInfo/options',
    method: 'post',
    data
  })
}
