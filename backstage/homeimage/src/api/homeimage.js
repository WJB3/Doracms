import request from '@root/publicMethods/request'

export function getHomeImageList(params) { 
  return request({
    url: '/manage/homeimage/getList',
    method: 'get',
    params
  })
}
 
 
export function add(data) {
  return request({
    url: '/manage/homeimage/addOne',
    method: 'post',
    data
  })
}
