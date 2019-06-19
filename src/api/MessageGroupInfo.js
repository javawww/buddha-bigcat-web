import request from '@/utils/request'

export function pageListMessageGroupInfo(data) {
  return request({
    url: '/miracle-api/messageGroupInfo/pageList',
    method: 'post',
    data
  })
}

export function listMessageGroupInfo(data) {
  return request({
    url: '/miracle-api/messageGroupInfo/list',
    method: 'post',
    data
  })
}

export function detailMessageGroupInfo(data) {
  return request({
    url: '/miracle-api/messageGroupInfo/detail',
    method: 'post',
    data
  })
}

export function saveMessageGroupInfo(data) {
  return request({
    url: '/miracle-api/messageGroupInfo/save',
    method: 'post',
    data
  })
}

export function updateMessageGroupInfo(data) {
  return request({
    url: '/miracle-api/messageGroupInfo/update',
    method: 'post',
    data
  })
}

export function delMessageGroupInfo(data) {
  return request({
    url: '/miracle-api/messageGroupInfo/del',
    method: 'post',
    data
  })
}

export function selectOptionsMessageGroupInfo(data) {
  return request({
    url: '/miracle-api/messageGroupInfo/options',
    method: 'post',
    data
  })
}

export function roomUserAdd(data) {
  return request({
    url: '/miracle-api/messageGroupInfo/roomUserAdd',
    method: 'post',
    data
  })
}

export function roomUserDelete(data) {
  return request({
    url: '/miracle-api/messageGroupInfo/roomUserDelete',
    method: 'post',
    data
  })
}

export function roomUserList(data) {
  return request({
    url: '/miracle-api/messageGroupInfo/roomUserList',
    method: 'post',
    data
  })
}

export function chatList(data) {
  return request({
    url: '/miracle-api/messageGroupInfo/chatList',
    method: 'post',
    data
  })
}
