import request from '@/utils/request'

export function pageListMemberLogsInfo(data) {
  return request({
    url: '/miracle-api/memberLogsInfo/pageList',
    method: 'post',
    data
  })
}

export function listMemberLogsInfo(data) {
  return request({
    url: '/miracle-api/memberLogsInfo/list',
    method: 'post',
    data
  })
}

export function detailMemberLogsInfo(data) {
  return request({
    url: '/miracle-api/memberLogsInfo/detail',
    method: 'post',
    data
  })
}

export function saveMemberLogsInfo(data) {
  return request({
    url: '/miracle-api/memberLogsInfo/save',
    method: 'post',
    data
  })
}

export function updateMemberLogsInfo(data) {
  return request({
    url: '/miracle-api/memberLogsInfo/update',
    method: 'post',
    data
  })
}

export function delMemberLogsInfo(data) {
  return request({
    url: '/miracle-api/memberLogsInfo/del',
    method: 'post',
    data
  })
}

export function selectOptionsMemberLogsInfo(data) {
  return request({
    url: '/miracle-api/memberLogsInfo/options',
    method: 'post',
    data
  })
}