import request from '@/utils/request'

export function pageListAppConfigInfo(data) {
  return request({
    url: '/miracle-api/appConfigInfo/pageList',
    method: 'post',
    data
  })
}

export function listAppConfigInfo(data) {
  return request({
    url: '/miracle-api/appConfigInfo/list',
    method: 'post',
    data
  })
}

export function detailAppConfigInfo(data) {
  return request({
    url: '/miracle-api/appConfigInfo/detail',
    method: 'post',
    data
  })
}

export function saveAppConfigInfo(data) {
  return request({
    url: '/miracle-api/appConfigInfo/save',
    method: 'post',
    data
  })
}

export function updateAppConfigInfo(data) {
  return request({
    url: '/miracle-api/appConfigInfo/update',
    method: 'post',
    data
  })
}

export function delAppConfigInfo(data) {
  return request({
    url: '/miracle-api/appConfigInfo/del',
    method: 'post',
    data
  })
}

export function selectOptions(data) {
  return request({
    url: '/miracle-api/appConfigInfo/options',
    method: 'post',
    data
  })
}

export function queryAppinfoByToken(data) {
  return request({
    url: '/miracle-api/appConfigInfo/queryAppinfoByToken',
    method: 'post',
    data
  })
}
