import request from '@/utils/request'

export function pageListTopicInfo(data) {
  return request({
    url: '/miracle-api/topicInfo/pageList',
    method: 'post',
    data
  })
}

export function listTopicInfo(data) {
  return request({
    url: '/miracle-api/topicInfo/list',
    method: 'post',
    data
  })
}

export function detailTopicInfo(data) {
  return request({
    url: '/miracle-api/topicInfo/detail',
    method: 'post',
    data
  })
}

export function saveTopicInfo(data) {
  return request({
    url: '/miracle-api/topicInfo/save',
    method: 'post',
    data
  })
}

export function updateTopicInfo(data) {
  return request({
    url: '/miracle-api/topicInfo/update',
    method: 'post',
    data
  })
}

export function delTopicInfo(data) {
  return request({
    url: '/miracle-api/topicInfo/del',
    method: 'post',
    data
  })
}

