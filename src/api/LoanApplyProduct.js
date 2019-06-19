import request from '@/utils/request'

export function pageListLoanApplyProduct(data) {
  return request({
    url: '/miracle-api/loanApplyProduct/pageList',
    method: 'post',
    data
  })
}

export function listLoanApplyProduct(data) {
  return request({
    url: '/miracle-api/loanApplyProduct/list',
    method: 'post',
    data
  })
}

export function detailLoanApplyProduct(data) {
  return request({
    url: '/miracle-api/loanApplyProduct/detail',
    method: 'post',
    data
  })
}

export function saveLoanApplyProduct(data) {
  return request({
    url: '/miracle-api/loanApplyProduct/save',
    method: 'post',
    data
  })
}

export function updateLoanApplyProduct(data) {
  return request({
    url: '/miracle-api/loanApplyProduct/update',
    method: 'post',
    data
  })
}

export function delLoanApplyProduct(data) {
  return request({
    url: '/miracle-api/loanApplyProduct/del',
    method: 'post',
    data
  })
}

export function selectOptionsLoanApplyProduct(data) {
  return request({
    url: '/miracle-api/loanApplyProduct/options',
    method: 'post',
    data
  })
}