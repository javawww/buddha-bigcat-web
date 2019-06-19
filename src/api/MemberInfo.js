import request from '@/utils/request'

export function pageListMemberInfo(data) {
  return request({
    url: '/miracle-api/memberInfo/pageList',
    method: 'post',
    data
  })
}

export function listMemberInfo(data) {
  return request({
    url: '/miracle-api/memberInfo/list',
    method: 'post',
    data
  })
}

export function detailMemberInfo(data) {
  return request({
    url: '/miracle-api/memberInfo/detail',
    method: 'post',
    data
  })
}

export function saveMemberInfo(data) {
  return request({
    url: '/miracle-api/memberInfo/save',
    method: 'post',
    data
  })
}

export function updateMemberInfo(data) {
  return request({
    url: '/miracle-api/memberInfo/update',
    method: 'post',
    data
  })
}

export function delMemberInfo(data) {
  return request({
    url: '/miracle-api/memberInfo/del',
    method: 'post',
    data
  })
}

export function selectOptionsMemberInfo(data) {
  return request({
    url: '/miracle-api/memberInfo/options',
    method: 'post',
    data
  })
}