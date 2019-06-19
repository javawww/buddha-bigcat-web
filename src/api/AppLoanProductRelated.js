import request from '@/utils/request'

export function pageListAppLoanProductRelated(data) {
  return request({
    url: '/miracle-api/appLoanProductRelated/pageList',
    method: 'post',
    data
  })
}

export function listAppLoanProductRelated(data) {
  return request({
    url: '/miracle-api/appLoanProductRelated/list',
    method: 'post',
    data
  })
}

export function detailAppLoanProductRelated(data) {
  return request({
    url: '/miracle-api/appLoanProductRelated/detail',
    method: 'post',
    data
  })
}

export function saveAppLoanProductRelated(data) {
  return request({
    url: '/miracle-api/appLoanProductRelated/save',
    method: 'post',
    data
  })
}

export function updateAppLoanProductRelated(data) {
  return request({
    url: '/miracle-api/appLoanProductRelated/update',
    method: 'post',
    data
  })
}

export function delAppLoanProductRelated(data) {
  return request({
    url: '/miracle-api/appLoanProductRelated/del',
    method: 'post',
    data
  })
}

