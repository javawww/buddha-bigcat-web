import request from '@/utils/request'

export function pageListLoanMarketProduct(data) {
  return request({
    url: '/miracle-api/loanMarketProduct/pageList',
    method: 'post',
    data
  })
}

export function listLoanMarketProduct(data) {
  return request({
    url: '/miracle-api/loanMarketProduct/list',
    method: 'post',
    data
  })
}

export function detailLoanMarketProduct(data) {
  return request({
    url: '/miracle-api/loanMarketProduct/detail',
    method: 'post',
    data
  })
}

export function saveLoanMarketProduct(data) {
  return request({
    url: '/miracle-api/loanMarketProduct/save',
    method: 'post',
    data
  })
}

export function updateLoanMarketProduct(data) {
  return request({
    url: '/miracle-api/loanMarketProduct/update',
    method: 'post',
    data
  })
}

export function delLoanMarketProduct(data) {
  return request({
    url: '/miracle-api/loanMarketProduct/del',
    method: 'post',
    data
  })
}

export function selectOptionsLoanMarketProduct(data) {
  return request({
    url: '/miracle-api/loanMarketProduct/options',
    method: 'post',
    data
  })
}
