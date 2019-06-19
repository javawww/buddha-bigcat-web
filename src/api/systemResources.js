import request from '@/utils/request'

//  保存资源
export function saveResources(data) {
  return request({
    url: '/miracle-api/systemResources/save',
    method: 'post',
    data
  })
}

//  更新资源
export function updateResources(data) {
  return request({
    url: '/miracle-api/systemResources/update',
    method: 'post',
    data
  })
}

//  删除资源
export function delResources(data) {
  return request({
    url: '/miracle-api/systemResources/del',
    method: 'post',
    data
  })
}

//   详情资源
export function detailResources(data) {
  return request({
    url: '/miracle-api/systemResources/detail',
    method: 'post',
    data
  })
}
