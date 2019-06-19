import request from '@/utils/request'

export function pageListMarketHelpInfo(data) {
  return request({
    url: '/miracle-api/marketHelpInfo/pageList',
    method: 'post',
    data
  })
}

export function listMarketHelpInfo(data) {
  return request({
    url: '/miracle-api/marketHelpInfo/list',
    method: 'post',
    data
  })
}

export function detailMarketHelpInfo(data) {
  return request({
    url: '/miracle-api/marketHelpInfo/detail',
    method: 'post',
    data
  })
}

export function saveMarketHelpInfo(data) {
  return request({
    url: '/miracle-api/marketHelpInfo/save',
    method: 'post',
    data
  })
}

export function updateMarketHelpInfo(data) {
  return request({
    url: '/miracle-api/marketHelpInfo/update',
    method: 'post',
    data
  })
}

export function delMarketHelpInfo(data) {
  return request({
    url: '/miracle-api/marketHelpInfo/del',
    method: 'post',
    data
  })
}

export function selectOptionsMarketHelpInfo(data) {
  return request({
    url: '/miracle-api/marketHelpInfo/options',
    method: 'post',
    data
  })
}