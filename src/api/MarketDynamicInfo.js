import request from '@/utils/request'

export function pageListMarketDynamicInfo(data) {
  return request({
    url: '/miracle-api/marketDynamicInfo/pageList',
    method: 'post',
    data
  })
}

export function listMarketDynamicInfo(data) {
  return request({
    url: '/miracle-api/marketDynamicInfo/list',
    method: 'post',
    data
  })
}

export function detailMarketDynamicInfo(data) {
  return request({
    url: '/miracle-api/marketDynamicInfo/detail',
    method: 'post',
    data
  })
}

export function saveMarketDynamicInfo(data) {
  return request({
    url: '/miracle-api/marketDynamicInfo/save',
    method: 'post',
    data
  })
}

export function updateMarketDynamicInfo(data) {
  return request({
    url: '/miracle-api/marketDynamicInfo/update',
    method: 'post',
    data
  })
}

export function delMarketDynamicInfo(data) {
  return request({
    url: '/miracle-api/marketDynamicInfo/del',
    method: 'post',
    data
  })
}

export function selectOptionsMarketDynamicInfo(data) {
  return request({
    url: '/miracle-api/marketDynamicInfo/options',
    method: 'post',
    data
  })
}