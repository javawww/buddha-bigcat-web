import request from '@/utils/request'

export function pageListMarketCarouselInfo(data) {
  return request({
    url: '/miracle-api/marketCarouselInfo/pageList',
    method: 'post',
    data
  })
}

export function listMarketCarouselInfo(data) {
  return request({
    url: '/miracle-api/marketCarouselInfo/list',
    method: 'post',
    data
  })
}

export function detailMarketCarouselInfo(data) {
  return request({
    url: '/miracle-api/marketCarouselInfo/detail',
    method: 'post',
    data
  })
}

export function saveMarketCarouselInfo(data) {
  return request({
    url: '/miracle-api/marketCarouselInfo/save',
    method: 'post',
    data
  })
}

export function updateMarketCarouselInfo(data) {
  return request({
    url: '/miracle-api/marketCarouselInfo/update',
    method: 'post',
    data
  })
}

export function delMarketCarouselInfo(data) {
  return request({
    url: '/miracle-api/marketCarouselInfo/del',
    method: 'post',
    data
  })
}

export function selectOptionsMarketCarouselInfo(data) {
  return request({
    url: '/miracle-api/marketCarouselInfo/options',
    method: 'post',
    data
  })
}