import request from '@/utils/request'

export function pageListMarketNewsInfo(data) {
  return request({
    url: '/miracle-api/marketNewsInfo/pageList',
    method: 'post',
    data
  })
}

export function listMarketNewsInfo(data) {
  return request({
    url: '/miracle-api/marketNewsInfo/list',
    method: 'post',
    data
  })
}

export function detailMarketNewsInfo(data) {
  return request({
    url: '/miracle-api/marketNewsInfo/detail',
    method: 'post',
    data
  })
}

export function saveMarketNewsInfo(data) {
  return request({
    url: '/miracle-api/marketNewsInfo/save',
    method: 'post',
    data
  })
}

export function updateMarketNewsInfo(data) {
  return request({
    url: '/miracle-api/marketNewsInfo/update',
    method: 'post',
    data
  })
}

export function delMarketNewsInfo(data) {
  return request({
    url: '/miracle-api/marketNewsInfo/del',
    method: 'post',
    data
  })
}

export function selectOptionsMarketNewsInfo(data) {
  return request({
    url: '/miracle-api/marketNewsInfo/options',
    method: 'post',
    data
  })
}