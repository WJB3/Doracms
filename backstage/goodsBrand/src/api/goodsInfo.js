import request from '@root/publicMethods/request'

export function getList(params) {
  return request({
    url: '/manage/goodsBrand/getList',
    method: 'get',
    params
  })
}

export function getOneAd(params) {
  return request({
    url: '/manage/goodsBrand/getOne',
    method: 'get',
    params
  })
}

export function addOneAd(data) {
  return request({
    url: '/manage/goodsBrand/addOne',
    method: 'post',
    data
  })
}

export function updateAds(data) {
  return request({
    url: '/manage/goodsBrand/updateOne',
    method: 'post',
    data
  })
}

export function delAds(params) {
  return request({
    url: '/manage/goodsBrand/delete',
    method: 'get',
    params
  })
}

export function getCategoryList(params){
  return request({
    url: '/manage/goodsBrand/getList',
    params,
    method: 'get'
  })
}