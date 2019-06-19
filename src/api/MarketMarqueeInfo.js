import request from '@/utils/request'

export function pageListMarketMarqueeInfo(data) {
  return request({
    url: '/miracle-api/marketMarqueeInfo/pageList',
    method: 'post',
    data
  })
}

export function listMarketMarqueeInfo(data) {
  return request({
    url: '/miracle-api/marketMarqueeInfo/list',
    method: 'post',
    data
  })
}

export function detailMarketMarqueeInfo(data) {
  return request({
    url: '/miracle-api/marketMarqueeInfo/detail',
    method: 'post',
    data
  })
}

export function saveMarketMarqueeInfo(data) {
  return request({
    url: '/miracle-api/marketMarqueeInfo/save',
    method: 'post',
    data
  })
}

export function updateMarketMarqueeInfo(data) {
  return request({
    url: '/miracle-api/marketMarqueeInfo/update',
    method: 'post',
    data
  })
}

export function delMarketMarqueeInfo(data) {
  return request({
    url: '/miracle-api/marketMarqueeInfo/del',
    method: 'post',
    data
  })
}

export function selectOptionsMarketMarqueeInfo(data) {
  return request({
    url: '/miracle-api/marketMarqueeInfo/options',
    method: 'post',
    data
  })
}