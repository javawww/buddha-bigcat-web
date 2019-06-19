import request from '@/utils/request'

export function pageListMessageRoomInfo(data) {
  return request({
    url: '/miracle-api/messageRoomInfo/pageList',
    method: 'post',
    data
  })
}

export function listMessageRoomInfo(data) {
  return request({
    url: '/miracle-api/messageRoomInfo/list',
    method: 'post',
    data
  })
}

export function detailMessageRoomInfo(data) {
  return request({
    url: '/miracle-api/messageRoomInfo/detail',
    method: 'post',
    data
  })
}

export function saveMessageRoomInfo(data) {
  return request({
    url: '/miracle-api/messageRoomInfo/save',
    method: 'post',
    data
  })
}

export function updateMessageRoomInfo(data) {
  return request({
    url: '/miracle-api/messageRoomInfo/update',
    method: 'post',
    data
  })
}

export function delMessageRoomInfo(data) {
  return request({
    url: '/miracle-api/messageRoomInfo/del',
    method: 'post',
    data
  })
}

export function selectOptionsMessageRoomInfo(data) {
  return request({
    url: '/miracle-api/messageRoomInfo/options',
    method: 'post',
    data
  })
}