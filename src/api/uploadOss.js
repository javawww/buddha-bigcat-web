import request from '@/utils/request'

export function getTempAuthToken() {
  return request({
    url: '/oapi/fileservice/get-temp-auth-token-two',
    method: 'post',
    data: { fileType: 100 }
  })
}

export function handleFileUploadOss(data, fileUploadUrl) {
  return request({
    url: '/oapi/',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data; boundary={boundary}' },
    data
  })
}
